# Deployment Guide

This project is built with [Next.js](https://nextjs.org/). The recommended way to deploy it is using **Vercel** for the easiest setup and best performance, or **AWS Amplify** as a robust alternative.

## Option 1: Deploy to Vercel (Recommended)

1.  **Push to GitHub**: Ensure your latest code is pushed to your GitHub repository.
2.  **Create Vercel Account**: Go to [vercel.com](https://vercel.com) and sign up/login.
3.  **Import Project**:
    *   Click "Add New..." > "Project".
    *   Select your GitHub repository (`Portfolio_Jinwoong Shin`).
    *   Click "Import".
4.  **Configure**:
    *   Vercel will automatically detect that this is a Next.js project.
    *   The build settings should be pre-filled correctly:
        *   **Framework Preset**: Next.js
        *   **Build Command**: `next build`
        *   **Install Command**: `npm install`
    *   Click "Deploy".
5.  **Done!**: Your site will be live in a few minutes. Vercel will automatically redeploy whenever you push to `main`.

## Option 2: Deploy to AWS Amplify

1.  **Push to GitHub**: Ensure your latest code is pushed to your GitHub repository.
2.  **Go to AWS Console**: specific search for "Amplify".
3.  **Create App**:
    *   Click "Create new app".
    *   Select "GitHub" as the source code provider.
    *   Authorize AWS to access your GitHub repositories.
4.  **Configure Build**:
    *   Select your repository and the `main` branch.
    *   Amplify should auto-detect the build settings. Ensure the **Build command** includes `npm run build`.
    *   (Important) If you are using Next.js versions that require Node.js >= 18.17, you may need to edit the build settings to use a newer Node version image (e.g., standard: 7).
5.  **Deploy**: Click "Save and Deploy".

## Option 3: Deploy to Google Firebase (Requested)

Google Firebase now has built-in support for Next.js Web Frameworks, making deployment seamless.

1.  **Install Firebase CLI**:
    ```bash
    npm install -g firebase-tools
    ```
2.  **Login**:
    ```bash
    firebase login
    ```
3.  **Initialize Project**:
    Run the following command in your project root:
    ```bash
    firebase init hosting
    ```
    *   **Detected an existing Next.js codebase. Does this look correct?** -> Yes
    *   **Which server would you like to use?** -> (Select a region close to your users, e.g., `us-central1`)
    *   **Set up automatic builds and deploys with GitHub?** -> (Optional, recommended for CI/CD)
4.  **Deploy**:
    ```bash
    firebase deploy
    ```
    Firebase will automatically build your Next.js app and deploy it to a global CDN.

## CI/CD Pipeline

A **GitHub Actions** workflow has been set up in `.github/workflows/ci.yml`.
*   **What it does**: Every time you push to `main` or open a Pull Request, it runs `lint` and `build` to ensure the code is error-free.
*   **Benefits**: Prevents broken code from being merged or deployed.
