"use client";

import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@prisma/client";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import Section from "@/app/components/section";

const Page = ({ params }: { params: { slug: string } }) => {
  const { slug } = params;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState<string | undefined>();

  useEffect(() => {
    axios
      .get(`/api/product/slug/${slug}`)
      .then((response) => {
        const fetchedProduct = response.data.product;
        setProduct(fetchedProduct);
        setCurrentImageUrl(fetchedProduct?.imageUrls[0]);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex h-full w-full flex-1 items-center justify-center">
        Product not found.
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col gap-3 md:flex-row md:px-24">
      {/* Left */}
      <div className="relative flex h-full w-full overflow-hidden bg-muted py-24 md:w-2/3 md:rounded-xl md:py-0">
        {/* Product's images for Desktop */}
        <div className="hidden flex-row md:absolute md:flex md:flex-col md:gap-4 md:p-[3%]">
          {product.imageUrls.map((imageUrl, index) => (
            <Button
              key={imageUrl}
              className={`flex rounded-xl bg-black hover:bg-black md:h-[70px] md:w-[70px] ${index === currentPhotoIndex ? "border-2 border-primary" : ""}`}
              onClick={() => {
                setCurrentPhotoIndex(index);
                setCurrentImageUrl(imageUrl);
              }}
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
            src={currentImageUrl || product.imageUrls[0]}
            alt={product.name}
            width={0}
            height={0}
            sizes="100vw"
            priority
            className="h-auto w-full max-w-[50%] object-contain md:max-w-[50%]"
          />
        </div>
      </div>

      {/* Product's images for Mobile */}
      <div className="flex h-[70px] w-full flex-row justify-between gap-4 px-5 md:hidden">
        {product.imageUrls.map((imageUrl, index) => (
          <Button
            key={imageUrl}
            className={`flex h-fit h-full w-full rounded-xl bg-black hover:bg-black ${index === currentPhotoIndex ? "border-2 border-primary" : ""}`}
            onClick={() => {
              setCurrentPhotoIndex(index);
              setCurrentImageUrl(imageUrl);
            }}
          >
            <Image
              src={imageUrl}
              alt={product.name}
              width={0}
              height={0}
              sizes="100vw"
              priority
              className="h-auto w-full max-w-[70px] object-contain"
            />
          </Button>
        ))}
      </div>

      {/* Right */}
      <div className="flex h-full w-full flex-col gap-4 rounded-xl p-5 md:w-1/3 md:gap-8 md:bg-muted md:p-10">
        <p className="text-xl md:text-3xl">{product.name}</p>

        <div className="flex flex-col rounded-xl">
          <p className="text-xl font-semibold lg:text-3xl">
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
  );
};

export default Page;
