import Link from "next/link";
import { MoveLeft } from "lucide-react"; // Run `npm i lucide-react` if you haven't already
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 animate-in fade-in duration-300">
      <Card className="w-full max-w-md border-muted/50 shadow-lg text-center backdrop-blur-sm">
        <CardHeader className="pt-8">
          {/* Large, muted error code for modern aesthetic */}
          <span className="text-sm font-semibold tracking-wider text-muted-foreground uppercase mb-1 block">
            Error 404
          </span>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Page Not Found
          </CardTitle>
          <CardDescription className="text-balance pt-2 text-muted-foreground">
            The page you are looking for doesn't exist, has been moved, or is
            temporarily unavailable.
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-8">
          <Link href="/en">
            <Button className="w-full sm:w-auto min-w-[140px] gap-2">
              <MoveLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
