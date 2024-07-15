document.getElementById('title-changer').addEventListener('submit', function(event) {
    event.preventDefault();

    const titleInput = document.getElementById('title');

    if (!titleInput.value.trim()) {
        alert('Please enter a title.');
        return;
    }

    const title = titleInput.value;

    localStorage.setItem('title', title);
});

document.getElementById('redirect-changer').addEventListener('submit', function(event) {
    event.preventDefault();

    const redirectURLInput = document.getElementById('redir-url');

    if (!redirectURLInput.value.trim()) {
        alert('Please enter a URL.');
        return;
    }

    const redirectURL = redirectURLInput.value;

    localStorage.setItem('redirectURL', 'https://' + redirectURL);
});

function applyFont(fontName) {
    document.body.style.fontFamily = fontName;
    localStorage.setItem('selectedFont', fontName);
    location.reload();
}


function toggleAutoAboutBlankEmbedder() {
  const itemName = 'autoAboutBlankEmbed';

  // Retrieve the current value from localStorage
  let currentValue = localStorage.getItem(itemName);

  // Check the current value and toggle it
  if (currentValue === null) {
    // If the item is not set, initialize it to true
    localStorage.setItem(itemName, 'true');
  } else if (currentValue === 'true') {
    // If the item is true, set it to false
    localStorage.setItem(itemName, 'false');
  } else {
    // If the item is false, set it to true
    localStorage.setItem(itemName, 'true');
  }
}

if (localStorage.getItem('autoAboutBlankEmbed') === 'true') {
  document.getElementById('aabeSwitch').checked = true;
  toggleMargin();
} else {
  document.getElementById('aabeSwitch').checked = false;
}

document.getElementById('backupBtn').addEventListener('click', () => {
  const localStorageData = JSON.stringify(localStorage);
  const blob = new Blob([localStorageData], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = 'infinitygamer.save';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
});

document.getElementById('restoreBtn').addEventListener('click', () => {
  document.getElementById('restoreFileInput').click();
});

document.getElementById('restoreFileInput').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
          const data = JSON.parse(e.target.result);
          for (const key in data) {
              localStorage.setItem(key, data[key]);
          }
          alert('LocalStorage restored successfully!');
      };
      reader.readAsText(file);
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const storedFonts = [
      { name: 'Orbitron', displayName: 'Orbitron (Default)' },
      { name: 'Open Sans', displayName: 'Open Sans' },
      { name: 'Arial', displayName: 'Arial' },
      { name: 'Verdana', displayName: 'Verdana' },
      { name: 'Times New Roman', displayName: 'Times New Roman' },
      { name: 'Courier New', displayName: 'Courier New' },
      { name: 'Comic Neue', displayName: 'Comic Neue' },
      { name: 'Cookie', displayName: 'Cookie' },
      { name: 'Poetsen One', displayName: 'Poetsen One' },
      { name: 'Black Ops One', displayName: 'Black Ops One' },
      { name: 'Special Elite', displayName: 'Special Elite' },
      { name: 'Silkscreen', displayName: 'Silkscreen' },
      { name: 'Audiowide', displayName: 'Audiowide' }
  ];

  const fontSelectDiv = document.getElementById('fontSelect');
  const contentDiv = document.getElementById('content');

  storedFonts.forEach(font => {
      // Create and append style element to import font
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
          @import url('https://fonts.googleapis.com/css2?family=${font.name.replace(/ /g, '+')}&display=swap');
      `;
      document.head.appendChild(styleElement);

      // Create and append button element
      const buttonElement = document.createElement('button');
      buttonElement.textContent = font.displayName;
      buttonElement.style.fontFamily = font.name; 
      buttonElement.onclick = () => applyFont(font.name);
      fontSelectDiv.appendChild(buttonElement);
  });

  // Define an array of theme names
const themes = [
  'dark',
  'light',
  'oceanic',
  'midnight',
  'bubblegum',
  'gray',
  'neo',
  'forest',
  'winter',
  'spring',
  'summer',
  'fall',
  'mystic',
  'sunset',
  'galactic',
  'enchanted',
  'desert',
  'arctic',
  'tropical',
  'pastel',
  'urban',
  'vintage',
  'futuristic',
  'candy',
  'rainbow',
  'gothic',
  'swirl',
  'aurora',
  'sea',
  'beach',
  'mountains'
];

// Function to create theme buttons
function createThemeButtons() {
  const themeButtonsContainer = document.getElementById('themeButtons');

  // Loop through each theme and create a button
  themes.forEach(theme => {
    const button = document.createElement('button');
    button.textContent = theme.charAt(0).toUpperCase() + theme.slice(1); // Capitalize first letter
    button.style.background = `var(--bg-color-${theme})`; // Set background color
    button.style.color = `var(--text-color-${theme})`; // Set text color
    button.style.outline = `1px solid var(--text-color-${theme})`; // Set outline color
    button.onclick = () => toggleTheme(theme); // Assign onclick event
    themeButtonsContainer.appendChild(button); // Append button to container
  });
}

// Call the function to create theme buttons
createThemeButtons();

fetch('../package.json')
    .then(response => response.json())
    .then(data => {
        // Get the version
        const version = data.version;
        document.getElementById("version").textContent = 'Current version: ' + version;
    })
    .catch(error => console.error('Error:', error));


});
