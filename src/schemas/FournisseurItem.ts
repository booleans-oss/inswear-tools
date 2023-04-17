import { z } from "zod";

export const ItemSchema = z.object({
  url: z.string(),
  quantity: z.number(),
  name: z.string(),
  reference: z.string(),
  color: z.string(),
  customizations: z.array(
    z.object({
      place: z.union([
        z.literal("torse"),
        z.literal("épaule droite"),
        z.literal("épaule gauche"),
        z.literal("haut du dos"),
        z.literal("bas du dos"),
        z.literal("dos entier"),
        z.literal("autre"),
      ]),
      type: z.union([
        z.literal("texte"),
        z.literal("image"),
        z.literal("logo"),
        z.literal("nom"),
        z.literal("autre"),
      ]),
      method: z.union([
        z.literal("sérigraphie"),
        z.literal("broderie"),
        z.literal("flocage"),
        z.literal("couture"),
        z.literal("autre"),
      ]),
    })
  ),
  size: z.union([
    z.literal("XS"),
    z.literal("S"),
    z.literal("M"),
    z.literal("L"),
    z.literal("XL"),
    z.literal("XXL"),
    z.literal("XXXL"),
  ]),
});

export type Item = z.infer<typeof ItemSchema>;