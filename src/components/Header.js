import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../StoreSlices/appSlice";
import { toggleTheme } from "../StoreSlices/themeSlice";
import SearchSuggestions from "./SearchSuggestions";
import {  signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
const navigate = useNavigate();
 
  
  const isDarkTheme = useSelector((store) => store.theme.isDarkTheme);

  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  const toggleThemeHandler = () => {
    dispatch(toggleTheme());
  };

  const handleLogin = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/Login");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  };
 
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 shadow-lg p-2 ${
        isDarkTheme ? "bg-gray-900 text-white" : "bg-slate-50 text-black"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center w-1/6">
          <button
            className="mr-4 p-2 h-12 focus:outline-none"
            onClick={toggleMenuHandler}
          >
            <FontAwesomeIcon icon={faBars} className="text-gray-400" />
          </button>
          <a href="https://youtube-clone-viewtube.netlify.app/">
            <img
              className="h-12"
              src={
                isDarkTheme ? "/youTube-Header-logo.png" : "/youTubeLogo.jpg"
              }
              alt="youtube-logo"
            />
          </a>
        </div>

        <SearchSuggestions />

        <div className="flex items-center">
          <button
            className={`rounded-full p-2 ${
              isDarkTheme ? "bg-gray-700" : "bg-gray-400"
            }`}
            onClick={toggleThemeHandler}
          >
            {isDarkTheme ? "DARK🌛" : "LIGHT ⛅"}
          </button>
          <button className="p-2 focus:outline-none" onClick={handleLogin}>
            
            <img  className="w-7 h-8 rounded-lg " src = "https://i.pinimg.com/564x/5b/50/e7/5b50e75d07c726d36f397f6359098f58.jpg" alt = "Login"/>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
