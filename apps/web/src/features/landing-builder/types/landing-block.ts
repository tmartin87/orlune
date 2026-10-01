import type {
  HeroBlock,
  CtaBlock,
} from "@orlune/shared";

export type {
  HeroBlock,
  CtaBlock,
  LandingBlock,
} from "@orlune/shared";

export type BlockContentUpdate =
  | {
      blockId: string;
      type: "hero";
      field: keyof HeroBlock["content"];
      value: string;
    }
  | {
      blockId: string;
      type: "cta";
      field: keyof CtaBlock["content"];
      value: string;
    };