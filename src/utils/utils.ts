import type { FournisseurItem, Item } from "./types";

export function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateDescription(item: Item | FournisseurItem) {
  const base = item.name;
  if (item.customizations.length === 0) {
    return base;
  }
  const customizations = generateCustomization(item);
  return `${base} + ${customizations}`;
}

export function generateCustomization(item: Item | FournisseurItem) {
  if (item.customizations.length === 0) {
    return "";
  }
  const customizations = item.customizations.map((c) => {
    return `${c.method} ${c.type} sur ${c.place}`;
  });
  return `(${customizations.join("+")})`;
}
