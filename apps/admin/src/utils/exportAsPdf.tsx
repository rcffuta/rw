// src/utils/exportAsPDF.tsx
"use client";


import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { ProductAggregate } from './orderUtils';

const styles = StyleSheet.create({
	page: {
		padding: 40,
		fontFamily: 'Helvetica',
		backgroundColor: '#ffffff'
	},
	header: {
		fontSize: 24,
		marginBottom: 30,
		textAlign: 'center',
		color: '#3B82F6',
		fontWeight: 'bold',
		textTransform: 'uppercase',
		letterSpacing: 1
	},
	reportTitle: {
		fontSize: 10,
		textAlign: 'center',
		color: '#6B7280',
		marginBottom: 30,
		fontStyle: 'italic'
	},
	productCard: {
		marginBottom: 30,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 8,
		padding: 15,
		backgroundColor: '#F9FAFB'
	},
	productHeader: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#111928',
		marginBottom: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
		paddingBottom: 8
	},
	variantSection: {
		marginBottom: 20,
		padding: 12,
		backgroundColor: '#FFFFFF',
		borderRadius: 6,
		borderLeftWidth: 4,
		borderLeftColor: '#3B82F6'
	},
	variantHeader: {
		fontSize: 14,
		fontWeight: 'semibold',
		color: '#374151',
		marginBottom: 8,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	sizeBadge: {
		backgroundColor: '#EFF6FF',
		color: '#1D4ED8',
		paddingHorizontal: 8,
		paddingVertical: 3,
		borderRadius: 4,
		fontSize: 10,
		marginRight: 5,
		marginBottom: 5
	},
	sizeContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 10
	},
	table: {
		width: '100%',
		marginTop: 10,
		borderWidth: 1,
		borderColor: '#E5E7EB',
		borderRadius: 6,
		overflow: 'hidden'
	},
	tableHeader: {
		flexDirection: 'row',
		backgroundColor: '#F3F4F6',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB'
	},
	tableRow: {
		flexDirection: 'row',
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: '#E5E7EB',
		':last-child': {
			borderBottomWidth: 0
		}
	},
	cell: {
		flex: 1,
		fontSize: 10,
		paddingHorizontal: 8,
		color: '#4B5563'
	},
	headerCell: {
		flex: 1,
		fontWeight: 'bold',
		fontSize: 10,
		paddingHorizontal: 8,
		color: '#111928',
		textTransform: 'uppercase'
	},
	statusBadge: {
		fontSize: 9,
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 10,
		textAlign: 'center'
	},
	summaryBar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 15,
		paddingTop: 10,
		borderTopWidth: 1,
		borderTopColor: '#E5E7EB'
	},
	summaryText: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#111928'
	}
})

const statusColors = {
	pending: '#F59E0B',
	paid: '#10B981',
	shipped: '#3B82F6',
	delivered: '#8B5CF6',
	cancelled: '#EF4444'
}

const AggregatesDocument = ({ aggregates }: { aggregates: ProductAggregate[] }) => (
	<Document>
		<Page style={styles.page}>
			<Text style={styles.header}>Redemption Week'25 Pending Orders Product Aggregation Report</Text>
			<Text style={styles.reportTitle}>Generated on {new Date().toLocaleDateString()}</Text>

			{aggregates.map((product) => (
				<View key={product.name} style={styles.productCard}>
					<Text style={styles.productHeader}>
						{product.name} • Total: {product.overallTotal} units
					</Text>

					{product.deliverables.map((variant) => (
						<View
							key={`${product.name}-${variant.color}`}
							style={styles.variantSection}
						>
							<View style={styles.variantHeader}>
								<Text>
									Color:{' '}
									<Text style={{ fontWeight: 'bold' }}>{variant.color}</Text> •
									Total:{' '}
									<Text style={{ fontWeight: 'bold' }}>{variant.total}</Text>
								</Text>
							</View>

							<View style={styles.sizeContainer}>
								{variant.sizes.map((size) => (
									<Text key={size.size} style={styles.sizeBadge}>
										{size.size}: {size.quantity}
									</Text>
								))}
							</View>

							{/* <View style={styles.table}>
								<View style={styles.tableHeader}>
									<Text style={styles.headerCell}>Order ID</Text>
									<Text style={styles.headerCell}>Customer</Text>
									<Text style={styles.headerCell}>Qty</Text>
									<Text style={styles.headerCell}>Status</Text>
								</View>

								{variant.orders?.map((order) => (
									<View style={styles.tableRow} key={order.orderId}>
										<Text style={styles.cell}>{order.orderId}</Text>
										<Text style={styles.cell}>{order.customerName}</Text>
										<Text style={styles.cell}>{order.quantity}</Text>
										<Text
											style={[
												styles.cell,
												styles.statusBadge,
												{
													backgroundColor: `${statusColors[order.status as keyof typeof statusColors]}20`,
													color: statusColors[
														order.status as keyof typeof statusColors
													]
												}
											]}
										>
											{order.status}
										</Text>
									</View>
								))}
							</View> */}
						</View>
					))}

					<View style={styles.summaryBar}>
						<Text style={styles.summaryText}>Product Total:</Text>
						<Text style={styles.summaryText}>{product.overallTotal} units</Text>
					</View>
				</View>
			))}
		</Page>
	</Document>
)

export const ExportAsPDF = ({ aggregates }: { aggregates: ProductAggregate[] }) => {
	return (
		<PDFDownloadLink
			document={<AggregatesDocument aggregates={aggregates} />}
			fileName={`variant-aggregates-${new Date().toISOString()}.pdf`}
		>
			{({ loading }) => (loading ? 'Preparing preorder list...' : 'Download Preorder list')}
		</PDFDownloadLink>
	)
}