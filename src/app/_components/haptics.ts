
type VibPattern = number | number[];


function canVibrate(): boolean {
  if (typeof window === "undefined") return false;

  return typeof navigator !== "undefined" && typeof navigator.vibrate === "function";
}

export type HapticStrength = "off" | "gentle" | "normal";

export const Haptics = {
  click(strength: HapticStrength = "gentle") {
    if (!canVibrate() || strength === "off") return;
    const pat: VibPattern = strength === "normal" ? 15 : 10;
    navigator.vibrate(pat);
  },
  win(strength: HapticStrength = "gentle") {
    if (!canVibrate() || strength === "off") return;

    const pat: VibPattern = strength === "normal" ? [20, 40, 20] : [15, 30, 15];
    navigator.vibrate(pat);
  },
  draw(strength: HapticStrength = "gentle") {
    if (!canVibrate() || strength === "off") return;
    const pat: VibPattern = strength === "normal" ? 25 : 18;
    navigator.vibrate(pat);
  },
};
