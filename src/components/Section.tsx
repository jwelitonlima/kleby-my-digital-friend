import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

export function Section({ children, className, id }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("py-20 md:py-28", className)}
    >
      <div className="container">{children}</div>
    </motion.section>
  );
}

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("text-[11px] font-medium tracking-label uppercase text-primary block mb-5", className)}>
      {children}
    </span>
  );
}

export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-display-sm tracking-tight mb-4 text-balance", className)}>
      {children}
    </h2>
  );
}

export function SectionSubtitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-muted-foreground text-base max-w-xl leading-relaxed", className)}>
      {children}
    </p>
  );
}
