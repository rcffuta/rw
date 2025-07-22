'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { menuData } from './menuData'
import { useCartModalContext } from '@/context/CartSidebarModalContext'
import Logo from '../Logo'
import { CartIcon } from '../Icons' // Added FireIcon for redemption theme
import { observer } from 'mobx-react-lite'
import { UserHighlight } from './UserHighlight'
import { CART } from '@/constants'

type HeaderProps = {
    stickyMenu?: boolean
}

const Header = ({ stickyMenu=true }: HeaderProps) => {

    const cartItems = [];
    const { openCartModal } = useCartModalContext()
    // const formatCurrency = useFormatCurrency()
    const [navigationOpen, setNavigationOpen] = useState(false);

    // Sale countdown - creates urgency
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 59,
        seconds: 59,
    })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                const seconds = prev.seconds - 1
                if (seconds >= 0) return { ...prev, seconds }

                const minutes = prev.minutes - 1
                if (minutes >= 0) return { ...prev, minutes: minutes, seconds: 59 }

                const hours = prev.hours - 1
                if (hours >= 0) return { hours, minutes: 59, seconds: 59 }

                clearInterval(timer)
                return { hours: 0, minutes: 0, seconds: 0 }
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <header
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${stickyMenu ? 'bg-white shadow-lg py-2' : 'bg-white py-4'}`}
        >
            {/* Top announcement bar */}
            <div className="bg-red-600 text-center py-1.5 px-4 text-sm font-bold">
                <div className="container mx-auto flex items-center justify-center gap-2">
                    {/* <FireIcon className="h-4 w-4" /> */}
                    {/* <span>
                        REDEMPTION WEEK SALE: 50% OFF ALL ITEMS • ENDS IN {timeLeft.hours}h{' '}
                        {timeLeft.minutes}m {timeLeft.seconds}s
                    </span> */}
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <Logo 
                        // variant={stickyMenu ? 'white' : 'color'} 
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
                        {menuData.map((item, index) => (
                            <Link
                                key={index}
                                href={item.path}
                                className={`font-bold ${stickyMenu ? 'hover:text-red-400' : 'hover:text-red-400'} transition-colors`}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side icons */}
                    <div className="flex items-center gap-6">
                        {/* Cart with counter */}
                        <Link
                            href={CART}
                            className="relative p-2 rounded-full hover:bg-gray-800 transition-colors"
                            aria-label="Cart"
                        >
                            <div
                                className={`h-6 w-6 ${stickyMenu ? '' : ''}`}
                            >
                                <CartIcon
                                />
                            </div>
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red-600  text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </Link>

                        <UserHighlight/>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 rounded-md hover:bg-gray-800 focus:outline-none"
                            onClick={() => setNavigationOpen(!navigationOpen)}
                            aria-label="Menu"
                        >
                            <div className="w-6 flex flex-col gap-1">
                                <span
                                    className={`h-0.5 w-full bg-white transition-all ${navigationOpen ? 'rotate-45 translate-y-1.5' : ''}`}
                                ></span>
                                <span
                                    className={`h-0.5 w-full bg-white transition-all ${navigationOpen ? 'opacity-0' : 'opacity-100'}`}
                                ></span>
                                <span
                                    className={`h-0.5 w-full bg-white transition-all ${navigationOpen ? '-rotate-45 -translate-y-1.5' : ''}`}
                                ></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div
                className={`md:hidden fixed inset-0 bg-black z-40 transition-all duration-300 ease-in-out ${navigationOpen ? 'opacity-95 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}`}
            >
                <div className="container mx-auto px-4 pt-24 pb-8">
                    <nav className="flex flex-col space-y-6">
                        {menuData.map((item, index) => (
                            <Link
                                key={index}
                                href={item.path}
                                className="text-2xl font-bold  hover:text-red-400 transition-colors"
                                onClick={() => setNavigationOpen(false)}
                            >
                                {item.title}
                            </Link>
                        ))}

                        {/* Cart in mobile menu */}
                        <button
                            onClick={() => {
                                openCartModal()
                                setNavigationOpen(false)
                            }}
                            className="flex items-center gap-3 text-2xl font-bold  hover:text-red-400 transition-colors pt-6"
                        >
                            <span>Cart</span>
                            {cartItems.length > 0 && (
                                <span className="bg-red-600  text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </button>
                    </nav>
                </div>
            </div>
        </header>
    )
}

export default observer(Header)
