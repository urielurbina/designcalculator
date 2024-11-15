import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFDownloadLink,
  Image,
  Font
} from '@react-pdf/renderer';
import { QuoteInfo, SelectedService } from '../types';
import { FileDown } from 'lucide-react';
import { volumeDiscounts, clientDiscounts, maintenanceFees } from '../data/pricing';

// Registrar fuentes
Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf' }
  ]
});

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#6366f1',
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    width: 150,
    alignItems: 'flex-end',
  },
  logo: {
    width: 120,
    height: 50,
    objectFit: 'contain',
  },
  title: {
    fontSize: 28,
    fontFamily: 'Helvetica',
    color: '#4f46e5',
    marginBottom: 10,
  },
  quoteDetails: {
    marginTop: 10,
  },
  quoteNumber: {
    fontSize: 14,
    color: '#6b7280',
  },
  dates: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 5,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: 'Helvetica',
    color: '#4f46e5',
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  serviceItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f9fafb',
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  serviceName: {
    fontSize: 14,
    color: '#111827',
    fontWeight: 'bold',
  },
  servicePrice: {
    fontSize: 14,
    color: '#4f46e5',
    fontWeight: 'bold',
  },
  serviceDetails: {
    marginTop: 5,
  },
  serviceDescription: {
    fontSize: 10,
    color: '#4b5563',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    fontStyle: 'italic',
  },
  priceBreakdown: {
    marginTop: 30,
    padding: 20,
    backgroundColor: '#f8fafc',
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 10,
    color: '#6b7280',
  },
  value: {
    fontSize: 11,
    color: '#111827',
  },
  total: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4f46e5',
  },
  terms: {
    marginTop: 40,
    padding: 20,
    backgroundColor: '#f9fafb',
  },
  termsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 10,
  },
  termsText: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 5,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  }
});

interface QuotePDFProps {
  quoteInfo: QuoteInfo;
  services: SelectedService[];
  totalPrice: number;
  discounts: {
    volume: string;
    client: string;
    maintenance: string;
  };
  terms: string[];
}

const QuoteDocument: React.FC<QuotePDFProps> = ({ quoteInfo, services, totalPrice, discounts, terms }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Cotización</Text>
          <Text style={styles.quoteNumber}>#{quoteInfo.quoteNumber}</Text>
          <View style={styles.dates}>
            <Text>Fecha: {quoteInfo.quoteDate}</Text>
            <Text>Válido hasta: {quoteInfo.validUntil}</Text>
          </View>
        </View>
        {quoteInfo.designerLogo && (
          <View style={styles.headerRight}>
            <Image src={quoteInfo.designerLogo} style={styles.logo} />
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Servicios</Text>
        {services.map((service, index) => (
          <View key={index} style={styles.serviceItem}>
            <View style={styles.serviceHeader}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>
                ${service.finalPrice.toLocaleString()}
              </Text>
            </View>
            {service.description && (
              <Text style={styles.serviceDescription}>
                {service.description}
              </Text>
            )}
          </View>
        ))}
      </View>

      <View style={styles.priceBreakdown}>
        <Text style={styles.sectionTitle}>Resumen de Precios</Text>
        
        <View style={styles.priceRow}>
          <Text style={styles.label}>Subtotal</Text>
          <Text style={styles.value}>
            ${services.reduce((sum, s) => sum + s.finalPrice, 0).toLocaleString()}
          </Text>
        </View>

        {discounts.volume !== 'none' && (
          <View style={styles.priceRow}>
            <Text style={styles.label}>Descuento por Volumen</Text>
            <Text style={styles.value}>-{volumeDiscounts[discounts.volume] * 100}%</Text>
          </View>
        )}

        {discounts.client !== 'normal' && (
          <View style={styles.priceRow}>
            <Text style={styles.label}>Descuento Cliente</Text>
            <Text style={styles.value}>-{clientDiscounts[discounts.client] * 100}%</Text>
          </View>
        )}

        {discounts.maintenance !== 'none' && (
          <View style={styles.priceRow}>
            <Text style={styles.label}>Mantenimiento</Text>
            <Text style={styles.value}>+{maintenanceFees[discounts.maintenance] * 100}%</Text>
          </View>
        )}

        <View style={styles.total}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${totalPrice.toLocaleString()} MXN</Text>
        </View>
      </View>

      <View style={styles.terms}>
        <Text style={styles.termsTitle}>Términos y Condiciones</Text>
        {terms.map((term, index) => (
          <Text key={index} style={styles.termsText}>• {term}</Text>
        ))}
      </View>

      <View style={styles.footer}>
        <Text>
          Esta cotización es válida hasta el {quoteInfo.validUntil}
        </Text>
      </View>
    </Page>
  </Document>
);

const QuotePDF: React.FC<QuotePDFProps> = (props) => {
  return (
    <div className="flex justify-center">
      <PDFDownloadLink
        document={<QuoteDocument {...props} />}
        fileName={`cotizacion-${props.quoteInfo.quoteNumber}.pdf`}
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
      >
        {({ loading }) => (
          <>
            <FileDown className="w-5 h-5" />
            {loading ? 'Generando PDF...' : 'Descargar PDF'}
          </>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default QuotePDF;