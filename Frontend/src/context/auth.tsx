import Cookies from "js-cookie";
import { compressUser, decompress } from "../services/encryptCookie";

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { User } from "../types/user";

const InitialData = {
  id: 0,
  email: "",
  name: "",
  surname: "",
  created_at: "",
  updated_at: "",
  password: "",
  phone_numbers: [],
  addresses: [],
  access_tokens: [],
};

// Contexto
export const AuthContext = createContext<{
  user: User;
  addUser: (newUser: User) => void;
  login: (userToken: User) => void;
  logout: () => void;
}>({
  user: InitialData,
  addUser: () => {},
  login: () => {},
  logout: () => {},
});

// Provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const login = useCallback(function (userToken: User) {
    const user = compressUser(userToken);
    const token =
      userToken.access_tokens.length > 0 &&
      userToken.access_tokens[0].access_token;
    Cookies.set("sesion_security_user", JSON.stringify(user));
    Cookies.set("Authorization", token.toString());
  }, []);

  const logout = useCallback(function () {
    setUser(InitialData);
    Cookies.remove("sesion_security_user");
    Cookies.remove("Authorization");
  }, []);

  const [user, setUser] = useState<User>(InitialData);

  useEffect(() => {
    const storedUser = Cookies.get("sesion_security_user");
    if (storedUser) {
      try {
        const newData = decompress(Cookies.get("sesion_security_user")!);
        setUser(newData[0] ?? newData);
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    }
  }, []);

  useEffect(() => {
    if (user && user.password !== "") {
      const myuser = compressUser(user);
      const token =
        user.access_tokens.length > 0 ? user.access_tokens[0].access_token : "";
      Cookies.set("sesion_security_user", myuser, { expires: 7 });
      Cookies.set("Authorization", token, { expires: 30 });
    }
  }, [user]);

  const addUser = useCallback((user: User) => {
    setUser(user);
  }, []);

  const value = useMemo(
    () => ({
      user,
      addUser,
      login,
      logout,
    }),
    [user, addUser, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
