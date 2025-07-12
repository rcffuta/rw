import { getOrders, getProducts, OrderStatus, findUnderGraduates} from "@rcffuta/ict-lib";

export async function fetchOrders() {
    const {
        data = []
    } = await getOrders();

    return data ?? []
}

export async function fetchProducts() {
    const {
        data = []
    } = await getProducts();

    return data ?? []
}

export async function fetchMembers() {
    const {
        data = []
    } = await findUnderGraduates();

    return data ?? []
}

export function formatOrderStatus(status: OrderStatus): string {
  switch (status) {
    case "paid":
      return "Paid";
    case "pending":
      return "Pending";
    case "shipped":
      return "Shipped";
    case "delivered":
      return "Delivered";
    case "cancelled":
      return "Cancelled";
    default:
      return status;
  }
}