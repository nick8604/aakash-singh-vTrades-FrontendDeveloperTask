# Vercel Deployment Guide

## Environment Variables Configuration

When deploying to Vercel, make sure to set the following environment variables in your Vercel project settings:

```
NEXTAUTH_URL=https://aakash-singh-v-trades-frontend-developer-task-naa8-8peokpr62.vercel.app
NEXTAUTH_SECRET=supersecretkeythatnobodycanguessorhackever123456789
GOOGLE_CLIENT_ID=959960431055-trstn095m14h1trqr7hjb234oclh2b87.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=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
NODE_ENV=production
```

## Google OAuth Configuration

For Google OAuth to work correctly, you need to add the following redirect URIs to your Google OAuth credentials in the Google Cloud Console:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to "APIs & Services" > "Credentials"
3. Find your OAuth 2.0 Client ID and click on it
4. Under "Authorized redirect URIs", add ALL of these URIs:

```
https://aakash-singh-v-trades-frontend-developer-task-naa8-8peokpr62.vercel.app/api/auth/callback/google
https://aakash-singh-v-trades-frontend-developer-task-naa8-8peokpr62.vercel.app/login?success=google
http://localhost:3000/api/auth/callback/google
http://localhost:3000/login?success=google
```

5. Click Save

## Authorized JavaScript Origins

Also make sure to add the following to your Authorized JavaScript Origins:

```
https://aakash-singh-v-trades-frontend-developer-task-naa8-8peokpr62.vercel.app
http://localhost:3000
```

## Troubleshooting

If you encounter authentication errors after deployment:

1. Check that the NEXTAUTH_URL exactly matches your Vercel deployment URL
2. Ensure that all redirect URIs are properly configured in Google Cloud Console
3. Verify that environment variables are correctly set in Vercel
4. Check the browser console for specific error messages

## Verifying Configuration

You can verify your configuration by:

1. Opening the browser console (F12)
2. Clicking on the "Sign in with Google" button
3. Looking for the error messages in the console
4. If you see "Starting Google sign-in process" followed by a result object, your configuration is working correctly 