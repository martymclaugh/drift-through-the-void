export type Props = {
  usernameInServer: boolean,
  error: string,
  createUsername: (user: { username: string }) => void,
  history: any,
};

export type State = {
  username: string,
  error: string,
};
