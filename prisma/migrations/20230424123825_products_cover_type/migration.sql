-- DropIndex
DROP INDEX `products_category_fkey` ON `products`;

-- AlterTable
ALTER TABLE `products` MODIFY `cover` TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_fkey` FOREIGN KEY (`category`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
