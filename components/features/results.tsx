import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type Game = {
  players: { firstName: string; lastName: string }[];
  sets: { score: number }[][];
};

const Results = ({
  games,
  page,
  size,
  darkMode,
}: {
  games: Game[];
  page: number;
  size: "instagram:story" | "instagram:post";
  darkMode: boolean;
}) => {
  return (
    <motion.div
      key={page}
      layout
      className={cn("mx-auto self-center rounded-md shrink-0 mt-12 mb-36", {
        "w-[calc(10*9vw)] max-w-[540px] h-[calc(10*16vw)] max-h-[960px]":
          size === "instagram:story",
        "w-[calc(10*9vw)] h-[calc(10*9vw)] max-w-[540px]  max-h-[540px]":
          size === "instagram:post",
        "bg-[#F7F7F8]": !darkMode,
        "bg-[#00020C]": darkMode,
      })}
    >
      <div
        className={cn(
          "h-full min-[600px]:p-6 p-[4vw] flex flex-col min-[600px]:gap-y-8 gap-y-[5.6vw]",
          {
            "min-[600px]:gap-y-6 gap-y-[4vw]": size === "instagram:post",
          }
        )}
      >
        <motion.div layout>
          <motion.h1
            layout="position"
            className={cn(
              "text-[12vw] min-[600px]:text-7xl leading-none font-black italic",
              {
                "text-[#141416]": !darkMode,
                "text-white": darkMode,
              }
            )}
          >
            Resultats
          </motion.h1>

          <motion.div
            layout="position"
            className="relative font-black italic text-[#00020C] leading-[0] w-fit px-[1.5vw] py-[1vw] -mt-[2vw] ml-[1.25vw] min-[600px]:px-3 min-[600px]:py-1 min-[600px]:ml-2 min-[600px]:-mt-3"
          >
            <div className="absolute inset-0 bg-[#D4F32B] -skew-x-12" />
            <span className="relative text-[2vw] leading-none min-[600px]:text-xs">
              10 MAI 2024 / TENNIS CLUB CAROMB
            </span>
          </motion.div>
        </motion.div>

        <div
          className={cn("flex flex-col min-[600px]:gap-y-2 gap-y-[1.3vw]", {
            "min-[600px]:gap-y-2 gap-y-[1.3vw]": size === "instagram:post",
          })}
        >
          <AnimatePresence initial={false}>
            {[
              ...games.slice(
                page *
                  ({
                    "instagram:story": 8,
                    "instagram:post": 4,
                  }[size] || 0),
                page *
                  ({
                    "instagram:story": 8,
                    "instagram:post": 4,
                  }[size] || 0) +
                  ({
                    "instagram:story": 8,
                    "instagram:post": 4,
                  }[size] || 0)
              ),
            ].map((game, index) => (
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
                className={cn(
                  "min-[600px]:rounded-md rounded-[1vw] min-[600px]:px-3 min-[600px]:py-4 px-[2vw] py-[2.7vw] flex justify-between",
                  {
                    "bg-[#1C1B25] shadow-[inset_0_1px,inset_0_0_0_1px] shadow-white/[0.025] text-white":
                      darkMode,
                    "bg-white shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] text-[#141416]":
                      !darkMode,
                  }
                )}
              >
                <div className="flex flex-col min-[600px]:text-sm text-[2.4vw] w-full min-[600px]:gap-y-1 gap-y-[0.75vw]">
                  {game.players.map((player, playerIndex) => {
                    return (
                      <div
                        key={playerIndex}
                        className="flex justify-between items-center w-full"
                      >
                        <motion.span layout="position">
                          {player.firstName} {player.lastName}
                        </motion.span>

                        <div className="flex min-[600px]:gap-x-1 gap-x-[0.75vw]">
                          {game.sets.map((set, index) => {
                            return (
                              <motion.span
                                key={index}
                                layout="position"
                                className={cn(
                                  "min-[600px]:h-7 min-[600px]:w-7 w-[4.6vw] h-[4.6vw] flex flex-col justify-center items-center font-medium",
                                  {
                                    "bg-white text-[#1C1B25]": darkMode,
                                    "bg-[#141416]/5 text-[#141416]": !darkMode,
                                  }
                                )}
                              >
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
  );
};

export { Results };
