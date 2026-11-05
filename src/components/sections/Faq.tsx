import { PlusIcon } from "../ui/icons";
import { faq } from "@/content/faq";
import { Container } from "../ui/Container";
import { Eyebrow } from "../ui/Eyebrow";

/**
 * Questions fréquentes, en accordéons natifs `<details>` : zéro JavaScript, et
 * les réponses restent dans le HTML initial. C'est ce qui autorise le balisage
 * `FAQPage` : Google interdit de baliser un contenu que le visiteur ne voit
 * pas, mais un accordéon replié compte comme visible.
 */
export function Faq() {
  return (
    <section id="faq" className="scroll-mt-20 border-t border-line py-[100px]">
      <Container className="grid items-start gap-[60px] lg:grid-cols-[.85fr_1.15fr]">
        <div className="lg:sticky lg:top-[110px]">
          <Eyebrow>VOS QUESTIONS</Eyebrow>
          <h2 className="h-display text-[clamp(38px,6vw,74px)] leading-[.9]">
            QUESTIONS FRÉQUENTES
            <br />
            SUR LE COVERING
          </h2>
        </div>

        <ul>
          {faq.map((q) => (
            <li key={q.question} className="border-b border-line first:border-t">
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-[22px] font-sans text-[15.5px] font-semibold text-bright [&::-webkit-details-marker]:hidden">
                  {q.question}
                  <PlusIcon
                    size={18}
                    weight="bold"
                    aria-hidden
                    className="shrink-0 text-dim transition-transform duration-200 group-open:rotate-45"
                  />
                </summary>
                <p className="max-w-[620px] pb-[22px] font-sans text-[14.5px] leading-[1.75] text-muted-2">
                  {q.answer}
                </p>
              </details>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
