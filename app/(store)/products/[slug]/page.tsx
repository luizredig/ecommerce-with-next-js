import { prismaClient } from "@/app/lib/prisma";
import Image from "next/image";

const Page = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const product = await prismaClient.product.findFirst({
    where: {
      slug,
    },
  });

  return (
    <>
      {product && (
        <div className="flex w-full flex-row gap-8 px-24 py-10">
          <div className="absolute flex flex-col">
            {product.imageUrls.map((imageUrl) => (
              <div key={imageUrl}>
                <Image
                  src={imageUrl}
                  alt={product.name}
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority
                  className="h-auto w-full"
                />
              </div>
            ))}
          </div>

          <div className="flex h-full w-full bg-muted">
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              width={0}
              height={0}
              sizes="100vw"
              priority
              className="h-auto w-full"
            />
          </div>

          <div className="flex h-full w-full bg-muted"></div>
        </div>
      )}
    </>
  );
};

export default Page;
