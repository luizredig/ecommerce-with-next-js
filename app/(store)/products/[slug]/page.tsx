"use client";

import { Button } from "@/app/components/ui/button";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import { Product } from "@prisma/client";
import LoadingSpinner from "@/app/components/LoadingSpinner";

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
    <div className="relative flex h-full w-full flex-row gap-3 px-24 py-10">
      {/* Left */}
      <div className="flex h-full w-2/3 overflow-hidden rounded-xl bg-muted">
        {/* Product's images */}
        <div className="absolute flex flex-col gap-4 p-10">
          {product.imageUrls.map((imageUrl, index) => (
            <Button
              key={imageUrl}
              className={`flex h-[70px] w-[70px] rounded-xl bg-black hover:bg-black ${index === currentPhotoIndex ? "border-2 border-primary" : ""}`}
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
            className="h-auto w-full max-w-[50%] object-contain"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex h-full w-1/3 flex-col gap-8 rounded-xl bg-muted p-10">
        <p className="text-3xl">{product.name}</p>

        <div className="flex flex-col rounded-xl">
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

        <div className="h-[100px] overflow-scroll p-0">
          <p className="text-sm opacity-70">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default Page;
