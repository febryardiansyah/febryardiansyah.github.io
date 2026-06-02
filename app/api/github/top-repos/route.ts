import { NextResponse } from "next/server"

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return NextResponse.json({ error: "Missing GITHUB_TOKEN" }, { status: 500 })
  }

  const username = process.env.GITHUB_USERNAME || "febryardiansyah"

  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text }, { status: res.status })
    }

    const repos = await res.json()
    repos.sort((a: any, b: any) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    const top = (repos || []).slice(0, 3).map((r: any) => ({
      name: r.name,
      html_url: r.html_url,
      description: r.description,
      stargazers_count: r.stargazers_count,
      language: r.language,
    }))

    return NextResponse.json({ repos: top })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
  }
}
