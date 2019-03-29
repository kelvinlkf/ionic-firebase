export interface User {
  email: string;
  name: string;
  time: string;
}

export interface User_Info
{
  email: string,
  name: string,
  company: string,
}

export interface Chat {
  message: string;
  pair: string;
  sender: string;
  time: number;
}