// src/utils/exportAsPDF.tsx
"use client";


import { PDFDownloadLink, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { VariantAggregate } from './orderUtils';

const styles = StyleSheet.create({
  page: { padding: 30 },
  header: { fontSize: 20, marginBottom: 20, textAlign: 'center' },
  table: { display: "flex", width: "100%", marginBottom: 20 },
  tableHeader: { 
    flexDirection: "row", 
    borderBottomWidth: 1, 
    borderBottomColor: "#000",
    paddingBottom: 5,
    marginBottom: 5
  },
  tableRow: { flexDirection: "row", marginBottom: 5 },
  cell: { flex: 1, fontSize: 10 },
  headerCell: { flex: 1, fontWeight: 'bold' },
  variantHeader: { 
    fontSize: 14, 
    marginTop: 15, 
    marginBottom: 5,
    backgroundColor: '#f0f0f0',
    padding: 5
  }
});

const AggregatesDocument = ({ aggregates }: { aggregates: VariantAggregate[] }) => (
  <Document>
    <Page style={styles.page}>
      <Text style={styles.header}>Variant Aggregation Report</Text>
      
      {aggregates.map((variant) => (
        <View key={variant.variantKey}>
          <Text style={styles.variantHeader}>
            {variant.name} - {variant.color}, {variant.size}: 
            {variant.quantity} units (${variant.totalAmount.toFixed(2)})
          </Text>
          
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={styles.headerCell}>Order ID</Text>
              <Text style={styles.headerCell}>Customer</Text>
              <Text style={styles.headerCell}>Qty</Text>
              <Text style={styles.headerCell}>Status</Text>
            </View>
            
            {variant.orders.map((order) => (
              <View style={styles.tableRow} key={order.orderId}>
                <Text style={styles.cell}>{order.orderId}</Text>
                <Text style={styles.cell}>{order.customerName}</Text>
                <Text style={styles.cell}>{order.quantity}</Text>
                <Text style={styles.cell}>{order.status}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </Page>
  </Document>
);

export const ExportAsPDF = ({aggregates}: { aggregates: VariantAggregate[] }) => {
	return (
		<PDFDownloadLink
			document={<AggregatesDocument aggregates={aggregates} />}
			fileName={`variant-aggregates-${new Date().toISOString()}.pdf`}
		>
			{({ loading }) => (loading ? 'Preparing preorder list...' : 'Download Preorder list')}
		</PDFDownloadLink>
	)
}