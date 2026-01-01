/**
 * Utilidades para inicializar datos en la base de datos
 * Este archivo contiene funciones para precargar categorías y otros datos iniciales
 */

import { categoryService } from '@/services';

/**
 * Verifica si las categorías ya están cargadas en la BD
 */
export async function checkCategoriesExist(): Promise<boolean> {
  try {
    const categories = await categoryService.getAll();
    return categories.length > 0;
  } catch (error) {
    console.error('Error checking categories:', error);
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
      console.log('No categories found, seeding initial categories...');
      await categoryService.seedCategories();
      console.log('✅ Categories seeded successfully');
    } else {
      console.log('✅ Categories already exist');
    }
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    // No lanzamos el error para no romper la app si falla
  }
}

/**
 * Inicializa todos los datos necesarios de la aplicación
 */
export async function initializeAppData(): Promise<void> {
  console.log('🚀 Initializing app data...');

  // Precargar categorías
  await seedCategoriesIfNeeded();

  // Aquí puedes agregar más inicializaciones si es necesario
  // await seedProductsIfNeeded();
  // await seedBrandsIfNeeded();

  console.log('✅ App data initialized');
}
