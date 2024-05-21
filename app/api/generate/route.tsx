import { cn } from "@/lib/utils";
import { ImageResponse } from "next/og";

export const runtime = "edge";

const games = [
  {
    players: [
      { firstName: "Justine", lastName: "Brunet" },
      { firstName: "Eva", lastName: "Lagier" },
    ],
    sets: [
      { local: { score: 5 }, visitor: { score: 7 } },
      { local: { score: 5 }, visitor: { score: 7 } },
    ],
  },
  {
    players: [
      { firstName: "Katy", lastName: "Grevot" },
      { firstName: "Charlotte", lastName: "JeanJean" },
    ],
    sets: [
      { local: { score: 6 }, visitor: { score: 3 } },
      { local: { score: 6 }, visitor: { score: 2 } },
    ],
  },
  {
    players: [
      { firstName: "Daphnée", lastName: "Grange" },
      { firstName: "Marine", lastName: "Delauzun" },
    ],
    sets: [
      { local: { score: 1 }, visitor: { score: 6 } },
      { local: { score: 4 }, visitor: { score: 6 } },
    ],
  },
  {
    players: [
      { firstName: "Damien", lastName: "Giannini" },
      { firstName: "Gilles", lastName: "Girard" },
    ],
    sets: [
      { local: { score: 4 }, visitor: { score: 6 } },
      { local: { score: 3 }, visitor: { score: 6 } },
    ],
  },
  {
    players: [
      { firstName: "Najih", lastName: "Boumahdi" },
      { firstName: "Rémi", lastName: "Michel" },
    ],
    sets: [
      { local: { score: 1 }, visitor: { score: 6 } },
      { local: { score: 7 }, visitor: { score: 6 } },
      { local: { score: 6 }, visitor: { score: 7 } },
    ],
  },
  {
    players: [
      { firstName: "Antoine", lastName: "Hebert" },
      { firstName: "Lucien", lastName: "Juan" },
    ],
    sets: [
      { local: { score: 6 }, visitor: { score: 2 } },
      { local: { score: 6 }, visitor: { score: 4 } },
    ],
  },
  {
    players: [
      { firstName: "Julien", lastName: "Abello" },
      { firstName: "Bertrand", lastName: "Delauzun" },
    ],
    sets: [
      { local: { score: 6 }, visitor: { score: 0 } },
      { local: { score: 6 }, visitor: { score: 2 } },
    ],
  },
  {
    players: [
      { firstName: "Loan", lastName: "Manzon-Bonnet" },
      { firstName: "Thierry", lastName: "Morard" },
    ],
    sets: [
      { local: { score: 6 }, visitor: { score: 2 } },
      { local: { score: 2 }, visitor: { score: 3 } },
    ],
  },
];

type ImageSize = "instagram:story" | "instagram:post";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const size = {
    "instagram:story": {
      width: 1080,
      height: 1920,
    },
    "instagram:post": {
      width: 1080,
      height: 1080,
    },
  }[searchParams.get("size") as ImageSize];

  return new ImageResponse(
    (
      <div tw="h-full w-full flex flex-col">
        <div
          tw="w-full h-full bg-slate-100 p-12 flex flex-col relative overflow-hidden"
          style={{ rowGap: "48px" }}
        >
          <div tw="relative flex flex-col">
            <h1
              tw="font-bold text-6xl"
              style={{
                transform: "skewX(-12deg)",
              }}
            >
              Resultats
            </h1>
            <span tw="text-sm text-slate-500">
              Tournoi AST Caromb — 10 Mai 2025
            </span>
          </div>

          <ul tw="flex flex-col divide-y divide-slate-300">
            {games.map((game, index) => (
              <li
                tw={cn("flex items-center justify-between py-4", {
                  "border-b border-slate-300": index < games.length - 1,
                })}
                style={{ rowGap: "4px" }}
                key={index}
              >
                <div tw="flex flex-col">
                  {game.players.map((player, index) => {
                    const current = index === 0 ? "local" : "visitor";
                    const opponent = index === 0 ? "visitor" : "local";

                    const winner =
                      game.sets.reduce(
                        (acc, set) => acc + set[current].score,
                        0
                      ) >
                      game.sets.reduce(
                        (acc, set) => acc + set[opponent].score,
                        0
                      );

                    return (
                      <div
                        key={index}
                        tw={cn("flex items-center", {
                          "font-bold": winner,
                        })}
                        style={{ columnGap: "4px" }}
                      >
                        {winner && <span>•</span>}
                        <span>
                          {player.firstName[0]}. {player.lastName}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div tw="flex items-center" style={{ columnGap: "4px" }}>
                  {game.sets.map((set, index) => (
                    <div
                      key={index}
                      tw="flex flex-col font-bold"
                      style={{ rowGap: "4px" }}
                    >
                      <div
                        tw={cn("px-3 relative flex", {
                          "text-white": set.local.score > set.visitor.score,
                        })}
                      >
                        <div
                          tw={cn("bg-white shadow absolute inset-0", {
                            "bg-slate-900": set.local.score > set.visitor.score,
                          })}
                          style={{
                            transform: "skewX(-6deg)",
                          }}
                        />
                        <span tw="relative">{set.local.score}</span>
                      </div>

                      <div
                        tw={cn("px-3 relative flex", {
                          "text-white": set.visitor.score > set.local.score,
                        })}
                      >
                        <div
                          tw={cn("bg-white shadow absolute inset-0", {
                            "bg-slate-900": set.visitor.score > set.local.score,
                          })}
                          style={{
                            transform: "skewX(-6deg)",
                          }}
                        />
                        <span tw="relative">{set.visitor.score}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ),
    {
      width: size.width,
      height: size.height,
    }
  );
}
