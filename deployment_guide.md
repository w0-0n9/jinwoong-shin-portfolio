# Deployment Guide

This project is deployed to **Firebase Hosting** as a static site.
Because of the network environment (SSL interception), we use a custom script for deployment.

## 🚀 Standard Workflow

Follow these steps whenever you make changes to the code:

### 1. Code & Test
Make your changes and verify them locally:
```bash
npm run dev
```

### 2. Save to GitHub (Version Control)
Upload your changes to the GitHub repository:
```bash
git add .
git commit -m "Describe your changes here"
git push
```

### 3. Deploy to Live Site
Run the helper script to build and deploy to Firebase:
```bash
./deploy.sh
```
> This script handles:
> - Enabling system TLS certs (fixes Google Fonts build error)
> - Disabling strict SSL (fixes Firebase CLI network error)
> - Building the Next.js project (Static Export)
> - Uploading to Firebase Hosting

## 🤖 AI Chatbot Maintenance

The AI Chatbot uses a "Long Context" approach, meaning all knowledge (Resume, Career, Blog) is stored directly in the code.

### 1. Updating Chatbot Memory
To add new blog posts, update your resume, or change career details, edit the following file:
- **File**: `functions/src/index.ts`
- **What to edit**: Update the `RESUME_TEXT`, `CAREER_DATA`, or `BLOG_DATA` constants at the top of the file.

### 2. Deploying Chatbot Changes
After updating the data, you must redeploy the Cloud Functions for the changes to take effect:
```bash
node deploy-functions.js
```
> **Note**: This process usually takes about 1-2 minutes.


---

## 🔗 Links
- **Live Website**: [https://jinwoong-shin-portfolio.web.app](https://jinwoong-shin-portfolio.web.app)
- **GitHub Repository**: [https://github.com/w0-0n9/jinwoong-shin-portfolio](https://github.com/w0-0n9/jinwoong-shin-portfolio)
- **Firebase Console**: [https://console.firebase.google.com/project/jinwoong-shin-portfolio/overview](https://console.firebase.google.com/project/jinwoong-shin-portfolio/overview)

## 🛠 Troubleshooting

**Error: `SELF_SIGNED_CERT_IN_CHAIN`**
- If you see this error, ensure you are using `./deploy.sh` instead of standard commands.
- If manually running npm, use `npm config set strict-ssl false`.

**Error: GitHub Push Rejected (Large Files)**
- We have excluded `.firebase/` from git. If you accidentally add large files, remove them from the staging area with `git rm -r --cached .firebase/`.
