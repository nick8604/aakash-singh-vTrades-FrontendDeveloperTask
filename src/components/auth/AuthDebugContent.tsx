"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function AuthDebugContent() {
  const { data: session, status } = useSession();
  const [envInfo, setEnvInfo] = useState({
    baseUrl: "",
    nodeEnv: "",
    vercelEnv: "",
    vercelUrl: "",
  });

  useEffect(() => {
    // Get environment info via API call
    fetch("/api/auth/debug")
      .then((res) => res.json())
      .then((data) => {
        setEnvInfo(data);
      })
      .catch((err) => {
        console.error("Failed to load environment info:", err);
      });
  }, []);

  return (
    <div className="min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Authentication Debug Info</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Auth Status</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p>Status: <span className="font-mono">{status}</span></p>
          {session && (
            <pre className="bg-gray-900 p-4 rounded mt-2 overflow-auto">
              {JSON.stringify(session, null, 2)}
            </pre>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Environment Info</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p>Base URL: <span className="font-mono">{envInfo.baseUrl}</span></p>
          <p>Node Environment: <span className="font-mono">{envInfo.nodeEnv}</span></p>
          <p>Vercel Environment: <span className="font-mono">{envInfo.vercelEnv || "Not running on Vercel"}</span></p>
          <p>Vercel URL: <span className="font-mono">{envInfo.vercelUrl || "Not available"}</span></p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Redirect Test</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <p className="mb-4">Click the button below to test OAuth redirect URL resolution:</p>
          <button 
            onClick={() => {
              window.open("/api/auth/signin/google", "_blank");
            }}
            className="bg-purple-600 hover:bg-purple-700 text-white font-medium py-3 px-6 rounded-lg focus:outline-none transition-colors"
          >
            Test Google Sign In
          </button>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Manual Steps to Fix OAuth Issues</h2>
        <div className="bg-gray-800 p-4 rounded-lg">
          <ol className="list-decimal pl-5 space-y-2">
            <li>Verify that your Google Cloud Console has the correct redirect URIs configured:
              <ul className="list-disc pl-5 mt-1 space-y-1">
                <li><code>https://aakash-singh-v-trades-frontend-developer-task-naa8-8peokpr62.vercel.app/api/auth/callback/google</code></li>
                <li><code>http://localhost:3000/api/auth/callback/google</code></li>
              </ul>
            </li>
            <li>Check that your environment variables are correctly configured in Vercel dashboard.</li>
            <li>Clear your browser cookies and cache, then try signing in again.</li>
            <li>Try an incognito/private browsing window.</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 