import React, { useMemo, useState } from "react";
import { extract } from "fuzzball";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";

import slugify from "./slugify";

const SongList = (props) => {
  const { songs } = props;
  const history = useHistory()

  const [searchTerm, setSearchTerm] = useState("");

  const sortedSongs = useMemo(() => {
    if (searchTerm.trim().length === 0) {
      return songs
    }
    const fuzzSortedSongs = extract(searchTerm, songs, { processor: choice => choice.name })
    return fuzzSortedSongs.map(([song]) => song)
  }, [songs, searchTerm])

  const handleSubmit = () => {
    if (sortedSongs.length === 0) {
      return
    }
    history.push("songs/" + slugify(sortedSongs[0].name))
  }

  return (
    <div>
      <Helmet>
        <title>laulum.me</title>
      </Helmet>
      <div className="searchbar">
        <div className="input-group">
          <form onSubmit={handleSubmit}>
            <input
              className="form-control"
              placeholder="Search songs..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </form>
        </div>
      </div>
      <div className="song-list">
        {sortedSongs.map((s) => (
          <Link to={"songs/" + slugify(s.name)} key={s.id}>
            <div className="song-card">{s.name}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SongList;
