import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Política de Privacidad</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            Última actualización: 18 de noviembre de 2024
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Información que Recopilamos</h2>
            <p className="text-gray-600 mb-4">
              Recopilamos la siguiente información cuando utilizas nuestra calculadora:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Nombre y correo electrónico (cuando te suscribes)</li>
              <li>Información de uso de la calculadora</li>
              <li>Datos analíticos anónimos de Google Analytics</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Uso de la Información</h2>
            <p className="text-gray-600 mb-4">
              Utilizamos la información recopilada para:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Proporcionar y mejorar nuestros servicios</li>
              <li>Enviar actualizaciones y noticias (si te has suscrito)</li>
              <li>Analizar y mejorar el rendimiento de la aplicación</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Cookies y Tecnologías Similares</h2>
            <p className="text-gray-600 mb-4">
              Utilizamos cookies y tecnologías similares para:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Mantener las preferencias del usuario</li>
              <li>Analizar el uso del sitio (Google Analytics)</li>
              <li>Mejorar la experiencia del usuario</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Compartir Información</h2>
            <p className="text-gray-600 mb-4">
              No vendemos ni compartimos tu información personal con terceros, excepto:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Cuando sea necesario para proporcionar el servicio</li>
              <li>Cuando lo requiera la ley</li>
              <li>Con tu consentimiento explícito</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Seguridad</h2>
            <p className="text-gray-600">
              Implementamos medidas de seguridad para proteger tu información, incluyendo:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Encriptación SSL</li>
              <li>Acceso restringido a datos personales</li>
              <li>Monitoreo regular de seguridad</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Tus Derechos</h2>
            <p className="text-gray-600 mb-4">
              Tienes derecho a:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Acceder a tu información personal</li>
              <li>Corregir información inexacta</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Oponerte al procesamiento de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Contacto</h2>
            <p className="text-gray-600">
              Para cualquier pregunta sobre esta política de privacidad, puedes contactarnos en:
              <br />
              Email: hola@urielurbina.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}