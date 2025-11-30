# Google Drive Setup Guide

This guide will help you set up automatic uploads to Google Drive.

## 📋 Prerequisites

You need a Google Cloud Project with Drive API enabled and a Service Account.

## 🔧 Setup Steps

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Create Project**
3. Name it (e.g., "Flyer Scraper")
4. Click **Create**

### Step 2: Enable Google Drive API

1. In your project, go to **APIs & Services** → **Library**
2. Search for "Google Drive API"
3. Click on it and click **Enable**

### Step 3: Create a Service Account

1. Go to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **Service Account**
3. Name it (e.g., "flyer-scraper-bot")
4. Click **Create and Continue**
5. Skip optional steps, click **Done**

### Step 4: Create Service Account Key

1. Click on the service account you just created
2. Go to **Keys** tab
3. Click **Add Key** → **Create New Key**
4. Choose **JSON** format
5. Click **Create**
6. A JSON file will download - **SAVE THIS FILE SECURELY**

### Step 5: Share Google Drive Folder with Service Account

1. Open the JSON file you downloaded
2. Find the `client_email` field (looks like: `flyer-scraper-bot@project-id.iam.gserviceaccount.com`)
3. Go to your Google Drive folder: https://drive.google.com/drive/folders/1a3RheJOi4aKyydChZ0FWOeq8KhjhcbOj
4. Click **Share**
5. Paste the service account email
6. Give it **Editor** permissions
7. Click **Send** (uncheck "Notify people")

### Step 6: Add Secret to GitHub

1. Open the JSON file you downloaded
2. Copy the **entire contents** of the file
3. Go to your GitHub repository
4. Click **Settings** → **Secrets and variables** → **Actions**
5. Click **New repository secret**
6. Name: `GOOGLE_CREDENTIALS`
7. Value: Paste the entire JSON content
8. Click **Add secret**

## ✅ That's It!

Now when the workflow runs and detects changes, it will automatically:
1. Scrape the data
2. Save to CSV files
3. **Upload to your Google Drive folder**
4. Commit to GitHub

## 🧪 Test It

You can manually trigger the workflow:
1. Go to **Actions** tab in GitHub
2. Select **Update Flyer Data and Sync to Google Drive**
3. Click **Run workflow**

Check your Google Drive folder - the CSV files should appear!

## 🔒 Security Notes

- ✅ The service account key is stored as a GitHub Secret (encrypted)
- ✅ Only your GitHub Actions can access it
- ✅ The service account only has access to the specific folder you shared
- ⚠️ Never commit the JSON key file to your repository
- ⚠️ Keep the JSON file secure on your local machine

## 📊 What Gets Uploaded

All CSV files from the `data/` folder:
- `M5V2T6.csv`
- `V6B1A1.csv`
- `H3B2G7.csv`
- `T2P3M3.csv`
- `K1P1J1.csv`

Files are updated if they exist, or created if they don't.

## 🔧 Troubleshooting

### "Permission denied" error?
- Make sure you shared the folder with the service account email
- Give it **Editor** permissions, not just Viewer

### "Invalid credentials" error?
- Check that you copied the entire JSON file content
- Make sure there are no extra spaces or line breaks

### Files not appearing in Drive?
- Check the folder ID in `src/upload-to-drive.js` matches your folder
- Verify the service account email has access to the folder

---

Need help? Open an issue on GitHub!
