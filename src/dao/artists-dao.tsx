import { Artist } from "../models/artist";
import axios, { AxiosResponse } from "axios";

export class ArtistsDao {
  static async getAllArtists(): Promise<Artist[]> {
    return await axios
      .get<Artist[], AxiosResponse<Artist[]>>("http://localhost:3001/artists")
      .then((res) => res.data);
  }

  static async getArtist(artistId: number): Promise<Artist> {
    return await axios
      .get<Artist, AxiosResponse<Artist>>(
        `http://localhost:3001/artists/${artistId}`
      )
      .then((res) => res.data);
  }

  static async createArtist(artist: Artist): Promise<Artist> {
    const params = new URLSearchParams();
    Object.entries(artist).forEach(([key, value]) => {
      params.append(key, value);
    });

    return await axios
      .post<Artist, AxiosResponse<Artist>>(
        "http://localhost:3001/artists",
        params
      )
      .then((res) => res.data);
  }

  static async updateArtist(artist: Artist): Promise<Artist> {
    const params = new URLSearchParams();
    Object.entries(artist).forEach(([key, value]) => {
      params.append(key, value);
    });

    return await axios
      .patch<Artist, AxiosResponse<Artist>>(
        "http://localhost:3001/artists",
        params
      )
      .then((res) => res.data);
  }

  static async deleteArtist(artistId: number): Promise<void> {
    return await axios.delete(`http://localhost:3001/artists/${artistId}`);
  }
}
