import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        {/* Top Section */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          {/* Logo & Description */}
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-bold">
              Tech Takes
            </Link>

            <p className="text-sm text-muted-foreground">
              Empowering users with modern solutions and seamless digital
              experiences.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Quick Links
            </h3>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>

              <li>
                <Link href="/about" className="hover:text-primary">
                  About
                </Link>
              </li>

              <li>
                <Link href="/pricing" className="hover:text-primary">
                  Pricing
                </Link>
              </li>

              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Resources
            </h3>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/privacy-policy" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link href="/terms" className="hover:text-primary">
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link href="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>

              <li>
                <Link href="/support" className="hover:text-primary">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide">
              Follow Us
            </h3>

            <div className="flex items-center gap-3">
              <Link
                href="#"
                className="rounded-full border p-2 transition hover:bg-muted"
              >
                <FaFacebook size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full border p-2 transition hover:bg-muted"
              >
                <FaTwitter size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full border p-2 transition hover:bg-muted"
              >
                <FaInstagram size={18} />
              </Link>

              <Link
                href="#"
                className="rounded-full border p-2 transition hover:bg-muted"
              >
                <FaLinkedin size={18} />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t pt-6 text-sm text-muted-foreground md:flex-row">
          <p>© {new Date().getFullYear()} Tech Takes. All rights reserved.</p>

          <div className="flex items-center gap-4">
            {/* Payment cards placeholder */}
            <div className="rounded-md border px-3 py-1">Visa</div>
            <div className="rounded-md border px-3 py-1">Mastercard</div>
            <div className="rounded-md border px-3 py-1">PayPal</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
