import type { Item } from "./types";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateDescription(item: Item) {
  const base = item.name;
  if (item.customizations.length === 0) {
    return base;
  }
  const customizations = item.customizations.map((c) => {
    return `${c.method} ${c.type} sur ${c.place}`;
  });
  return `${base} + (${customizations.join("+")})`;
}
