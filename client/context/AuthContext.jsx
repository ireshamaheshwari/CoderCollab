import { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const login = (token) => {
    // console.log("authcontext : login :", token);
    setAuthTokenInCookies(token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    removeAuthTokenInCookies();
    setIsLoggedIn(false);
  };

  const verifyToken = async () => {
    const token = getTokenFromCookies();
    if (!token) {
      console.log("No Cookies Found");
      return false;
    } else {
      // console.log("cookies auth token :", token);
      try {
        const response = await axios.post('http://localhost:5000/api/user/validate-token', { accessToken : token, userRole: "admin" });
        // Handle the server response
        if (response.data.isValid) {
          // Token is valid, perform necessary actions
          console.log('Token is valid');
          return true;
        } else {
          // Token is invalid, take appropriate action (e.g., redirect to login)
          console.log('Token is invalid');
          return false;
        }
      } catch (error) {
        console.error('Error validating token:', error);
        return false;
      }
    }
  };

  const setAuthTokenInCookies = (token) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    setCookie("token", token, { expires: expirationDate });
  };

  const removeAuthTokenInCookies = () => {
    removeCookie("token");
  };

  const getTokenFromCookies = () => {
    return cookies['token'];
  };

  useEffect(() => {
    // Check for a token in the cookie
    isTokenValid()
  }, []);

  const isTokenValid = async() => {
    try {
      const validate = await verifyToken();
      if (validate) {
        setIsLoggedIn(true);
        setIsLoading(false);
      } else {
        setIsLoggedIn(false);
        setIsLoading(false);
      }
      console.log(`validate in authContext : ${validate}`)
      return validate;
    } catch (err) {
      console.log(err);
      setIsLoggedIn(false);
      setIsLoading(false);
      return false;
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, login, logout , isTokenValid }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };