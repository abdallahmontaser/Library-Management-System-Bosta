import prisma from '../prisma/client.js';
import {
    BadRequestError,
    NotFoundError,
} from '../utils/errors.js';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes.js';
import { parse } from 'json2csv';

const GetBorrowing = async (startDate, endDate, overdue) => {
    let whereCondition = {};

    if (overdue !== null) {
        whereCondition = {
            dueDate: {
                gte: startDate,
                lte: endDate,
            },
            returnedAt: null,
        };
    } else {
        whereCondition = {
            borrowedAt: {
                gte: startDate,
                lte: endDate,
            },
        };
    }

    const borrowingData = await prisma.borrowing.findMany({
        where: whereCondition,
        include: {
            book: true,
            borrower: true,
        }
    });
    console.log(borrowingData);
    if (borrowingData.length === 0) {
        return [];
    }
    const mappedBorrowingData = borrowingData.map(borrowing => ({
        BookID: borrowing.book.id,
        Title: borrowing.book.title,
        Author: borrowing.book.author,
        BorrowerName: borrowing.borrower.name,
        BorrowedAt: borrowing.borrowedAt,
        DueDate: borrowing.dueDate,
        Status: borrowing.status,
    }));
    const csv = parse(mappedBorrowingData);
    return csv;
};

export const CheckoutBook = async (req, res, next) => {
    const { bookId, borrowerId, dueDate } = req.body;
    if (
        !bookId ||
        !borrowerId ||
        !dueDate
    ) {
        throw new BadRequestError();
    }
    const book = await prisma.book.findUnique({
        where: {
            id: bookId,
        }
    });
    if (!book) {
        throw new NotFoundError(`Book with id ${bookId} not exists`);
    }
    const borrower = await prisma.borrower.findUnique({
        where: {
            id: borrowerId,
        }
    });
    if (!borrower) {
        throw new NotFoundError(`Borrower with id ${borrowerId} not exists`);
    }
    if (book.quantity <= 0) {
        throw new BadRequestError(`Book with id ${bookId} is not available for checkout`);
    }
    if (new Date(dueDate) < new Date()) {
        throw new BadRequestError(`Due date cannot be in the past`);
    }
    const borrowing = await prisma.borrowing.create({
        data: {
            dueDate: new Date(dueDate),
            book: {
                connect: {
                    id: bookId,
                }
            },
            borrower: {
                connect: {
                    id: borrowerId,
                }
            }
        }
    });
    await prisma.book.update({
        where: {
            id: bookId,
        },
        data: {
            quantity: {
                decrement: 1,
            }
        }
    });
    res.status(StatusCodes.OK).json({
        Message: "Book checked out successfully'",
        Borrowing: borrowing,
    });
};
export const ReturnBook = async (req, res, next) => {
    const { borrowingId } = req.body;
    if (
        !borrowingId
    ) {
        throw new BadRequestError();
    }
    const borrowing = await prisma.borrowing.findUnique({
        where: {
            id: borrowingId,
        }
    });
    if (!borrowing) {
        throw new NotFoundError(`Borrowing with id ${borrowingId} not exists`);
    }
    if (borrowing.returnedAt) {
        throw new BadRequestError('Book has already been returned');
    }
    const updatedBorrowing = await prisma.borrowing.update({
        where: {
            id: borrowingId,
        },
        data: {
            returnedAt: new Date(),
            status: 'RETURNED',
        }
    });
    await prisma.book.update({
        where: {
            id: borrowing.bookId,
        },
        data: {
            quantity: {
                increment: 1,
            }
        }
    });
    res.status(200).json({ Message: 'Book returned successfully', updatedBorrowing });
};
export const BorrowedBooks = async (req, res, next) => {
    let { startDate, endDate } = req.body;
    if (startDate && endDate) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
    }
    else {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        endDate = new Date();
    }
    if (startDate > endDate) {
        throw new BadRequestError('End Date cannot be before Start Date');
    }
    const fileName = `borrowing_processes_from_${startDate.toISOString()}_to_${endDate.toISOString()}.csv`;
    res.attachment(fileName);
    res.status(StatusCodes.OK).send(await GetBorrowing(startDate, endDate, null));
};
export const OverdueBooks = async (req, res, next) => {
    let { startDate, endDate } = req.body;
    if (startDate && endDate) {
        startDate = new Date(startDate);
        endDate = new Date(endDate);
    }
    else {
        startDate = new Date();
        startDate.setMonth(startDate.getMonth() - 1);
        endDate = new Date();
    }
    if (startDate > endDate) {
        throw new BadRequestError('End Date cannot be before Start Date');
    }
    const fileName = `overdue_borrows_from_${startDate.toISOString()}_to_${endDate.toISOString()}.csv`;
    res.attachment(fileName);
    res.status(StatusCodes.OK).send(await GetBorrowing(startDate, endDate, true));
};