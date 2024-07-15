const mainClock = document.getElementById("time");

function updateClock() {
    let currentDate = new Date();
    let currentTime = currentDate.toLocaleTimeString();

    mainClock.textContent = currentTime;
}

setInterval(updateClock, 100);

document.addEventListener('DOMContentLoaded', (event) => {
    const feedback = document.getElementById('feedback-nav');
    
    feedback.addEventListener('mouseover', () => {
        feedback.textContent = 'forum';
    });

    feedback.addEventListener('mouseout', () => {
        feedback.textContent = 'chat_bubble';
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const game = document.getElementById('game-nav');
    
    game.addEventListener('mouseover', () => {
        game.textContent = 'gamepad';
    });

    game.addEventListener('mouseout', () => {
        game.textContent = 'sports_esports';
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const home = document.getElementById('home-nav');
    
    home.addEventListener('mouseover', () => {
        home.textContent = 'house';
    });

    home.addEventListener('mouseout', () => {
        home.textContent = 'home';
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const stats = document.getElementById('stats-nav');
    
    stats.addEventListener('mouseover', () => {
        stats.textContent = 'equalizer';
    });

    stats.addEventListener('mouseout', () => {
        stats.textContent = 'bar_chart';
    });
});

