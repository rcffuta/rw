import React from "react";
import { FullOrder } from "db/actions";
import cartStore from "@/lib/store/cartStore";
import { MinusIcon, PlusIcon, TrashIcon } from "@/components/Common/Icons";
import toast from "react-hot-toast";
import { ProductImage, useFormatCurrency } from "@gamezone/lib";
import { useProduct } from "@/hooks/useProduct";
import Link from "next/link";
import { SHOP } from "@/constants";

const SingleItem = ({ item }: {item: FullOrder}) => {
  // const [quantity, setQuantity] = useState(item.quantity);

  const { priceText, getOrderPrice } = useProduct(item.product);

  const orderPrice = getOrderPrice(item);

  return (
      <div className="flex items-center border-t border-gray-3 py-5 px-7.5">
          <div className="min-w-[400px]">
              <div className="flex items-center justify-between gap-5">
                  <div className="w-full flex items-center gap-5.5 my-5">
                      <div className="flex items-center justify-center rounded-[5px] bg-gray-2 max-w-[80px] w-full h-17.5">
                          <ProductImage
                              width={100}
                              height={100}
                              src={item.product.images?.at(0)}
                              alt={item.product.title}
                          />
                      </div>

                      <div>
                          <h3 className="text-dark ease-out duration-200 hover:text-blue">
                              <Link href={`${SHOP}/${item.productId}`}> {item.product.title} </Link>
                          </h3>
                      </div>
                  </div>
              </div>
          </div>

          <div className="min-w-[180px]">
              <p className="text-dark">{priceText}</p>
          </div>

          <div className="min-w-[275px]">
              <div className="w-max flex items-center rounded-md border border-gray-3">
                  <button
                      onClick={async () => {
                          if (item.quantity > 1) {
                              // setQuantity(quantity - 1);
                              //   dispatch(updateCartItemQuantity({ id: item.id, quantity: quantity - 1 }));
                              await cartStore.updateCartItemQuantity(
                                  item.product.id,
                                  item.quantity - 1
                              );
                              toast.success("Updated Cart", {
                                  id: "updateCartToast",
                              });
                          } else {
                              return;
                          }
                      }}
                      aria-label="button for remove product"
                      className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-blue"
                  >
                      <MinusIcon />
                  </button>

                  <span className="flex items-center justify-center w-16 h-11.5 border-x border-gray-4">
                      {item.quantity}
                  </span>

                  <button
                      onClick={() => {
                          cartStore.updateCartItemQuantity(
                              item.product.id,
                              item.quantity + 1
                          );
                          toast.success("Updated Cart", {
                              id: "updateCartToast",
                          });
                      }}
                      aria-label="button for add product"
                      className="flex items-center justify-center w-11.5 h-11.5 ease-out duration-200 hover:text-blue"
                  >
                      <PlusIcon />
                  </button>
              </div>
          </div>

          <div className="min-w-[200px]">
              <p className="text-dark">{orderPrice.amountText}</p>
          </div>

          <div className="min-w-[50px] flex justify-end">
              <button
                  onClick={async () => {
                      await cartStore.removeItemFromCart(item.productId);
                      toast.success("Updated Cart", { id: "updateCartToast" });
                  }}
                  aria-label="button for remove product from cart"
                  className="flex items-center justify-center rounded-lg max-w-[38px] w-full h-9.5 bg-gray-2 border border-gray-3 text-dark ease-out duration-200 hover:bg-red-light-6 hover:border-red-light-4 hover:text-red"
              >
                  <TrashIcon />
              </button>
          </div>
      </div>
  );
};

export default SingleItem;
