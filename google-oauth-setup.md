# Google OAuth Configuration Guide

## Complete Google OAuth Setup

Follow these exact steps to fix the invalid redirect URI error:

### Step 1: Access Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to your project
3. Go to "APIs & Services" > "Credentials"
4. Find your OAuth 2.0 Client ID for Web Application and click "Edit"

### Step 2: Add Authorized JavaScript Origins

Add exactly these origins:
```
https://aakash-singh-v-trades-frontend-developer-task-naa8-8peokpr62.vercel.app
http://localhost:3000
```

### Step 3: Add Authorized Redirect URIs

Add exactly these redirect URIs (make sure there are no typos):
```
https://aakash-singh-v-trades-frontend-developer-task-naa8-8peokpr62.vercel.app/api/auth/callback/google
https://aakash-singh-v-trades-frontend-developer-task-naa8-8peokpr62.vercel.app/login?success=google
http://localhost:3000/api/auth/callback/google
http://localhost:3000/login?success=google
```

### Step 4: Save and Wait

1. Click "Save" 
2. It may take up to 5 minutes for the changes to propagate (as noted in your screenshot)

### Step 5: Update Vercel Environment Variables

1. Go to your Vercel project dashboard
2. Navigate to Project Settings > Environment Variables
3. Update or add the NEXTAUTH_URL environment variable:
```
NEXTAUTH_URL=https://aakash-singh-v-trades-frontend-developer-task-naa8-8peokpr62.vercel.app
```

### Step 6: Redeploy Your Application

1. Make sure to commit and push all changes
2. Trigger a new deployment on Vercel to ensure the environment variables are updated

### Verification

To verify that your OAuth setup is working correctly:
1. Open your deployed app
2. Open browser developer tools (F12)
3. Go to the Console tab
4. Click "Sign in with Google"
5. Check for any error messages in the console

If there are still issues, take a screenshot of any error messages for further debugging. 