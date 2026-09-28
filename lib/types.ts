export interface Track {
  id: string;
  title: string;
  artist: string;
  artistId?: string;
  artwork: string;
  duration: number;
  album?: string;
  genre?: string;
  playCount?: number;
  mood?: string;
  releaseDate?: string;
  description?: string;
  tags?: string[];
}
