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

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Image from "next/image";

// const games = [
//   {
//     players: [
//       { firstName: "Justine", lastName: "Brunet" },
//       { firstName: "Eva", lastName: "Lagier" },
//     ],
//     sets: [
//       [{ score: 5 }, { score: 7 }],
//       [{ score: 5 }, { score: 7 }],
//     ],
//   },
//   {
//     players: [
//       { firstName: "Katy", lastName: "Grevot" },
//       { firstName: "Charlotte", lastName: "JeanJean" },
//     ],
//     sets: [
//       [{ score: 6 }, { score: 3 }],
//       [{ score: 6 }, { score: 2 }],
//     ],
//   },
//   {
//     players: [
//       { firstName: "Daphnée", lastName: "Grange" },
//       { firstName: "Marine", lastName: "Delauzun" },
//     ],
//     sets: [
//       [{ score: 1 }, { score: 6 }],
//       [{ score: 4 }, { score: 6 }],
//     ],
//   },
//   {
//     players: [
//       { firstName: "Damien", lastName: "Giannini" },
//       { firstName: "Gilles", lastName: "Girard" },
//     ],
//     sets: [
//       [{ score: 4 }, { score: 6 }],
//       [{ score: 3 }, { score: 6 }],
//     ],
//   },
//   {
//     players: [
//       { firstName: "Najih", lastName: "Boumahdi" },
//       { firstName: "Rémi", lastName: "Michel" },
//     ],
//     sets: [
//       [{ score: 1 }, { score: 6 }],
//       [{ score: 7 }, { score: 6 }],
//       [{ score: 6 }, { score: 7 }],
//     ],
//   },
//   {
//     players: [
//       { firstName: "Antoine", lastName: "Hebert" },
//       { firstName: "Lucien", lastName: "Juan" },
//     ],
//     sets: [
//       [{ score: 6 }, { score: 2 }],
//       [{ score: 6 }, { score: 4 }],
//     ],
//   },
//   {
//     players: [
//       { firstName: "Julien", lastName: "Abello" },
//       { firstName: "Bertrand", lastName: "Delauzun" },
//     ],
//     sets: [
//       [{ score: 6 }, { score: 0 }],
//       [{ score: 6 }, { score: 2 }],
//     ],
//   },
//   {
//     players: [
//       { firstName: "Loan", lastName: "Manzon-Bonnet" },
//       { firstName: "Thierry", lastName: "Morard" },
//     ],
//     sets: [
//       [{ score: 6 }, { score: 2 }],
//       [{ score: 2 }, { score: 3 }],
//     ],
//   },
//   {
//     players: [
//       { firstName: "Loan", lastName: "Manzon-Bonnet" },
//       { firstName: "Thierry", lastName: "Morard" },
//     ],
//     sets: [
//       [{ score: 6 }, { score: 2 }],
//       [{ score: 2 }, { score: 3 }],
//     ],
//   },
// ];

const games = [];

export default function Generate() {
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
      {/* <Results
        games={games}
        size={size}
        darkMode={darkMode}
        page={currentPage}
      /> */}

      <Image
        src={`/api/generate?size=${size}&darkMode=${darkMode}`}
        alt="Generate image"
        width={1080}
        height={1920}
        priority={true}
        placeholder="empty"
        quality={50}
        className="w-1/3 h-1/3 mx-auto rounded-md"
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

          <Drawer shouldScaleBackground>
            <DrawerTrigger asChild>
              <Button variant="outline">Edit</Button>
            </DrawerTrigger>
            <DrawerContent></DrawerContent>
          </Drawer>
          <Button>Export ({pages})</Button>
        </div>
      </div>
    </main>
  );
}
