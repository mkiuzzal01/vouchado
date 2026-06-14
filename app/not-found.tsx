import Link from "next/link";
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
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">404</CardTitle>
          <CardDescription>
            The page you are looking for doesnt exist or has been moved.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          <Button>
            <Link href="/en">Back to Home</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
