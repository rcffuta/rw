import { DotIcon } from "@/components/Icons";
import { formatTime } from "@/utils/format-message-time";
import Image from "next/image";
import Link from "next/link";
import { getUnResolvedOrder } from "@/actions/order.action";

export async function OrderHighlight() {
  const data = await getUnResolvedOrder();


  if (data.length <1) return null;

  return (
    <div className="col-span-12 rounded-[10px] bg-white py-6 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-4">
      <h2 className="mb-5.5 px-7.5 text-body-2xlg font-bold text-dark dark:text-white">
        Pending Orders
      </h2>

      <ul>
        {data.map((order, key) => (
          <li key={key}>
            <Link
              href="#"
              className="flex items-center gap-4.5 px-7.5 py-3 outline-none hover:bg-gray-2 focus-visible:bg-gray-2 dark:hover:bg-dark-2 dark:focus-visible:bg-dark-2"
            >
              <div className="relative shrink-0">
                <Image
                  src={order.image}
                  width={40}
                  height={40}
                  className="size-14 rounded object-cover"
                  alt={"Image for " + order.name}
                />
              </div>

              <div className="relative flex-grow">
                <h3 className="font-medium text-dark dark:text-white">
                  {order.name} (x{order.quantity})
                </h3>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs">{order.category}</span>

                  <DotIcon />

                  <time className="text-xs" dateTime={order.date.toString()}>
                    {formatTime(order.date.toString())}
                  </time>
                  {/* <DotIcon />
                  <span className="text-xs">{standardFormat(order.quantity * order.price)}</span> */}
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
