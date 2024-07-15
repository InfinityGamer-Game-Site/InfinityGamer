// JavaScript code to extract the search parameter from the URL and set the iframe source
const urlParams = new URLSearchParams(window.location.search);
const searchParam = urlParams.get("g");


if (searchParam) {
  let title = toTitleCase(searchParam.replace(/-/g, " "));
  document.getElementById("gameFrame").src = "files/" + searchParam + "/index.html";
  const savedTitle = localStorage.getItem("title");

  if (savedTitle) {
    document.title = savedTitle;
  } else {
    document.title = title + " - InfinityGamer";
  }

  if (sourceNeeded.includes(searchParam)){
    const popup = document.createElement('pop-up');
    popup.innerHTML = '<h2>This game needs source view to work!</h2> <br> <p>Unfortunately, play time can not be counted in source view</p> <br> <p>Redirecting you in 5 seconds...</p>';
    const goNowButton = document.createElement('button');
    goNowButton.textContent = "Go now";
    goNowButton.onclick = "window.location.href = files/" + searchParam + "/index.html"
    document.body.appendChild(popup);
    popup.appendChild(document.createElement('br'));
    popup.appendChild(document.createElement('br'));
    popup.appendChild(goNowButton);
    setTimeout(function() {
      window.location.href = "files/" + searchParam + "/index.html";
  }, 5000);
  }
}

function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

var iframe = document.getElementById('gameFrame');

  // Check if counter value is stored in localStorage
  if(!localStorage.getItem(searchParam + 'PlayTime')) {
    localStorage.setItem(searchParam + 'PlayTime', 0);
  }
  // Function to increment counter every second
  setInterval(function() {
    localStorage.setItem(searchParam + 'PlayTime', (parseInt(localStorage.getItem(searchParam + 'PlayTime')) + 1).toString());
  }, 1000);
