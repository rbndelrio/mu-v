export type MovieId = number
export type MovieTitle = string

export interface UserData {
  user_id: number;
  movies?: MovieId[];
}

export interface Movie {
  id: MovieId
  title: MovieTitle
}
export type MovieKey = `${MovieId}`
export interface MovieMap {
  [key: MovieKey]: MovieTitle
}