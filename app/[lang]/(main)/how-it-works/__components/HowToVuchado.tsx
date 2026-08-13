import { getDictionary } from "@/app/[lang]/dictionaries";
import Container from "@/app/components/shared/Container";

interface Props {
  t: Awaited<ReturnType<typeof getDictionary>>;
}

export default function HowToVuchado({ t }: Props) {
  return (
    <section className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto text-center space-y-6">
          {/* Heading: Vouchado – so funktioniert’s */}
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-[48px] font-extrabold text-slate-900">
            {t?.how_it_work?.how_it_work?.how_it_work}{" "}
            <span className="text-[#1ec6cc]">
              {t?.how_it_work?.how_it_work?.vouchado}
            </span>
          </h1>

          <div className="mt-6">
            {/* First paragraph */}
            <p className="text-[12px] md:text-[18px] lg:text-[20px] text-gray-600 leading-[23px] lg:leading-[36px]">
              {t?.how_it_work?.how_it_work?.desc?.desc_1}
            </p>
            <p className="text-[12px] md:text-[18px] lg:text-[20px] text-gray-600 leading-[23px] lg:leading-[36px]">
              {t?.how_it_work?.how_it_work?.desc?.desc_2}
            </p>
            <p className="text-[12px] md:text-[18px] lg:text-[20px] text-gray-600 leading-[23px] lg:leading-[36px]">
              {t?.how_it_work?.how_it_work?.desc?.desc_3}
            </p>
          </div>
          {/* Three key actions: Entdecken. Kaufen. Einlösen. / Discover. Buy. Redeem. */}
          <div className="text-[16px] md:text-[22px] lg:text-[24px] font-bold text-[#1ec6cc] space-x-2">
            <span>{t?.how_it_work?.how_it_work?.desc?.desc_4}.</span>
            <span>{t?.how_it_work?.how_it_work?.desc?.desc_5}.</span>
            <span>{t?.how_it_work?.how_it_work?.desc?.desc_6}.</span>
          </div>

          {/* Closing paragraph */}
          <div>
            <p className="text-[12px] md:text-[18px] lg:text-[20px] text-gray-600 leading-[23px] lg:leading-[36px]">
              {t?.how_it_work?.how_it_work?.desc?.desc_7}
            </p>
            <p className="text-[12px] md:text-[18px] lg:text-[20px] text-gray-600 leading-[23px] lg:leading-[36px]">
              {t?.how_it_work?.how_it_work?.desc?.desc_8}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
