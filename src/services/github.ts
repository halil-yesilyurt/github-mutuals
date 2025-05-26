import type { GitHubUser, FollowComparison } from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

class GitHubApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'GitHubApiError';
  }
}

export class GitHubService {
  private accessToken?: string;

  constructor(accessToken?: string) {
    this.accessToken = accessToken;
  }

  private getHeaders() {
    const headers: Record<string, string> = {
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'GitHub-Mutuals-App'
    };

    if (this.accessToken) {
      headers['Authorization'] = `token ${this.accessToken}`;
    }

    return headers;
  }

  private async fetchWithPagination<T>(url: string): Promise<T[]> {
    const results: T[] = [];
    let page = 1;
    const perPage = 100;

    while (true) {
      const paginatedUrl = `${url}?page=${page}&per_page=${perPage}`;
      const response = await fetch(paginatedUrl, {
        headers: this.getHeaders()
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new GitHubApiError('User not found', 404);
        } else if (response.status === 403) {
          throw new GitHubApiError('API rate limit exceeded', 403);
        } else {
          throw new GitHubApiError(`API request failed: ${response.statusText}`, response.status);
        }
      }

      const data: T[] = await response.json();
      
      if (data.length === 0) {
        break;
      }

      results.push(...data);

      // If we got less than perPage items, we've reached the end
      if (data.length < perPage) {
        break;
      }

      page++;
    }

    return results;
  }

  async getUser(username: string): Promise<GitHubUser> {
    const response = await fetch(`${GITHUB_API_BASE}/users/${username}`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new GitHubApiError('User not found', 404);
      } else if (response.status === 403) {
        throw new GitHubApiError('API rate limit exceeded', 403);
      } else {
        throw new GitHubApiError(`API request failed: ${response.statusText}`, response.status);
      }
    }

    return response.json();
  }

  async getFollowers(username: string): Promise<GitHubUser[]> {
    return this.fetchWithPagination<GitHubUser>(`${GITHUB_API_BASE}/users/${username}/followers`);
  }

  async getFollowing(username: string): Promise<GitHubUser[]> {
    return this.fetchWithPagination<GitHubUser>(`${GITHUB_API_BASE}/users/${username}/following`);
  }

  async getMutuals(username: string): Promise<FollowComparison> {
    try {
      const [user, followers, following] = await Promise.all([
        this.getUser(username),
        this.getFollowers(username),
        this.getFollowing(username)
      ]);

      // Create a Set of follower logins for efficient lookup
      const followerLogins = new Set(followers.map(user => user.login));

      // Find mutuals (users in both following and followers)
      const mutuals = following.filter(user => followerLogins.has(user.login));

      // Find users not following back (users in following but not in followers)
      const notFollowingBack = following.filter(user => !followerLogins.has(user.login));

      return {
        searchedUser: user,
        mutuals,
        notFollowingBack
      };
    } catch (error) {
      if (error instanceof GitHubApiError) {
        throw error;
      }
      throw new GitHubApiError('Failed to fetch mutual followers data');
    }
  }

  async getRateLimit() {
    const response = await fetch(`${GITHUB_API_BASE}/rate_limit`, {
      headers: this.getHeaders()
    });

    if (!response.ok) {
      throw new GitHubApiError('Failed to fetch rate limit info');
    }

    return response.json();
  }
} 