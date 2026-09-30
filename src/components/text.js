// Non-breaking space. The original glues the last two words of most copy with one (widow control).
export const NBSP = ' '

// Glue the last two words of a string together with a non-breaking space.
export const nb = (s) => s.replace(/ (\S+)$/, `${NBSP}$1`)
