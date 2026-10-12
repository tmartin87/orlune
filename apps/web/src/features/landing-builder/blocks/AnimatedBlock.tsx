import { motion, useReducedMotion } from "motion/react";

import type { LandingBlock } from "../types/landing-block";
import { BlockRenderer } from "./BlockRenderer";

type AnimatedBlockProps = {
  block: LandingBlock;
};

export function AnimatedBlock({ block }: AnimatedBlockProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <BlockRenderer block={block} />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: "some" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <BlockRenderer block={block} />
    </motion.div>
  );
}