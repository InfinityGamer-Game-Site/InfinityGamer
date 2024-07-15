if (searchParam) {
  let title = toTitleCase(searchParam.replace(/-/g, " "));
  document.getElementById("gameName").textContent = title;
}
// Function to reload the iframe
function reloadIframe() {
    iframe.contentWindow.location.reload(true); // Reload the iframe's content
}

var reloadButton = document.getElementById('reloadButton');
reloadButton.addEventListener('click', reloadIframe);

function shareGame() {
navigator.clipboard.writeText(window.location.href)
  .then(() => {
    console.log("Text copied successfully!");
  })
  .catch((err) => {
    console.error("Error copying text:", err);
  });

}

var shareButton = document.getElementById('shareButton');
shareButton.addEventListener('click', shareGame);

function fullscreen() {
  redirect("fullscreen.html?g=" + searchParam);
}

function sourceView() {
  const popup = document.createElement('pop-up');
  popup.id = "sourcePopup";
    popup.innerHTML = '<h2>Are you sure you want to enter source view?</h2><p>Play time will not be counted in source view.</p><p>Only use source view if the game isn&#39;t working, and won&#39;t work without it. Otherwise, use fullscreen mode.';
    const goNowButton = document.createElement('a');
    goNowButton.textContent = "Yes, I'm sure";
    goNowButton.onclick = function() {
        window.location.href = "files/" + searchParam + "/index.html"; 
    };
    goNowButton.style.fontSize = "50%";
    goNowButton.style.textDecoration = "underline";
    const noButton = document.createElement('button'); 
    noButton.textContent = "No, never mind";
    noButton.id = "noNVM";
    noButton.onclick = function() {
        document.getElementById("sourcePopup").remove();
    };
    const fullbtn = document.createElement('button'); 
    fullbtn.textContent = "I want fullscreen";
    fullbtn.id = "fullBTN";
    fullbtn.onclick = function() {
        redirect('fullscreen.html?g=' + searchParam);
    };
    document.body.appendChild(popup);
    popup.appendChild(document.createElement('br'));
    
    popup.appendChild(noButton);
    popup.appendChild(fullbtn);
    popup.appendChild(document.createElement('br'));
    popup.appendChild(goNowButton);
}



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

function updatePlayTime() {
  document.getElementById('playtime').textContent = 'Play time: ' + formatDuration(localStorage.getItem(searchParam + 'PlayTime'));
}

setInterval(updatePlayTime, 100);