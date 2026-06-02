const GITHUB_USERNAME = "febryardiansyah"
const GITHUB_REPO_LIMIT = 4

type GitHubRepo = {
  id: number
  name: string
  html_url: string
  description: string | null
  stargazers_count: number
  forks_count: number
  language: string | null
  fork: boolean
}

async function getTopRepos() {
  const token = process.env.GITHUB_TOKEN

  if (!token) {
    return [] as GitHubRepo[]
  }

  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: 3600 },
    }
  )

  if (!response.ok) {
    return [] as GitHubRepo[]
  }

  const repos = (await response.json()) as GitHubRepo[]

  return repos
    .filter((repo) => !repo.fork)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, GITHUB_REPO_LIMIT)
}

export { GITHUB_USERNAME, GITHUB_REPO_LIMIT, getTopRepos }

export type { GitHubRepo }
