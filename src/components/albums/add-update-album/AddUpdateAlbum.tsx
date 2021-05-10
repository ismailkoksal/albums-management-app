import React, { FC, Fragment, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Album } from "../../../models/album";
import { useHistory, useLocation } from "react-router-dom";
import { AlbumsDao } from "../../../dao/albums-dao";

type IAddUpdateAlbum = {
  artistId?: number;
  album?: Album;
};

const AddUpdateAlbum: FC<IAddUpdateAlbum> = (props: IAddUpdateAlbum) => {
  const history = useHistory();
  const location = useLocation<IAddUpdateAlbum>();
  const [id, setId] = useState<number>(0);
  const [cover, setCover] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [year, setYear] = useState<number>(2021);
  const [isAdd, setAdd] = useState<boolean>(false);

  async function addAlbum() {
    const album: Album = { id, title, year, cover };
    await AlbumsDao.createAlbum(location.state.artistId!, album);
    history.goBack();
  }

  async function updateAlbum() {
    const album: Album = { id, title, year, cover };
    await AlbumsDao.updateAlbum(album);
    history.goBack();
  }

  function handleSubmit(event: any) {
    event.preventDefault();
    if (isAdd) {
      addAlbum();
    } else {
      updateAlbum();
    }
  }

  useEffect(() => {
    setAdd(!location.state?.album);
    if (location.state?.album) {
      const { id, title, year, cover } = location.state.album;
      setId(id!);
      setTitle(title);
      setYear(year);
      setCover(cover);
    }
  }, [location.state?.album]);

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            placeholder="https://..."
            value={cover}
            onChange={(e) => setCover(e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            L'image de la pochette d'album
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Titre</Form.Label>
          <Form.Control
            placeholder="Thriller"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Form.Text className="text-muted">Le titre de l'album</Form.Text>
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Année</Form.Label>
          <Form.Control
            placeholder="1982"
            value={year}
            type="number"
            onChange={(e) => setYear(+e.target.value)}
            required
          />
          <Form.Text className="text-muted">
            L'année de sortie de l'album
          </Form.Text>
        </Form.Group>

        <Button variant="primary" type="submit">
          {isAdd ? "Ajouter" : "Modifier"}
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddUpdateAlbum;
