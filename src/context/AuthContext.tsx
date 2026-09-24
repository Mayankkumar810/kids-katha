import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged, 
  User as FirebaseUser 
} from 'firebase/auth';
import { auth, isFirebaseConfigured } from '../firebase/config';
import { AdminUser } from '../types';

interface AuthContextType {
  currentUser: AdminUser | null;
  loading: boolean;
  isFirebaseActive: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  isFirebaseActive: false,
  login: async () => {},
  logout: async () => {}
});

const LOCAL_ADMIN_KEY = 'kathavichar_admin_session';
export const LOCAL_ADMIN_EMAIL_KEY = 'kathavichar_logged_admin_email';
export const LOCAL_SUPPORT_EMAIL_KEY = 'kathavichar_support_email';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isFirebaseActive = isFirebaseConfigured() && auth !== null;

  useEffect(() => {
    if (isFirebaseActive && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
        if (user) {
          const userEmail = user.email || localStorage.getItem(LOCAL_ADMIN_EMAIL_KEY) || 'admin';
          setCurrentUser({ email: userEmail, uid: user.uid });
          if (user.email) {
            localStorage.setItem(LOCAL_ADMIN_EMAIL_KEY, user.email);
            localStorage.setItem(LOCAL_SUPPORT_EMAIL_KEY, user.email);
            window.dispatchEvent(new CustomEvent('kathavichar_admin_email_updated', { detail: user.email }));
          }
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Local session check
      try {
        const savedSession = localStorage.getItem(LOCAL_ADMIN_KEY);
        if (savedSession) {
          const parsed = JSON.parse(savedSession);
          setCurrentUser(parsed);
          if (parsed.email) {
            localStorage.setItem(LOCAL_ADMIN_EMAIL_KEY, parsed.email);
            localStorage.setItem(LOCAL_SUPPORT_EMAIL_KEY, parsed.email);
          }
        }
      } catch (e) {
        console.warn('Error reading local admin session:', e);
      }
      setLoading(false);
    }
  }, [isFirebaseActive]);

  const login = async (email: string, password: string): Promise<void> => {
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password || password.length < 6) {
      throw new Error('Please enter a valid email and a password of at least 6 characters.');
    }

    if (isFirebaseActive && auth) {
      const cred = await signInWithEmailAndPassword(auth, trimmedEmail, password);
      const userEmail = cred.user.email || trimmedEmail;
      const adminUser: AdminUser = { email: userEmail, uid: cred.user.uid };
      setCurrentUser(adminUser);
      localStorage.setItem(LOCAL_ADMIN_EMAIL_KEY, userEmail);
      localStorage.setItem(LOCAL_SUPPORT_EMAIL_KEY, userEmail);
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminUser));
      window.dispatchEvent(new CustomEvent('kathavichar_admin_email_updated', { detail: userEmail }));
    } else {
      const adminUser: AdminUser = {
        email: trimmedEmail,
        uid: 'local-admin-' + Date.now()
      };
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminUser));
      localStorage.setItem(LOCAL_ADMIN_EMAIL_KEY, trimmedEmail);
      localStorage.setItem(LOCAL_SUPPORT_EMAIL_KEY, trimmedEmail);
      setCurrentUser(adminUser);
      window.dispatchEvent(new CustomEvent('kathavichar_admin_email_updated', { detail: trimmedEmail }));
    }
  };

  const logout = async (): Promise<void> => {
    if (isFirebaseActive && auth) {
      await firebaseSignOut(auth);
    }
    localStorage.removeItem(LOCAL_ADMIN_KEY);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, isFirebaseActive, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
