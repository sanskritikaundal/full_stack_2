import { useMemo } from "react";

/**
 * Derives every text metric from the raw draft in one pass.
 */
export function useCharacterCount(text) {
  return useMemo(() => {
    const characters = [...text].length; // spread handles emoji/surrogate pairs correctly
    const words = text.trim().length === 0 ? 0 : text.trim().split(/\s+/).length;
    const hashtags = (text.match(/#[\p{L}0-9_]+/gu) || []).length;
    const mentions = (text.match(/@[\p{L}0-9_]+/gu) || []).length;
    const readingTimeSeconds = Math.max(1, Math.round((words / 200) * 60)); // ~200 wpm
    return { characters, words, hashtags, mentions, readingTimeSeconds };
  }, [text]);
}
