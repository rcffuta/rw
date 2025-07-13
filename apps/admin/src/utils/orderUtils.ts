import { OrderRecord, OrderStatus } from "@rcffuta/ict-lib"

export function formatOrderStatus(status: OrderStatus): string {
	switch (status) {
		case 'paid':
			return 'Paid'
		case 'pending':
			return 'Pending'
		case 'shipped':
			return 'Shipped'
		case 'delivered':
			return 'Delivered'
		case 'cancelled':
			return 'Cancelled'
		default:
			return status
	}
}

export function filterOrderByState(orders: OrderRecord[], status: OrderStatus) {
	return orders.filter(e=>e.status === status);
}


export interface VariantAggregate {
  variantKey: string;
  name: string;
  color?: string;
  size?: string;
  quantity: number;
  totalAmount: number;
  orders: {
    orderId: string;
    quantity: number;
    customerName: string;
    customerEmail: string;
    status: string;
  }[];
}

export const aggregateByVariants = (orders: OrderRecord[]): VariantAggregate[] => {
    const variantMap = new Map<string, VariantAggregate>();

    orders.forEach(order => {
        if (order.item.itemType !== 'product' || !order.item.variant) return;

        const { color, size } = order.item.variant;
        const variantKey = `${order.item.name}-${color}-${size}`;
        const variantName = `${order.item.name} (${color}, ${size})`;

        if (!variantMap.has(variantKey)) {
            variantMap.set(variantKey, {
                variantKey,
                name: variantName,
                color,
                size,
                quantity: 0,
                totalAmount: 0,
                orders: []
            });
        }

        const aggregate = variantMap.get(variantKey)!;
        aggregate.quantity += order.item.quantity;
        aggregate.totalAmount += order.item.price * order.item.quantity;
        aggregate.orders.push({
            orderId: `ORD-${order.id}`,
            quantity: order.item.quantity,
            customerName: order.customer.name,
            customerEmail: order.customer.email,
            status: order.status
        });  
    });

    return Array.from(variantMap.values());
};

export const mockOrders: OrderRecord[] = [
  {
    customer: {
      userId: 'user_123',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890'
    },
    item: {
		itemType: 'product',
		itemId: 'prod_001',
		name: 'Premium T-Shirt',
		quantity: 2,
		price: 29.99,
		variant: {
			color: 'black',
			size: 'L'
		}
	},
	
	// [
    //   ,
    //   {
    //     itemType: 'package',
    //     itemId: 'pkg_001',
    //     name: 'Starter Bundle',
    //     quantity: 1,
    //     price: 79.99
    //   }
    // ],
    totalAmount: 139.97,
    status: 'paid',
    paymentRef: 'pay_123456',
    deliveryInfo: {
      email: 'john.doe@example.com',
      phoneNumber: '+1234567890',
      deliveryDate: new Date('2024-07-25')
    },
    id: 'order_001',
    createdAt: '2024-07-10T10:30:00Z',
    updatedAt: '2024-07-10T10:30:00Z'
  },
  {
    customer: {
		userId: "usr1234",
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1987654321'
    },
    item: {
		itemType: 'product',
		itemId: 'prod_002',
		name: 'Logo Hoodie',
		quantity: 1,
		price: 59.99,
		variant: {
			color: 'navy',
			size: 'M'
		}
	},
    totalAmount: 59.99,
    status: 'pending',
    paymentRef: 'pay_789012',
    deliveryInfo: {
      email: 'jane.smith@example.com'
    },
    id: 'order_002',
    createdAt: '2024-07-09T14:15:00Z',
    updatedAt: '2024-07-09T14:15:00Z'
  },
  {
    customer: {
      userId: 'user_456',
      name: 'Alex Johnson',
      email: 'alex.j@example.com',
      phone: '+1555123456'
    },
    item:  {
        itemType: 'product',
        itemId: 'prod_003',
        name: 'Baseball Cap',
        quantity: 3,
        price: 24.99,
        variant: {
          color: 'red',
          size: 'One Size'
        }
      },
	// [
     
    //   {
    //     itemType: 'product',
    //     itemId: 'prod_004',
    //     name: 'Sticker Pack',
    //     quantity: 1,
    //     price: 9.99
    //   }
    // ],
    totalAmount: 84.96,
    status: 'shipped',
    paymentRef: 'pay_345678',
    deliveryInfo: {
      email: 'alex.j@example.com',
      phoneNumber: '+1555123456',
      deliveryDate: new Date('2024-07-28')
    },
    id: 'order_003',
    createdAt: '2024-07-08T09:45:00Z',
    updatedAt: '2024-07-10T08:20:00Z'
  },
  {
    customer: {
		userId: "1234",
		name: 'Sam Wilson',
		email: 'sam.w@example.com',
		phone: '+1666777888'
    },
    item: {
        itemType: 'package',
        itemId: 'pkg_002',
        name: 'Premium Bundle',
        quantity: 1,
        price: 149.99
      },
    totalAmount: 149.99,
    status: 'delivered',
    paymentRef: 'pay_901234',
    deliveryInfo: {
      email: 'sam.w@example.com',
      phoneNumber: '+1666777888'
    },
    id: 'order_004',
    createdAt: '2024-07-05T16:20:00Z',
    updatedAt: '2024-07-08T11:05:00Z'
  },
  {
    customer: {
      userId: 'user_789',
      name: 'Taylor Brown',
      email: 'taylor.b@example.com',
      phone: '+1444555666'
    },
    item:{
        itemType: 'product',
        itemId: 'prod_005',
        name: 'Water Bottle',
        quantity: 2,
        price: 19.99,
        variant: {
          color: 'blue',
          size: '500ml'
        }
      },
    totalAmount: 39.98,
    status: 'cancelled',
    paymentRef: 'pay_567890',
    deliveryInfo: {
      email: 'taylor.b@example.com'
    },
    id: 'order_005',
    createdAt: '2024-07-03T11:10:00Z',
    updatedAt: '2024-07-04T09:30:00Z'
  }
];