import { z } from "zod";

export const UserSchema = z.object({
   email: z.string().email(),
   name: z.string().min(1),
});

export type User = z.infer<typeof UserSchema>;

