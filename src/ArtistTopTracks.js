import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { data } from "autoprefixer";

export default function ArtistTopTracks() {
  const [artistsTop, setArtistsTop] = useState([]);
  let bodyFormData = new FormData();
  useEffect(() => {
    axios({
      method: "GET",
      url: "https://api.spotify.com/v1/artists/v1/top-tracks",
      data: bodyFormData,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    })
      .then((res) => {
        console.log("res");
        setArtistsTop(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ul>
        {artistsTop.map((data) => (
          <li key={data.id}>{data.name}</li>
        ))}
      </ul>
    </>
  );
}
