import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { faker } from "@faker-js/faker";
import { DevisSchema } from "@/schemas/FournisseurDevis";
import { UserSchema } from "@/schemas/User";

export const fournisseurDevisRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getActiveOnes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.fournisseurDevis.findMany({
      where: {
        OR: [
          {
            status: "généré",
          },
        ],
      },
      include: {
        author: true,
        items: true,
      },
    });
  }),
  getSentOnes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.fournisseurDevis.findMany({
      where: {
        status: "envoyé",
      },
      include: {
        author: true,
        items: true,
      },
    });
  }),
  getAnsweredOnes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.fournisseurDevis.findMany({
      where: {
        status: "répondu",
      },
      include: {
        author: true,
        items: true,
      },
    });
  }),
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.fournisseurDevis.findUnique({
        where: {
          id: input.id,
        },
        include: {
          items: true,
          author: true,
        },
      });
    }),
  create: publicProcedure
    .input(DevisSchema.merge(UserSchema))
    .mutation(async ({ ctx, input }) => {
      let user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (!user) {
        user = await ctx.prisma.user.create({
          data: {
            email: input.email,
            name: input.name,
          },
        });
      }
      return ctx.prisma.fournisseurDevis.create({
        data: {
          id: faker.random.numeric(5),
          status: "généré",
          customer: input.customer,
          color: faker.color.rgb({ format: "hex" }),
          items: {
            create: input.items.map((item) => ({
              reference: item.reference,
              name: item.name,
              url: item.url,
              size: item.size,
              color: item.color,
              quantity: item.quantity,
              customization: JSON.stringify(item.customizations),
            })),
          },
          author: {
            connect: {
              email: input.email,
            },
          },
        },
      });
    }),
  updateStatus: publicProcedure
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.fournisseurDevis.update({
        where: {
          id: input.id,
        },
        data: {
          updatedAt: new Date(),
          status: input.status,
        },
      });
    }),
});
