const { google } = require('googleapis');
const { oauth2Client, getAccessToken } = require('./oauth');

const drive = google.drive({ version: 'v3', auth: oauth2Client });

// Function to upload file to Google Drive
async function uploadFileToDrive(file) {
    try {
        const accessToken = await getAccessToken();

        const driveResponse = await drive.files.create({
            requestBody: {
                name: file.originalname,
                mimeType: file.mimetype,
            },
            media: {
                mimeType: file.mimetype,
                body: Buffer.from(file.buffer).toString(),
            },
            auth: accessToken,
        });

        return driveResponse;
    } catch (error) {
        console.error('Error uploading file to Google Drive:', error.message);
        throw error;
    }
}

module.exports = {
    uploadFileToDrive,
};