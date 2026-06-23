import { NextResponse } from "next/server";
import { SITE } from "@/app/lib/data";

export async function GET() {
  const username = SITE.github;
  try {
    const currentYear = new Date().getFullYear();
    // Fetch profile + all contribution years in parallel
    const years = Array.from(
      { length: currentYear - 2020 + 1 },
      (_, i) => 2020 + i
    );

    const [profileRes, ...contribResponses] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, {
        headers: { Accept: "application/vnd.github+json" },
        next: { revalidate: 3600 },
      }),
      ...years.map((y) =>
        fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=${y}`,
          { next: { revalidate: y < currentYear ? 86400 : 3600 } }
        )
      ),
    ]);

    const profile = profileRes.ok ? await profileRes.json() : {};
    const contribDataArray = await Promise.all(
      contribResponses.map((r) => (r.ok ? r.json() : null))
    );

    let totalContributions = 0;
    for (let i = 0; i < years.length; i++) {
      totalContributions += contribDataArray[i]?.total?.[years[i]] ?? 0;
    }

    const recentYears = years.slice(-4);
    const byYear = recentYears.map((y, i) => ({
      year: y,
      count: contribDataArray[years.length - 4 + i]?.total?.[y] ?? 0,
    })).filter((d) => d.count > 0);

    return NextResponse.json({
      repos: profile.public_repos ?? 0,
      followers: profile.followers ?? 0,
      contributions: totalContributions,
      byYear,
    });
  } catch {
    return NextResponse.json({ repos: 0, followers: 0, contributions: 0 });
  }
}
