import React, { useState } from 'react';
import { Database, ShieldCheck, Copy, Check, ExternalLink, Key, Code } from 'lucide-react';
import { isFirebaseConfigured } from '../firebase/config';

export const FirebaseSetupGuide: React.FC = () => {
  const [copiedRules, setCopiedRules] = useState(false);
  const [copiedConfig, setCopiedConfig] = useState(false);
  const isConnected = isFirebaseConfigured();

  const rulesText = `{
  "rules": {
    ".read": true,
    ".write": "auth != null",
    "stories": {
      ".indexOn": ["views", "categorySlug", "language", "createdAt", "slug"],
      "$storyId": {
        "views": {
          ".write": true
        }
      }
    },
    "categories": {
      ".indexOn": ["slug", "isActive"]
    }
  }
}`;

  const sampleConfigText = `const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_ID",
  appId: "YOUR_APP_ID"
};`;

  const copyToClip = (text: string, type: 'rules' | 'config') => {
    navigator.clipboard.writeText(text);
    if (type === 'rules') {
      setCopiedRules(true);
      setTimeout(() => setCopiedRules(false), 2000);
    } else {
      setCopiedConfig(true);
      setTimeout(() => setCopiedConfig(false), 2000);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-800 dark:text-white">
          Firebase Setup & Integration Guide
        </h1>
        <p className="text-xs text-slate-500">
          How to connect your production Firebase Realtime Database and Authentication with KathaVichar.
        </p>
      </div>

      {/* Connection Status Banner */}
      <div
        className={`rounded-3xl border p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
          isConnected
            ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900/40 dark:bg-emerald-950/20'
            : 'border-amber-200 bg-amber-50 dark:border-amber-900/40 dark:bg-amber-950/20'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
              isConnected
                ? 'bg-emerald-500 text-white'
                : 'bg-amber-500 text-white'
            }`}
          >
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Current Status:{' '}
              {isConnected ? 'Connected to Live Firebase' : 'Placeholder / LocalStorage Mode'}
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300">
              {isConnected
                ? 'Your app is actively synchronizing with Firebase Realtime DB.'
                : 'Default demo placeholders detected. The app is gracefully using browser LocalStorage fallback.'}
            </p>
          </div>
        </div>

        <a
          href="https://console.firebase.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 self-start sm:self-center rounded-xl bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-black dark:bg-white dark:text-slate-900 transition-colors"
        >
          <span>Firebase Console</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Step by Step instructions */}
      <div className="rounded-3xl border border-slate-200/80 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900 shadow-xs space-y-6 text-xs text-slate-600 dark:text-slate-300">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white text-[10px] font-black">
              1
            </span>
            Create Firebase Project & Enable Auth
          </h2>
          <p>
            1. Open <a href="https://console.firebase.google.com" target="_blank" rel="noreferrer" className="text-amber-600 underline">console.firebase.google.com</a> and click <strong>"Add project"</strong> (e.g. <code>kathavichar-app</code>).
          </p>
          <p>
            2. Navigate to <strong>Build &gt; Authentication</strong> in the sidebar. Click <strong>"Get started"</strong> and enable the <strong>Email/Password</strong> sign-in provider.
          </p>
          <p>
            3. In the "Users" tab, click <strong>"Add user"</strong> and create your administrator login (e.g. <code>admin@kathavichar.com</code>).
          </p>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-5 dark:border-slate-800">
          <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white text-[10px] font-black">
              2
            </span>
            Create Firebase Realtime Database
          </h2>
          <p>
            1. In Firebase Console sidebar, navigate to <strong>Build &gt; Realtime Database</strong>.
          </p>
          <p>
            2. Click <strong>"Create Database"</strong> and choose your closest cloud region.
          </p>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-5 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white text-[10px] font-black">
                3
              </span>
              Set Security Rules (Public Read, Admin Write)
            </h2>
            <button
              onClick={() => copyToClip(rulesText, 'rules')}
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
            >
              {copiedRules ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copiedRules ? 'Copied' : 'Copy Rules'}</span>
            </button>
          </div>
          <p>
            In the Realtime Database <strong>"Rules"</strong> tab, paste the following rules allowing anyone to read stories, while only authenticated admins can write:
          </p>
          <pre className="rounded-xl bg-slate-900 p-3 font-mono text-[11px] text-amber-300 overflow-x-auto">
            {rulesText}
          </pre>
        </section>

        <section className="space-y-2 border-t border-slate-100 pt-5 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-800 dark:text-white flex items-center gap-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-white text-[10px] font-black">
                4
              </span>
              Add Keys to src/firebase/config.ts
            </h2>
            <button
              onClick={() => copyToClip(sampleConfigText, 'config')}
              className="flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-[11px] font-bold text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300"
            >
              {copiedConfig ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
              <span>{copiedConfig ? 'Copied' : 'Copy Template'}</span>
            </button>
          </div>
          <p>
            Go to <strong>Project Settings &gt; General &gt; Your apps</strong>, click <strong>"Web (&lt;/&gt;)"</strong>, and copy your configuration object into <code>src/firebase/config.ts</code>.
          </p>
          <pre className="rounded-xl bg-slate-900 p-3 font-mono text-[11px] text-sky-300 overflow-x-auto">
            {sampleConfigText}
          </pre>
        </section>
      </div>
    </div>
  );
};
