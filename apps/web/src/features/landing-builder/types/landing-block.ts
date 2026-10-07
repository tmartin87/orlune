import type {
  HeroBlock,
  CtaBlock,
  ImageTextBlock,
} from "@orlune/shared";

export type {
  HeroBlock,
  CtaBlock,
  FeaturesBlock,
  LandingBlock,
  ImageTextBlock,
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
    }
  | {
      blockId: string;
      type: "features";
      field: "heading";
      value: string;
    }
  | {
      blockId: string;
      type: "features";
      field: "title" | "description";
      itemId: string;
      value: string;
    }
  | {
      blockId: string;
      type: "imageText";
      field: keyof ImageTextBlock["content"];
      value: string;
    };