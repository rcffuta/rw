"use client";
import PhotoUploader from '@/components/Common/Form/upload-photo'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import toast, { ToastOptions } from 'react-hot-toast'
import { CheckIcon, CopyIcon } from '@/components/Common/Icons'
import { OrderRecord, updateOrder } from '@rcffuta/ict-lib'
import { cartStore, clearOrderState } from '@/lib/store/cart-utils'
import OrderSummary from './OrderSummary';
import { OrderCompleted } from './OrderComplete';
import { formatNaira } from '@rw/shared';

const BANK_DETAILS = {
    name: 'GT Bank',
    user: 'Olorunloba Serah Temitope',
    accountNumber: '0431103225',
}



const toastConfig: ToastOptions = {
    id: 'checkOutCompleteToast',
    duration: 5000,
}


export const PaymentDetails = observer(() => {
    const [picture, setPicture] = useState(""
        // 'https://res.cloudinary.com/con-so-nant/image/upload/v1753189788/rW/paymentProofs/oyuwjgeymq08cfqejivx.png'
    )
    const [copiedField, setCopiedField] = useState<string | null>(null);
    const [completed, setCompleted] = useState<boolean>(false);


    const order = cartStore.order;

    if (!order) {
        return <div className="text-center text-gray-500">No order Made.</div>
    }
    
    const orderId = order.id;

    const copyToClipboard = (text: string, fieldName: string) => {
        navigator.clipboard.writeText(text)
        setCopiedField(fieldName)
        setTimeout(() => setCopiedField(null), 2000)
        toast.success(`${fieldName} copied to clipboard!`)
    }

    const handleSubmitProof = async () => {
        if (!picture) {
            toast.error('Please upload proof of payment first', toastConfig)
            return
        }


        toast.loading('Completing order...', {...toastConfig, duration: 0})

        try {
            // Save payment proof to order
            const { message, success, data } = await updateOrder(order.id, {
                paymentRef: picture,
                status: 'cart',
            })
            
            if (!success) {
                console.error("Failed to submit payment proof:", message);
                toast.error('Failed to submit payment proof', toastConfig)
                return;
            }

            toast.success('Payment proof submitted successfully!', toastConfig)
            setCompleted(true);
            clearOrderState(cartStore);
            // Here you would typically send to your backend:
            // await api.submitPaymentProof(orderId, picture);
        } catch (error) {
            toast.error('Failed to submit payment proof', toastConfig)
            console.error('Payment submission error:', error)
        }
    }

    const renderCopyButton = (text: string, fieldName: string) => (
        <button
            onClick={() => copyToClipboard(text, fieldName)}
            className="text-gray-500 hover:text-dark transition-colors"
            aria-label={`Copy ${fieldName}`}
        >
            {copiedField === fieldName ? (
                <CheckIcon className="h-4 w-4" />
            ) : (
                <CopyIcon className="h-4 w-4" />
            )}
        </button>
    )

    return (
        <section className="flex flex-col lg:flex-row gap-7.5 xl:gap-11 mt-9">
            {completed ? (
                <OrderCompleted />
            ) : (
                <>
                    <div className="lg:max-w-[555px] w-full mx-auto">
                        <div className="bg-white shadow-1 rounded-[10px]">
                            <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                                <h3 className="font-medium text-xl text-dark">Payment Details</h3>
                            </div>

                            <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                                {/* Order Reference */}
                                <div className="mb-6">
                                    <h4 className="font-medium text-dark mb-3">Order Reference</h4>
                                    <div className="bg-blue-50 p-4 rounded-md border border-blue-100">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-6">Order ID:</span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium text-blue">
                                                    {orderId}
                                                </span>
                                                {renderCopyButton(orderId, 'Order ID')}
                                            </div>
                                        </div>
                                        <p className="text-xs text-gray-5 mt-2">
                                            Please include this Order ID in your bank transfer
                                            description/reference.
                                        </p>
                                    </div>
                                </div>

                                {/* Bank Details */}
                                <div className="mb-6">
                                    <h4 className="font-medium text-dark mb-3">
                                        Bank Transfer Details
                                    </h4>
                                    <div className="bg-gray-1 p-4 rounded-md">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-2">
                                            <span className="text-gray-6">Bank Name:</span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">
                                                    {BANK_DETAILS.name}
                                                </span>
                                                {renderCopyButton(BANK_DETAILS.name, 'Bank Name')}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-2">
                                            <span className="text-gray-6">Account Name:</span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">
                                                    {BANK_DETAILS.user}
                                                </span>
                                                {renderCopyButton(
                                                    BANK_DETAILS.user,
                                                    'Account Name'
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-6">Account Number:</span>
                                            <div className="flex items-center gap-2">
                                                <span className="font-medium">
                                                    {BANK_DETAILS.accountNumber}
                                                </span>
                                                {renderCopyButton(
                                                    BANK_DETAILS.accountNumber,
                                                    'Account Number'
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-5 mt-2">
                                        Click the copy icon to easily paste these details into your
                                        banking app.
                                    </p>
                                </div>

                                {/* Payment Proof */}
                                <div className="mb-6">
                                    <h4 className="font-medium text-dark mb-3">
                                        Upload Proof of Payment
                                    </h4>
                                    <p className="text-sm text-gray-5 mb-2">
                                        After making the transfer, please upload a screenshot or
                                        photo of your:
                                    </p>
                                    <ul className="text-sm text-gray-5 list-disc pl-5 mb-3">
                                        <li>Bank transfer confirmation</li>
                                        <li>Showing the Order ID in the reference/description</li>
                                        <li>
                                            Showing the payment amount{' '}
                                            <strong>({formatNaira(cartStore.totalPrice)})</strong>
                                        </li>
                                    </ul>

                                    <PhotoUploader
                                        imageUrl={picture}
                                        onUpload={setPicture}
                                        required={true}
                                        folder="paymentProofs"
                                    />
                                </div>

                                {/* Submit Button */}
                                <button
                                    disabled={!picture}
                                    onClick={handleSubmitProof}
                                    className={`w-full flex justify-center font-medium text-white py-3 px-6 rounded-md transition-colors mt-4 ${
                                        !picture
                                            ? 'bg-gray-4 cursor-not-allowed'
                                            : 'bg-blue hover:bg-blue-dark'
                                    }`}
                                >
                                    Submit Proof
                                </button>

                                <p className="text-xs text-gray-5 mt-3">
                                    Your order will be processed after we verify your payment.
                                </p>
                            </div>
                        </div>
                    </div>
                    <OrderSummary proceed={false} />
                </>
            )}
        </section>
    )
})
