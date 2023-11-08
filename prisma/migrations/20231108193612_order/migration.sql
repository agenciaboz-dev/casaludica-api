-- DropIndex
DROP INDEX `categories_colection_fkey` ON `categories`;

-- DropIndex
DROP INDEX `products_category_fkey` ON `products`;

-- CreateTable
CREATE TABLE `Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `storeId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `lastname` VARCHAR(191) NOT NULL,
    `company` VARCHAR(191) NULL,
    `postcode` VARCHAR(191) NOT NULL,
    `address` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `phone` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `notes` VARCHAR(191) NULL,
    `datetime` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `categories` ADD CONSTRAINT `categories_colection_fkey` FOREIGN KEY (`colection`) REFERENCES `colections`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `products` ADD CONSTRAINT `products_category_fkey` FOREIGN KEY (`category`) REFERENCES `categories`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
