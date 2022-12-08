export type MovieId = number
export type MovieTitle = string

export interface UserData {
  user_id: number;
  movies?: MovieId[];
}

export interface MovieMap {
  [key: `${MovieId}`]: MovieTitle
}