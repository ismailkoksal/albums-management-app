import { Song } from "../models/song";
import axios, { AxiosResponse } from "axios";

export class SongsDao {
  static async getAllSongs(): Promise<Song[]> {
    return await axios
      .get<Song[], AxiosResponse<Song[]>>("http://localhost:3001/songs")
      .then((res) => res.data);
  }

  static async getAllAlbumSongs(albumId: number): Promise<Song[]> {
    return await axios
      .get<Song[], AxiosResponse<Song[]>>(
        `http://localhost:3001/songs/album/${albumId}`
      )
      .then((res) => res.data);
  }

  static async createSong(albumId: number, song: Song): Promise<Song> {
    const params = new URLSearchParams();
    Object.entries(song).forEach(([key, value]) => {
      params.append(key, value);
    });
    params.append("albumId", String(albumId));

    return await axios
      .post<Song, AxiosResponse<Song>>("http://localhost:3001/songs", params)
      .then((res) => res.data);
  }

  static async updateSong(song: Song): Promise<Song> {
    const params = new URLSearchParams();
    Object.entries(song).forEach(([key, value]) => {
      params.append(key, value);
    });

    return await axios
      .patch<Song, AxiosResponse<Song>>("http://localhost:3001/songs", params)
      .then((res) => res.data);
  }

  static async deleteSong(songId: number): Promise<void> {
    return await axios.delete(`http://localhost:3001/songs/${songId}`);
  }
}
