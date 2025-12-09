import Widget from "./components/Widget";
import Image from "next/image";
import Link from "next/link";

export function PresaleWidget() {
  return (
    <div className="w-full max-w-md">
      <Widget />

      <Link
        href="https://app.coinsult.net/eth/0x57F67ed05631A83C5E3300e28E4D1867a9C9DB6a"
        target="_blank"
        rel="noopener noreferrer"
        className="w-full"
      >
        <Image
          src="/images/logos/coinsult.png"
          alt="Coinsult"
          width={380}
          height={100}
          className="h-8 w-auto mx-auto mt-4"
        />
      </Link>
    </div>
  );
}
