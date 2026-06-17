import { NextResponse } from "next/server";

const FEED_URL = "https://reactjs-maxxing.vercel.app/rss.xml";

export interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
}

function decode(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .trim();
}

function pick(block: string, tag: string): string {
  const match = new RegExp(`<${tag}>([\\s\\S]*?)</${tag}>`).exec(block);
  return match ? decode(match[1]) : "";
}

export async function GET() {
  try {
    const res = await fetch(FEED_URL, { next: { revalidate: 3600 } });
    if (!res.ok) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    const xml = await res.text();
    const items: FeedItem[] = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)].map(
      (match) => {
        const block = match[1];
        return {
          title: pick(block, "title"),
          link: pick(block, "link"),
          pubDate: pick(block, "pubDate"),
        };
      },
    );

    return NextResponse.json({ items });
  } catch {
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
