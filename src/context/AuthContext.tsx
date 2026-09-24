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

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isFirebaseActive = isFirebaseConfigured() && auth !== null;

  useEffect(() => {
    if (isFirebaseActive && auth) {
      const unsubscribe = onAuthStateChanged(auth, (user: FirebaseUser | null) => {
        if (user) {
          setCurrentUser({ email: user.email || 'admin@kathavichar.com', uid: user.uid });
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Local session check when Firebase placeholders are active
      try {
        const savedSession = localStorage.getItem(LOCAL_ADMIN_KEY);
        if (savedSession) {
          setCurrentUser(JSON.parse(savedSession));
        }
      } catch (e) {
        console.warn('Error reading local admin session:', e);
      }
      setLoading(false);
    }
  }, [isFirebaseActive]);

  const login = async (email: string, password: string): Promise<void> => {
    if (isFirebaseActive && auth) {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser({ email: cred.user.email || email, uid: cred.user.uid });
    } else {
      // Offline / Placeholder mode validation
      // Allow admin credentials: admin@kathavichar.com / admin123 or any reasonable admin password
      if (!email || !password || password.length < 6) {
        throw new Error('Password must be at least 6 characters long.');
      }
      const adminUser: AdminUser = {
        email: email,
        uid: 'local-admin-' + Date.now()
      };
      localStorage.setItem(LOCAL_ADMIN_KEY, JSON.stringify(adminUser));
      setCurrentUser(adminUser);
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
