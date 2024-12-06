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

Font.register({
  family: 'Arial',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf' }
  ]
});

const getFontFamily = (fontFamily: string) => {
  const availableFonts = ['Helvetica', 'Arial'];
  return availableFonts.includes(fontFamily) ? fontFamily : 'Helvetica';
};

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
    padding: design.spacing.page,
    fontFamily: getFontFamily(design.fontFamily),
    fontSize: 9,
    backgroundColor: design.backgroundColor,
    color: design.textColor,
  },
  header: {
    flexDirection: 'row',
    justifyContent: design.logoPosition === 'center' ? 'center' : 'space-between',
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: design.borders.color,
    borderBottomStyle: 'solid',
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
    fontSize: 16,
    fontFamily: getFontFamily(design.fontFamily),
    color: design.primaryColor,
    marginBottom: 6,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 12,
    color: design.accentColor,
    marginBottom: design.spacing.element,
  },
  infoGrid: {
    flexDirection: 'row',
    gap: 15,
    marginBottom: 25,
    backgroundColor: 'transparent',
  },
  infoColumn: {
    flex: 1,
    padding: 12,
    backgroundColor: design.serviceCard.backgroundColor,
    borderRadius: design.serviceCard.borderRadius,
    borderWidth: 0.5,
    borderColor: design.borders.color,
  },
  label: {
    fontSize: 7,
    color: design.secondaryTextColor,
    marginBottom: design.spacing.element / 4,
    fontFamily: getFontFamily(design.secondaryFontFamily),
  },
  value: {
    fontSize: 8,
    color: design.textColor,
    marginBottom: design.spacing.element / 2,
    fontFamily: getFontFamily(design.fontFamily),
  },
  servicesSection: {
    marginVertical: 15,
    breakInside: 'avoid',
    pageBreakInside: 'avoid',
  },
  serviceCard: {
    marginBottom: design.spacing.element,
    padding: design.serviceCard.padding,
    backgroundColor: design.serviceCard.backgroundColor,
    borderRadius: design.serviceCard.borderRadius,
    borderWidth: design.borders.width,
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
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingBottom: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: design.borders.color,
    borderBottomStyle: design.borders.style,
  },
  serviceName: {
    fontSize: 10,
    color: design.textColor,
    flex: 1,
    fontWeight: 'bold',
  },
  servicePrice: {
    fontSize: 10,
    color: design.primaryColor,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  serviceDescriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingTop: 8,
    paddingRight: '10%',
  },
  serviceDescription: {
    fontSize: 8,
    color: design.secondaryTextColor,
    fontFamily: getFontFamily(design.secondaryFontFamily),
    lineHeight: 1.4,
    whiteSpace: 'pre-wrap',
    width: '90%',
    paddingLeft: design.spacing.element / 2,
  },
  serviceDivider: {
    marginVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: design.borders.color,
    borderBottomStyle: design.borders.style,
  },
  priceBreakdown: {
    marginTop: design.spacing.section,
    padding: design.serviceCard.padding,
    backgroundColor: design.accentColor,
    borderRadius: design.serviceCard.borderRadius,
    borderWidth: design.borders.width,
    borderColor: design.serviceCard.borderColor,
    ...(design.serviceCard.shadow && design.shadows.enabled && {
      shadowColor: design.shadows.color,
      shadowOpacity: design.shadows.opacity,
      shadowRadius: design.shadows.blur,
    }),
  },
  totalSection: {
    breakInside: 'avoid',
    pageBreakInside: 'avoid',
    marginTop: design.spacing.section,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 12,
    color: design.backgroundColor,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  totalAmount: {
    fontSize: 14,
    color: design.backgroundColor,
    textAlign: 'right',
    fontWeight: 'bold',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    color: design.secondaryTextColor,
    fontSize: 8,
    paddingTop: 12,
    borderTopWidth: 0.5,
    borderTopColor: design.borders.color,
    borderTopStyle: design.borders.style,
  },
  metaInfo: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 15,
    marginBottom: 4,
  },
  metaText: {
    fontSize: 7,
    color: design.secondaryTextColor,
    fontFamily: getFontFamily(design.secondaryFontFamily),
  },
  termsSection: {
    position: 'relative',
    marginTop: 'auto',
    paddingTop: 20,
    marginBottom: 50,
    breakInside: 'avoid',
    pageBreakInside: 'avoid',
  },
  termsTitle: {
    fontSize: 10,
    color: design.primaryColor,
    marginBottom: 8,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  termsList: {
    marginBottom: 12,
  },
  termItem: {
    fontSize: 7,
    color: design.secondaryTextColor,
    fontFamily: getFontFamily(design.secondaryFontFamily),
    marginBottom: design.spacing.element / 4,
    lineHeight: 1.4,
  },
  contentContainer: {
    flex: 1,
    flexDirection: 'column',
    minHeight: '100%',
    breakInside: 'avoid',
    pageBreakInside: 'avoid',
  },
  mainContent: {
    flex: 1,
  },
  serviceWrapper: {
    breakInside: 'avoid',
    pageBreakInside: 'avoid',
    marginBottom: design.spacing.element,
  },
  infoWrapper: {
    breakInside: 'avoid',
    marginBottom: design.spacing.section,
  },
  serviceItemContainer: {
    breakInside: 'avoid',
    pageBreakInside: 'avoid',
    marginBottom: design.spacing.element,
  },
  infoSection: {
    breakInside: 'avoid',
    pageBreakInside: 'avoid',
    marginBottom: design.spacing.section,
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
        <View style={styles.contentContainer}>
          <View style={styles.mainContent}>
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

            <View style={styles.infoSection}>
              <View style={styles.infoGrid}>
                <View style={styles.infoColumn}>
                  <Text style={[styles.subtitle, { fontSize: 10, marginBottom: 4 }]}>Proveedor</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    <View style={{ flex: 1, minWidth: 100 }}>
                      <Text style={styles.label}>Nombre</Text>
                      <Text style={styles.value}>{quoteInfo.designerName}</Text>
                      <Text style={styles.label}>Sitio Web</Text>
                      <Text style={styles.value}>{quoteInfo.designerWebsite}</Text>
                    </View>
                    <View style={{ flex: 1, minWidth: 100 }}>
                      <Text style={styles.label}>Email</Text>
                      <Text style={styles.value}>{quoteInfo.designerEmail}</Text>
                      <Text style={styles.label}>Teléfono</Text>
                      <Text style={styles.value}>{quoteInfo.designerPhone}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.infoColumn}>
                  <Text style={[styles.subtitle, { fontSize: 10, marginBottom: 4 }]}>Cliente</Text>
                  <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    <View style={{ flex: 1, minWidth: 100 }}>
                      <Text style={styles.label}>Nombre</Text>
                      <Text style={styles.value}>{quoteInfo.clientName}</Text>
                      <Text style={styles.label}>Empresa</Text>
                      <Text style={styles.value}>{quoteInfo.clientCompany}</Text>
                    </View>
                    <View style={{ flex: 1, minWidth: 100 }}>
                      <Text style={styles.label}>Email</Text>
                      <Text style={styles.value}>{quoteInfo.clientEmail}</Text>
                      <Text style={styles.label}>Teléfono</Text>
                      <Text style={styles.value}>{quoteInfo.clientPhone}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>

            <View style={styles.servicesSection}>
              <Text style={[styles.subtitle, { marginBottom: design.spacing.element }]}>Servicios</Text>
              {services.map((service, index) => (
                <View key={index} style={styles.serviceItemContainer}>
                  <View style={styles.serviceWrapper}>
                    <View style={styles.serviceCard}>
                      <View style={styles.serviceHeader}>
                        <Text style={styles.serviceName}>{service.name}</Text>
                        <Text style={styles.servicePrice}>
                          {getDisplayPrice({ mxn: service.finalPrice, usd: service.finalPriceUSD })}
                        </Text>
                      </View>
                      {service.description && (
                        <View style={styles.serviceDescriptionContainer}>
                          <Text style={styles.serviceDescription}>
                            {service.description
                              .split('\n')
                              .map((line, i, arr) => (
                                <React.Fragment key={i}>
                                  {line}
                                  {i < arr.length - 1 && (arr[i + 1] === '' ? '\n\n' : '\n')}
                                </React.Fragment>
                              ))}
                          </Text>
                        </View>
                      )}
                    </View>
                    {index < services.length - 1 && <View style={styles.serviceDivider} />}
                  </View>
                </View>
              ))}
            </View>

            <View style={styles.totalSection}>
              <View style={[styles.priceBreakdown, { breakInside: 'avoid-page' }]}>
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Total</Text>
                  <Text style={styles.totalAmount}>{getDisplayPrice(totalPrice)}</Text>
                </View>
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
        </View>
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
  
  const [key, setKey] = React.useState(0);
  
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setKey(prev => prev + 1);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <PDFViewer width={width} height={height} key={key}>
      <CustomQuotePDF {...props} />
    </PDFViewer>
  );
};

export default CustomQuotePDF; 