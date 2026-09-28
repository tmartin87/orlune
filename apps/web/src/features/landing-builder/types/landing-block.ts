export type HeroBlock = {
  id: string;
  type: "hero";
  content: {
    heading: string;
    subheading: string;
    buttonText: string;
  };
};

export type CtaBlock = {
  id: string;
  type: "cta";
  content: {
    heading: string;
    buttonText: string;
  };
};

export type LandingBlock = HeroBlock | CtaBlock;

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