"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Results } from "@/features/results";
import { SocialsToolbar } from "@/features/socials/toolbar";

const games = [
  {
    players: [
      { firstName: "L.", lastName: "Neumayer" },
      { firstName: "D.", lastName: "Schwartzman" },
    ],
    sets: [
      [{ score: 2 }, { score: 6 }],
      [{ score: 3 }, { score: 6 }],
    ],
  },
  {
    players: [
      { firstName: "A.", lastName: "Galarmeau" },
      { firstName: "Q.", lastName: "Halys" },
    ],
    sets: [
      [{ score: 5 }, { score: 7 }],
      [{ score: 3 }, { score: 6 }],
    ],
  },
  {
    players: [
      { firstName: "J.", lastName: "Marie" },
      { firstName: "T.", lastName: "Droguet" },
    ],
    sets: [
      [{ score: 6 }, { score: 7 }],
      [{ score: 3 }, { score: 6 }],
    ],
  },
  {
    players: [
      { firstName: "G.", lastName: "Barrere" },
      { firstName: "T.", lastName: "Papamalamis" },
    ],
    sets: [
      [{ score: 6 }, { score: 3 }],
      [{ score: 6 }, { score: 1 }],
    ],
  },
  {
    players: [
      { firstName: "Z.", lastName: "Bergs" },
      { firstName: "C.", lastName: "Chidekh" },
    ],
    sets: [
      [{ score: 6 }, { score: 1 }],
      [{ score: 6 }, { score: 1 }],
    ],
  },
  {
    players: [
      { firstName: "H.", lastName: "Grenier" },
      { firstName: "T.", lastName: "Boyer" },
    ],
    sets: [
      [{ score: 6 }, { score: 4 }],
      [{ score: 3 }, { score: 6 }],
      [{ score: 7 }, { score: 6 }],
    ],
  },
  {
    players: [
      { firstName: "M.", lastName: "Cressy" },
      { firstName: "A.", lastName: "Pellegrino" },
    ],
    sets: [
      [{ score: 6 }, { score: 7 }],
      [{ score: 6 }, { score: 4 }],
      [{ score: 6 }, { score: 7 }],
    ],
  },
  {
    players: [
      { firstName: "O.", lastName: "Roca Batalla" },
      { firstName: "D.", lastName: "Novak" },
    ],
    sets: [
      [{ score: 4 }, { score: 6 }],
      [{ score: 2 }, { score: 6 }],
    ],
  },
];

// const games = [];

export default function Socials() {
  const [size, setSize] = useState<"instagram:story" | "instagram:post">("instagram:story");
  const [darkMode, setDarkMode] = useState(false);

  const pages = Math.ceil(
    games.length /
      ({
        "instagram:story": 8,
        "instagram:post": 4,
      }[size] || 0)
  );

  const [currentPage, setCurrentPage] = useState(0);

  return (
    <main className="flex min-h-screen w-full flex-col justify-center overflow-y-auto bg-muted bg-[radial-gradient(hsl(var(--muted-foreground)/0.2)_1px,transparent_0)] bg-[length:30px_30px]">
      <Results games={games} size={size} darkMode={darkMode} page={currentPage} />

      <SocialsToolbar />

      {/* <div className="fixed inset-x-0 bottom-[2vw] flex items-center justify-center px-[5vw] min-[600px]:bottom-12">
        <div className="flex w-full max-w-fit items-end gap-x-4 rounded-lg border border-border bg-white px-4 py-3 shadow-lg">
          <div className="flex min-w-[136px] flex-col gap-y-2 sm:min-w-[158px]">
            <Label className="text-xs">Size</Label>
            <Select value={size} onValueChange={(value: "instagram:story" | "instagram:post") => setSize(value)}>
              <SelectTrigger className="min-w-0">
                <div className="truncate">
                  {
                    {
                      "instagram:story": "Instagram Story",
                      "instagram:post": "Instagram Post",
                    }[size]
                  }
                </div>
              </SelectTrigger>
              <SelectContent sideOffset={-40}>
                <SelectItem value="instagram:story">Instagram Story</SelectItem>
                <SelectItem value="instagram:post">Instagram Post</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label className="truncate text-xs">Dark mode</Label>
            <div className="flex h-9 flex-col justify-center">
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
          <Button>Export ({pages})</Button>
        </div>
      </div> */}
    </main>
  );
}
