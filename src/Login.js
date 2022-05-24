import { useEffect, useState } from "react";
import SearchArtistDetail from "./Search-ArtistDetail";
// import './App.css'
export default function Login() {
  const [token, setToken] = useState("");
  useEffect(() => {
    const hash = window.location.hash;
    let token = window.localStorage.getItem("token");
    if (!token && hash) {
      token = hash
        .substring(1)
        .split("&")
        .find((elem) => elem.startsWith("access_token"))
        .split("=")[1];

      window.location.hash = "";
      window.localStorage.setItem("token", token);
    }
    setToken(token);
  }, []);
  const logout = () => {
    setToken("");
    window.localStorage.removeItem("token");
  };
  const CLIENT_ID = "8d27aff46bbf4b00a1da1ab285c22fb8";
  const REDIRECT_URI = "http://localhost:3000";
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
  const RESPONSE_TYPE = "token";
  return (
    <div className=" ">
      {!token ? (
        <a className="login"
          href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}
        >
          Login to Spotify
        </a>
      ) : (
        <button onClick={logout}>Logout</button>
      )}
      {token ? <SearchArtistDetail /> : <h2>Please login</h2>}
    </div>
  );
}
