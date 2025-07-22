"use client";
import { cartStore } from '@/lib/store/cart-utils';
import CheckoutForm from '../Checkout/CheckoutForm'
import { PaymentDetails } from './PaymentDetails'
import { observer } from 'mobx-react-lite';

function OrderAction() {   


    const order = cartStore.order;
    const isEmptyCart = cartStore.isEmptyCart;

    if (isEmptyCart) {
        return null;
    }


    let template = <CheckoutForm />;


    if (order) template = <PaymentDetails />;

    return (
        <>
            {template}
            
        </>
    )
}


export default observer(OrderAction);