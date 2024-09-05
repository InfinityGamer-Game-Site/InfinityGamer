// List of random texts
const randomTexts = [
    "it's not a bug it's a feature",
    "gabriel looks like a dog",
    "mitochondria is the powerhouse of the cell",
    "i forgor",
    "Wisdom is literally the best",
    "erm, you should really be focusing on your schoolwork 🤓☝",
    "did you know this text is random",
    "y'all play games too much, the bandwidth of this site is like 600GB on a good month",
    "did you know that there are 34 visual themes to choose from in settings",
    "did you know that there are 14 fonts to choose from in settings",
    "did you know that you can change the site title and how the cloaking works in settings",
    "did you know you can download all your games progresses into one file as a backup at the bottom of settings",
    "did you know you can view the stats of how much you play games in stats",
    "games list loose/compact setting has been moved to settings just so everyone knows"
];

// Function to generate a random number
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

// Function to display random text on page load
function displayRandomText() {
    const randomIndex = getRandomNumber(randomTexts.length);
    const randomText = randomTexts[randomIndex];
    const randomTextElement = document.getElementById("random-text");
    randomTextElement.textContent = randomText;
}

// Display random text on page load
window.addEventListener("load", displayRandomText);

setInterval(displayRandomText, 10000);

//about blank embedder
let url = window.location.href;
if (url) {
  var win;
  document.getElementById("embed-button").onclick = function () {
    if (win) {
      win.focus();
    } else {
      var features =
        "width=" +
        window.innerWidth +
        ",height=" +
        window.innerHeight +
        ",menubar=no,toolbar=no,location=no,status=no";
      win = window.open("", "_blank", features);
      win.document.body.style.margin = "0";
      win.document.body.style.height = "100%";
      var iframe = win.document.createElement("iframe");
      iframe.style.border = "none";
      iframe.style.width = "100%";
      iframe.style.height = "100%";
      iframe.style.margin = "0";
      iframe.src = url;
      win.document.body.appendChild(iframe);
      window.location.href = localStorage.getItem('redirectURL') || 'https://classroom.google.com/';
    }
  };
}

if (!localStorage.getItem("visited")) {
    const popup = document.createElement('pop-up');
    popup.textContent = 'This site, and its games, use localStorage to save your progress, and your data. By using this site, you agree to this site using your computers storage.';
    const goNowButton = document.createElement('button');
    document.body.appendChild(popup);
    localStorage.setItem("visited", true);
}

const box = document.getElementById('infinitylogo');

window.onload = function() {
    // Select the image element
    const image = document.getElementById('infinitylogo');
    PowerGlitch.glitch(image, {
  "playMode": "always",
  "createContainers": true,
  "hideOverflow": false,
  "timing": {
    "duration": 4000,
    "easing": "ease-in-out"
  },
  "glitchTimeSpan": {
    "start": 0,
    "end": 0.5
  },
  "shake": {
    "velocity": 15,
    "amplitudeX": 0.2,
    "amplitudeY": 0.2
  },
  "slice": {
    "count": 6,
    "velocity": 15,
    "minHeight": 0.02,
    "maxHeight": 0.3,
    "hueRotate": true
  },
  "pulse": false
});
};
document.addEventListener("DOMContentLoaded", function () {
document.getElementById("game-count").textContent = "There are currently " + gameNames.length + " games on InfinityGamer.";
});

fetch('package.json')
    .then(response => response.json())
    .then(data => {
        // Get the version
        const version = data.version;
        document.getElementById("version").textContent = 'Current version: ' + version;
    })
    .catch(error => console.error('Error:', error));