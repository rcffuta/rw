"use client";
import React, { createContext, useContext, useState, useEffect } from 'react'
import { fetchOrders } from '@/utils/actionUtils'
import { OrderRecord, OrderStatus } from '@rcffuta/ict-lib'

type Order = OrderRecord;

interface OrderContextType {
	orders: Order[]
	loading: boolean
	error: string | null
	updateOrderStatus: (orderId: string, status: OrderStatus) => void
	refreshOrders: () => Promise<void>
	getOrdersByStatus: (status: OrderStatus) => Order[]
	getOrderById: (id: string) => Order | undefined
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [orders, setOrders] = useState<Order[]>([])
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)

	// Simulate fetching orders from API
	const loadOrders = async () => {
		setLoading(true)
		setError(null)
		try {
			// In a real app, you would call your API here
			// const response = await api.get('/orders');
			// setOrders(response.data);

			// Using mock data for demonstration
			const data = await fetchOrders()
			setOrders(()=>data)
		} catch (err) {
			setError(err instanceof Error ? err.message : 'Failed to load orders')
			console.error('Error fetching orders:', err)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		loadOrders()
	}, [])

	const updateOrderStatus = (orderId: string, status: OrderStatus) => {
		setOrders((prevOrders) =>
			prevOrders.map((order) =>
				order.id === orderId
					? { ...order, status, updatedAt: new Date().toISOString() }
					: order
			)
		)
	}

	const getOrdersByStatus = (status: OrderStatus) => {
		return orders.filter((order) => order.status === status)
	}

	const getOrderById = (id: string) => {
		return orders.find((order) => order.id === id)
	}

	return (
		<OrderContext.Provider
			value={{
				orders,
				loading,
				error,
				updateOrderStatus,
				refreshOrders: loadOrders,
				getOrdersByStatus,
				getOrderById
			}}
		>
			{children}
		</OrderContext.Provider>
	)
}

export const useOrderContext = () => {
	const context = useContext(OrderContext)
	if (context === undefined) {
		throw new Error('useOrderContext must be used within an OrderProvider')
	}
	return context
}
