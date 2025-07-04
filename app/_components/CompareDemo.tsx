

import React from "react";
import { motion } from "motion/react";
import { Compare } from "@/components/ui/compare";

export function CompareDemo() {
  return (
    <div className="p-6 border rounded-3xl dark:bg-neutral-900 bg-neutral-100 border-neutral-200 dark:border-neutral-800 flex justify-center items-center w-full flex-col">
      {/* <h1 className="text-xl font-semibold mb-2 text-center">
        Transform your GitHub contributions
      </h1> */}
        <h1 className=" mt-2 relative z-10 mx-auto max-w-3xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-6xl dark:text-slate-300">
          {" Transform Your GitHub Contributions"
            .split(" ")
            .map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: "easeInOut",
                }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
        </h1>
      <Compare
        firstImage="/less.png"
        secondImage="/full.png"
        firstImageClassName="object-contain w-full h-full"
        secondImageClassname="object-contain w-full h-full"
        className="w-full max-w-[1000px] h-[50vh]"
        slideMode="hover"
      />
    </div>
  );
}


