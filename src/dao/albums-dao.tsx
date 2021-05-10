import { Album } from "../models/album";
import axios, { AxiosResponse } from "axios";

export class AlbumsDao {
  static async getAllAlbums(): Promise<Album[]> {
    return await axios
      .get<Album[], AxiosResponse<Album[]>>("http://localhost:3001/albums")
      .then((res) => res.data);
  }

  static async getAllArtistAlbums(artistId: number): Promise<Album[]> {
    return await axios
      .get<Album[], AxiosResponse<Album[]>>(
        `http://localhost:3001/albums/artist/${artistId}`
      )
      .then((res) => res.data);
  }

  static async getAlbum(albumId: number): Promise<Album> {
    return await axios
      .get<Album, AxiosResponse<Album>>(
        `http://localhost:3001/albums/${albumId}`
      )
      .then((res) => res.data);
  }

  static async createAlbum(artistId: number, album: Album): Promise<Album> {
    const params = new URLSearchParams();
    Object.entries(album).forEach(([key, value]) => {
      params.append(key, value);
    });
    params.append("artistId", String(artistId));

    return await axios
      .post<Album, AxiosResponse<Album>>("http://localhost:3001/albums", params)
      .then((res) => res.data);
  }

  static async updateAlbum(album: Album): Promise<Album> {
    const params = new URLSearchParams();
    Object.entries(album).forEach(([key, value]) => {
      params.append(key, value);
    });

    return await axios
      .patch<Album, AxiosResponse<Album>>(
        "http://localhost:3001/albums",
        params
      )
      .then((res) => res.data);
  }

  static async deleteAlbum(albumId: number): Promise<void> {
    return await axios.delete(`http://localhost:3001/albums/${albumId}`);
  }
}
