"use client"

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import DBMenteeTrans from "@/utils/DBMenteeTrans";
import DBMentorTrans from "@/utils/DBMentorTrans";
import Cookies from "js-cookie";
import axios from "axios";

type UserContextType = {
  user: Mentor | Mentee | null; // user는 Mentor, Mentee, 또는 null일 수 있음
  setUser: (user: any, userType: string) => void;
  userType: string;
  setUserType: (userType: string) => void;
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  checkAccessToken : () => void;
  refreshAccessToken : () => void;
};

// Context 생성
export const UserContext = createContext<UserContextType | null>(null);

// Context Provider 컴포넌트
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Mentor | Mentee | null>(null);
  const [userType, setUserType] = useState<string>(Cookies.get('userType') || "mentor");
  const [isLogin, setIsLogin] = useState<boolean>(false);

  const handleSetUser = (
    user: DBMentor | DBMentee,
    userType: string
  ) => {
    userType === "mentor"
      ? setUser(DBMentorTrans(user as DBMentor))
      : setUser(DBMenteeTrans(user as DBMentee));
  };

  const handleSetUserType = (userType: string) => {
    setUserType(userType);
    Cookies.set('userType', userType, { expires: 1 });  // userType을 쿠키에 저장 (1일 동안 유효)
  };


  const checkAccessToken = async () => {
    console.log("여기 들어오니");
    console.log("여기서 유저타입은?", userType);
    console.log("로그인 여부?", isLogin);
    try {
      await axios({
        url: `http://localhost:8080/login/${userType}/accesstoken`,
        method: "GET",
        withCredentials: true,
      }).then((result) => {
        console.log("login/userType/accessToken");
        console.log(result.data.data);
        setIsLogin(true);
        handleSetUser(result.data.data, userType);
        console.log("user?");
        console.log(user);
      });
    } catch (error) {
      console.log("엑세스 토큰 검증 실패:", error);
      // 엑세스 토큰이 유효하지 않으면 리프레시 토큰으로 새로운 엑세스 토큰을 발급받기
      refreshAccessToken();
    }
  };

  // 리프레시 토큰으로 새로운 엑세스 토큰 발급
  const refreshAccessToken = async () => {
    try {
      await axios({
        url: `http://localhost:8080/login/${userType}/refreshtoken`,
        method: "GET",
        withCredentials: true,
      });
    } catch (error) {
      console.log("리프레시 토큰으로 엑세스 토큰 발급 실패:", error);
      // 로그아웃 요청
      setIsLogin(false);
    }
  };


  useEffect(() => {
    checkAccessToken();
  }, [])

  

    return (
        <UserContext.Provider value={{
        user,
        setUser: handleSetUser,
        userType,
        setUserType: handleSetUserType,
        isLogin,
        setIsLogin,
        checkAccessToken,
        refreshAccessToken
      }}>
            {children}
        </UserContext.Provider>
    );
};

// useUserContext 훅
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserContext.Provider"
    );
  }
  return context;
};