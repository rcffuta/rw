import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react' // Using Lucide for icons (install: npm install lucide-react)

export const OrderCompleted = ({show: isVisible}:{show?:boolean}) => {
    // const [isVisible, setIsVisible] = useState(false)

    return (
        <AnimatePresence>
            {!isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md text-center"
                >
                    {/* Animated Checkmark */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: 'spring',
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2,
                        }}
                        className="flex justify-center mb-4"
                    >
                        <CheckCircle2 className="h-16 w-16 text-green-500" />
                    </motion.div>

                    {/* Pulsing Circle Effect */}
                    <motion.div
                        animate={{
                            scale: [1, 1.05, 1],
                            opacity: [0.6, 0.3, 0],
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                        className="absolute inset-0 rounded-full bg-green-100 -z-10"
                    />

                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Completed!</h2>

                    <p className="text-gray-600 mb-4">
                        Thank you for your purchase. Your order has been received.
                    </p>

                    <div className="bg-blue-50 p-4 rounded-md">
                        <p className="text-blue-700 font-medium">
                            Please check your email for updates.
                        </p>
                        <p className="text-sm text-blue-600 mt-1">
                            The committee will review your submission and contact you shortly.
                        </p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="mt-6 px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                    >
                        Back to Home
                    </motion.button>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
