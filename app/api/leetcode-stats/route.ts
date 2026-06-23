import { NextResponse } from "next/server";
import { SITE } from "@/app/lib/data";

const LEETCODE_QUERY = `
  query getUserStats($username: String!) {
    allQuestionsCount {
      difficulty
      count
    }
    matchedUser(username: $username) {
      submitStats {
        acSubmissionNum {
          difficulty
          count
        }
      }
      profile {
        ranking
      }
    }
  }
`;

export async function GET() {
  const username = SITE.leetcode;
  if (!username) {
    return NextResponse.json({
      solved: 0, total: 3500, easy: 0, medium: 0, hard: 0, ranking: 0,
    });
  }

  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Referer": "https://leetcode.com",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: JSON.stringify({
        query: LEETCODE_QUERY,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error(`LeetCode responded ${res.status}`);
    const json = await res.json();

    const allQ: Array<{ difficulty: string; count: number }> =
      json?.data?.allQuestionsCount ?? [];
    const acStats: Array<{ difficulty: string; count: number }> =
      json?.data?.matchedUser?.submitStats?.acSubmissionNum ?? [];
    const ranking: number = json?.data?.matchedUser?.profile?.ranking ?? 0;

    const find = (arr: typeof allQ, diff: string) =>
      arr.find((x) => x.difficulty === diff)?.count ?? 0;

    return NextResponse.json({
      solved: find(acStats, "All"),
      total: find(allQ, "All") || 3500,
      easy: find(acStats, "Easy"),
      medium: find(acStats, "Medium"),
      hard: find(acStats, "Hard"),
      ranking,
    });
  } catch {
    return NextResponse.json({
      solved: 0, total: 3500, easy: 0, medium: 0, hard: 0, ranking: 0,
    });
  }
}
