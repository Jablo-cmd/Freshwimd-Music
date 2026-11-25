import Link from "next/link";

/** Renders plain text with simple [label](/internal-path) links, so content files can link naturally to other pages. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\(\/[^)]*\))/g);
  return (
    <>
      {parts.map((p, i) => {
        const m = p.match(/^\[([^\]]+)\]\((\/[^)]*)\)$/);
        return m ? (
          <Link key={i} href={m[2]} className="text-amber underline underline-offset-4 hover:text-amber-soft">{m[1]}</Link>
        ) : (
          <span key={i}>{p}</span>
        );
      })}
    </>
  );
}
