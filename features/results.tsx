import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { cn } from "@/lib/utils";

type Game = {
  players: { firstName: string; lastName: string; forfait?: boolean }[];
  sets: Set[];
};

type Set = { score: number }[];

const configs = {
  "instagram:story": {
    width: 1080,
    height: 1920,
    perPage: 8,
    aspectRatio: [9, 16],
  },
  "instagram:post": {
    width: 1080,
    height: 1080,
    perPage: 4,
    aspectRatio: [1, 1],
  },
};

const determineSetWinner = (set: Set, playerIndex: number) => {
  const maxScore = Math.max(...set.map((player) => player.score));
  return set[playerIndex].score === maxScore;
};

const determineMatchWinner = (game: Game, playerIndex: number) => {
  let playerSetWins = 0;

  game.sets.forEach((set) => {
    if (determineSetWinner(set, playerIndex)) {
      playerSetWins++;
    }
  });

  const maxSetWins = Math.max(
    ...game.players.map((_, index) => {
      let setWins = 0;
      game.sets.forEach((set) => {
        if (determineSetWinner(set, index)) {
          setWins++;
        }
      });
      return setWins;
    })
  );

  return playerSetWins === maxSetWins && playerSetWins > 0;
};

const Results = ({ games, page, size, darkMode }: { games: Game[]; page: number; size: "instagram:story" | "instagram:post"; darkMode: boolean }) => {
  const config = configs[size];

  const calculateScale = (): number => {
    // Default size is 1080x1920, so we need to calculate the scale
    // based on the width of the screen
    const width = window.innerWidth;
    const scale = Math.min((width - 24 * 2) / config.width);

    return scale > 1 ? 1 : scale;
  };

  const [scale, setScale] = useState<number | null>(null);

  useEffect(() => {
    const onResize = () => {
      setScale(calculateScale());
    };

    setScale(calculateScale());

    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <AnimatePresence>
      {scale && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { duration: 0.4 },
          }}
          exit={{ opacity: 0, y: 20, transition: { duration: 0.4 } }}
          className="relative mb-24 mt-12 flex w-full justify-center self-center"
          style={{
            height: scale >= 0.5 ? config.height / 2 : `${((config.width * scale) / config.aspectRatio[0]) * config.aspectRatio[1]}px`,
            width: scale >= 0.5 ? config.width / 2 : `${config.width * scale}px`,
          }}>
          <motion.div
            key={page}
            layout
            className={cn(
              "absolute left-0 top-0 shrink-0 origin-top-left shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] transition-colors duration-200",
              {
                "bg-[#F7F7F8]": !darkMode,
                "bg-[#00020C]": darkMode,
              }
            )}
            style={{
              originX: 0,
              originY: 0,
              scale: scale >= 0.5 ? 0.5 : scale,
              height: config.height,
              width: config.width,
              borderRadius: 16,
            }}>
            <div
              className={cn("flex h-full flex-col gap-y-16 p-12", {
                "gap-y-12": size === "instagram:post",
              })}>
              <motion.div layout>
                <motion.h1
                  layout="position"
                  className={cn("text-[144px] font-black uppercase italic leading-none transition-colors duration-200", {
                    "text-[#141416]": !darkMode,
                    "text-white": darkMode,
                  })}>
                  Resultats
                </motion.h1>

                <motion.div layout="position" className="relative -mt-6 ml-4 w-fit px-6 py-2 font-black italic text-[#00020C]">
                  <div className="absolute inset-0 -skew-x-12 bg-[#D4F32B]" />
                  <span className="relative text-2xl leading-none">21 MAY 2024 / ROLAND GARROS</span>
                </motion.div>
              </motion.div>

              <div
                className={cn("flex flex-col gap-y-4", {
                  "gap-y-3": size === "instagram:post",
                })}>
                <AnimatePresence initial={false}>
                  {[...games.slice(page * config.perPage, page * config.perPage + config.perPage)].map((game, index) => (
                    <motion.div
                      layout
                      key={index}
                      initial={{ opacity: 0, scale: 0.95, y: 5 }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        transition: {
                          delay: 0.3,
                          type: "spring",
                          bounce: 0.45,
                          duration: 0.4,
                        },
                      }}
                      exit={{ opacity: 0, transition: { duration: 0.05 } }}
                      className={cn("flex justify-between rounded-xl px-6 py-8 transition-colors duration-200", {
                        "bg-[#1C1B25] text-white shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025]": darkMode,
                        "bg-white text-[#141416] shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)]":
                          !darkMode,
                      })}>
                      <div className="flex w-full flex-col gap-y-2 text-[28px] leading-[40px]">
                        {game.players.map((player, playerIndex) => {
                          const isMatchWinner = !player.forfait && determineMatchWinner(game, playerIndex);

                          return (
                            <div key={playerIndex} className="flex w-full items-center justify-between">
                              <motion.div
                                layout="position"
                                className={cn("flex items-center gap-x-2", {
                                  "font-bold": isMatchWinner,
                                })}>
                                {isMatchWinner && <span>•</span>}
                                <span>
                                  {player.firstName} {player.lastName}
                                </span>
                              </motion.div>

                              <div className="flex gap-x-2">
                                {game.sets.map((set, index) => {
                                  return (
                                    <motion.span
                                      key={index}
                                      layout="position"
                                      className={cn(
                                        "flex h-14 w-14 flex-col items-center justify-center font-medium transition-colors duration-200",
                                        {
                                          "bg-white text-[#1C1B25]": darkMode,
                                          "bg-[#141416]/5 text-[#141416]": !darkMode,
                                          "bg-[#D4F32B] font-bold text-[#141416]":
                                            Math.max(...set.map((player) => player.score)) === set[playerIndex].score,
                                        }
                                      )}>
                                      {set[playerIndex].score}
                                    </motion.span>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export { Results };
