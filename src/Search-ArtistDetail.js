/* eslint-disable no-undef */
import React from "react";
import axios from "axios";
import { useState } from "react";
import ArtistTopTracks from "./ArtistTopTracks";


export default function Search() {
  const [searchKey, setSearchKey] = useState("");
  const [artists, setArtists] = useState([]);
  let token = window.localStorage.getItem("token");

  const searchArtist = async (e) => {
    e.preventDefault();
    const { data } = await axios.get("https://api.spotify.com/v1/search", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        q: searchKey,
        type: "artist",
      },
    });
    setArtists(data.artists.items);
    // console.log(data);
  };

  const renderArtists = () => {
    return artists.map((artist) => (
      <div className=" " >
        <div  key={artist.id}>
        {artist.images.length ? (
          <div >
            <img
              style={{height:"15rem", width:"15rem"}}
              width={"20%"}
              src={artist.images[0].url}
              alt="loading"
            />
           <div className="flex justify-center">
           {artist.name}
           </div>
          </div>
        ) : (
          <div>No Image</div>
        )}
      </div>
      </div>
    ));
  };
  return (
    <div>
      <form onSubmit={searchArtist}>
        <input
          style={{ border: "1px solid" }}
          type="text"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <button type={"submit"}>Search</button>

      </form>
      {renderArtists()}
      {/* <ArtistDetail/> */}
      {/* <Trackdetail/> */}
      <ArtistTopTracks/>
    </div>
  );
}
