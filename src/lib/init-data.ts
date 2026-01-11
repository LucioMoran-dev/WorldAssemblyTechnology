/**
 * Utilidades para inicializar datos en la base de datos
 * Este archivo contiene funciones para precargar categorías y otros datos iniciales
 */

import { categoryService } from "@/services";
import { categoryLogger, logger } from "@/utils/logger";

/**
 * Verifica si las categorías ya están cargadas en la BD
 */
export async function checkCategoriesExist(): Promise<boolean> {
  try {
    const categories = await categoryService.getAll();
    return (categories.items?.length ?? 0) > 0;
  } catch (error) {
    categoryLogger.error("Error checking categories", error);
    return false;
  }
}

/**
 * Precarga las categorías iniciales en la base de datos
 * Solo se ejecuta si no existen categorías
 */
export async function seedCategoriesIfNeeded(): Promise<void> {
  try {
    const exist = await checkCategoriesExist();

    if (!exist) {
      categoryLogger.info("No categories found, seeding initial categories...");
      await categoryService.seedCategories();
      categoryLogger.info("Categories seeded successfully");
    } else {
      categoryLogger.info("Categories already exist");
    }
  } catch (error) {
    categoryLogger.error("Error seeding categories", error);
    // No lanzamos el error para no romper la app si falla
  }
}

/**
 * Inicializa todos los datos necesarios de la aplicación
 */
export async function initializeAppData(): Promise<void> {
  logger.info("initializeAppData", "Initializing app data...");

  // Precargar categorías
  await seedCategoriesIfNeeded();

  // Aquí puedes agregar más inicializaciones si es necesario
  // await seedProductsIfNeeded();
  // await seedBrandsIfNeeded();

  logger.info("initializeAppData", "App data initialized");
}
