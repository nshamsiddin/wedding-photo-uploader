require('dotenv').config();
const express = require('express');
const multer = require('multer');
const { google } = require('googleapis');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);
oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const drive = google.drive({ version: 'v3', auth: oauth2Client });

const storage = multer.memoryStorage();
const upload = multer({ storage });

app.use(express.static(path.join(__dirname, '../public')));

app.post('/upload', upload.array('files'), async (req, res) => {
    try {
        const files = req.files;
        const uploadPromises = files.map(async (file) => {
            const driveResponse = await drive.files.create({
                requestBody: {
                    name: file.originalname,
                    mimeType: file.mimetype,
                },
                media: {
                    mimeType: file.mimetype,
                    body: Buffer.from(file.buffer).toString(),
                },
            });
            return driveResponse;
        });

        await Promise.all(uploadPromises);
        res.status(200).json({ message: 'Upload successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to upload files' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});