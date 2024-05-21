"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";

import { Results } from "@/components/features/results";

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
  const [size, setSize] = useState<"instagram:story" | "instagram:post">(
    "instagram:story"
  );
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
    <main className="w-full min-h-screen flex flex-col justify-center overflow-y-auto">
      <Results
        games={games}
        size={size}
        darkMode={darkMode}
        page={currentPage}
      />

      <div className="fixed min-[600px]:bottom-12 bottom-[2vw] inset-x-0 flex items-center justify-center px-[5vw]">
        <div className="bg-white border border-border shadow-lg rounded-lg max-w-fit w-full px-4 py-3 flex gap-x-4 items-end">
          <div className="flex flex-col gap-y-2 min-w-[136px] sm:min-w-[158px]">
            <Label className="text-xs">Size</Label>
            <Select
              value={size}
              onValueChange={(value: "instagram:story" | "instagram:post") =>
                setSize(value)
              }
            >
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
            <Label className="text-xs truncate">Dark mode</Label>
            <div className="flex flex-col h-9 justify-center">
              <Switch checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>
          <Button>Export ({pages})</Button>
        </div>
      </div>
    </main>
  );
}
