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
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className={cn("py-12 md:py-24", className)}
    >
      <div className="container">{children}</div>
    </motion.section>
  );
}

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("text-[11px] font-semibold tracking-label uppercase text-muted-foreground block mb-3 md:mb-4", className)}>
      {children}
    </span>
  );
}

export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={cn("text-headline tracking-tight mb-2 md:mb-3", className)}>
      {children}
    </h2>
  );
}

export function SectionSubtitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={cn("text-muted-foreground text-[14px] md:text-[15px] max-w-lg leading-relaxed", className)}>
      {children}
    </p>
  );
}
