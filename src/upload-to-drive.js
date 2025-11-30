const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

async function uploadToGoogleDrive() {
    try {
        // Parse the service account credentials from environment variable
        const credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);

        // Create auth client
        const auth = new google.auth.GoogleAuth({
            credentials,
            scopes: ['https://www.googleapis.com/auth/drive.file'],
        });

        const drive = google.drive({ version: 'v3', auth });

        // Your Google Drive folder ID (extracted from the URL)
        const folderId = '1a3RheJOi4aKyydChZ0FWOeq8KhjhcbOj';

        // Get all CSV files from data directory
        const dataDir = path.join(__dirname, '..', 'data');
        const files = fs.readdirSync(dataDir).filter(file => file.endsWith('.csv'));

        console.log(`Found ${files.length} CSV files to upload`);

        for (const fileName of files) {
            const filePath = path.join(dataDir, fileName);

            // Check if file already exists in Google Drive
            const existingFiles = await drive.files.list({
                q: `name='${fileName}' and '${folderId}' in parents and trashed=false`,
                fields: 'files(id, name)',
            });

            const fileMetadata = {
                name: fileName,
                parents: [folderId],
            };

            const media = {
                mimeType: 'text/csv',
                body: fs.createReadStream(filePath),
            };

            if (existingFiles.data.files.length > 0) {
                // Update existing file
                const fileId = existingFiles.data.files[0].id;
                await drive.files.update({
                    fileId: fileId,
                    media: media,
                });
                console.log(`✓ Updated ${fileName} in Google Drive`);
            } else {
                // Create new file
                await drive.files.create({
                    requestBody: fileMetadata,
                    media: media,
                    fields: 'id',
                });
                console.log(`✓ Uploaded ${fileName} to Google Drive`);
            }
        }

        console.log('\n✓ All files synced to Google Drive successfully!');
    } catch (error) {
        console.error('Error uploading to Google Drive:', error);
        process.exit(1);
    }
}

uploadToGoogleDrive();
