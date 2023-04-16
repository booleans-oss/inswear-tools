import { z } from "zod"
import { ItemSchema } from "./Item"

export const DevisSchema = z.object({
    customer: z.string().min(1),
    deadline: z.string().optional(),
    items: z.array(ItemSchema),
    margin: z.number()
})

export type Devis = z.infer<typeof DevisSchema>