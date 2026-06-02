import { NextResponse } from "next/server"

const GITHUB_GRAPHQL = "https://api.github.com/graphql"

export async function GET() {
  const token = process.env.GITHUB_TOKEN
  if (!token) {
    return NextResponse.json({ error: "Missing GITHUB_TOKEN" }, { status: 500 })
  }

  const username = process.env.GITHUB_USERNAME || "febryardiansyah"

  const to = new Date().toISOString()
  const fromDate = new Date()
  fromDate.setFullYear(fromDate.getFullYear() - 1)
  const from = fromDate.toISOString()

  const query = `query Contributions($login: String!, $from: DateTime!, $to: DateTime!) {
    user(login: $login) {
      contributionsCollection(from: $from, to: $to) {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }`

  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables: { login: username, from, to } }),
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: text }, { status: res.status })
    }

    const json = await res.json()
    const weeks =
      json?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || []

    const mapped = weeks.map((w: any) => w.contributionDays.map((d: any) => d.contributionCount))

    return NextResponse.json({ weeks: mapped })
  } catch (err: any) {
    return NextResponse.json({ error: err.message || String(err) }, { status: 500 })
  }
}
