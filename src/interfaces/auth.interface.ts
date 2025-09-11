export interface ILoginResponse {
  token: string;
  admin: {
    id: number;
    username: string;
    email: string;
    name: string;
  };
}


export interface IUpdateResponse {
  admin: {
    id: number;
    username: string;
    email: string;
    name: string;
  };
}

export interface IGetAllResponse {
  id: number;
  username: string;
  email: string;
  name: string;
}

