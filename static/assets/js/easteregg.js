let clickCount = 0;
const maxClicks = [1, 5, 10, 15, 20, 25]; // Change this array as needed
const imagePaths = [
    'assets/images/easteregg/0.png',
    'assets/images/easteregg/1.png',
    'assets/images/easteregg/2.png',
    'assets/images/easteregg/3.png',
    'assets/images/easteregg/4.png',
    'assets/images/easteregg/5.png',
    'assets/images/easteregg/6.png',
    'assets/images/easteregg/0.png' // Repeat the first image to complete the loop
];

const eggElement = document.getElementById('egg');
const messageElement = document.getElementById('message');

eggElement.addEventListener('click', () => {
    if (eggElement.src != imagePaths[imagePaths.length - 2] || eggElement.src != imagePaths[imagePaths.length - 1]) {
        clickCount++;
    }
    updateEggImage();
});

function updateEggImage() {
    for (let i = 0; i < maxClicks.length; i++) {
        if (clickCount < maxClicks[i]) {
            eggElement.src = imagePaths[i];
            break;
        }
    }
    if (clickCount === maxClicks[maxClicks.length - 2]) {
        setTimeout(() => {
            eggElement.src = imagePaths[imagePaths.length - 2]; // Display second-to-last image
            setTimeout(() => {
                eggElement.src = imagePaths[0]; // Go back to the first image
                clickCount = 0;
            }, 1000); // Wait 0.5 seconds before going back to the first image
        }, 1000); // Wait 1 second before displaying the second-to-last image
    }
}
