import React, { createContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RefreshTokenInitiate } from "../Redux/Action/ActionAuth";
import { AdultApi, UserApi } from "../imports/index";

export const GlobalState = createContext();
export const DataProvider = ({ children }) => {
  const [callback, setCallback] = useState(false);
  const { auth, refreshTokens, profile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const refreshToken = async () => {
        dispatch(RefreshTokenInitiate(auth.accessToken));
        setTimeout(() => {
          refreshToken();
        }, 10 * 60 * 1000);
      };
      refreshToken();
    }
  }, [callback]);
  const data = {
    callback: [callback, setCallback],
    UserApi: UserApi(refreshTokens),
    AdultApi: AdultApi(refreshTokens),
  };
  return <GlobalState.Provider value={data}>{children}</GlobalState.Provider>;
};
