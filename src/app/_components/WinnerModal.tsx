"use client";
import { motion, AnimatePresence } from "framer-motion";

interface WinnerModalProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export default function WinnerModal({ open, message, onClose }: WinnerModalProps) {
  const titleId = "winner-modal-title";
  const descId = "winner-modal-desc";

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          
          role="presentation"
          aria-hidden
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-background/60"
        >
          <motion.div
            
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            aria-describedby={descId}
            data-testid="winner-modal"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="
              w-[90%] max-w-xs rounded-2xl
              border border-foreground/10
              bg-background/80 text-foreground
              shadow-xl backdrop-blur-md p-6 text-center
            "
          >
            <h2
              id={titleId}
              className="
                text-2xl font-extrabold tracking-tight
                bg-gradient-to-r from-yellow-400 via-orange-300 to-pink-400
                bg-clip-text text-transparent drop-shadow-sm
              "
            >
              {message}
            </h2>

            <p id={descId} className="mt-2 text-sm text-foreground/70">
              Play again and keep the streak going!
            </p>

            <button
              onClick={onClose}
              data-testid="winner-continue"
              className="
                mt-5 inline-flex items-center justify-center
                rounded-lg border border-foreground/15
                bg-foreground/10 px-4 py-1.5 text-sm font-medium
                text-foreground hover:bg-foreground/15 transition
              "
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
