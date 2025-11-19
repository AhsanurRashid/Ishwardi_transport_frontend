import { Button } from "@/components/ui/button"
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen w-full items-center justify-center ">
      <Link href="/login">
        <Button className="rounded-full cursor-pointer">Login</Button>
      </Link>
    </div>
  );
}
