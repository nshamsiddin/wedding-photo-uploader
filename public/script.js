document.getElementById('uploadForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const files = document.getElementById('fileInput').files;
    const formData = new FormData();

    for (const file of files) {
        formData.append('files', file);
    }

    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        if (response.ok) {
            document.getElementById('message').textContent = 'Upload successful!';
        } else {
            document.getElementById('message').textContent = `Error: ${result.message}`;
        }
    } catch (error) {
        document.getElementById('message').textContent = `Error: ${error.message}`;
    }
});