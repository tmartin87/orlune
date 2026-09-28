import type { LandingBlock } from "../types/landing-block";

type BlockRendererProps = {
  block: LandingBlock;
};

export function BlockRenderer({ block }: BlockRendererProps) {
  switch (block.type) {
    case "hero":
      return (
        <section>
          <h1>{block.content.heading}</h1>
          <p>{block.content.subheading}</p>
          <button>{block.content.buttonText}</button>
        </section>
      );

    case "cta":
      return (
        <section>
          <h2>{block.content.heading}</h2>
          <button>{block.content.buttonText}</button>
        </section>
      );
  }
}