import React, { FC, Fragment, useEffect, useState } from "react";
import { Song } from "../../../models/song";
import { SongsDao } from "../../../dao/songs-dao";
import { Button, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../routes";

type IListSongs = {
  albumId?: number;
};

const ListSongs: FC<IListSongs> = (props: IListSongs) => {
  const history = useHistory();
  const [songs, setSongs] = useState<Song[]>([]);

  async function fetchAllSongs() {
    const songs = await SongsDao.getAllSongs();
    setSongs(songs);
  }

  async function fetchAllAlbumSongs(albumId: number) {
    const songs = await SongsDao.getAllAlbumSongs(albumId);
    setSongs(songs);
  }

  useEffect(() => {
    if (props.albumId) {
      fetchAllAlbumSongs(props.albumId);
    } else {
      fetchAllSongs();
    }
  }, [props]);

  function goToUpdate(song: Song) {
    history.push(Routes.addUpdateSong, { song });
  }

  async function deleteSong(songId: number) {
    await SongsDao.deleteSong(songId);
    setSongs(songs.filter((song) => song.id != songId));
  }

  return (
    <Fragment>
      {!props.albumId && <h1 className="mb-5">Liste des musiques</h1>}
      <Table>
        <thead>
          <tr>
            <th>Titre</th>
            <th>Durée</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {songs.map((song) => (
            <tr key={song.id}>
              <td>{song.title}</td>
              <td>{song.duration} secondes</td>
              <td>
                <Button
                  variant="primary"
                  onClick={() => goToUpdate(song)}
                  className="me-2"
                >
                  Modifier
                </Button>
                <Button variant="danger" onClick={() => deleteSong(song.id!)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default ListSongs;
