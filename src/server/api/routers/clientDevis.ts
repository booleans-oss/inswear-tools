import { z } from "zod";

import { DevisSchema } from "@/schemas/Devis";
import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { faker } from "@faker-js/faker";

export const clientDevisRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
  getActiveOnes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.clientDevis.findMany({
      where: {
        OR: [
          {
            status: "généré",
          },
          {
            status: "envoyé",
          },
        ],
      },
      include: {
        items: true,
      },
    });
  }),
  getValidatedOnes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.clientDevis.findMany({
      where: {
        status: "accepté",
      },
      include: {
        items: true,
      },
    });
  }),
  getRefusedOnes: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.clientDevis.findMany({
      where: {
        status: "refusé",
      },
      include: {
        items: true,
      },
    });
  }),
  findOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.clientDevis.findUnique({
        where: {
          id: input.id,
        },
        include: {
          items: true,
        },
      });
    }),
  create: publicProcedure
    .input(DevisSchema)
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.clientDevis.create({
        data: {
          id: faker.random.numeric(5),
          customer: input.customer,
          price: input.items.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
          ),
          deadline: new Date(),
          margin: input.margin,
          status: "généré",
          color: faker.color.rgb({ format: "hex" }),
          items: {
            create: input.items.map((item) => ({
              reference: item.reference,
              name: item.name,
              price: item.price,
              url: item.url,
              size: item.size,
              color: item.color,
              quantity: item.quantity,
              supplierPrice: parseFloat(item.supplierPrice),
              customization: JSON.stringify(item.customizations),
            })),
          },
        },
      });
    }),
  updateStatus: publicProcedure
    .input(z.object({ id: z.string(), status: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.clientDevis.update({
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
