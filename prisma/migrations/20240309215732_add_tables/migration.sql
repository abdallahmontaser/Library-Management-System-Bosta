-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(191) NOT NULL,
    `author` VARCHAR(191) NOT NULL,
    `ISBN` VARCHAR(191) NOT NULL,
    `quantity` INTEGER NOT NULL,
    `shelf` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `books_title_key`(`title`),
    INDEX `books_title_author_ISBN_idx`(`title`, `author`, `ISBN`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `borrowers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `registeredAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `borrowers_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `borrowings` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `borrowedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `returnedAt` DATETIME(3) NULL,
    `dueDate` DATETIME(3) NOT NULL,
    `status` ENUM('CHECKED_OUT', 'RETURNED') NOT NULL DEFAULT 'CHECKED_OUT',
    `bookId` INTEGER NOT NULL,
    `borrowerId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `borrowings` ADD CONSTRAINT `borrowings_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `borrowings` ADD CONSTRAINT `borrowings_borrowerId_fkey` FOREIGN KEY (`borrowerId`) REFERENCES `borrowers`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
