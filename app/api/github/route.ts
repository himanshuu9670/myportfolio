import { NextResponse } from 'next/server';

const username = 'himanshuu9670';

export async function GET() {
  try {
    const [profile, repos] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { next: { revalidate: 3600 } }),
      fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`, { next: { revalidate: 3600 } }),
    ]);
    if (!profile.ok || !repos.ok) throw new Error('GitHub unavailable');
    const user = await profile.json() as { public_repos: number; followers: number };
    const items = await repos.json() as Array<{ name: string; stargazers_count: number; language: string | null }>;
    return NextResponse.json({ repositories: user.public_repos, followers: user.followers, stars: items.reduce((total, repo) => total + repo.stargazers_count, 0), recent: items.map(({ name, language }) => ({ name, language })) });
  } catch { return NextResponse.json({ repositories: null, followers: null, stars: null, recent: [] }, { status: 200 }); }
}
