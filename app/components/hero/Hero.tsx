import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "../shared/Container";
import heroBg from "@/public/hero/hero.png";

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden bg-cover bg-center bg-no-repeat py-16 md:py-28"
      style={{ backgroundImage: `url(${heroBg.src})` }}
    >
      <Container>
        <div className="relative z-10 flex min-h-[60vh] items-center">
          <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div className="text-center md:text-left">
              <p>YOUR CITY. YOUR DEALS.</p>
              <h1 className="text-3xl font-bold leading-tight text-white md:text-5xl">
                Discover Amazing Local Deals.
              </h1>

              <h4>Save up to 70% on experiences you love.</h4>

              <p>
                Find exclusive discounts on restaurants, spas, adventures,
                beauty treatments, and local activities. New deals added every
                day!
              </p>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center md:justify-start">
                <Link href="/get-started">
                  <Button size="lg">Get Started</Button>
                </Link>

                <Link href="/learn-more">
                  <Button variant="outline" size="lg">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
