
function getFilteredLocalStorageValues() {
    const filteredList = {};

    gameNames.forEach(key => {
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

document.getElementById('mostPlayed').textContent = "Most Played Game: " + toTitleCase(largestKey).replace(/-/g, " ") + ", for " + formatDuration(filteredValues[largestKey]);

function formatDuration(seconds) {
    if (seconds < 0) {
        return "Invalid duration"; 
    }

    const days = Math.floor(seconds / (3600 * 24));
    const hours = Math.floor((seconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    let formattedDuration = '';

    if (days > 0) {
        formattedDuration += `${days}:`;
    }

    if (hours > 0 || formattedDuration !== '') {
        formattedDuration += `${hours.toString().padStart(2, '0')}:`;
    }

    formattedDuration += `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;

    return formattedDuration;
}

function jsonToHtmlList(jsonData) {
    let html = '<ul>';
    for (let key in jsonData) {
        if (jsonData.hasOwnProperty(key)) {
            html += `<li><strong>${toTitleCase(key).replace(/-/g, " ")}:</strong> ${formatDuration(jsonData[key])}</li>`;
        }
    }
    html += '</ul>';
    return html;
}

function insertHtmlIntoElement(html, elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.innerHTML = html;
    } else {
        console.error(`Element with ID '${elementId}' not found.`);
    }
}

const htmlList = jsonToHtmlList(filteredValues);
insertHtmlIntoElement(htmlList, 'listContainer');

function getRandomHexColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function generateColors(num) {
    let colors = [];
    for (let i = 0; i < num; i++) {
        colors.push(getRandomHexColor());
    }
    return colors;
}

const randomColors = generateColors(400);

let keys = Object.keys(filteredValues);
let values = Object.values(filteredValues)
new Chart("myChart", {
    type: "pie",
    data: {
      labels: keys,
      datasets: [{
        backgroundColor: randomColors,
        data: values
      }]
    },
    options: {
      title: {
        display: false
      }
    }
  });