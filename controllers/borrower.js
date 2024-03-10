import prisma from '../prisma/client.js';
import {
    BadRequestError,
    NotFoundError,
} from '../utils/errors.js';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes.js';

const findBorrowerById = async (id) => {
    return await prisma.borrower.findUnique({
        where: {
            id: id,
        }
    });

};
const isExistEmail = async (id, email) => {
    let whereCondition = {
        email: email,
    };
    if (id !== undefined && id !== null) {
        whereCondition.NOT = {
            id: id,
        };
    }
    return await prisma.borrower.findFirst({
        where: whereCondition,
    });
};

export const getBorrowers = async (req, res, next) => {
    const { borrowerId, email } = req.query;
    let whereClause = {};
    if (borrowerId) {
        whereClause.id = parseInt(borrowerId);
    }
    if (email) {
        whereClause.email = email;
    }
    const borrowers = await prisma.borrower.findMany({
        where: whereClause,
        include: {
            borrowings: true,
        }
    });
    res.status(StatusCodes.OK).json({ Borrowers: borrowers });
};
export const getBorrowerBooks = async (req, res, next) => {
    const borrowerId = parseInt(req.params.borrowerId);
    const borrower = await findBorrowerById(borrowerId);
    if (!borrower) {
        throw new NotFoundError(`Borrower with id ${borrowerId} not exists`);
    }
    const currentBorrowings = await prisma.borrowing.findMany({
        where: {
            borrowerId: borrowerId,
            returnedAt: null,
        },
        include: {
            book: true,
        }
    });
    const currentBooksHave = currentBorrowings.map(borrowing => ({
        id: borrowing.book.id,
        title: borrowing.book.title,
        author: borrowing.book.author,
        borrowedAt: borrowing.book.borrowedAt,
        dueDate: borrowing.dueDate
    }));

    res.status(StatusCodes.OK).json({ Books: currentBooksHave });
};
export const RegisterBorrower = async (req, res, next) => {
    const { name, email } = req.body;
    if (
        !name ||
        !email
    ) {
        throw new BadRequestError();
    }
    const existingBorrowerEmail = await isExistEmail(null, email);
    if (existingBorrowerEmail) {
        throw new BadRequestError(`Borrower with email ${email} already exists`);
    }
    const createdBorrower = await prisma.borrower.create({
        data: {
            name: name,
            email: email,
        }
    });
    res.status(StatusCodes.OK).json({
        Message: "Borrower added successfully",
        Borrower: createdBorrower,
    });
};
export const UpdateBorrower = async (req, res, next) => {
    const borrowerId = parseInt(req.params.id);
    const existingBorrower = await findBorrowerById(borrowerId);
    if (!existingBorrower) {
        throw new NotFoundError(`Borrower with id ${borrowerId} not exists`);
    }
    if (req.body.hasOwnProperty("email")) {
        if (await isExistEmail(borrowerId, req.body.email)) {
            throw new BadRequestError(`Borrower with email ${req.body.email} already exists`);
        }
    }
    const updatedBorrower = await prisma.borrower.update({
        where: {
            id: borrowerId,
        },
        data: req.body,
    });
    res.status(StatusCodes.OK).json({
        Message: `Borrower with id ${borrowerId} updated successfully`,
        Borrower: updatedBorrower,
    });
};
export const DeleteBorrower = async (req, res, next) => {
    const borrowerId = parseInt(req.params.id);
    const existingBorrower = await findBorrowerById(borrowerId);
    if (!existingBorrower) {
        throw new NotFoundError(`Borrower with id ${borrowerId} not exists`);
    }
    const deletedBook = await prisma.borrower.delete({
        where: {
            id: borrowerId,
        },
    });
    res.status(StatusCodes.OK).json({
        Message: `Borrower with id ${borrowerId} deleted successfully`,
        Borrower: deletedBook,
    });
};