/*
  Warnings:

  - Added the required column `total` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `OrderProduct_orderId_fkey` ON `OrderProduct`;

-- DropIndex
DROP INDEX `categories_colection_fkey` ON `categories`;

-- DropIndex
DROP INDEX `products_category_fkey` ON `products`;

-- AlterTable
ALTER TABLE `Order` ADD COLUMN `total` DOUBLE NOT NULL;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_colection_fkey` FOREIGN KEY (`colection`) REFERENCES `colections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_fkey` FOREIGN KEY (`category`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OrderProduct` ADD CONSTRAINT `OrderProduct_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
