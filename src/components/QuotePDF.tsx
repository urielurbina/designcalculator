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
    backgroundColor: '#ffffff',
    color: '#374151',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
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
    fontSize: 32,
    fontFamily: 'Helvetica',
    color: '#111827',
    marginBottom: 8,
  },
  quoteDetails: {
    marginTop: 8,
  },
  quoteNumber: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  dates: {
    fontSize: 10,
    color: '#6b7280',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica',
    color: '#111827',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 40,
    marginBottom: 40,
  },
  infoColumn: {
    flex: 1,
  },
  infoItem: {
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 12,
    color: '#111827',
  },
  serviceItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9fafb',
    borderRadius: 6,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  serviceName: {
    fontSize: 13,
    color: '#111827',
  },
  servicePrice: {
    fontSize: 13,
    color: '#111827',
  },
  serviceDescription: {
    fontSize: 11,
    color: '#6b7280',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    fontStyle: 'italic',
  },
  priceBreakdown: {
    marginTop: 30,
    padding: 24,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 11,
    color: '#6b7280',
  },
  value: {
    fontSize: 11,
    color: '#111827',
  },
  total: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: 14,
    color: '#111827',
  },
  totalValue: {
    fontSize: 14,
    color: '#111827',
  },
  terms: {
    marginTop: 40,
    padding: 24,
    backgroundColor: '#f9fafb',
    borderRadius: 8,
  },
  termsTitle: {
    fontSize: 13,
    color: '#111827',
    marginBottom: 12,
  },
  termsText: {
    fontSize: 11,
    color: '#6b7280',
    marginBottom: 6,
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    right: 40,
    textAlign: 'center',
    color: '#9ca3af',
    fontSize: 10,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  notes: {
    fontSize: 11,
    color: '#6b7280',
    lineHeight: 1.4,
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

      <View style={styles.infoGrid}>
        <View style={styles.infoColumn}>
          <Text style={styles.sectionTitle}>Información del Diseñador</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Nombre</Text>
            <Text style={styles.infoValue}>{quoteInfo.designerName}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Sitio Web</Text>
            <Text style={styles.infoValue}>{quoteInfo.designerWebsite}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{quoteInfo.designerEmail}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Teléfono</Text>
            <Text style={styles.infoValue}>{quoteInfo.designerPhone}</Text>
          </View>
        </View>

        <View style={styles.infoColumn}>
          <Text style={styles.sectionTitle}>Información del Cliente</Text>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Nombre</Text>
            <Text style={styles.infoValue}>{quoteInfo.clientName}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Empresa</Text>
            <Text style={styles.infoValue}>{quoteInfo.clientCompany}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{quoteInfo.clientEmail}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Teléfono</Text>
            <Text style={styles.infoValue}>{quoteInfo.clientPhone}</Text>
          </View>
        </View>
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
          <View style={styles.priceRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${totalPrice.toLocaleString()} MXN</Text>
          </View>
        </View>
      </View>

      {quoteInfo.notes && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notas Adicionales</Text>
          <Text style={styles.notes}>{quoteInfo.notes}</Text>
        </View>
      )}

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