import React, { FC, Fragment, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { ArtistsDao } from "../../../dao/artists-dao";
import { Button, Form } from "react-bootstrap";
import { Artist } from "../../../models/artist";

type IAddUpdateArtist = {
  artist?: Artist;
};

const AddUpdateArtist: FC<IAddUpdateArtist> = (props: IAddUpdateArtist) => {
  const history = useHistory();
  const location = useLocation<IAddUpdateArtist>();
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [isBand, setIsBand] = useState<boolean>(false);
  const [isAdd, setAdd] = useState<boolean>(false);

  useEffect(() => {
    setAdd(!location.state?.artist);
    if (location.state?.artist) {
      const { id, name, isBand } = location.state.artist;
      setId(id!);
      setName(name);
      setIsBand(isBand);
    }
  }, [location.state?.artist]);

  function handleSubmit(event: any) {
    event.preventDefault();
    if (isAdd) {
      addArtistToServer();
    } else {
      updateArtistToServer();
    }
  }

  async function addArtistToServer() {
    const artist: Artist = { name, isBand };
    try {
      await ArtistsDao.createArtist(artist);
      history.goBack();
    } catch (e) {
      console.warn(e);
    }
  }

  async function updateArtistToServer() {
    const artist: Artist = { id, name, isBand };
    try {
      await ArtistsDao.updateArtist(artist);
      history.goBack();
    } catch (e) {
      console.warn(e);
    }
  }

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nom</Form.Label>
          <Form.Control
            placeholder="Michael Jackson"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Form.Text className="text-muted">
            Le nom de l'artiste ou groupe
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Groupe</Form.Label>
          <Form.Check
            label="Est-ce un groupe ?"
            checked={isBand}
            onChange={(e) => setIsBand(!isBand)}
          />
          <Form.Text className="text-muted">
            Cocher si c'est un groupe
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          {isAdd ? "Ajouter" : "Modifier"}
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddUpdateArtist;
