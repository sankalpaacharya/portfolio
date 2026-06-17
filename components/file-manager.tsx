"use client";
import { useFileManager, FileNode } from "@/hooks/useFileManager";
import { FolderItem, FileItem } from "@/components/chatcn/system/file-manager";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AboutMe } from "./renders/about-me";
import WerideReadme from "./renders/weride";
import BloomiReadMe from "./renders/bloomi";
import Link from "next/link";
import Chatcn from "./renders/chatcn";
import ZeroTwoReadMe from "./renders/zerotwo";
import { Experience } from "./renders/experience";
import Reflection from "./renders/reflection";
import Blogs from "./renders/blogs";
import { Hobbies } from "./renders/hobbies";

const data: FileNode[] = [
  {
    type: "folder",
    name: "projects",
    children: [
      {
        type: "folder",
        name: "chatcn",
        children: [
          {
            type: "file",
            name: "3d component.mp4",
            thumbnail: "/images/chatcnvideo.png",
            render: (
              <div>
                <iframe
                  src="https://www.youtube.com/embed/DN1qRnZK-mw?si=HeXcE1zOjd1T22mx"
                  title="YouTube video player"
                  className="w-full h-40"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ),
          },
          {
            type: "file",
            name: "preview.png",
            thumbnail: "/images/chatcn.png",
            render: (
              <div>
                <img src="/images/chatcn.png" />
              </div>
            ),
          },
          {
            type: "file",
            name: "README.md",
            render: <Chatcn />,
          },
          {
            type: "file",
            name: ".vscode",

            src: "https://github.dev/sankalpaacharya/chatcn",
          },
        ],
      },
      {
        type: "folder",
        name: "bloomi",
        children: [
          {
            type: "file",
            name: "video.mp4",
            thumbnail: "/images/bloomivideo.png",
            render: (
              <div>
                <iframe
                  className="w-full h-100"
                  src="https://www.youtube.com/embed/SuxJXAgvEAo?si=cPMFJA3V9EP6TVXH"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ),
          },
          {
            type: "file",
            name: "preview.png",
            thumbnail: "/images/bloomiapp.png",
            render: (
              <div>
                <img src="/images/bloomiapp.png" />
              </div>
            ),
          },
          {
            type: "file",
            name: "README.md",
            render: <BloomiReadMe />,
          },
          {
            type: "file",
            name: ".vscode",

            src: "https://github.dev/sankalpaacharya/bloomi",
          },
        ],
      },
      {
        type: "folder",
        name: "weride",
        children: [
          {
            type: "file",
            name: "weride.mp4",
            thumbnail: "/images/weridevideo.png",
            render: (
              <div>
                <iframe
                  className="w-full h-100"
                  src="https://www.youtube.com/embed/f2gtGsR3yHo?si=f0LOQQhvIqpUr36h"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ),
          },

          {
            type: "file",
            name: "preview.png",
            thumbnail: "https://www.sankalpa.info.np/images/weride.png",
            render: (
              <div>
                <img src="/images/weride.png" />
              </div>
            ),
          },

          { type: "file", name: "README.md", render: <WerideReadme /> },
          {
            type: "file",
            name: ".vscode",

            src: "https://github.dev/sankalpaacharya/weride",
          },
        ],
      },
      {
        type: "folder",
        name: "zero two",
        children: [
          {
            type: "file",
            name: "zerotwo.mov",
            thumbnail: "/images/zerotwovideo.png",
            render: (
              <div>
                <iframe
                  className="h-100 w-full"
                  src="https://www.youtube.com/embed/mxJDRVZv_Z0?si=dqOIsAbtN6d1dVBh"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            ),
          },
          {
            type: "file",
            name: "preview.png",
            thumbnail: "/images/zerotwo.png",
            render: (
              <div>
                <img src="/images/zerotwo.png" />
              </div>
            ),
          },

          {
            type: "file",
            name: "README.md",
            render: <ZeroTwoReadMe />,
          },
          {
            type: "file",
            name: ".vscode",

            src: "https://github.dev/sankalpaacharya/zero-two",
          },
        ],
      },
      {
        type: "file",
        name: "Reflection.md",
        render: <Reflection />,
      },
    ],
  },
  {
    type: "file",
    name: "AboutMe.md",
    render: <AboutMe />,
  },
  {
    type: "file",
    name: "Experience.md",
    render: <Experience />,
  },
  {
    type: "file",
    name: "Blogs.md",
    render: <Blogs />,
  },
  {
    type: "file",
    name: "Hobbies.md",
    render: <Hobbies />,
  },
];

export default function FileManager() {
  const { path, currentFolder, openFolder, goBack, goTo } =
    useFileManager(data);

  return (
    <div className="h-full w-full backdrop-blur-xs flex flex-col p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4 md:space-y-6 bg-card/95 border rounded overflow-hidden">
      <div className="flex items-center text-xs sm:text-sm text-muted-foreground flex-shrink-0 overflow-x-auto">
        {path.map((folder, index) => (
          <div key={folder} className="flex items-center flex-shrink-0">
            <button
              onClick={() => goTo(index)}
              className="text-muted-foreground focus:outline-none hover:underline whitespace-nowrap"
            >
              {folder}
            </button>
            {index < path.length - 1 && (
              <span className="mx-1 sm:mx-2 text-muted-foreground">/</span>
            )}
          </div>
        ))}
      </div>

      <div className="flex-shrink-0">
        <button
          onClick={goBack}
          disabled={path.length <= 1}
          className="px-2 sm:px-3 py-1 border border-border rounded text-xs sm:text-sm bg-muted/10 text-muted-foreground disabled:opacity-50"
        >
          ← Back
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 md:gap-4 flex-1 overflow-auto content-start justify-items-start">
        {currentFolder.map((item) =>
          item.type === "folder" ? (
            <FolderItem
              key={item.name}
              name={item.name}
              onClick={() => openFolder(item.name)}
              tabIndex={0}
            />
          ) : item.src ? (
            <Link href={item.src} target="_blank" key={item.name}>
              <FileItem
                key={item.name}
                name={item.name}
                src={item.src}
                onClick={() => {}}
                thumbnail={item.thumbnail}
                tabIndex={0}
              />
            </Link>
          ) : (
            <Dialog key={item.name}>
              <DialogTrigger>
                <FileItem
                  name={item.name}
                  src={item.src}
                  onClick={() => null}
                  thumbnail={item.thumbnail}
                  tabIndex={0}
                />
              </DialogTrigger>
              <DialogContent
                className={"lg:max-w-5xl-lg overflow-y-scroll max-h-screen"}
              >
                <DialogTitle>{item.name}</DialogTitle>
                {item.render ? item.render : <p>No content to render</p>}
              </DialogContent>
            </Dialog>
          )
        )}
      </div>
    </div>
  );
}
