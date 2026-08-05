import { getDictionary } from "@/app/[lang]/dictionaries";
import Container from "@/app/components/shared/Container";

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function HowToVuchado({ t }: Props) {
  return (
    <section className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto text-justify lg:text-center space-y-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:[48px] font-extrabold text-slate-900">
            {t.how_it_work?.how_it_work}{" "}
            <span className="text-[#1ec6cc]">{t.how_it_work.vouchado}</span>
          </h1>

          <p className="mt-6 text-[12px] md:text-[18px] lg:text-[20px] text-gray-600 leading-[23px]  lg:leading-[36px]">
            {t.how_it_work.desc.desc_1}{" "}
            <span className="text-[#1ec6cc]">{t.how_it_work.desc.desc_2}</span>,
            <span className="text-[#1ec6cc]">{t.how_it_work.desc.desc_3}</span>{" "}
            {t.how_it_work.desc.desc_4}{" "}
            <span className="text-[#1ec6cc]">{t.how_it_work.desc.desc_5}</span>{" "}
            {t.how_it_work.desc.desc_6}
          </p>
        </div>
      </Container>
    </section>
  );
}
