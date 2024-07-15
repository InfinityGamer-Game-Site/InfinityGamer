
fetch('../docs/DEVLOG.md')
.then(response => response.text())
.then(changelog => {
    // Convert Markdown to HTML
    const converter = new showdown.Converter();
    const html = converter.makeHtml(changelog);

    // Display the HTML on the webpage
    document.getElementById('devlog').innerHTML = html;
})
.catch(error => document.getElementById('devlog').innerHTML = 'Error:' + error);
