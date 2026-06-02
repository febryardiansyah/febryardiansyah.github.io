const contributionWeeks = Array.from({ length: 52 }, (_, w) =>
  Array.from({ length: 7 }, (_, d) => ((w * 7 + d) * 13) % 5)
)

const months = ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"]

function getContributionColor(n: number) {
  switch (n) {
    case 0:
      return "bg-zinc-800"
    case 1:
      return "bg-emerald-900/40"
    case 2:
      return "bg-emerald-800/60"
    case 3:
      return "bg-emerald-700/80"
    default:
      return "bg-emerald-500"
  }
}

export { contributionWeeks, months, getContributionColor }
