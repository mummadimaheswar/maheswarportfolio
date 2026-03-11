
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface AnimatedProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export const FadeUp = ({ children, delay = 0, className = "" }: AnimatedProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const FadeIn = ({ children, delay = 0, className = "" }: AnimatedProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideLeft = ({ children, delay = 0, className = "" }: AnimatedProps) => (
  <motion.div
    initial={{ opacity: 0, x: 30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SlideRight = ({ children, delay = 0, className = "" }: AnimatedProps) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const ScaleIn = ({ children, delay = 0, className = "" }: AnimatedProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

export const TypeWriter = ({ children, delay = 0, className = "" }: AnimatedProps) => (
  <motion.div
    initial={{ width: 0, opacity: 1, overflow: "hidden", whiteSpace: "nowrap" }}
    animate={{ width: "100%" }}
    transition={{ duration: 1.5, delay, ease: "easeInOut" }}
    className={className}
  >
    {children}
  </motion.div>
);
