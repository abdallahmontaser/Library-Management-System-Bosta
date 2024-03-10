import prisma from '../prisma/client.js';
import {
    BadRequestError,
    NotFoundError,
} from '../utils/errors.js';
import { StatusCodes } from 'http-status-codes/build/cjs/status-codes.js';

const findBookById = async (id) => {
    return await prisma.book.findUnique({
        where: {
            id: id,
        }
    });
};
const isExistTitle = async (id, title) => {
    let whereCondition = {
        title: title,
    };
    if (id) {
        whereCondition.NOT = {
            id: id,
        };
    }
    return await prisma.book.findFirst({
        where: whereCondition,
    });
};

export const getBooks = async (req, res, next) => {
    const { title, author, ISBN } = req.query;
    let whereClause = {};
    if (title) {
        whereClause.title = title;
    }
    if (author) {
        whereClause.author = author;
    }
    if (ISBN) {
        whereClause.ISBN = ISBN;
    }
    const books = await prisma.book.findMany({
        where: whereClause,
    });
    res.status(StatusCodes.OK).json({ Books: books });
};
export const AddBook = async (req, res, next) => {
    const { title, author, ISBN, quantity, shelf } = req.body;
    if (
        !title ||
        !author ||
        !ISBN ||
        !quantity ||
        !shelf
    ) {
        throw new BadRequestError();
    }
    const existingBook = await isExistTitle(null, title);
    if (existingBook) {
        throw new BadRequestError(`Book with title ${title} already exists`);
    }
    const cratedBook = await prisma.book.create({
        data: {
            title: title,
            author: author,
            ISBN: ISBN,
            quantity: quantity,
            shelf: shelf,
        }
    });
    res.status(StatusCodes.OK).json({
        Message: "Book added successfully",
        Book: cratedBook,
    });
};
export const UpdateBook = async (req, res, next) => {
    const bookId = parseInt(req.params.id);
    const existingBook = await findBookById(bookId);
    if (!existingBook) {
        throw new NotFoundError(`Book with id ${bookId} not exists`);
    }
    if (req.body.hasOwnProperty("title")) {
        if (await isExistTitle(bookId, req.body.title)) {
            throw new BadRequestError(`Book with title ${req.body.title} already exists`);
        }
    }
    const updatedBook = await prisma.book.update({
        where: {
            id: bookId,
        },
        data: req.body,
    });
    res.status(StatusCodes.OK).json({
        Message: `Book with id ${bookId} updated successfully`,
        Book: updatedBook,
    });
};
export const DeleteBook = async (req, res, next) => {
    const bookId = parseInt(req.params.id);
    const existingBook = await findBookById(bookId);
    if (!existingBook) {
        throw new NotFoundError(`Book with id ${bookId} not exists`);
    }
    const deletedBook = await prisma.book.delete({
        where: {
            id: bookId,
        },
    });
    res.status(StatusCodes.OK).json({
        Message: `Book with id ${bookId} deleted successfully`,
        Book: deletedBook,
    });
};