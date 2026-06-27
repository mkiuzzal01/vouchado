import Container from "@/app/components/shared/Container";

export default function HowToVuchado() {
  return (
    <section className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto text-justify lg:text-center space-y-4">
          <h1 className="text-xl md:text-2xl lg:text-3xl xl:4xl font-bold text-slate-900">
            HOW TO <span className="text-[#1ec6cc]">VOUCHADO?</span>
          </h1>

          <p className="mt-6 text-[12px] md:text-[18px] lg:text-[20px] text-gray-600 leading-[23px] lg:leading-[36px]">
            We designed Vouchado around a simple three-step journey:{" "}
            <span className="text-[#1ec6cc]">Discover</span>,{" "}
            <span className="text-[#1ec6cc]">Purchase</span>, and{" "}
            <span className="text-[#1ec6cc]">Redeem</span> . This approach
            removes unnecessary complexity and creates a frictionless experience
            for both customers and businesses. Users can quickly find inspiring
            local offers, purchase vouchers in seconds, and redeem them
            effortlessly through a QR code. By focusing on a clear and intuitive
            flow, we encourage exploration, increase conversion rates, and make
            the entire experience easy to understand and use.
          </p>
        </div>
      </Container>
    </section>
  );
}
