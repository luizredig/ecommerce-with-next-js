import Image from "next/image";

export default function Home() {
  return (
    <>
      <div>
        <Image
          src={"/mobile-first-banner.png"}
          alt="Até 55% de desconto só este mês."
          width={0}
          height={0}
          sizes="100vw"
          className="flex h-auto w-full px-5 py-7 md:hidden"
        />

        <Image
          src={"/desktop-first-banner.png"}
          alt="Ofertas imperdíveis! Até 55% de desconto só este mês."
          width={0}
          height={0}
          sizes="100vw"
          className="hidden h-auto w-full md:flex"
        />
      </div>
    </>
  );
}
