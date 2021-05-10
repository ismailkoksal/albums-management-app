import React, { FC, Fragment, useEffect, useState } from "react";
import { Song } from "../../../models/song";
import { SongsDao } from "../../../dao/songs-dao";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Form } from "react-bootstrap";

type IAddUpdateSong = {
  albumId?: number;
  song?: Song;
};

const AddUpdateSong: FC<IAddUpdateSong> = (props: IAddUpdateSong) => {
  const history = useHistory();
  const location = useLocation<IAddUpdateSong>();
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [duration, setDuration] = useState<number>(0);
  const [isAdd, setIsAdd] = useState<boolean>(false);

  useEffect(() => {
    setIsAdd(!location.state?.song);
    if (location.state?.song) {
      const { id, title, duration } = location.state.song;
      setId(id!);
      setTitle(title);
      setDuration(duration);
    }
  }, [location.state]);

  async function addSong() {
    const song: Song = { title, duration };
    await SongsDao.createSong(location.state.albumId!, song);
    history.goBack();
  }

  async function updateSong() {
    const song: Song = { id, title, duration };
    await SongsDao.updateSong(song);
    history.goBack();
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isAdd) {
      addSong();
    } else {
      updateSong();
    }
  }

  return (
    <Fragment>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Titre</Form.Label>
          <Form.Control
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Form.Text className="text-muted">Le titre de la musique</Form.Text>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>Durée</Form.Label>
          <Form.Control
            value={duration}
            type="number"
            onChange={(e) => setDuration(+e.target.value)}
            required
          />
          <Form.Text className="text-muted">La durée de la musique</Form.Text>
        </Form.Group>
        <Button variant="primary" type="submit">
          {isAdd ? "Ajouter" : "Modifier"}
        </Button>
      </Form>
    </Fragment>
  );
};

export default AddUpdateSong;
