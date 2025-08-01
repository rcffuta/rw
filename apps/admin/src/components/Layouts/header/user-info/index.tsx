'use client'

import { APP_ADMIN_USERNAME } from "@rw/shared"

// import { useAuthenticatedUser } from '@rw/shared'

export function UserInfo() {
	// const { user } = useAuthenticatedUser()
	const user = {
		username: APP_ADMIN_USERNAME
	}

	return (
		<div className="flex items-center gap-1 font-medium text-dark dark:text-dark-6">
			<span className="text-capitalize">{user?.username ?? 'Guest!'}</span>
		</div>
	)
}

// function UserDropDown() {
//     return (
//         <Dropdown isOpen={isOpen} setIsOpen={() => {}}>
//             <DropdownTrigger className="rounded align-middle outline-none ring-primary ring-offset-2 focus-visible:ring-1 dark:ring-offset-gray-dark">
//                 <span className="sr-only">My Account</span>

//                 <figure className="flex items-center gap-3">
//                     {/* <Image
//             src={USER.img}
//             className="size-12"
//             alt={`Avatar of ${USER.name}`}
//             role="presentation"
//             width={200}
//             height={200}
//           /> */}
//                     <figcaption className="flex items-center gap-1 font-medium text-dark dark:text-dark-6 max-[1024px]:sr-only">
//                         <span className="text-capitalize">
//                             {USER?.username ?? "Guest!"}
//                         </span>

//                         {/* <ChevronUpIcon
//               aria-hidden
//               className={cn(
//                 "rotate-180 transition-transform",
//                 isOpen && "rotate-0",
//               )}
//               strokeWidth={1.5}
//             /> */}
//                     </figcaption>
//                 </figure>
//             </DropdownTrigger>

//             <DropdownContent
//                 className="border border-stroke bg-white shadow-md dark:border-dark-3 dark:bg-gray-dark min-[230px]:min-w-[17.5rem]"
//                 align="end"
//             >
//                 <h2 className="sr-only">User information</h2>

//                 <figure className="flex items-center gap-2.5 px-5 py-3.5">
//                     {/* <Image
//             src={USER.image}
//             className="size-12"
//             alt={`Avatar for ${USER.name}`}
//             role="presentation"
//             width={200}
//             height={200}
//           /> */}

//                     <figcaption className="space-y-1 text-base font-medium">
//                         <div className="mb-2 leading-none text-dark dark:text-white">
//                             {USER?.username}
//                         </div>

//                         <div className="leading-none text-gray-6">
//                             {USER?.email}
//                         </div>
//                     </figcaption>
//                 </figure>

//                 <hr className="border-[#E8E8E8] dark:border-dark-3" />

//                 <div className="p-2 text-base text-[#4B5563] dark:text-dark-6 [&>*]:cursor-pointer">
//                     <Link
//                         href={"/profile"}
//                         onClick={() => {}}
//                         className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
//                     >
//                         <UserIcon />

//                         <span className="mr-auto text-base font-medium">
//                             View profile
//                         </span>
//                     </Link>

//                     <Link
//                         href={"/pages/settings"}
//                         onClick={() => {}}
//                         className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
//                     >
//                         <SettingsIcon />

//                         <span className="mr-auto text-base font-medium">
//                             Account Settings
//                         </span>
//                     </Link>
//                 </div>

//                 <hr className="border-[#E8E8E8] dark:border-dark-3" />

//                 <div className="p-2 text-base text-[#4B5563] dark:text-dark-6">
//                     <button
//                         className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-[9px] hover:bg-gray-2 hover:text-dark dark:hover:bg-dark-3 dark:hover:text-white"
//                         onClick={() => {}}
//                     >
//                         <LogOutIcon />

//                         <span className="text-base font-medium">Log out</span>
//                     </button>
//                 </div>
//             </DropdownContent>
//         </Dropdown>
//     );
// }
