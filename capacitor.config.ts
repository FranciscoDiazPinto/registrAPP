import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter', // Identificador único de tu app
  appName: 'registrAPP',     // Nombre de tu aplicación
  webDir: 'www',             // Directorio donde se genera el build de la app
  bundledWebRuntime: false,  // Usualmente en false para evitar conflictos con runtime de Capacitor
  plugins: {
    BarcodeScanner: {
      // Configuración específica del plugin
      enableBarcodeScanner: true,  // Habilitar el plugin
    },
  },
  server: {
    cleartext: true,         // Permite comunicación HTTP en lugar de HTTPS (útil para desarrollo)
  },
};

export default config;
