import { z } from "zod"
import { ItemSchema } from "./FournisseurItem"

export const DevisSchema = z.object({
    items: z.array(ItemSchema),
})

export type Devis = z.infer<typeof DevisSchema>