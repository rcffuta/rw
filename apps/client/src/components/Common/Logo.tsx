import Image from 'next/image'
import clsx from 'clsx'
import { APP_NAME } from '@rw/shared'

interface LogoProps {
    className?: string
    lightModeOnly?: boolean
    darkModeOnly?: boolean
    priority?: boolean
}

export default function Logo({
    className = '',
    lightModeOnly = false,
    darkModeOnly = false,
    priority = false,
}: LogoProps) {
    const logo = '/logos/logo.png'
    const darkLogo = '/logos/logo-dark.png' // Consider using a proper dark mode logo

    // Container sizing should match your logo's aspect ratio
    return (
        <div
            className={clsx(
                'relative',
                lightModeOnly ? 'dark:hidden' : darkModeOnly ? 'hidden dark:block' : ''
            )}
        >
            {/* Light Mode Logo */}
            {!darkModeOnly && (
                <Image
                    src={logo}
                    width={150}
                    height={16}
                    className={clsx('object-contain dark:hidden ', className)}
                    alt={APP_NAME}
                    priority={priority}
                    quality={100}
                />
            )}

            {/* Dark Mode Logo */}
            {!lightModeOnly && (
                <Image
                    src={darkLogo}
                    width={219}
                    height={36}
                    className={clsx('hidden object-contain dark:block', className)}
                    alt={APP_NAME}
                    priority={priority}
                    quality={100}
                />
            )}
        </div>
    )
}
