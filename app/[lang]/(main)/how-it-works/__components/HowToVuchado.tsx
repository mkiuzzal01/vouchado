import Container from "@/app/components/shared/Container";

export default function HowToVuchado() {
  return (
    <section className="py-12">
      <Container>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
            HOW TO <span className="text-[#1ec6cc]">VOUCHADO?</span>
          </h1>

          <p className="mt-6 text-sm  lg:text-lg leading-8 text-slate-600">
            We designed Vouchado around a simple three-step journey: Discover,
            Purchase, and Redeem . This approach removes unnecessary complexity
            and creates a frictionless experience for both customers and
            businesses. Users can quickly find inspiring local offers, purchase
            vouchers in seconds, and redeem them effortlessly through a QR code.
            By focusing on a clear and intuitive flow, we encourage exploration,
            increase conversion rates, and make the entire experience easy to
            understand and use.
          </p>
        </div>
      </Container>
    </section>
  );
}
