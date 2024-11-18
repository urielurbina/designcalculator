import React from 'react';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Términos de Servicio</h1>
        
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 mb-6">
            Última actualización: 18 de Noviembre de 2024
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">1. Aceptación de los Términos</h2>
            <p className="text-gray-600">
              Al acceder y utilizar Referencia Creativa, aceptas estar sujeto a estos términos de servicio. 
              Si no estás de acuerdo con alguna parte de los términos, no podrás acceder al servicio.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">2. Uso del Servicio</h2>
            <p className="text-gray-600 mb-4">
              Nuestro servicio está diseñado para:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Calcular precios de servicios de diseño</li>
              <li>Generar cotizaciones profesionales</li>
              <li>Ayudar en la gestión de tarifas freelance</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">3. Cuentas y Suscripciones</h2>
            <p className="text-gray-600 mb-4">
              Al suscribirte a nuestro servicio:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Debes proporcionar información precisa y completa</li>
              <li>Eres responsable de mantener la confidencialidad de tu cuenta</li>
              <li>Puedes cancelar tu suscripción en cualquier momento</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">4. Propiedad Intelectual</h2>
            <p className="text-gray-600 mb-4">
              El servicio y su contenido original, características y funcionalidad son propiedad de 
              Referencia Creativa y están protegidos por:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Derechos de autor</li>
              <li>Marcas comerciales</li>
              <li>Otros derechos de propiedad intelectual</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">5. Limitación de Responsabilidad</h2>
            <p className="text-gray-600">
              Referencia Creativa no será responsable de:
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Decisiones tomadas basadas en los cálculos proporcionados</li>
              <li>Pérdidas comerciales derivadas del uso del servicio</li>
              <li>Problemas técnicos o interrupciones del servicio</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">6. Modificaciones</h2>
            <p className="text-gray-600">
              Nos reservamos el derecho de modificar o reemplazar estos términos en cualquier momento. 
              Los cambios sustanciales serán notificados con anticipación.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">7. Ley Aplicable</h2>
            <p className="text-gray-600">
              Estos términos se regirán e interpretarán de acuerdo con las leyes de México, 
              sin tener en cuenta sus disposiciones sobre conflictos de leyes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-gray-800 mb-4">8. Contacto</h2>
            <p className="text-gray-600">
              Para cualquier pregunta sobre estos términos, puedes contactarnos en:
              <br />
              Email:  hola@urielurbina.com
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}