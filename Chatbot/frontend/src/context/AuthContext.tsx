import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type User = {
  name: string;
  email: string;
};
type UserAuth = {
  user: User | null;
  isAuthenticated: boolean;
  login: ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => Promise<void>;
  signup: ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => Promise<void>;
  logout: () => Promise<void>;
};
const AuthContext = createContext<UserAuth | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkProfile = async () => {
      try {
        const response = await fetch("http://localhost:3001/user/profile", {
          credentials: "include",
        });
        if (!response.ok) {
          const message = await response.text();
          throw new Error(message);
        }
        const data = await response.json();
        setUser(data);
        setIsAuthenticated(true);
      } catch (error) {
        const err = error as Error;
        console.error(err.message);
      }
    };
    checkProfile();
  }, []);

  const login = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const response = await fetch("http://localhost:3001/user/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }
    const data = await response.json();
    setUser(data);
    setIsAuthenticated(true);
  };

  const signup = async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    const response = await fetch("http://localhost:3001/user/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status != 201) {
      const message = await response.text();
      throw new Error(message);
    }
    const data = await response.json();
    setUser(data);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    const response = await fetch("http://localhost:3001/user/logout", {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      const message = await response.text();
      throw new Error(message);
    }
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = { user, isAuthenticated, login, signup, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
