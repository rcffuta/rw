"use server";

import { ORDER_LINK } from "@/data/links";
import { DeliveryEmail } from "@/templates/Delivery";
import Resend  from "resend";

// Types kept for consistency
type OrderItem = {
  id: string;
  status: 'paid' | 'disbursed' | 'pending';
  userId: string;
  productId: string;
  createdAt: string;
};

type UserItem = {
  id: string;
  email: string;
  username: string;
};

type ProductItem = {
  id: string;
  title: string;
  deliverable: string;
};

// Dummy database
let dummyOrders: OrderItem[] = [];
let dummyUsers: UserItem[] = [];
let dummyProducts: ProductItem[] = [];

// Initialize with sample data
function initializeDummyData() {
  if (dummyOrders.length === 0) {
    dummyUsers = [
      { id: 'user_1', email: 'student1@futa.edu.ng', username: 'John Doe' },
      { id: 'user_2', email: 'student2@futa.edu.ng', username: 'Jane Smith' }
    ];

    dummyProducts = [
      { 
        id: 'prod_1', 
        title: 'RCF Anniversary T-Shirt', 
        deliverable: 'https://drive.google.com/rcf-tshirt' 
      },
      { 
        id: 'prod_2', 
        title: 'Bible Study Pack', 
        deliverable: 'https://drive.google.com/rcf-bible-pack' 
      }
    ];

    dummyOrders = [
      { 
        id: 'ord_1', 
        status: 'paid', 
        userId: 'user_1', 
        productId: 'prod_1',
        createdAt: new Date().toISOString() 
      },
      { 
        id: 'ord_2', 
        status: 'paid', 
        userId: 'user_2', 
        productId: 'prod_2',
        createdAt: new Date().toISOString() 
      }
    ];
  }
}

// Dummy Resend client
class DummyResend {
  async send(options: any) {
    console.log('[DUMMY EMAIL SENT]', {
      to: options.to,
      subject: options.subject
    });
    return { data: { id: 'dummy_email_id' }, error: null };
  }
}

// const resend = process.env.NODE_ENV === 'test' ? new DummyResend() : new Resend(process.env.RESEND_API_KEY);
const resend = new DummyResend()

// Refactored server actions
export async function loadAllPaidOrder() {
  initializeDummyData();
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return dummyOrders
    .filter(order => order.status === 'paid')
    .map(order => ({
      ...order,
      user: dummyUsers.find(u => u.id === order.userId)!,
      product: dummyProducts.find(p => p.id === order.productId)!
    }));
}

export async function sendProductToCustomer(
  order: OrderItem,
  user: UserItem,
  product: ProductItem
) {
  try {
    initializeDummyData();
    await new Promise(resolve => setTimeout(resolve, 500));

    // 1. Simulate email sending
    // const { data, error } = await resend.emails.send({
    //   from: 'RCF FUTA <delivery@rcf-futa.org>',
    //   to: [user.email],
    //   subject: `Your ${product.title} is ready!`,
    //   react: DeliveryEmail({
    //     customerName: user.username,
    //     productName: product.title,
    //     downloadUrl: product.deliverable,
    //   }) as any,
    // });

    const error = true;

    if (error) {
      console.error('Dummy email failed:', error);
      return {
        success: false,
        message: `Delivery Failed for ORD-${order.id}`,
        data: null
      };
    }

    // 2. Update order status in dummy DB
    const orderIndex = dummyOrders.findIndex(o => o.id === order.id);
    if (orderIndex >= 0) {
      dummyOrders[orderIndex].status = 'disbursed';
    }

    return {
      success: true,
      message: `[DUMMY] Delivered ORD-${order.id} to ${user.email}`,
      data: {
        redirect: ORDER_LINK,
      }
    };

  } catch (err) {
    console.error('Dummy delivery failed:', err);
    return {
      success: false,
      message: "Dummy Delivery Failed",
      data: null
    };
  }
}

// Helper function to reset dummy data (for testing)
export async function _resetDummyOrders() {
  dummyOrders = [];
  initializeDummyData();
}