import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  const [providerToken, setProviderToken] = useState(localStorage.getItem("providerToken"));
  const [user, setUser] = useState("");
  const [provider, setProvider] = useState("");
  const [services, setServices] = useState("");

  const storeUserTokenInLS = (token) => {
    setUserToken(token);
    localStorage.setItem("userToken", token);
  };

  const storeProviderTokenInLS = (token) => {
    setProviderToken(token);
    localStorage.setItem("providerToken", token);
  };

  const isLoggedIn = !!userToken || !!providerToken;

  const LogoutUser = () => {
    setUserToken("");
    setProviderToken("");
    localStorage.removeItem("userToken");
    localStorage.removeItem("providerToken");
  };


  const userAuthentication = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/users/current-user",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const userData = await response.json();
        // console.log("userData", userData.data);
        setUser(userData.data);
      } else {
      }
    } catch (error) {
      console.log("Error fetching user data");
    }
  };

  const providerAuthentication = async (token) => {
    // Fetch provider data using the provided token
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/providers/current-provider",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const providerData = await response.json();
        // console.log("userData", userData.data);
        setProvider(providerData.data);
      } else {
      }
    } catch (error) {
      console.log("Error fetching user data");
    }
  };

  const getServices = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/providers/serviceProvider",
        {
          method: "GET",
        }
      );

      // console.log(response);
      // console.log(typeof response);


      if (response.ok) {
        const serviceData = await response.json();
        // console.log(serviceData.data);
        setServices(serviceData.data)
      } else {
      }
    } catch (error) {
      console.log(`services frontend error ${error}`);
    }
  };

  useEffect(() => {
    if (userToken) {
      userAuthentication(userToken);
    }
    if (providerToken) {
      providerAuthentication(providerToken);
    }
    getServices();
  }, [userToken, providerToken]);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn,
        storeUserTokenInLS,
        storeProviderTokenInLS,
        LogoutUser,
        user,
        provider,
        services}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the provider");
  }
  return authContextValue;
};
