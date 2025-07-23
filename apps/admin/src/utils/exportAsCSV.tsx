// import { VariantAggregate } from "./orderUtils"

import { ProductAggregate } from "./orderUtils"

// src/utils/exportAsCSV.ts
export const exportAsCSV = (aggregates: ProductAggregate[]) => {
	let csvContent = 'data:text/csv;charset=utf-8,'

	// Header
	csvContent += 'Variant,Color,Size,Total Quantity,Total Amount,Order IDs\n'

	// aggregates.forEach((variant) => {
	// 	const orderIds = variant.orders.map((o: any) => o.orderId).join('; ')
	// 	csvContent += `"${variant.name}","${variant.color}","${variant.size}",${variant.quantity},${variant.totalAmount},"${orderIds}"\n`
	// })

	// const encodedUri = encodeURI(csvContent)
	// const link = document.createElement('a')
	// link.setAttribute('href', encodedUri)
	// link.setAttribute('download', `variant-aggregates-${new Date().toISOString()}.csv`)
	// document.body.appendChild(link)
	// link.click()
	// document.body.removeChild(link)
}
