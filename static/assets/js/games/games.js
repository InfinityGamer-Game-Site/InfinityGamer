let randomImgIndexL = null;

document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get("c");

  const gamesWrapper = document.getElementById("games-wrapper");

  function toTitleCase(str) {
    return str.replace(/\b\w+/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  function createGameBox(gameName, isRandom = false) {
    const gameImg = `../assets/images/games/${gameName}.png`;
    const gameLink = `display.html?g=${gameName}`;
    const gameBox = document.createElement("div");
    gameBox.classList.add("game-box");
    gameBox.style.backgroundImage = `url('${gameImg}')`;

    if (isRandom) {
      gameBox.classList.add("random-mp-game");
    }

    const gameText = document.createElement("span");
    gameText.textContent = toTitleCase(gameName.replace(/-/g, " "));

    if (isRandom) {
      gameText.classList.add("random-mp-game-text");
    }

    gameBox.appendChild(gameText);
    gameBox.addEventListener("click", function () {
      window.location.href = gameLink;
    });

    return gameBox;
  }

  function filterGames() {
    const filterValue = this.value.toLowerCase();
    document.querySelectorAll(".game-box").forEach(function (gameBox) {
      const gameText = gameBox.textContent.toLowerCase();
      gameBox.style.display = gameText.includes(filterValue) ? "block" : "none";
    });
  }

  function toggleMargin() {
    const gameBoxes = document.querySelectorAll(".game-box");
    gameBoxes.forEach((box) => {
      if (localStorage.getItem("compact") === "true") {
        box.classList.add("compact");
        localStorage.setItem("compact", true);
      } else {
        box.classList.remove("compact");
        localStorage.setItem("compact", false);
      }
    });
  }

  function checkInView() {
    const windowHeight = window.innerHeight + 100;
    const boxes = document.querySelectorAll(".game-box");
    boxes.forEach((box) => {
      const boxRect = box.getBoundingClientRect();
      if (boxRect.top < windowHeight && boxRect.bottom > 0) {
        box.classList.add("in-view");
      } else {
        box.classList.remove("in-view");
      }
    });
  }

  if (categoryParam) {
    categories[categoryParam].forEach(function (gameName) {
      gamesWrapper.appendChild(createGameBox(gameName));
    });
    document.getElementById("svg-container").remove();
    document.getElementById("random-most-played-game-container").remove();
  } else {
    gameNames.forEach(function (gameName) {
      gamesWrapper.appendChild(createGameBox(gameName));
    });
    let randomIndex = Math.floor(Math.random() * gameNames.length);
    let randomGame = gameNames[randomIndex];
    document
      .getElementById("random-game-container")
      .appendChild(createGameBox(randomGame, true));

    searchInput.addEventListener("input", function () {
      const filterValue = this.value.toLowerCase();
      const gameBox = document.querySelector(".random-mp-game");
      if (filterValue === "") {
        gameBox.style.display = "block";
        randomGameLabel.style.display = "block";
      } else {
        gameBox.style.display = "none";
        randomGameLabel.style.display = "none";
      }
    });
  }
    //stats
    function getFilteredLocalStorageValues() {
      const filteredList = {};
  
      gameNames.forEach((key) => {
        const value = localStorage.getItem(key + "PlayTime");
  
        if (value && value !== "0") {
          filteredList[key] = parseFloat(value);
        }
      });
  
      return filteredList;
    }
  
    const filteredValues = getFilteredLocalStorageValues();
    console.log(filteredValues);
  
    function findKeyWithLargestNumericValue(filteredValues) {
      let largestKey = null;
      let largestValue = -Infinity;
  
      Object.entries(filteredValues).forEach(([key, value]) => {
        const numericValue = parseFloat(value);
        if (!isNaN(numericValue) && numericValue > largestValue) {
          largestValue = numericValue;
          largestKey = key;
        }
      });
  
      return largestKey;
    }
  
    const largestKey = findKeyWithLargestNumericValue(filteredValues);
    if (largestKey && document.getElementById("most-played-game-container")){
    document.getElementById("most-played-game-container").appendChild(createGameBox(largestKey, true));
    } else {
      if (document.getElementById("most-played-game-container")) {
        document.getElementById("most-played-game-container").remove();
      }
    }

  if (localStorage.getItem("compact") === "true") {
    toggleMargin();
  }

  checkInView();
  window.addEventListener("scroll", checkInView);
  setInterval(checkInView, 500);

  document.getElementById("searchInput").addEventListener("input", filterGames);

  document.getElementById("game-count").textContent = "Game count: " + gameNames.length;
});

function showCategories() {
  const categoryContainer = document.createElement("div");
  categoryContainer.classList.add("category-container");

  const categoryContent = document.createElement("div");
  categoryContent.classList.add("category-content");
  categoryContent.innerHTML = `
    <div id="cat-wrapper">
      <category data-category="papas"></category>
      <category data-category="minecraft"></category>
      <category data-category="2048"></category>
      <category data-category="mario"></category>
      <category data-category="idle"></category>
      <category data-category="cars"></category>
      <category data-category="puzzle"></category>
      <category data-category="shooter"></category>
      <category data-category="sports"></category>
      <category data-category="rhythm"></category>
      <category data-category="td"></category>
      <category data-category="arcade"></category>
      <p>Categories are currently unfinished, not all games are in a category yet.</p>
    </div>`;

  const exitButton = document.createElement("button");
  exitButton.classList.add("exit-button");
  exitButton.innerHTML = "X";
  exitButton.addEventListener("click", function () {
    categoryContainer.style.display = "none";
  });

  categoryContent.appendChild(exitButton);
  categoryContainer.appendChild(categoryContent);
  document.body.appendChild(categoryContainer);

  document.querySelectorAll("category").forEach((button) => {
    const category = button.dataset.category;
    const catText = document.createElement("span");
    catText.textContent = toTitleCase(category.replace(/-/g, " "));
    button.appendChild(catText);
    button.addEventListener("click", function () {
      window.location.href = `index.html?c=${category}`;
    });
  });
}

function rerollRandom() {
  let randomIndex = Math.floor(Math.random() * gameNames.length);
  let randomGame = gameNames[randomIndex];
  const gameBox = document.querySelector(".random-mp-game");
  gameBox.style.backgroundImage = `url('../assets/images/games/${randomGame}.png')`;
  const gameText = document.querySelector(".random-mp-game-text");
  gameText.textContent = toTitleCase(randomGame.replace(/-/g, " "));
  gameBox.appendChild(gameText);

  let randomImgIndex;
  do {
    randomImgIndex = Math.floor(Math.random() * 5) + 1;
  } while (randomImgIndex === randomImgIndexL);

  randomImgIndexL = randomImgIndex;
  console.log(randomImgIndex);
  document.getElementById(
    "rerollRandom"
  ).src = `../assets/images/dice/${randomImgIndex}.svg`;

  fetchAndModifySVG();
}

function fetchAndModifySVG() {
  const body = document.body;
  const styles = getComputedStyle(body);
  const textColor = styles.getPropertyValue("--text-color").trim();
  console.log(textColor);

  fetch(document.getElementById("rerollRandom").src)
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("rerollRandom").remove();
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = data;
      const svgElement = tempDiv.querySelector("svg");
      console.log(svgElement);

      if (svgElement) {
        svgElement.querySelectorAll("*").forEach((el) => {
          el.setAttribute("fill", textColor);
        });

        svgElement.setAttribute("id", "rerollRandom");
        svgElement.setAttribute("onclick", "rerollRandom()");
        document.getElementById("svg-container").innerHTML = tempDiv.innerHTML;
      } else {
        console.error("SVG element not found in fetched content");
      }
    })
    .catch((error) => console.error("Error fetching SVG:", error));
}

document.addEventListener("DOMContentLoaded", fetchAndModifySVG);
