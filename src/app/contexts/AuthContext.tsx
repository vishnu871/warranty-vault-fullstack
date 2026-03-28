// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatar?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   signIn: (email: string, password: string) => Promise<void>;
//   signUp: (name: string, email: string, password: string) => Promise<void>;
//   signOut: () => void;
//   updateProfile: (data: Partial<User>) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const STORAGE_KEY = 'warranty_vault_user';

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Check for existing session on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem(STORAGE_KEY);
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (error) {
//         localStorage.removeItem(STORAGE_KEY);
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   const signIn = async (email: string, password: string) => {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 800));
    
//     // For demo purposes, accept any valid email/password
//     if (!email || !password || password.length < 6) {
//       throw new Error('Invalid credentials');
//     }

//     const userData: User = {
//       id: Math.random().toString(36).substr(2, 9),
//       name: email.split('@')[0],
//       email,
//     };

//     setUser(userData);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
//   };

//   const signUp = async (name: string, email: string, password: string) => {
//     // Simulate API call
//     await new Promise(resolve => setTimeout(resolve, 800));
    
//     if (!name || !email || !password || password.length < 6) {
//       throw new Error('Please fill all fields correctly');
//     }

//     const userData: User = {
//       id: Math.random().toString(36).substr(2, 9),
//       name,
//       email,
//     };

//     setUser(userData);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
//   };

//   const signOut = () => {
//     setUser(null);
//     localStorage.removeItem(STORAGE_KEY);
//   };

//   const updateProfile = (data: Partial<User>) => {
//     if (!user) return;
    
//     const updatedUser = { ...user, ...data };
//     setUser(updatedUser);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isLoading,
//         signIn,
//         signUp,
//         signOut,
//         updateProfile,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }

//////////////////////////////////////////////////
// import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// interface User {
//   id: string;
//   name: string;
//   email: string;
//   avatar?: string;
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   isLoading: boolean;
//   signIn: (email: string, password: string) => Promise<void>;
//   signUp: (name: string, email: string, password: string) => Promise<void>;
//   signOut: () => void;
//   updateProfile: (data: Partial<User>) => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// const STORAGE_KEY = 'warranty_vault_user';
// const TOKEN_KEY = 'token'; // Key for the JWT token [cite: 1027, 2048]

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null);
//   const [isLoading, setIsLoading] = useState(true);

//   // Check for existing session on mount
//   useEffect(() => {
//     const storedUser = localStorage.getItem(STORAGE_KEY);
//     if (storedUser) {
//       try {
//         setUser(JSON.parse(storedUser));
//       } catch (error) {
//         localStorage.removeItem(STORAGE_KEY);
//         localStorage.removeItem(TOKEN_KEY);
//       }
//     }
//     setIsLoading(false);
//   }, []);

//   const signIn = async (email: string, password: string) => {
//     // REAL API CALL TO YOUR BACKEND [cite: 1012, 1976]
//     const response = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       // This will be caught by the 'catch' block in your Auth.tsx and shown via toast [cite: 2243]
//       throw new Error(data.message || 'Invalid credentials');
//     }

//     // Save token for protected routes [cite: 1027, 2048]
//     localStorage.setItem(TOKEN_KEY, data.token);

//     // Update user state with real data from MongoDB [cite: 913, 1025]
//     const userData: User = {
//       id: data.user._id,
//       name: data.user.name,
//       email: data.user.email,
//     };

//     setUser(userData);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
//   };

//   const signUp = async (name: string, email: string, password: string) => {
//     // REAL API CALL TO YOUR BACKEND [cite: 415, 1973]
//     const response = await fetch("http://localhost:5000/api/auth/signup", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ name, email, password }),
//     });

//     const data = await response.json();

//     if (!response.ok) {
//       throw new Error(data.message || 'Registration failed');
//     }

//     // After successful signup, we automatically log them in by setting user state [cite: 416, 959]
//     const userData: User = {
//       id: data.user._id,
//       name: data.user.name,
//       email: data.user.email,
//     };

//     setUser(userData);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
//     // Note: If your signup API doesn't return a token, they might need to login manually next
//   };

//   const signOut = () => {
//     setUser(null);
//     localStorage.removeItem(STORAGE_KEY);
//     localStorage.removeItem(TOKEN_KEY); // Clean up token on logout [cite: 1994]
//   };

//   const updateProfile = (data: Partial<User>) => {
//     if (!user) return;
//     const updatedUser = { ...user, ...data };
//     setUser(updatedUser);
//     localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         user,
//         isAuthenticated: !!user,
//         isLoading,
//         signIn,
//         signUp,
//         signOut,
//         updateProfile,
//       }}
//     >
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   const context = useContext(AuthContext);
//   if (context === undefined) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// }
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Constants for LocalStorage keys to prevent "Duplicate Identifier" or typo errors
const STORAGE_KEY = 'warranty_vault_user';
const TOKEN_KEY = 'token'; 

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem(STORAGE_KEY);
    const storedToken = localStorage.getItem(TOKEN_KEY);

    if (storedUser && storedToken) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        // If data is corrupted, clear everything
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(TOKEN_KEY);
      }
    }
    setIsLoading(false);
  }, []);
  const BACKEND_URL = "https://warranty-vault-fullstack.vercel.app";
  const signIn = async (email: string, password: string) => {
    const response = await fetch(`${BACKEND_URL}/api/auth/login`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || data.message || 'Invalid credentials');
    }

    // Save Token to LocalStorage
    localStorage.setItem(TOKEN_KEY, data.token);

    const userData: User = {
      id: data.user._id,
      name: data.user.name,
      email: data.user.email,
    };

    // Save User Info to State and LocalStorage
    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  const signUp = async (name: string, email: string, password: string) => {
    const response = await fetch(`${BACKEND_URL}/api/auth/signup`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.msg || data.message || 'Registration failed');
    }

    // ✅ FIXED: Now saving the token during Sign Up so Add Asset works immediately
    if (data.token) {
      localStorage.setItem(TOKEN_KEY, data.token);
    }

    const userData: User = {
      id: data.user._id,
      name: data.user.name,
      email: data.user.email,
    };

    setUser(userData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(TOKEN_KEY);
    // Optional: Refresh page to clear all states
    window.location.href = '/login';
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updatedUser = { ...user, ...data };
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}