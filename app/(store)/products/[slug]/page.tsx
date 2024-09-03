"use client";

import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@prisma/client";

const Page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    axios
      .get(`/api/product/slug/${slug}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }, [slug]);

  const [currentPhotoIndex, setcurrentPhotoIndex] = useState(0);

  console.log(product);

  return (
    <>
      {product && (
        <div className="relative flex h-full w-full flex-row gap-8 px-24 py-10">
          {/* Left */}
          <div className="flex h-full w-full overflow-hidden bg-muted">
            {/* Product's images */}
            <div className="absolute flex flex-col gap-4 p-10">
              {product.imageUrls.map((imageUrl, index) => (
                <Button
                  key={imageUrl}
                  className={`flex h-[70px] w-[70px] rounded-xl bg-black hover:bg-black ${index === currentPhotoIndex ? "border-2 border-primary" : ""}`}
                  onClick={() => setcurrentPhotoIndex(index)}
                >
                  <Image
                    src={imageUrl}
                    alt={product.name}
                    width={0}
                    height={0}
                    sizes="100vw"
                    priority
                    className="h-auto w-full object-contain"
                  />
                </Button>
              ))}
            </div>

            {/* Main product image */}
            <div className="flex h-full w-full items-center justify-center">
              <Image
                src={product.imageUrls[0]}
                alt={product.name}
                width={0}
                height={0}
                sizes="100vw"
                priority
                className="h-auto w-full max-w-[80%] object-contain"
              />
            </div>
          </div>

          {/* Right */}
          <div className="flex h-full w-full flex-col gap-8 bg-muted p-10">
            <p className="text-3xl">{product.name}</p>

            <div className="flex flex-col">
              <p className="text-3xl font-semibold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(
                  Number(
                    Number(product.basePrice) -
                      (Number(product.basePrice) * product.discountPercentage) /
                        100,
                  ),
                )}
              </p>

              <div className="flex gap-1">
                <p className="truncate text-sm text-[#525252]">From: </p>

                <p className="truncate text-sm text-[#525252] line-through">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(Number(product.basePrice))}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Page;
