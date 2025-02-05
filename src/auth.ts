import { AxiosInstance } from "axios";
import { Options } from "./options";

export type AuthProps = {
  axios: AxiosInstance;
  username: string;
  password: string;
  clientId: string;
  clientSecret: string;
};

export type GetAuthResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  created_at: number;
};

export const getAuth = async (props: AuthProps) => {
  const response = await props.axios.post("/oauth/token", {
    username: props.username,
    password: props.password,
    client_id: props.clientId,
    client_secret: props.clientSecret,
    grant_type: "password",
  });

  return response.data as GetAuthResponse;
};
