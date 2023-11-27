-- AlterTable
ALTER TABLE `User` ADD COLUMN `password` VARCHAR(191) NULL,
    MODIFY `profilePicUrl` TEXT NOT NULL DEFAULT '';
