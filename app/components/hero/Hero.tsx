import Link from "next/link";
import { Button } from "@/components/ui/button";
import Container from "../shared/Container";

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Content */}
          <div className="space-y-6">
            <span className="inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground">
              🚀 Modern SaaS Platform
            </span>

            <h1 className="text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              Build Faster. Scale Smarter.
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground">
              Empower your business with a modern platform designed for seamless
              experiences, powerful analytics, and scalable growth.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg">
                <Link href="/en/register">Get Started</Link>
              </Button>

              <Button variant="outline" size="lg">
                <Link href="/en/contact">Learn More</Link>
              </Button>
            </div>

            <div className="flex items-center gap-8 pt-4">
              <div>
                <p className="text-2xl font-bold">10K+</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>

              <div>
                <p className="text-2xl font-bold">99.9%</p>
                <p className="text-sm text-muted-foreground">Uptime</p>
              </div>

              <div>
                <p className="text-2xl font-bold">24/7</p>
                <p className="text-sm text-muted-foreground">Support</p>
              </div>
            </div>
          </div>

          {/* Image / Illustration */}
          <div className="relative">
            <div className="aspect-[4/3] rounded-3xl border bg-muted p-6 shadow-xl">
              <div className="flex h-full items-center justify-center rounded-2xl border border-dashed">
                <span className="text-muted-foreground">
                  Hero Image / Dashboard Preview
                </span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
            <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
          </div>
        </div>
      </Container>
    </section>
  );
}
