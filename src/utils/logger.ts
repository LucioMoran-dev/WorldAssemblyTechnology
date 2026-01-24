/**
 * Sistema de logging profesional para la aplicación
 * Soporta diferentes niveles de log y puede ser configurado por entorno
 */

export enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
  NONE = 4,
}

interface ILoggerConfig {
  level: LogLevel;
  enableTimestamp: boolean;
  enableColors: boolean;
}

class Logger {
  private config: ILoggerConfig;

  constructor() {
    this.config = {
      level:
        process.env.NODE_ENV === "production" ? LogLevel.WARN : LogLevel.DEBUG,
      enableTimestamp: true,
      enableColors: true,
    };
  }

  /**
   * Configurar el logger
   */
  configure(config: Partial<ILoggerConfig>): void {
    this.config = { ...this.config, ...config };
  }

  /**
   * Formatear timestamp
   */
  private getTimestamp(): string {
    if (!this.config.enableTimestamp) return "";
    return `[${new Date().toISOString()}]`;
  }

  /**
   * Obtener emoji según nivel
   */
  private getEmoji(level: LogLevel): string {
    switch (level) {
      case LogLevel.DEBUG:
        return "🔍";
      case LogLevel.INFO:
        return "ℹ️";
      case LogLevel.WARN:
        return "⚠️";
      case LogLevel.ERROR:
        return "❌";
      default:
        return "";
    }
  }

  /**
   * Obtener estilo de consola según nivel
   */
  private getStyle(level: LogLevel): string {
    if (!this.config.enableColors) return "";

    switch (level) {
      case LogLevel.DEBUG:
        return "color: #6c757d; font-weight: normal;";
      case LogLevel.INFO:
        return "color: #0d6efd; font-weight: bold;";
      case LogLevel.WARN:
        return "color: #ffc107; font-weight: bold;";
      case LogLevel.ERROR:
        return "color: #dc3545; font-weight: bold;";
      default:
        return "";
    }
  }

  /**
   * Método interno para log
   */
  private log(
    level: LogLevel,
    context: string,
    message: string,
    data?: unknown
  ): void {
    if (level < this.config.level) return;

    const timestamp = this.getTimestamp();
    const emoji = this.getEmoji(level);
    const style = this.getStyle(level);
    const prefix = `${timestamp} ${emoji} [${context}]`;

    if (this.config.enableColors && typeof window !== "undefined") {
      // En el browser, usar estilos
      console.info(
        `%c${prefix} ${message}`,
        style,
        data !== undefined ? data : ""
      );
    } else {
      // En Node.js o sin colores
      if (data !== undefined) {
        console.info(`${prefix} ${message}`, data);
      } else {
        console.info(`${prefix} ${message}`);
      }
    }
  }

  /**
   * Log nivel DEBUG - Información detallada para debugging
   */
  debug(context: string, message: string, data?: unknown): void {
    this.log(LogLevel.DEBUG, context, message, data);
  }

  /**
   * Log nivel INFO - Información general de la aplicación
   */
  info(context: string, message: string, data?: unknown): void {
    this.log(LogLevel.INFO, context, message, data);
  }

  /**
   * Log nivel WARN - Advertencias que no detienen la ejecución
   */
  warn(context: string, message: string, data?: unknown): void {
    this.log(LogLevel.WARN, context, message, data);
  }

  /**
   * Log nivel ERROR - Errores que requieren atención
   */
  error(context: string, message: string, error?: unknown): void {
    this.log(LogLevel.ERROR, context, message, error);

    // En producción, aquí podrías enviar a un servicio de monitoreo
    // como Sentry, LogRocket, etc.
    if (process.env.NODE_ENV === "production" && error) {
      // TODO: Enviar a servicio de monitoreo
      // Sentry.captureException(error);
    }
  }

  /**
   * Crear un logger con contexto fijo
   */
  createContextLogger(context: string) {
    return {
      debug: (message: string, data?: unknown) =>
        this.debug(context, message, data),
      info: (message: string, data?: unknown) =>
        this.info(context, message, data),
      warn: (message: string, data?: unknown) =>
        this.warn(context, message, data),
      error: (message: string, error?: unknown) =>
        this.error(context, message, error),
    };
  }
}

// Instancia singleton del logger
export const logger = new Logger();

// Loggers con contexto específico para módulos comunes
export const authLogger = logger.createContextLogger("Auth");
export const apiLogger = logger.createContextLogger("API");
export const cartLogger = logger.createContextLogger("Cart");
export const wishlistLogger = logger.createContextLogger("Wishlist");
export const productLogger = logger.createContextLogger("Product");
export const orderLogger = logger.createContextLogger("Order");
export const categoryLogger = logger.createContextLogger("Category");

// Export por defecto
export default logger;
