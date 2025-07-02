export interface GitHubUser {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  name?: string;
  bio?: string;
  followers: number;
  following: number;
  public_repos: number;
}

export interface FollowComparison {
  mutuals: GitHubUser[];
  notFollowingBack: GitHubUser[];
  searchedUser: GitHubUser;
}

export interface SearchRecord {
  id?: string;
  username: string;
  timestamp: Date;
  userId?: string;
} 