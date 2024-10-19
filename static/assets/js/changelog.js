fetch('../package.json')
    .then(response => response.json())
    .then(data => {
        // Get the version
        const version = data.version;
        document.getElementById("version").textContent = 'Current version: ' + version;
    })
    .catch(error => console.error('Error:', error));

    // Fetch changelog.md
fetch('../docs/CHANGELOG.md')
.then(response => response.text())
.then(changelog => {
    // Convert Markdown to HTML
    const converter = new showdown.Converter();
    const html = converter.makeHtml(changelog);

    // Display the HTML on the webpage
    document.getElementById('changelog').innerHTML = html;
})
.catch(error => document.getElementById('changelog').innerHTML = 'Error:' + error);
