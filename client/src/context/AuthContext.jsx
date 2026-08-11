import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const login = (data) => {
  setUser(data.user);

  localStorage.setItem("token", data.token);

  localStorage.setItem(
    "user",
    JSON.stringify(data.user)
  );
};

  const logout = () => {

  setUser(null);

  localStorage.removeItem("token");

  localStorage.removeItem("user");

};
  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);