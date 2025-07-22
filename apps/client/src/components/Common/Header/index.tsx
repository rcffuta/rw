'use client'
import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCartModalContext } from '@/context/CartSidebarModalContext'
import { menuData } from './menuData'
import Logo from '../Logo'
import { CartIcon } from '../Icons'
import { observer } from 'mobx-react-lite'
import { UserHighlight } from './UserHighlight'

const Header = () => {
    const { openCartModal } = useCartModalContext()
    const [navigationOpen, setNavigationOpen] = useState(false)
    const navRef = useRef<HTMLDivElement>(null)
    const cartItems = [] // Replace with real cart store

    const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 59, seconds: 59 })

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                let { hours, minutes, seconds } = prev
                if (seconds > 0) return { ...prev, seconds: seconds - 1 }
                if (minutes > 0) return { hours, minutes: minutes - 1, seconds: 59 }
                if (hours > 0) return { hours: hours - 1, minutes: 59, seconds: 59 }
                clearInterval(timer)
                return { hours: 0, minutes: 0, seconds: 0 }
            })
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    // Close on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navRef.current && !navRef.current.contains(event.target as Node)) {
                setNavigationOpen(false)
            }
        }
        if (navigationOpen) document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [navigationOpen])

    return (
        <header className="fixed top-0 z-50 w-full bg-white shadow-lg">
            {/* Top announcement */}
            {/* <div className="bg-red text-white text-center py-1.5 text-sm font-bold">
                REDEMPTION SALE • ENDS IN {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </div> */}

            {/* Main Nav */}
            <div className="container mx-auto px-4 sm:px-6">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex-shrink-0">
                        <Logo />
                    </Link>

                    {/* Desktop */}
                    <nav className="hidden md:flex gap-6">
                        {menuData.map((item, i) => (
                            <Link
                                key={i}
                                href={item.path}
                                className="text-dark-3 hover:text-blue-dark font-bold transition-colors"
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>

                    {/* Right side */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={openCartModal}
                            className="relative p-2 rounded hover:bg-gray-2 transition-colors"
                            aria-label="Cart"
                        >
                            <CartIcon />
                            {cartItems.length > 0 && (
                                <span className="absolute -top-1 -right-1 bg-red text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {cartItems.length}
                                </span>
                            )}
                        </button>

                        <UserHighlight />

                        {/* Hamburger */}
                        <button
                            onClick={() => setNavigationOpen(!navigationOpen)}
                            className="md:hidden focus:outline-none"
                            aria-label="Toggle menu"
                        >
                            <div className="space-y-1">
                                <span className="block h-0.5 w-6 bg-dark"></span>
                                <span className="block h-0.5 w-6 bg-dark"></span>
                                <span className="block h-0.5 w-6 bg-dark"></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
                    navigationOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
            >
                <div
                    ref={navRef}
                    className={`absolute top-0 right-0 w-3/4 max-w-xs h-full bg-white shadow-xl px-6 py-10 transform transition-transform duration-300 ease-in-out ${
                        navigationOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    {/* Close button */}
                    <button
                        onClick={() => setNavigationOpen(false)}
                        className="absolute top-4 right-4 text-dark-2 hover:text-red"
                        aria-label="Close menu"
                    >
                        ✕
                    </button>

                    {/* Nav Items */}
                    <nav className="flex flex-col space-y-6 mt-8">
                        {menuData.map((item, i) => (
                            <Link
                                key={i}
                                href={item.path}
                                onClick={() => setNavigationOpen(false)}
                                className="text-dark-3 text-lg font-semibold hover:text-red transition-colors"
                            >
                                {item.title}
                            </Link>
                        ))}

                        <button
                            onClick={() => {
                                openCartModal()
                                setNavigationOpen(false)
                            }}
                            className="flex items-center gap-3 text-dark-3 text-lg font-semibold pt-6 hover:text-red"
                        >
                            Cart
                            {cartItems.length > 0 && (
                                <span className="bg-red text-white text-sm font-bold rounded-full h-6 w-6 flex items-center justify-center">
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
