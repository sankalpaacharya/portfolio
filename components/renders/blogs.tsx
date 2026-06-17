"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { format } from "date-fns";

interface FeedItem {
  title: string;
  link: string;
  pubDate: string;
}

function formatDate(pubDate: string): string {
  const date = new Date(pubDate);
  return isNaN(date.getTime()) ? pubDate : format(date, "MMM d yyyy");
}

export default function Blogs() {
  const [feed, setFeed] = useState<FeedItem[]>([]);

  useEffect(() => {
    fetch("/api/blogs")
      .then((res) => res.json())
      .then((data) => setFeed(data.items ?? []))
      .catch(() => setFeed([]));
  }, []);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <Link
          href="https://blog.sankalpa.info.np/posts/composition-is-the-best-way-to-write-react-components"
          target="_blank"
          className="block hover:underline text-primary"
        >
          <div className="space-y-1">
            <h3 className="font-medium">
              Compound is the Best Way to Write React Components
            </h3>
            <p className="text-xs text-muted-foreground">Sep 20 2025</p>
          </div>
        </Link>

        <Link
          href="https://blog.sankalpa.info.np/posts/my-developer-workflow"
          target="_blank"
          className="block hover:underline text-primary"
        >
          <div className="space-y-1">
            <h3 className="font-medium">My Developer Workflow ⚙️</h3>
            <p className="text-xs text-muted-foreground">Feb 5 2025</p>
          </div>
        </Link>

        {feed.map((item) => (
          <Link
            key={item.link}
            href={item.link}
            target="_blank"
            className="block hover:underline text-primary"
          >
            <div className="space-y-1">
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-xs text-muted-foreground">
                {formatDate(item.pubDate)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
