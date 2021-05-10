import React, { FC, Fragment, useEffect, useState } from "react";
import { Artist } from "../../../models/artist";
import { useHistory, useParams } from "react-router-dom";
import { ArtistsDao } from "../../../dao/artists-dao";
import ListAlbum from "../../albums/list-album/ListAlbum";
import { Button } from "react-bootstrap";
import { Routes } from "../../../routes";

type IArtistDetails = {};

type IArtistDetailsParams = {
  id: string;
};

const ArtistDetails: FC<IArtistDetails> = (props: IArtistDetails) => {
  const history = useHistory();
  const params = useParams<IArtistDetailsParams>();
  const [artist, setArtist] = useState<Artist>();

  const goToAddAlbum = () =>
    history.push(Routes.addUpdateAlbum, { artistId: params.id });

  async function fetchArtist(artistId: number) {
    const artist = await ArtistsDao.getArtist(artistId);
    setArtist(artist);
  }

  useEffect(() => {
    fetchArtist(+params.id);
  }, [params]);

  return (
    <Fragment>
      <h1 className="mb-5">Les albums de {artist?.name}</h1>
      <Button variant="primary" className="mb-3" onClick={goToAddAlbum}>
        Ajouter un album
      </Button>
      <ListAlbum artistId={+params.id} />
    </Fragment>
  );
};

export default ArtistDetails;
