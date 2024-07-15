function toggleTheme(theme) {
  const body = document.body;
  body.className = theme;
  localStorage.setItem("theme", theme);
  location.reload();
}
function loadTheme(theme) {
  const body = document.body;
  body.className = theme;
  localStorage.setItem("theme", theme);
}

// Check if theme is saved in local storage
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  loadTheme(savedTheme);
} else {
  // Default to dark theme if no theme is saved
  toggleTheme("dark");
}

document.addEventListener('DOMContentLoaded', function() {
  const savedTitle = localStorage.getItem('title');

  if (savedTitle) {
      changeTitle(savedTitle);
  }

  // Get the selected font from localStorage or use a default font
var storedFont = localStorage.getItem('selectedFont') || 'Orbitron';

// Set the font for the body and specific elements
document.body.style.fontFamily = storedFont;
const buttons = document.querySelectorAll("button");
buttons.forEach(button => {
    button.style.fontFamily = storedFont;
});
const gameboxes = document.querySelectorAll("game-box");
gameboxes.forEach(gamebox => {
    gamebox.style.fontFamily = storedFont;
});
const inputs = document.querySelectorAll("input");
inputs.forEach(input => {
    input.style.fontFamily = storedFont;
});

// Add the selected font dynamically to the head of the document
var styleElement = document.createElement('style');
styleElement.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=${storedFont.replace(/ /g, '+')}&display=swap');
`;
document.head.appendChild(styleElement);

});

function changeTitle(title) {
  document.title = title;
}

function redirect(link){
  if (window.top.location.href !== "about:blank"){
    window.top.location.href = link;
  } else {
    window.parent.location.href = link;
  }
}

const banner = document.getElementById("gg-privacy-banner");
  
  if (banner) {
    banner.remove();
  }


let urle = window.location.href;

function autoABE() {
  var wind;
  if (wind) {
    wind.focus();
  } else {
    var features =
      "width=" +
      window.innerWidth +
      ",height=" +
      window.innerHeight +
      ",menubar=no,toolbar=no,location=no,status=no";
    wind = window.open("", "_blank", features);
    wind.document.body.style.margin = "0";
    wind.document.body.style.height = "100%";
    var iframe = wind.document.createElement("iframe");
    iframe.style.border = "none";
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.margin = "0";
    iframe.src = urle;
    wind.document.body.appendChild(iframe);
    window.location.href = localStorage.getItem('redirectURL') || 'https://classroom.google.com/';
  }
}

if (localStorage.getItem('autoAboutBlankEmbed') === 'true' && !(window.location.pathname === '/navbar.html') && window.top.location.href !== "about:blank") {
  autoABE();
}
function toTitleCase(str) {
  return str.replace(/\b\w+/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}