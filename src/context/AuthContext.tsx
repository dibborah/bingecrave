import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// --- Types to simulate Supabase types ---
interface FakeUser {
  id: string;
  email: string;
}

interface FakeSession {
  user: FakeUser;
  access_token: string;
}

interface AuthContextType {
  session: FakeSession | null;
  user: FakeUser | null;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

// --- Fake auth module ---
const fakeAuth = (() => {
  let currentSession: FakeSession | null = null;
  let listeners: ((session: FakeSession | null) => void)[] = [];

  const notify = () => {
    listeners.forEach((callback) => callback(currentSession));
  };

  const signIn = async (email: string, password: string) => {
    if (password === 'fail') {
      return { error: 'Invalid credentials' };
    }
    const user = { id: Math.random().toString(36).substring(2), email };
    currentSession = {
      user,
      access_token: Math.random().toString(36).substring(2),
    };
    notify();
    return { error: null };
  };

  const signUp = async (email: string, password: string) => {
    if (email.includes('fail')) {
      return { error: 'Failed to sign up' };
    }
    const user = { id: Math.random().toString(36).substring(2), email };
    currentSession = {
      user,
      access_token: Math.random().toString(36).substring(2),
    };
    notify();
    return { error: null };
  };

  const signOut = async () => {
    currentSession = null;
    notify();
  };

  const getSession = async () => {
    return { session: currentSession };
  };

  const onAuthStateChange = (callback: (session: FakeSession | null) => void) => {
    listeners.push(callback);
    return {
      unsubscribe: () => {
        listeners = listeners.filter((fn) => fn !== callback);
      },
    };
  };

  return { signIn, signUp, signOut, getSession, onAuthStateChange };
})();

// --- React Auth Context ---
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<FakeSession | null>(null);
  const [user, setUser] = useState<FakeUser | null>(null);

  useEffect(() => {
    const { unsubscribe } = fakeAuth.onAuthStateChange((newSession) => {
      setSession(newSession);
      setUser(newSession?.user ?? null);
    });

    fakeAuth.getSession().then(({ session: currentSession }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
    });

    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await fakeAuth.signIn(email, password);
    return { error };
  };

  const signUp = async (email: string, password: string) => {
    const { error } = await fakeAuth.signUp(email, password);
    return { error };
  };

  const signOut = async () => {
    await fakeAuth.signOut();
  };

  const value = {
    session,
    user,
    signIn,
    signUp,
    signOut
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
