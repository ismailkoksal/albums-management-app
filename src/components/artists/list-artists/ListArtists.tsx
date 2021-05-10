import React, { FC, Fragment, useEffect, useState } from "react";
import { Artist } from "../../../models/artist";
import { Button, Table } from "react-bootstrap";
import { ArtistsDao } from "../../../dao/artists-dao";
import { useHistory } from "react-router-dom";
import { Routes } from "../../../routes";

type IListArtists = {};

const ListArtists: FC<IListArtists> = (props: IListArtists) => {
  const history = useHistory();
  const [artists, setArtists] = useState<Artist[]>([]);

  async function fetchArtistsFromServer() {
    const artists = await ArtistsDao.getAllArtists();
    setArtists(artists);
  }

  async function deleteArtist(artistId: number) {
    await ArtistsDao.deleteArtist(artistId);
    setArtists(artists.filter((artist) => artist.id !== artistId));
  }

  function updateArtist(artist: Artist) {
    history.push(Routes.addUpdateArtist, { artist });
  }

  useEffect(() => {
    fetchArtistsFromServer();
  }, []);

  return (
    <Fragment>
      <Button href={Routes.addUpdateArtist} variant="primary" className="my-2">
        Nouveau artiste
      </Button>
      <Table bordered>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Est un groupe</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist.id}>
              <td>{artist.name}</td>
              <td>{artist.isBand ? "Oui" : "Non"}</td>
              <td>
                <Button
                  onClick={() => updateArtist(artist)}
                  variant="primary"
                  className="me-1"
                >
                  Modifier
                </Button>
                <Button
                  onClick={() => deleteArtist(artist.id!)}
                  variant="danger"
                  className="me-1"
                >
                  Supprimer
                </Button>
                <Button href={`${Routes.artists}/${artist.id}`} variant="info">
                  Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Fragment>
  );
};

export default ListArtists;
