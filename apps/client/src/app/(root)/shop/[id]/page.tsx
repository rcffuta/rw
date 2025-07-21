import React, { Suspense } from "react";
import { Metadata } from "next";
import Breadcrumb from "@/components/Common/Breadcrumb";
import RecentlyViewedItems from "@/components/client/Shop/RecentlyViewed";
import Newsletter from "@/components/Common/Newsletter";
import { APP_NAME } from "@rw/shared";
import { isEmpty } from "@rcffuta/ict-lib";
import { getProduct } from "@/actions/product.action";
import { ErrorMessage, PackageDisplay, ProductDisplay, ProductSkeleton } from "@/components/client/Shop/ShopUtil";

export const metadata: Metadata = {
  title: `Product | ${APP_NAME}`,
  description: `View Product from ${APP_NAME}`,
};

type Props = { params: { id: string } };

export default async function ProductPage({ params }: Props) {
  const productId = params.id;

  if (isEmpty(productId)) {
    return (
      <div className="container py-10">
        <ErrorMessage
          title="Invalid Product ID" 
          message="The product ID provided is invalid. Please check the URL and try again."
          redirectUrl="/shop"
          redirectText="Back to Shop"
        />
      </div>
    );
  }

  let product;
  try {
    product = await getProduct(productId);
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return (
      <div className="container py-10">
        <ErrorMessage 
          title="Product Loading Error" 
          message="We couldn't load the product details. Please try again later."
          redirectUrl="/shop"
          redirectText="Back to Shop"
        />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-10">
        <ErrorMessage 
          title="Product Not Found" 
          message="The product you're looking for doesn't exist or may have been removed."
          redirectUrl="/shop"
          redirectText="Back to Shop"
        />
      </div>
    );
  }

  const template = (() => {
    switch (product.type) {
      case "product":
        return <ProductDisplay product={product.data} />;
      case "package":
        return <PackageDisplay pkg={product.data} />;
      default:
        return (
          <ErrorMessage 
            title="Unsupported Product Type" 
            message="This product type cannot be displayed."
            redirectUrl="/shop"
            redirectText="Back to Shop"
          />
        );
    }
  })();


//   console.debug(product.data.name)

  return (
      <>
          <Breadcrumb
              title={`${product.type}`}
              pages={[{ name: 'Shop', path: '/shop' }, { name: product.data.name }]}
          />

          <Suspense fallback={<ProductSkeleton />}>
              <div className="container py-8">{template}</div>
          </Suspense>

          <RecentlyViewedItems categoryType={product.type} productId={productId} />

          {/* <Newsletter /> */}
      </>
  )
}