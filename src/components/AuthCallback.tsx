import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          toast.error(`Error de autenticación: ${error.message}`);
          throw error;
        }
        
        if (session) {
          const { data: existingPricing, error: pricingError } = await supabase
            .from('custom_pricing')
            .select('*')
            .eq('user_id', session.user.id)
            .single();

          if (pricingError && pricingError.code !== 'PGRST116') {
            toast.error(`Error al verificar pricing: ${pricingError.message}`);
          }

          if (!existingPricing) {
            toast.loading('Configurando tu cuenta...', { duration: 2000 });
            
            const initialData = {
              user_id: session.user.id,
              base_rates: {
                "web": {
                  "ui-kit": 7000,
                  "intranet": 25000,
                  "dashboard": 15000,
                  "ecommerce": 35000,
                  "prototipo": 4000,
                  "app-design": 12000,
                  "landing-page": 5000,
                  "optimizacion": 3000,
                  "mantenimiento": 2000,
                  "webapp-basica": 15000,
                  "webapp-completa": 25000,
                  "portal-corporativo": 20000
                },
                "moda": {
                  "campana": 6000,
                  "figurin": 2000,
                  "catalogo": 4500,
                  "lookbook": 4000,
                  "coleccion": 8000,
                  "etiquetas": 2000,
                  "moodboard": 1500,
                  "portfolio": 3500,
                  "tech-pack": 3000,
                  "marca-moda": 5000,
                  "flat-sketch": 1800,
                  "patron-textil": 2500
                },
                "branding": {
                  "manual": 1000,
                  "naming": 5000,
                  "slogan": 4000,
                  "logotipo": 8000,
                  "submarca": 2500,
                  "auditoria": 1000,
                  "papeleria": 1500,
                  "trademark": 1500,
                  "arquetipos": 500,
                  "brand-book": 5000,
                  "brandscape": 4000,
                  "key-visual": 6000,
                  "brand-voice": 3000,
                  "rediseno-logo": 6000,
                  "vectorizacion": 3000,
                  "estrategia-marca": 3000,
                  "identidad-basica": 5000,
                  "identidad-visual": 6000,
                  "branding-completo": 8000,
                  "identidad-completa": 8000
                },
                "impresos": {
                  "aviso": 2500,
                  "bolsa": 3000,
                  "totem": 6000,
                  "correo": 1500,
                  "poster": 3000,
                  "empaque": 8000,
                  "folleto": 3000,
                  "portada": 4000,
                  "volante": 1500,
                  "brochure": 5000,
                  "catalogo": 2000,
                  "programa": 3000,
                  "exhibidor": 6000,
                  "invitacion": 2000,
                  "diagramacion": 2000,
                  "diseno-libro": 3000,
                  "diseno-revista": 3000
                },
                "editorial": {
                  "portada": 1500,
                  "revista": 4000,
                  "infografia": 2500,
                  "libro-arte": 8000,
                  "newsletter": 1500,
                  "whitepaper": 2500,
                  "maquetacion": 2000,
                  "memoria-anual": 7000,
                  "libro-comercial": 5000,
                  "catalogo-premium": 6000,
                  "editorial-digital": 4000,
                  "catalogo-comercial": 3000
                },
                "marketing": {
                  "stand": 10000,
                  "media-kit": 4500,
                  "packaging": 6000,
                  "pitch-deck": 4000,
                  "punto-venta": 7000,
                  "presentacion": 3500,
                  "campana-print": 7000,
                  "merchandising": 5000,
                  "campana-digital": 8000,
                  "brochure-digital": 2500,
                  "brochure-impreso": 3500,
                  "campana-completa": 15000
                },
                "foto-video": {
                  "evento": 15000,
                  "retoque": 1000,
                  "drone-dia": 12000,
                  "sonidista": 6000,
                  "drone-hora": 2000,
                  "video-rrss": 6000,
                  "camarografo": 8000,
                  "sesion-foto": 8000,
                  "video-croma": 18000,
                  "food-styling": 8000,
                  "foto-producto": 5000,
                  "video-youtube": 12000,
                  "video-corporativo": 25000
                },
                "fotografia": {
                  "aereas": 3500,
                  "lookbook": 5000,
                  "retratos": 1500,
                  "ecommerce": 3500,
                  "lifestyle": 4000,
                  "arquitectura": 4000,
                  "evento-medio": 3500,
                  "gastronomica": 3500,
                  "banco-imagenes": 7500,
                  "evento-completo": 6000,
                  "producto-basico": 2500,
                  "producto-premium": 4000
                },
                "audiovisual": {
                  "demo-reel": 6000,
                  "documental": 25000,
                  "video-aereo": 4000,
                  "animacion-3d": 10000,
                  "video-evento": 7000,
                  "podcast-setup": 4000,
                  "pack-streaming": 5000,
                  "video-producto": 8000,
                  "motion-graphics": 7000,
                  "video-comercial": 12000,
                  "video-educativo": 8000,
                  "video-corporativo": 15000
                },
                "ilustracion": {
                  "mapa": 4000,
                  "avatar": 2500,
                  "fondos": 3500,
                  "iconos": 3500,
                  "patron": 2000,
                  "mascota": 3500,
                  "portada": 4000,
                  "tecnico": 3500,
                  "producto": 2500,
                  "editorial": 4000,
                  "personaje": 2500,
                  "vectorial": 5000,
                  "infografia": 7000,
                  "storyboard": 6000,
                  "mano-alzada": 4500,
                  "colorizacion": 2000,
                  "ilustracion-3d": 12000,
                  "arte-conceptual": 5000,
                  "boceto-personaje": 3000,
                  "ilustracion-2d-bn": 4000,
                  "pagina-historieta": 8000,
                  "objetos-accesorios": 2000,
                  "ilustracion-2d-color": 6000
                },
                "social-media": {
                  "reel": 300,
                  "copywriting": 2500,
                  "pack-basico": 1500,
                  "video-redes": 500,
                  "contenido-seo": 3000,
                  "pack-completo": 3000,
                  "contenido-blog": 2000,
                  "pack-historias": 1500,
                  "pack-publicidad": 3500,
                  "estrategia-social": 2000,
                  "calendario-editorial": 2500,
                  "contenido-newsletter": 1500
                },
                "edicion-animacion": {
                  "gif": 2000,
                  "vfx": 8000,
                  "musica": 3000,
                  "edicion": 5000,
                  "video-2d": 15000,
                  "pack-rrss": 6000,
                  "rotoscopia": 25000,
                  "subtitulos": 1000,
                  "video-mixto": 20000,
                  "animacion-textos": 3000,
                  "animacion-brochure": 8000,
                  "animacion-creditos": 5000,
                  "colorizacion-video": 4000
                },
                "publicidad-exterior": {
                  "lona": 800,
                  "valla": 8000,
                  "pendon": 3000,
                  "banderola": 2500,
                  "senaletica": 5000,
                  "valla-movil": 7000,
                  "pantalla-led": 6000,
                  "rotulacion-grande": 8000,
                  "rotulacion-mediana": 5000,
                  "rotulacion-pequena": 3000,
                  "rotulacion-completa": 12000
                }
              },
              service_options: {
                "web": [
                  {
                    "label": "Dashboard",
                    "value": "dashboard"
                  },
                  {
                    "label": "Diseño de App",
                    "value": "app-design"
                  },
                  {
                    "label": "E-commerce",
                    "value": "ecommerce"
                  },
                  {
                    "label": "Intranet",
                    "value": "intranet"
                  },
                  {
                    "label": "Landing Page",
                    "value": "landing-page"
                  },
                  {
                    "label": "Mantenimiento",
                    "value": "mantenimiento"
                  },
                  {
                    "label": "Optimización",
                    "value": "optimizacion"
                  },
                  {
                    "label": "Portal Corporativo",
                    "value": "portal-corporativo"
                  },
                  {
                    "label": "Prototipo",
                    "value": "prototipo"
                  },
                  {
                    "label": "UI Kit",
                    "value": "ui-kit"
                  },
                  {
                    "label": "Web App Básica",
                    "value": "webapp-basica"
                  },
                  {
                    "label": "Web App Completa",
                    "value": "webapp-completa"
                  }
                ],
                "moda": [
                  {
                    "label": "Campaña",
                    "value": "campana"
                  },
                  {
                    "label": "Catálogo",
                    "value": "catalogo"
                  },
                  {
                    "label": "Colección",
                    "value": "coleccion"
                  },
                  {
                    "label": "Etiquetas",
                    "value": "etiquetas"
                  },
                  {
                    "label": "Figurín",
                    "value": "figurin"
                  },
                  {
                    "label": "Flat Sketch",
                    "value": "flat-sketch"
                  },
                  {
                    "label": "Lookbook",
                    "value": "lookbook"
                  },
                  {
                    "label": "Marca de Moda",
                    "value": "marca-moda"
                  },
                  {
                    "label": "Moodboard",
                    "value": "moodboard"
                  },
                  {
                    "label": "Patrón Textil",
                    "value": "patron-textil"
                  },
                  {
                    "label": "Portfolio",
                    "value": "portfolio"
                  },
                  {
                    "label": "Tech Pack",
                    "value": "tech-pack"
                  }
                ],
                "branding": [
                  {
                    "label": "Arquetipos",
                    "value": "arquetipos"
                  },
                  {
                    "label": "Auditoría",
                    "value": "auditoria"
                  },
                  {
                    "label": "Brand Book",
                    "value": "brand-book"
                  },
                  {
                    "label": "Brand Voice",
                    "value": "brand-voice"
                  },
                  {
                    "label": "Branding",
                    "value": "branding-completo"
                  },
                  {
                    "label": "Brandscape",
                    "value": "brandscape"
                  },
                  {
                    "label": "Estrategia de Marca",
                    "value": "estrategia-marca"
                  },
                  {
                    "label": "Identidad Visual",
                    "value": "identidad-visual"
                  },
                  {
                    "label": "Key Visual",
                    "value": "key-visual"
                  },
                  {
                    "label": "Logotipo Básico",
                    "value": "logotipo"
                  },
                  {
                    "label": "Manual de Marca",
                    "value": "manual"
                  },
                  {
                    "label": "Naming",
                    "value": "naming"
                  },
                  {
                    "label": "Papelería",
                    "value": "papeleria"
                  },
                  {
                    "label": "Rediseño de Logo",
                    "value": "rediseno-logo"
                  },
                  {
                    "label": "Slogan",
                    "value": "slogan"
                  },
                  {
                    "label": "Submarca",
                    "value": "submarca"
                  },
                  {
                    "label": "Trademark",
                    "value": "trademark"
                  },
                  {
                    "label": "Vectorización",
                    "value": "vectorizacion"
                  }
                ],
                "impresos": [
                  {
                    "label": "Aviso",
                    "value": "aviso"
                  },
                  {
                    "label": "Bolsa",
                    "value": "bolsa"
                  },
                  {
                    "label": "Brochure",
                    "value": "brochure"
                  },
                  {
                    "label": "Catálogo",
                    "value": "catalogo"
                  },
                  {
                    "label": "Correo",
                    "value": "correo"
                  },
                  {
                    "label": "Diagramación",
                    "value": "diagramacion"
                  },
                  {
                    "label": "Diseño de Libro",
                    "value": "diseno-libro"
                  },
                  {
                    "label": "Diseño de Revista",
                    "value": "diseno-revista"
                  },
                  {
                    "label": "Empaque",
                    "value": "empaque"
                  },
                  {
                    "label": "Exhibidor",
                    "value": "exhibidor"
                  },
                  {
                    "label": "Folleto",
                    "value": "folleto"
                  },
                  {
                    "label": "Invitación",
                    "value": "invitacion"
                  },
                  {
                    "label": "Portada",
                    "value": "portada"
                  },
                  {
                    "label": "Póster",
                    "value": "poster"
                  },
                  {
                    "label": "Programa",
                    "value": "programa"
                  },
                  {
                    "label": "Tótem",
                    "value": "totem"
                  },
                  {
                    "label": "Volante",
                    "value": "volante"
                  }
                ],
                "editorial": [
                  {
                    "label": "Catálogo Comercial",
                    "value": "catalogo-comercial"
                  },
                  {
                    "label": "Catálogo Premium",
                    "value": "catalogo-premium"
                  },
                  {
                    "label": "Editorial Digital",
                    "value": "editorial-digital"
                  },
                  {
                    "label": "Infografía",
                    "value": "infografia"
                  },
                  {
                    "label": "Libro Comercial",
                    "value": "libro-comercial"
                  },
                  {
                    "label": "Libro de Arte",
                    "value": "libro-arte"
                  },
                  {
                    "label": "Maquetación",
                    "value": "maquetacion"
                  },
                  {
                    "label": "Memoria Anual",
                    "value": "memoria-anual"
                  },
                  {
                    "label": "Newsletter",
                    "value": "newsletter"
                  },
                  {
                    "label": "Portada",
                    "value": "portada"
                  },
                  {
                    "label": "Revista",
                    "value": "revista"
                  },
                  {
                    "label": "Whitepaper",
                    "value": "whitepaper"
                  }
                ],
                "marketing": [
                  {
                    "label": "Brochure Digital",
                    "value": "brochure-digital"
                  },
                  {
                    "label": "Brochure Impreso",
                    "value": "brochure-impreso"
                  },
                  {
                    "label": "Campaña Completa",
                    "value": "campana-completa"
                  },
                  {
                    "label": "Campaña Digital",
                    "value": "campana-digital"
                  },
                  {
                    "label": "Campaña Print",
                    "value": "campana-print"
                  },
                  {
                    "label": "Media Kit",
                    "value": "media-kit"
                  },
                  {
                    "label": "Merchandising",
                    "value": "merchandising"
                  },
                  {
                    "label": "Packaging",
                    "value": "packaging"
                  },
                  {
                    "label": "Pitch Deck",
                    "value": "pitch-deck"
                  },
                  {
                    "label": "Presentación",
                    "value": "presentacion"
                  },
                  {
                    "label": "Punto de Venta",
                    "value": "punto-venta"
                  },
                  {
                    "label": "Stand",
                    "value": "stand"
                  }
                ],
                "foto-video": [
                  {
                    "label": "Camarógrafo",
                    "value": "camarografo"
                  },
                  {
                    "label": "Drone (Día)",
                    "value": "drone-dia"
                  },
                  {
                    "label": "Drone (Hora)",
                    "value": "drone-hora"
                  },
                  {
                    "label": "Evento",
                    "value": "evento"
                  },
                  {
                    "label": "Food Styling",
                    "value": "food-styling"
                  },
                  {
                    "label": "Foto de Producto",
                    "value": "foto-producto"
                  },
                  {
                    "label": "Retoque",
                    "value": "retoque"
                  },
                  {
                    "label": "Sesión de Fotos",
                    "value": "sesion-foto"
                  },
                  {
                    "label": "Sonidista",
                    "value": "sonidista"
                  },
                  {
                    "label": "Video con Croma",
                    "value": "video-croma"
                  },
                  {
                    "label": "Video Corporativo",
                    "value": "video-corporativo"
                  },
                  {
                    "label": "Video para RRSS",
                    "value": "video-rrss"
                  },
                  {
                    "label": "Video para YouTube",
                    "value": "video-youtube"
                  }
                ],
                "fotografia": [
                  {
                    "label": "Aéreas",
                    "value": "aereas"
                  },
                  {
                    "label": "Arquitectura",
                    "value": "arquitectura"
                  },
                  {
                    "label": "Banco de Imágenes",
                    "value": "banco-imagenes"
                  },
                  {
                    "label": "E-commerce",
                    "value": "ecommerce"
                  },
                  {
                    "label": "Evento Completo",
                    "value": "evento-completo"
                  },
                  {
                    "label": "Evento Medio",
                    "value": "evento-medio"
                  },
                  {
                    "label": "Gastronómica",
                    "value": "gastronomica"
                  },
                  {
                    "label": "Lifestyle",
                    "value": "lifestyle"
                  },
                  {
                    "label": "Lookbook",
                    "value": "lookbook"
                  },
                  {
                    "label": "Producto Básico",
                    "value": "producto-basico"
                  },
                  {
                    "label": "Producto Premium",
                    "value": "producto-premium"
                  },
                  {
                    "label": "Retratos",
                    "value": "retratos"
                  }
                ],
                "audiovisual": [
                  {
                    "label": "Animación 3D",
                    "value": "animacion-3d"
                  },
                  {
                    "label": "Demo Reel",
                    "value": "demo-reel"
                  },
                  {
                    "label": "Documental",
                    "value": "documental"
                  },
                  {
                    "label": "Motion Graphics",
                    "value": "motion-graphics"
                  },
                  {
                    "label": "Pack Streaming",
                    "value": "pack-streaming"
                  },
                  {
                    "label": "Podcast Setup",
                    "value": "podcast-setup"
                  },
                  {
                    "label": "Video Aéreo",
                    "value": "video-aereo"
                  },
                  {
                    "label": "Video Comercial",
                    "value": "video-comercial"
                  },
                  {
                    "label": "Video Corporativo",
                    "value": "video-corporativo"
                  },
                  {
                    "label": "Video Educativo",
                    "value": "video-educativo"
                  },
                  {
                    "label": "Video Evento",
                    "value": "video-evento"
                  },
                  {
                    "label": "Video Producto",
                    "value": "video-producto"
                  }
                ],
                "ilustracion": [
                  {
                    "label": "Avatar",
                    "value": "avatar"
                  },
                  {
                    "label": "Boceto de Personaje",
                    "value": "boceto-personaje"
                  },
                  {
                    "label": "Colorización",
                    "value": "colorizacion"
                  },
                  {
                    "label": "Fondos",
                    "value": "fondos"
                  },
                  {
                    "label": "Ilustración 2D B/N",
                    "value": "ilustracion-2d-bn"
                  },
                  {
                    "label": "Ilustración 2D Color",
                    "value": "ilustracion-2d-color"
                  },
                  {
                    "label": "Ilustración 3D",
                    "value": "ilustracion-3d"
                  },
                  {
                    "label": "Infografía",
                    "value": "infografia"
                  },
                  {
                    "label": "Mano Alzada",
                    "value": "mano-alzada"
                  },
                  {
                    "label": "Objetos y Accesorios",
                    "value": "objetos-accesorios"
                  },
                  {
                    "label": "Página de Historieta",
                    "value": "pagina-historieta"
                  },
                  {
                    "label": "Vectorial",
                    "value": "vectorial"
                  }
                ],
                "social-media": [
                  {
                    "label": "Calendario Editorial",
                    "value": "calendario-editorial"
                  },
                  {
                    "label": "Contenido Blog",
                    "value": "contenido-blog"
                  },
                  {
                    "label": "Contenido Newsletter",
                    "value": "contenido-newsletter"
                  },
                  {
                    "label": "Contenido SEO",
                    "value": "contenido-seo"
                  },
                  {
                    "label": "Copywriting",
                    "value": "copywriting"
                  },
                  {
                    "label": "Estrategia Social",
                    "value": "estrategia-social"
                  },
                  {
                    "label": "Pack Básico",
                    "value": "pack-basico"
                  },
                  {
                    "label": "Pack Completo",
                    "value": "pack-completo"
                  },
                  {
                    "label": "Pack Historias",
                    "value": "pack-historias"
                  },
                  {
                    "label": "Pack Publicidad",
                    "value": "pack-publicidad"
                  },
                  {
                    "label": "Reel",
                    "value": "reel"
                  },
                  {
                    "label": "Video Redes",
                    "value": "video-redes"
                  }
                ],
                "edicion-animacion": [
                  {
                    "label": "Animación de Brochure",
                    "value": "animacion-brochure"
                  },
                  {
                    "label": "Animación de Créditos",
                    "value": "animacion-creditos"
                  },
                  {
                    "label": "Animación de Textos",
                    "value": "animacion-textos"
                  },
                  {
                    "label": "Colorización de Video",
                    "value": "colorizacion-video"
                  },
                  {
                    "label": "Edición",
                    "value": "edicion"
                  },
                  {
                    "label": "GIF",
                    "value": "gif"
                  },
                  {
                    "label": "Música",
                    "value": "musica"
                  },
                  {
                    "label": "Pack RRSS",
                    "value": "pack-rrss"
                  },
                  {
                    "label": "Rotoscopía",
                    "value": "rotoscopia"
                  },
                  {
                    "label": "Subtítulos",
                    "value": "subtitulos"
                  },
                  {
                    "label": "VFX",
                    "value": "vfx"
                  },
                  {
                    "label": "Video 2D",
                    "value": "video-2d"
                  },
                  {
                    "label": "Video Mixto",
                    "value": "video-mixto"
                  }
                ],
                "publicidad-exterior": [
                  {
                    "label": "Banderola",
                    "value": "banderola"
                  },
                  {
                    "label": "Lona",
                    "value": "lona"
                  },
                  {
                    "label": "Pantalla LED",
                    "value": "pantalla-led"
                  },
                  {
                    "label": "Pendón",
                    "value": "pendon"
                  },
                  {
                    "label": "Rotulación Completa",
                    "value": "rotulacion-completa"
                  },
                  {
                    "label": "Rotulación Grande",
                    "value": "rotulacion-grande"
                  },
                  {
                    "label": "Rotulación Mediana",
                    "value": "rotulacion-mediana"
                  },
                  {
                    "label": "Rotulación Pequeña",
                    "value": "rotulacion-pequena"
                  },
                  {
                    "label": "Señalética",
                    "value": "senaletica"
                  },
                  {
                    "label": "Valla",
                    "value": "valla"
                  },
                  {
                    "label": "Valla Móvil",
                    "value": "valla-movil"
                  }
                ]
              },
              categories: [
                {
                  "id": "edicion-animacion",
                  "label": "Animación"
                },
                {
                  "id": "branding",
                  "label": "Branding"
                },
                {
                  "id": "moda",
                  "label": "Diseño de Modas"
                },
                {
                  "id": "web",
                  "label": "Diseño Web"
                },
                {
                  "id": "editorial",
                  "label": "Editorial"
                },
                {
                  "id": "marketing",
                  "label": "Extras"
                },
                {
                  "id": "foto-video",
                  "label": "Fotografía y Video"
                },
                {
                  "id": "ilustracion",
                  "label": "Ilustración"
                },
                {
                  "id": "impresos",
                  "label": "Impresos"
                },
                {
                  "id": "audiovisual",
                  "label": "Producción Audiovisual"
                },
                {
                  "id": "fotografia",
                  "label": "Producto"
                },
                {
                  "id": "publicidad-exterior",
                  "label": "Publicidad Exterior"
                },
                {
                  "id": "social-media",
                  "label": "Social Media"
                }
              ]
            };

            const { data: insertedData, error: insertError } = await supabase
              .from('custom_pricing')
              .insert([initialData])
              .select();

            if (insertError) {
              toast.error(`Error al crear configuración: ${insertError.message}`);
            } else {
              toast.success('Configuración inicial creada exitosamente');
            }
          }

          toast.success('¡Bienvenido!');
          navigate('/cotizar', { replace: true });
        } else {
          toast.error('No se encontró sesión');
          navigate('/login', { replace: true });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
        toast.error(`Error en la autenticación: ${errorMessage}`);
        navigate('/login', { replace: true });
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Autenticando...</p>
      </div>
    </div>
  );
}