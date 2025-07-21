'use client'

import { useState } from 'react'

import { deleteProfileImage, uploadProfileImage } from '@/actions/storage.action'
import toast from 'react-hot-toast'
import clsx from 'clsx'

type IconProps = React.SVGProps<SVGSVGElement>

export function UploadIcon(props: IconProps) {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" {...props}>
            <g clipPath="url(#clip0_2298_23087)">
                <path
                    d="M18.75 13.7501C18.375 13.7501 18.0313 14.0626 18.0313 14.4688V17.2501C18.0313 17.5313 17.8125 17.7501 17.5313 17.7501H2.46875C2.1875 17.7501 1.96875 17.5313 1.96875 17.2501V14.4688C1.96875 14.0626 1.625 13.7501 1.25 13.7501C0.875 13.7501 0.53125 14.0626 0.53125 14.4688V17.2501C0.53125 18.3126 1.375 19.1563 2.4375 19.1563H17.5313C18.5938 19.1563 19.4375 18.3126 19.4375 17.2501V14.4688C19.4688 14.0626 19.125 13.7501 18.75 13.7501Z"
                    fill=""
                />
                <path
                    d="M5.96875 6.46881L9.3125 3.21881V14.0313C9.3125 14.4063 9.625 14.7501 10.0312 14.7501C10.4062 14.7501 10.75 14.4376 10.75 14.0313V3.21881L14.0937 6.46881C14.2187 6.59381 14.4063 6.65631 14.5938 6.65631C14.7813 6.65631 14.9688 6.59381 15.0938 6.43756C15.375 6.15631 15.3438 5.71881 15.0938 5.43756L10.5 1.06256C10.2187 0.812561 9.78125 0.812561 9.53125 1.06256L4.96875 5.46881C4.6875 5.75006 4.6875 6.18756 4.96875 6.46881C5.25 6.71881 5.6875 6.75006 5.96875 6.46881Z"
                    fill=""
                />
            </g>
            <defs>
                <clipPath id="clip0_2298_23087">
                    <rect width="20" height="20" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}


export default function PhotoUploader({
	imageUrl,
	onUpload,
	required,
	folder,
}: {
	imageUrl: string | null
	onUpload: (url: string | null) => void;
	required?: boolean;
	folder?: string;
}) {
	// const [imageUrl, setImageUrl] = useState<string | null>(null);
	const [isUploading, setIsUploading] = useState(false)
	const [publicId, setPublicId] = useState<string | null>(null)

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const formData = new FormData()
		formData.append('file', file)

		setIsUploading(true)

		try {
			const result: any = await uploadProfileImage(formData, folder)
			onUpload(result.secure_url)
			setPublicId(result.public_id)
			toast.success('Uploaded Image')
		} catch (err) {
			console.dir(err)
			console.error('Upload failed', err)
			toast.error('Upload failed')
		} finally {
			setIsUploading(false)
		}
	}

	const handleDelete = async () => {
		if (!publicId) return
		const toastId = 'deleteToast'

		toast.loading('Deleting image', { id: toastId })

		try {
			await deleteProfileImage(publicId)
			onUpload(null)
			setPublicId(null)
			toast.success('Deleted Image', { id: toastId })
		} catch (err) {
			toast.error('Delete failed', { id: toastId })
			console.error('Failed to delete image:', err)
		}
	}

	return (
		<>
			<>
				{(!imageUrl && required) ? <span className="ml-1 mt-1 select-none text-red">This is required</span>: null}
				{imageUrl && (
					<div className="mb-4 flex items-center justify-center gap-3">
						<img
							src={imageUrl}
							width={250}
							height={250}
							alt="Product variant preview" // More descriptive alt text
							className={clsx(
								'size-50 rounded-md object-contain',
								'border-2 border-stroke dark:border-dark-3', // Added border for better visibility
								'transition-transform duration-200 hover:scale-105' // Subtle hover effect
							)}
							loading="lazy" // Better performance
							onError={(e) => {
								// Fallback if image fails to load
								;(e.target as HTMLImageElement).src = '/assets/fallback.svg'
							}}
						/>
						<div>
							{/* <span className="mb-1.5 font-medium text-dark dark:text-white">
                Edit your photo
              </span> */}
							<span className="flex gap-3">
								<button
									type="button"
									className="text-body-sm hover:text-red"
									onClick={handleDelete}
								>
									Delete
								</button>
							</span>
						</div>
					</div>
				)}

				{imageUrl ? null : (
					<div className="relative mb-5.5 block w-full rounded-xl border border-dashed border-gray-4 bg-gray-2 hover:border-primary dark:border-dark-3 dark:bg-dark-2 dark:hover:border-primary">
						<input
							type="file"
							name="profilePhoto"
							id="profilePhoto"
							accept="image/png, image/jpg, image/jpeg"
							hidden
							onChange={handleChange}
							// disabled={isUploading}
						/>

						<label
							htmlFor="profilePhoto"
							className="flex cursor-pointer flex-col items-center justify-center p-4 sm:py-7.5"
						>
							<div className="flex size-13.5 items-center justify-center rounded-full border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
								{isUploading ? (
									<span className="animate-spin">⏳</span>
								) : (
									<UploadIcon />
								)}
							</div>

							<p className="mt-2.5 text-body-sm font-medium">
								<span className="text-primary">Click to upload</span> or drag and
								drop
							</p>

							<p className="mt-1 text-body-xs">
								SVG, PNG, JPG or GIF (max, 800 X 800px)
							</p>
						</label>
					</div>
				)}

				{/* <div className="flex justify-end gap-3">
          <button
            className="flex justify-center rounded-lg border border-stroke px-6 py-[7px] font-medium text-dark hover:shadow-1 dark:border-dark-3 dark:text-white"
            type="button"
          >
            Cancel
          </button>
          <button
            className="flex items-center justify-center rounded-lg bg-primary px-6 py-[7px] font-medium text-gray-2 hover:bg-opacity-90"
            type="submit"
            disabled={!imageUrl}
          >
            Save
          </button>
        </div> */}
			</>
		</>
	)
}
