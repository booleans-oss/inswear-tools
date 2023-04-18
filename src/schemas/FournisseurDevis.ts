import { z } from "zod";
import { ItemSchema } from "./FournisseurItem";

export const DevisSchema = z.object({
  items: z.array(ItemSchema),
  customer: z.string().min(0),
});

export type Devis = z.infer<typeof DevisSchema>;
