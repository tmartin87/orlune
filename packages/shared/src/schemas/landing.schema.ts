import { z } from "zod";

export const heroBlockSchema = z.object({
  id: z.string(),
  type: z.literal("hero"),
  content: z.object({
    heading: z.string(),
    subheading: z.string(),
    buttonText: z.string(),
     imageUrl: z
      .string()
      .trim()
      .url()
      .regex(/^https?:\/\//i, "Use an HTTP or HTTPS image URL")
      .or(z.literal(""))
      .optional(),
    imageAlt: z.string().optional(),
  }),
});

export const ctaBlockSchema = z.object({
  id: z.string(),
  type: z.literal("cta"),
  content: z.object({
    heading: z.string(),
    buttonText: z.string(),
  }),
});

export const landingBlockSchema = z.discriminatedUnion("type", [
  heroBlockSchema,
  ctaBlockSchema,
]);

export const saveLandingSchema = z.object({
  blocks: z.array(landingBlockSchema),
});

export type HeroBlock = z.infer<typeof heroBlockSchema>;
export type CtaBlock = z.infer<typeof ctaBlockSchema>;
export type LandingBlock = z.infer<typeof landingBlockSchema>;
export type SaveLandingInput = z.infer<typeof saveLandingSchema>;