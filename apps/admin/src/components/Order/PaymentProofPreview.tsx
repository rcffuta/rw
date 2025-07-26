import { useState } from 'react'

const PaymentProofPreview = ({ paymentRef }: { paymentRef: string }) => {
	const [isOpen, setIsOpen] = useState(false)

	return (
		<>
			<a
				href={paymentRef}
				onClick={(e) => {
					e.preventDefault()
					setIsOpen(true)
				}}
				className="cursor-pointer text-primary hover:underline"
			>
				View Payment Proof
			</a>

			{/* Modal */}
			{isOpen && (
				<div className="fixed inset-0 z-[99999999999999] flex items-center justify-center bg-black bg-opacity-80">
					<div className="relative mt-0 md:mt-25 max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white dark:bg-dark-2">
						<div className="sticky top-0 flex justify-end bg-white p-4 dark:bg-dark-2">
							<button
								onClick={() => setIsOpen(false)}
								className="text-dark-6 hover:text-dark dark:text-gray-3 dark:hover:text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
								>
									<line x1="18" y1="6" x2="6" y2="18"></line>
									<line x1="6" y1="6" x2="18" y2="18"></line>
								</svg>
							</button>
						</div>

						<div className="flex justify-center p-4 max-h-[55vh] md:max-h-[70vh]">
							<img
								src={paymentRef}
								alt="Payment Proof"
								className="h-auto max-w-full object-contain"
							/>
						</div>

						<div className="flex justify-center bg-gray-1 p-4 dark:bg-dark-3">
							<a
								href={paymentRef}
								target="_blank"
								rel="noopener noreferrer"
								className="text-primary hover:underline"
							>
								Download
							</a>
						</div>
					</div>
				</div>
			)}
		</>
	)
}

export default PaymentProofPreview;
