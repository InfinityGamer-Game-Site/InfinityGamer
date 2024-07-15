document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const categoryParam = urlParams.get("c");

  const gamesWrapper = document.getElementById("games-wrapper");
  //gameNames and categories are in linked JS file

 

  function toTitleCase(str) {
    return str.replace(/\b\w+/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
  if (categoryParam) {
    categories[categoryParam].forEach(function (gameName) {
      const gameImg = `../assets/images/games/${gameName}.png`;
      const gameLink = `display.html?g=${gameName}`;

      const gameBox = document.createElement("div");
      gameBox.classList.add("game-box");
      gameBox.style.backgroundImage = `url('${gameImg}')`;

      const gameText = document.createElement("span");
      gameText.textContent = toTitleCase(gameName.replace(/-/g, " ")); // Convert to title case and replace dashes with spaces
      gameBox.appendChild(gameText);

      gameBox.addEventListener("click", function () {
        window.location.href = gameLink;
      });

      gamesWrapper.appendChild(gameBox);

      document
        .getElementById("searchInput")
        .addEventListener("input", function () {
          const filterValue = this.value.toLowerCase();

          document.querySelectorAll(".game-box").forEach(function (gameBox) {
            const gameText = gameBox.textContent.toLowerCase();
            if (gameText.includes(filterValue)) {
              gameBox.style.display = "block";
            } else {
              gameBox.style.display = "none";
            }
          });
        });
    });
  } else {
    gameNames.forEach(function (gameName) {
      const gameImg = `../assets/images/games/${gameName}.png`;
      const gameLink = `display.html?g=${gameName}`;

      const gameBox = document.createElement("div");
      gameBox.classList.add("game-box");
      gameBox.style.backgroundImage = `url('${gameImg}')`;

      const gameText = document.createElement("span");
      gameText.textContent = toTitleCase(gameName.replace(/-/g, " ")); // Convert to title case and replace dashes with spaces
      gameBox.appendChild(gameText);

      gameBox.addEventListener("click", function () {
        window.location.href = gameLink;
      });

      gamesWrapper.appendChild(gameBox);

      document
        .getElementById("searchInput")
        .addEventListener("input", function () {
          const filterValue = this.value.toLowerCase();

          document.querySelectorAll(".game-box").forEach(function (gameBox) {
            const gameText = gameBox.textContent.toLowerCase();
            if (gameText.includes(filterValue)) {
              gameBox.style.display = "block";
            } else {
              gameBox.style.display = "none";
            }
          });
        });
    });
    let randomIndex = Math.floor(Math.random() * gameNames.length);
let randomGame = gameNames[randomIndex];

    const gameImg = `../assets/images/games/${randomGame}.png`;
      const gameLink = `display.html?g=${randomGame}`;

      const gameBox = document.createElement("div");
      gameBox.classList.add("game-box");
      gameBox.classList.add('random-game');
      gameBox.style.backgroundImage = `url('${gameImg}')`;

      const gameText = document.createElement("span");
      gameText.textContent = toTitleCase(randomGame.replace(/-/g, " ")); // Convert to title case and replace dashes with spaces
      gameBox.appendChild(gameText);

      gameBox.addEventListener("click", function () {
        window.location.href = gameLink;
      });
      document.getElementById("random-game-container").appendChild(gameBox);

      searchInput.addEventListener("input", function () {
        const filterValue = this.value.toLowerCase();
        if (filterValue === "") {
            gameBox.style.display = "block";
            randomGameLabel.style.display = "block";
        } else {
            gameBox.style.display = "none";
            randomGameLabel.style.display = "none";
        }
    });
  }

  const marginSwitch = document.getElementById('marginSwitch');
  
  // Check the local storage and set the switch accordingly
  if (localStorage.getItem('compact') === 'true') {
    marginSwitch.checked = true;
    toggleMargin();
  } else {
    marginSwitch.checked = false;
    
  }

  // Toggle margin function
  function toggleMargin() {
    const gameBoxes = document.querySelectorAll('.game-box');
    gameBoxes.forEach(box => {
      if (marginSwitch.checked) {
        box.classList.add('compact');
        localStorage.setItem('compact', true);
      } else {
        box.classList.remove('compact');
        localStorage.setItem('compact', false);
      }
    });
  }

  // Add event listener for the switch
  marginSwitch.addEventListener('change', toggleMargin);

});

function showCategories() {
  // Create category container element
  var categoryContainer = document.createElement('div');
  categoryContainer.classList.add('category-container');

  // Create category content element
  var categoryContent = document.createElement('div');
  categoryContent.classList.add('category-content');
        categoryContent.innerHTML = '<div id="cat-wrapper"><category data-category="papas"></category><category data-category="minecraft"></category><category data-category="2048"></category><category data-category="mario"></category><category data-category="idle"></category><category data-category="cars"></category><category data-category="puzzle"></category><category data-category="shooter"></category><category data-category="sports"></category></div>';


  // Create exit button element
  var exitButton = document.createElement('button');
  exitButton.classList.add('exit-button');
  exitButton.innerHTML = 'X';

  // Add event listener to exit button to close category when clicked
  exitButton.addEventListener('click', function() {
    categoryContainer.style.display = 'none';
  });

  // Append exit button to category content
  categoryContent.appendChild(exitButton);

  // Append category content to category container
  categoryContainer.appendChild(categoryContent);

  // Append category container to body
  document.body.appendChild(categoryContainer);

    const buttons = document.querySelectorAll('category');
  
    buttons.forEach(button => {
        const category = button.dataset.category;
        // Construct background image path based on category
        const imagePath = `../assets/images/categories/${category}.png`;
        // Set button background image
        button.style.backgroundImage = `url('${imagePath}')`;
        // Add onclick event listener to redirect when clicked
        const catText = document.createElement("span");
        catText.textContent = toTitleCase(category.replace(/-/g, " ")); // Convert to title case and replace dashes with spaces
        button.appendChild(catText);
        button.addEventListener('click', function() {
            window.location.href = `index.html?c=${category}`;
        });
  });
  
}

function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}


