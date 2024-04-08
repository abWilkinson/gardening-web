import axios from "axios";
import { ReactNode, createContext, useContext, useEffect, useMemo, useState } from "react";
interface Props {
    children?: ReactNode
    // any props that come into the component
}
interface AuthContext {
    token: string | null,
    setToken: Function
}
const AuthContext = createContext<AuthContext>({} as AuthContext);

const AuthProvider = ({ children, ...props }: Props) => {
  // State to hold the authentication token
  const [token, setToken_] = useState(localStorage.getItem("token"));

  // Function to set the authentication token
  const setToken = (newToken: string) => {
    setToken_(newToken);
  };

  useEffect(() => {
    if (token) {
      localStorage.setItem('token',token);
    } else {
      localStorage.removeItem('token')
    }
  }, [token]);

  // Memoized value of the authentication context
  const contextValue = useMemo(() => ({
      token,
      setToken,
    }),
    [token]
  );

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;