import PhotoUploader from "@/components/Common/Form/upload-photo"
import { observer } from "mobx-react-lite"
import { useState } from "react"
import toast from "react-hot-toast"


export const PaymentDetails = observer(() => {
    const [picture, setPicture] = useState('')

    function saveOrder() {
        toast.error("Hold on...");
    }

    return (
        <div className="lg:max-w-[455px] w-full mt-9 mx-auto">
            {/* Payment Details Box */}
            <div className="bg-white shadow-1 rounded-[10px]">
                <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">Payment Details</h3>
                </div>

                <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* Bank Account Information */}
                    <div className="mb-6">
                        <h4 className="font-medium text-dark mb-3">Bank Transfer Details</h4>
                        <div className="bg-gray-1 p-4 rounded-md">
                            <div className="flex justify-between py-2 border-b border-gray-2">
                                <span className="text-gray-6">Bank Name:</span>
                                <span className="font-medium">Zenith Bank</span>
                            </div>
                            <div className="flex justify-between py-2 border-b border-gray-2">
                                <span className="text-gray-6">Account Name:</span>
                                <span className="font-medium">Fashion Store Ltd</span>
                            </div>
                            <div className="flex justify-between py-2">
                                <span className="text-gray-6">Account Number:</span>
                                <span className="font-medium">1012345678</span>
                            </div>
                        </div>
                    </div>

                    {/* Proof of Payment Upload */}
                    <div className="mb-6">
                        <h4 className="font-medium text-dark mb-3">Upload Proof of Payment</h4>

                        <PhotoUploader
                            imageUrl={picture}
                            onUpload={(url) => setPicture(url || '')}
                            required={true}
                            folder="paymentProofs"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={!picture}
                        onClick={()=>saveOrder()}
                        className={`w-full flex justify-center font-medium text-white py-3 px-6 rounded-md ease-out duration-200 mt-4 ${
                            !picture ? 'bg-gray-4 cursor-not-allowed' : 'bg-blue hover:bg-blue-dark'
                        }`}
                    >
                        Submit Proof
                    </button>

                    <p className="text-xs text-gray-5 mt-3">
                        Please upload a screenshot or scanned copy of your bank transfer receipt.
                    </p>
                </div>
            </div>
        </div>
    )
})
