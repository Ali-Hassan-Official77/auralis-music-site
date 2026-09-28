import Link from "next/link";
import { EmptyOrbit } from "@/components/Art";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-5 text-center">
      <EmptyOrbit className="h-32 w-32" />
      <p className="eyebrow mt-6">404</p>
      <h1 className="h1 mt-3 text-[44px]">Lost in orbit.</h1>
      <p className="mt-3 text-[15px] leading-7 text-dim">We couldn't find that page. It may have moved, or the artist may have removed the track.</p>
      <Link href="/" className="btn-aurora mt-7">Back to Home</Link>
    </div>
  );
}
