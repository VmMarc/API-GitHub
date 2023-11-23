export type GitHubRepo = {
  name: string;
  id: number;
  owner: {
    login: string;
    avatar_url: string;
  };
  description: string | null;
};
