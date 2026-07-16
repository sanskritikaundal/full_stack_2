import { useMemo } from "react";
import { WARN_AT, DANGER_AT } from "../utils/constants.js";

/**
 * Turns a character count + platform limit into a status the UI can render.
 */
export function useValidation(characters, maxChars) {
  return useMemo(() => {
    const ratio = maxChars === 0 ? 0 : characters / maxChars;
    const remaining = maxChars - characters;
    let status = "valid";
    if (characters > maxChars) status = "exceeded";
    else if (ratio >= DANGER_AT) status = "danger";
    else if (ratio >= WARN_AT) status = "warning";
    return { status, remaining, percent: Math.min(ratio * 100, 100) };
  }, [characters, maxChars]);
}
