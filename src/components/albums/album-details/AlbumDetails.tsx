import React, { FC, Fragment, useEffect, useState } from "react";
import { Route, useHistory, useParams } from "react-router-dom";
import ListSongs from "../../songs/list-songs/ListSongs";
import { Button } from "react-bootstrap";
import { Routes } from "../../../routes";
import { Artist } from "../../../models/artist";
import { Album } from "../../../models/album";
import { ArtistsDao } from "../../../dao/artists-dao";
import { AlbumsDao } from "../../../dao/albums-dao";

type IAlbumDetailsProps = {};

type IAlbumDetailsParams = {
  id: string;
};

const AlbumDetails: FC<IAlbumDetailsProps> = (props: IAlbumDetailsProps) => {
  const params = useParams<IAlbumDetailsParams>();
  const history = useHistory();
  const [album, setAlbum] = useState<Album>();

  const goToAddSong = () =>
    history.push(Routes.addUpdateSong, { albumId: params.id });

  async function fetchAlbum(albumId: number) {
    const album = await AlbumsDao.getAlbum(albumId);
    setAlbum(album);
  }

  useEffect(() => {
    fetchAlbum(+params.id);
  }, [params]);

  return (
    <Fragment>
      <h1 className="mb-5">Les musiques de l'album {album?.title}</h1>
      <Button variant="primary" onClick={goToAddSong}>
        Ajouter une musique
      </Button>
      <ListSongs albumId={+params.id} />
    </Fragment>
  );
};

export default AlbumDetails;
