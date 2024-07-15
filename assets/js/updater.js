document.addEventListener('DOMContentLoaded', function() {
    var updateIncrement = localStorage.getItem("updateincrement") || 0;
    localStorage.setItem("updateincrement", parseInt(updateIncrement) + 1);
    var iframe = document.getElementById("updater");
    iframe.src = "assets/js/service-worker.js?v=" + localStorage.getItem("updateincrement");

    iframe.addEventListener('load', function() {
        let sampParent = document.getElementById('samps');
        let sampu = document.createElement('samp');
        sampu.textContent = "Loaded";
        sampParent.appendChild(document.createElement('br'));
        sampParent.appendChild(sampu);
        let sampd = document.createElement('samp');
        sampd.textContent = "Updating...";
        sampParent.appendChild(document.createElement('br'));
        sampParent.appendChild(sampd);
        setTimeout(function() {
            let sampt = document.createElement('samp');
            sampt.textContent = "Updated";
            sampParent.appendChild(document.createElement('br'));
            sampParent.appendChild(sampt);
            let sampc = document.createElement('samp');
            sampc.textContent = "Redirecting...";
            sampParent.appendChild(document.createElement('br'));
            sampParent.appendChild(sampc);
            window.history.back();
        }, 1000);
    });
});
