/**
 * Returns a new array with the item at `from` moved to `to`.
 * Out-of-range or no-op moves return the original array untouched.
 */
export const moveItem = (items, from, to) => {
  if (!Array.isArray(items)) return items;
  if (from === to) return items;
  if (from < 0 || to < 0) return items;
  if (from >= items.length || to >= items.length) return items;

  const next = [...items];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
};
