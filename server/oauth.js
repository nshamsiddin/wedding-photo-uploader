const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URI
);

// Function to get access token using refresh token
async function getAccessToken() {
    try {
        const { tokens } = await oauth2Client.getAccessToken();
        return tokens.access_token;
    } catch (error) {
        console.error('Error retrieving access token:', error.message);
        throw error;
    }
}

// Function to set access token to OAuth2 client
async function setAccessToken() {
    try {
        const accessToken = await getAccessToken();
        oauth2Client.setCredentials({ access_token: accessToken });
    } catch (error) {
        console.error('Error setting access token:', error.message);
        throw error;
    }
}

module.exports = {
    oauth2Client,
    getAccessToken,
    setAccessToken,
};