import type { Product } from '../model/productTypes';

// Заглушка: вместо delivery_date всегда показываем общий срок
export const getDeliveryDate = (_product: Product) => 'от 5 рабочих дней';
