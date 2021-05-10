import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Routes } from "./routes";
import { Container } from "react-bootstrap";
import Home from "./components/home/Home";
import ListAlbum from "./components/albums/list-album/ListAlbum";
import AddUpdateAlbum from "./components/albums/add-update-album/AddUpdateAlbum";
import Navbar from "./components/navbar/Navbar";
import AlbumDetails from "./components/albums/album-details/AlbumDetails";
import ListArtists from "./components/artists/list-artists/ListArtists";
import AddUpdateArtist from "./components/artists/add-update-artist/AddUpdateArtist";
import ArtistDetails from "./components/artists/artist-details/ArtistDetails";
import ListSongs from "./components/songs/list-songs/ListSongs";
import AddUpdateSong from "./components/songs/add-update-song/AddUpdateSong";
import NotFound from "./components/not-found/NotFound";

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Switch>
          <Route path={Routes.home} exact component={Home} />
          {/* Artists */}
          <Route path={Routes.artists} exact component={ListArtists} />
          <Route path={Routes.artistDetails} exact component={ArtistDetails} />
          <Route
            path={Routes.addUpdateArtist}
            exact
            component={AddUpdateArtist}
          />
          {/* Albums */}
          <Route path={Routes.albums} exact component={ListAlbum} />
          <Route path={Routes.albumDetails} exact component={AlbumDetails} />
          <Route
            path={Routes.addUpdateAlbum}
            exact
            component={AddUpdateAlbum}
          />
          {/* Songs */}
          <Route path={Routes.songs} exact component={ListSongs} />
          <Route path={Routes.addUpdateSong} exact component={AddUpdateSong} />
          <Route path="/" component={NotFound} />
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
