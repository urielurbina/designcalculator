import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  Font,
} from '@react-pdf/renderer';
import { QuoteInfo, SelectedService } from '../../types';
import { PDFDesignConfig } from '../../services/pdfDesignService';

Font.register({
  family: 'Helvetica',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf' }
  ]
});

interface CustomQuotePDFProps {
  quoteInfo: QuoteInfo;
  services: SelectedService[];
  totalPrice: {
    mxn: number;
    usd: number;
  };
  currency: string;
  design: PDFDesignConfig;
}

const createStyles = (design: PDFDesignConfig) => StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: design.fontFamily,
    fontSize: design.fontSize.body,
    backgroundColor: design.backgroundColor,
    color: design.textColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: design.logoPosition === 'center' ? 'center' : 'space-between',
    marginBottom: 20,
    borderBottomWidth: design.borders.width,
    borderBottomColor: design.borders.color,
    borderBottomStyle: design.borders.style,
    paddingBottom: 15,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    width: 120,
    alignItems: design.logoPosition === 'right' ? 'flex-end' : 'flex-start',
  },
  logo: {
    width: 100,
    height: 40,
    objectFit: 'contain',
  },
  title: {
    fontSize: 20,
    fontFamily: design.fontFamily,
    color: design.primaryColor,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: design.accentColor,
    marginBottom: 8,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: design.spacing.section,
    padding: design.serviceCard.padding,
    backgroundColor: design.serviceCard.backgroundColor,
    borderRadius: design.serviceCard.borderRadius,
    borderWidth: 1,
    borderColor: design.serviceCard.borderColor,
    ...(design.serviceCard.shadow && design.shadows.enabled && {
      shadowColor: design.shadows.color,
      shadowOpacity: design.shadows.opacity,
      shadowRadius: design.shadows.blur,
    }),
  },
  infoColumn: {
    flex: 1,
  },
  label: {
    fontSize: 8,
    color: design.secondaryTextColor,
    marginBottom: 2,
  },
  value: {
    fontSize: 10,
    color: design.textColor,
    marginBottom: 8,
  },
  servicesSection: {
    marginVertical: design.spacing.section,
  },
  serviceCard: {
    marginBottom: design.spacing.element,
    padding: design.serviceCard.padding,
    backgroundColor: design.serviceCard.backgroundColor,
    borderRadius: design.serviceCard.borderRadius,
    borderWidth: 1,
    borderColor: design.serviceCard.borderColor,
    ...(design.serviceCard.shadow && design.shadows.enabled && {
      shadowColor: design.shadows.color,
      shadowOpacity: design.shadows.opacity,
      shadowRadius: design.shadows.blur,
    }),
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceName: {
    fontSize: 10,
    color: design.textColor,
    flex: 1,
    fontWeight: 'bold',
  },
  servicePrice: {
    fontSize: 10,
    color: design.textColor,
    textAlign: 'right',
  },
  serviceDescription: {
    fontSize: 8,
    color: design.secondaryTextColor,
    marginTop: 4,
    fontStyle: 'italic',
  },
  priceBreakdown: {
    marginTop: design.spacing.section,
    padding: design.serviceCard.padding,
    backgroundColor: design.serviceCard.backgroundColor,
    borderRadius: design.serviceCard.borderRadius,
    borderWidth: 1,
    borderColor: design.serviceCard.borderColor,
    ...(design.serviceCard.shadow && design.shadows.enabled && {
      shadowColor: design.shadows.color,
      shadowOpacity: design.shadows.opacity,
      shadowRadius: design.shadows.blur,
    }),
  },
  totalSection: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: design.borders.width,
    borderTopColor: design.borders.color,
    borderTopStyle: design.borders.style,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 12,
    color: design.primaryColor,
    fontWeight: 'bold',
  },
  totalAmount: {
    fontSize: 12,
    color: design.primaryColor,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: design.secondaryTextColor,
    fontSize: 8,
    paddingTop: 10,
    borderTopWidth: design.borders.width,
    borderTopColor: design.borders.color,
    borderTopStyle: design.borders.style,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 9,
    color: design.secondaryTextColor,
  },
  termsSection: {
    position: 'absolute',
    bottom: 50,
    left: 30,
    right: 30,
    fontSize: 6,
    color: design.secondaryTextColor,
    textAlign: 'justify',
  },
  termsTitle: {
    fontSize: 12,
    color: design.secondaryTextColor,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  termsList: {
    marginBottom: 12,
  },
  termItem: {
    fontSize: 8,
    marginBottom: 2,
    color: design.secondaryTextColor,
  },
});

export const CustomQuotePDF: React.FC<CustomQuotePDFProps> = ({
  quoteInfo,
  services,
  totalPrice,
  currency,
  design,
}) => {
  console.log('Renderizando CustomQuotePDF con:', {
    quoteInfo,
    services,
    totalPrice,
    currency,
    design
  });

  const styles = createStyles(design);
  console.log('Estilos generados:', styles);

  const getDisplayPrice = (price: { mxn: number; usd: number }) => {
    const value = currency === 'MXN' ? price.mxn : price.usd;
    return `$${value.toLocaleString(currency === 'MXN' ? 'es-MX' : 'en-US')} ${currency}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {design.showHeader && (
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.title}>Cotización #{quoteInfo.quoteNumber}</Text>
              <View style={styles.metaInfo}>
                <Text style={styles.metaText}>Fecha: {quoteInfo.quoteDate}</Text>
                <Text style={styles.metaText}>Válido hasta: {quoteInfo.validUntil}</Text>
              </View>
            </View>
            {quoteInfo.designerLogo && (
              <View style={styles.headerRight}>
                <Image src={quoteInfo.designerLogo} style={styles.logo} />
              </View>
            )}
          </View>
        )}

        <View style={styles.infoGrid}>
          <View style={styles.infoColumn}>
            <Text style={styles.subtitle}>Proveedor</Text>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.value}>{quoteInfo.designerName}</Text>
            <Text style={styles.label}>Sitio Web</Text>
            <Text style={styles.value}>{quoteInfo.designerWebsite}</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{quoteInfo.designerEmail}</Text>
            <Text style={styles.label}>Teléfono</Text>
            <Text style={styles.value}>{quoteInfo.designerPhone}</Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.subtitle}>Cliente</Text>
            <Text style={styles.label}>Nombre</Text>
            <Text style={styles.value}>{quoteInfo.clientName}</Text>
            <Text style={styles.label}>Empresa</Text>
            <Text style={styles.value}>{quoteInfo.clientCompany}</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{quoteInfo.clientEmail}</Text>
            <Text style={styles.label}>Teléfono</Text>
            <Text style={styles.value}>{quoteInfo.clientPhone}</Text>
          </View>
        </View>

        <View style={styles.servicesSection}>
          <Text style={styles.subtitle}>Servicios</Text>
          {services.map((service, index) => {
            console.log('Renderizando servicio:', service);
            return (
              <View key={index} style={styles.serviceCard}>
                <View style={styles.serviceHeader}>
                  <Text style={styles.serviceName}>{service.name}</Text>
                  <Text style={styles.servicePrice}>
                    {getDisplayPrice({ mxn: service.finalPrice, usd: service.finalPriceUSD })}
                  </Text>
                </View>
                {service.description && (
                  <Text style={styles.serviceDescription}>{service.description}</Text>
                )}
              </View>
            );
          })}
        </View>

        <View style={styles.priceBreakdown}>
          <View style={styles.totalSection}>
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalAmount}>{getDisplayPrice(totalPrice)}</Text>
            </View>
          </View>
        </View>

        <View style={styles.termsSection}>
          <Text style={styles.termsTitle}>Términos y Condiciones</Text>
          <View style={styles.termsList}>
            <Text style={styles.termItem}>• Los precios no incluyen IVA (16%)</Text>
            <Text style={styles.termItem}>• El tiempo de entrega comienza a partir del pago del anticipo del 50%</Text>
            <Text style={styles.termItem}>• Esta cotización tiene una validez de 30 días a partir de su emisión</Text>
            <Text style={styles.termItem}>• Se incluyen hasta 2 rondas de revisiones por entregable</Text>
            <Text style={styles.termItem}>• Revisiones adicionales tendrán un costo extra del 25% sobre el valor del entregable</Text>
            <Text style={styles.termItem}>• Los archivos fuente se entregarán una vez completado el pago total</Text>
          </View>
        </View>

        {design.showFooter && (
          <View style={styles.footer}>
            <Text>{design.footerText.replace('{year}', new Date().getFullYear().toString())}</Text>
          </View>
        )}
      </Page>
    </Document>
  );
};

interface PreviewWrapperProps extends CustomQuotePDFProps {
  width?: string | number;
  height?: string | number;
}

export const CustomQuotePDFPreview: React.FC<PreviewWrapperProps> = ({
  width = '100%',
  height = '100%',
  ...props
}) => {
  console.log('Renderizando CustomQuotePDFPreview con props:', props);
  
  return (
    <PDFViewer width={width} height={height}>
      <CustomQuotePDF {...props} />
    </PDFViewer>
  );
};

export default CustomQuotePDF; 