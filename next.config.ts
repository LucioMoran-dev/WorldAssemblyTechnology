import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  generateEtags: true,
  httpAgentOptions: {
    keepAlive: true,
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "react-icons",
      "date-fns",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dialog",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-popover",
      "@radix-ui/react-select",
      "@radix-ui/react-tabs",
      "@radix-ui/react-toast",
      "recharts",
    ],
    optimizeCss: true,
    reactCompiler: true,
    serverActions: {
      bodySizeLimit: "2mb",
      allowedOrigins: isDev ? ["localhost:3000"] : [],
    },
    optimisticClientCache: true,
    // ✅ REMOVIDO: turbo (movido a la raíz del config como "turbopack")
  },

  /* =================================================================
     TURBOPACK CONFIGURATION
     =================================================================
     ✅ MOVIDO AQUÍ: De experimental.turbo a turbopack (raíz)
     - Turbopack es el nuevo bundler de Next.js
     - Más rápido que Webpack en desarrollo
  */
  turbopack: {
    resolveAlias: {
      "mapbox-gl": "mapbox-gl/dist/mapbox-gl.js",
    },
  },

  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],

    /* ---------------------------------------------------------------
       DEVICE SIZES
       ---------------------------------------------------------------
       - Breakpoints para dispositivos
       - Next.js genera versiones optimizadas para cada tamaño
       - Basado en anchos comunes de pantallas
       - srcset automático para responsive images
       - Ejemplo: móvil carga 640px, desktop carga 1920px
    */
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],

    /* ---------------------------------------------------------------
       IMAGE SIZES
       ---------------------------------------------------------------
       - Tamaños para imágenes con ancho fijo
       - Usado cuando especificas width en next/image
       - Genera versiones optimizadas para íconos, avatares, etc.
       - Permite imágenes pequeñas súper optimizadas
    */
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    /* ---------------------------------------------------------------
       MINIMUM CACHE TTL
       ---------------------------------------------------------------
       - Tiempo mínimo de caché para imágenes optimizadas
       - En segundos: 60*60*24*365 = 1 año
       - Imágenes optimizadas se cachean en navegador y CDN
       - Reduce carga del servidor dramáticamente
       - Después de 1 año se regenera la imagen
    */
    minimumCacheTTL: 60 * 60 * 24 * 90,

    /* ---------------------------------------------------------------
       DANGEROUSLY ALLOW SVG
       ---------------------------------------------------------------
       - Por defecto Next.js NO optimiza SVGs (seguridad)
       - SVGs pueden contener scripts maliciosos
       - Solo habilitar si confías en todas tus fuentes
       - Alternativa: usa @svgr/webpack para importar como componentes
    */
    dangerouslyAllowSVG: false,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    unoptimized: false,

    /* ---------------------------------------------------------------
       LOADER
       ---------------------------------------------------------------
       - Define cómo se cargan las imágenes
       - "default" = usa optimizador de Next.js
       - "imgix" = usa servicio Imgix
       - "cloudinary" = usa Cloudinary directamente
       - "custom" = tu propio loader personalizado
    */
    loader: "default",
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-DNS-Prefetch-Control",
            value: "on",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              isDev
                ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdnjs.cloudflare.com"
                : "script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com",
              "style-src 'self' 'unsafe-inline' https://api.mapbox.com",
              "img-src 'self' data: blob: https://*.cloudinary.com https://images.unsplash.com",
              "font-src 'self' data:",
              "connect-src 'self' https://api.mapbox.com https://*.tiles.mapbox.com",
              "frame-ancestors 'self'",
              "base-uri 'self'",
              "form-action 'self'",
              "worker-src 'self' blob:",
            ].join("; "),
          },
        ],
      },
      {
        source: "/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            // public = cacheable por navegador y CDN
            // max-age=31536000 = 1 año
            // immutable = nunca cambia, no revalidar
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/:path*.html",
        headers: [
          {
            key: "Cache-Control",
            // no-cache = revalidar siempre con servidor
            // no-store = no guardar en caché
            // must-revalidate = debe revalidar si expiró
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
    ];
  },

  /* =================================================================
     REDIRECTS
     =================================================================
     - Redirecciones automáticas de URLs
     - Útil para cambios de rutas, migraciónes
     - permanent: true = 308 redirect (SEO friendly)
     - permanent: false = 307 redirect (temporal)
  */
  async redirects() {
    return [];
  },

  async rewrites() {
    return [];
  },

  /* =================================================================
     WEBPACK (solo se usa cuando NO usas --turbopack)
     =================================================================
     Si usas --turbopack, esta configuración se ignora
     Útil mantenerla para builds de producción si no usas turbo
  */
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      // Split chunks inteligente
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          default: false,
          vendors: false,

          // Radix UI (componentes grandes)
          radixUI: {
            test: /@radix-ui/,
            name: "radix-ui",
            priority: 10,
            reuseExistingChunk: true,
          },

          // Mapbox (muy grande ~500KB)
          mapbox: {
            test: /mapbox/,
            name: "mapbox",
            priority: 10,
            reuseExistingChunk: true,
          },

          // Recharts (gráficos grandes)
          recharts: {
            test: /recharts/,
            name: "recharts",
            priority: 10,
            reuseExistingChunk: true,
          },

          // Librerías de formularios
          forms: {
            test: /(react-hook-form|formik|yup|zod)/,
            name: "forms",
            priority: 9,
            reuseExistingChunk: true,
          },

          // React y dependencias core
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
            name: "react",
            priority: 20,
            reuseExistingChunk: true,
          },

          // Resto de node_modules
          commons: {
            test: /[\\/]node_modules[\\/]/,
            name: "commons",
            priority: 5,
            minChunks: 2,
            reuseExistingChunk: true,
          },
        },
        minSize: 20000,
        maxSize: 244000,
      };

      // Minimizar IDs de módulos
      config.optimization.moduleIds = "deterministic";

      // Minimizar nombres de chunks
      config.optimization.chunkIds = "deterministic";
    }

    config.resolve.alias = {
      ...config.resolve.alias,
      "mapbox-gl": "mapbox-gl/dist/mapbox-gl.js",
    };

    config.ignoreWarnings = [
      /Critical dependency: the request of a dependency is an expression/,
    ];

    return config;
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? {
            exclude: ["error", "warn", "info"],
          }
        : false,
  },
  /* ---------------------------------------------------------------
     STYLED COMPONENTS (si usas styled-components)
     ---------------------------------------------------------------
  */
  // styledComponents: true,

  /* ---------------------------------------------------------------
     EMOTION (si usas @emotion/react)
     ---------------------------------------------------------------
  */
  // emotion: true,

  /* ---------------------------------------------------------------
     RELAY (si usas GraphQL Relay)
     ---------------------------------------------------------------
  */
  // relay: {
  //   src: "./",
  //   language: "typescript",
  // },

  transpilePackages: ["react-map-gl", "@mapbox/mapbox-gl-geocoder"],

  devIndicators: {
    position: "bottom-right",
  },

  typescript: {
    ignoreBuildErrors: false,
    tsconfigPath: "./tsconfig.json",
  },

  eslint: {
    ignoreDuringBuilds: false,
    dirs: ["src", "app", "components", "lib"],
  },

  /* =================================================================
     OUTPUT
     =================================================================
     - "standalone" = genera carpeta .next/standalone
     - Contiene todo lo necesario para correr la app
     - Perfecto para Docker
     - Reduce tamaño de imagen Docker dramáticamente
     - No incluye public/ ni .next/static (copiar manualmente)
  */
  // output: "standalone",

  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  trailingSlash: false,

  /* ---------------------------------------------------------------
     ASSET PREFIX
     ---------------------------------------------------------------
     - Prefijo para todos los assets estáticos
     - Útil si sirves assets desde CDN
     - Ejemplo: "https://cdn.example.com"
  */
  // assetPrefix: process.env.NEXT_PUBLIC_CDN_URL,

  /* ---------------------------------------------------------------
     BASE PATH
     ---------------------------------------------------------------
     - Si tu app no está en root del dominio
     - Ejemplo: app en example.com/app
     - basePath: "/app"
  */
  // basePath: "/app",

  /* ---------------------------------------------------------------
     SASS OPTIONS (si usas SASS)
     ---------------------------------------------------------------
  */
  // sassOptions: {
  //   includePaths: [path.join(__dirname, "styles")],
  //   additionalData: `@import "variables";`,
  // },
};

let config = nextConfig;

if (process.env.ANALYZE === "true") {
  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: true,
  });
  config = withBundleAnalyzer(config);
}

export default nextConfig;
