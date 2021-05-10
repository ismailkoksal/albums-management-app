import React, { FC, Fragment, useEffect, useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { AlbumsDao } from "../../../dao/albums-dao";
import { Routes } from "../../../routes";
import { Album } from "../../../models/album";

type IListAlbums = {
  artistId?: number;
};

const ListAlbum: FC<IListAlbums> = (props: IListAlbums) => {
  const history = useHistory();
  const [albums, setAlbums] = useState<Album[]>([]);

  const goToUpdateAlbum = (
    event: React.MouseEvent<HTMLElement>,
    album: Album
  ) => {
    event.stopPropagation();
    history.push(Routes.addUpdateAlbum, { album });
  };

  const goToAlbumDetails = (id: number) =>
    history.push(`${Routes.albums}/${id}`);

  async function fetchAllAlbums() {
    const albums = await AlbumsDao.getAllAlbums();
    setAlbums(albums);
  }

  async function fetchAllArtistAlbums(artistId: number) {
    const albums = await AlbumsDao.getAllArtistAlbums(artistId);
    setAlbums(albums);
  }

  async function deleteAlbum(
    event: React.MouseEvent<HTMLElement>,
    albumId: number
  ) {
    event.stopPropagation();
    await AlbumsDao.deleteAlbum(albumId);
    setAlbums(albums.filter((album) => album.id !== albumId));
  }

  useEffect(() => {
    if (props.artistId) {
      fetchAllArtistAlbums(props.artistId);
    } else {
      fetchAllAlbums();
    }
  }, [props]);

  const listAlbums = albums.map((album) => (
    <Col xs="12" sm="6" lg="3">
      <Card
        onClick={() => goToAlbumDetails(album.id!)}
        style={{ cursor: "pointer" }}
      >
        <Card.Img variant="top" src={album.cover} />
        <Card.Body>
          <Card.Title>{album.title}</Card.Title>
          <Card.Text>{album.year}</Card.Text>
          <Button
            variant="primary"
            onClick={(event) => goToUpdateAlbum(event, album)}
            className="me-2"
          >
            Modifier
          </Button>
          <Button
            variant="danger"
            onClick={(event) => deleteAlbum(event, album.id!)}
          >
            Supprimer
          </Button>
        </Card.Body>
      </Card>
    </Col>
  ));

  return (
    <Fragment>
      {!props.artistId && <h1 className="mb-5">Liste des albums</h1>}
      <Row>{listAlbums}</Row>
    </Fragment>
  );
};

export default ListAlbum;
