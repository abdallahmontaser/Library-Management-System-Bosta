import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import {
    getBooks,
    AddBook,
    UpdateBook,
    DeleteBook,
} from '../controllers/book.js';

const router = Router();
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,
    message: "Too many requests from this IP, please try again later."
});


router.get("/", getBooks);
router.post("/Book/AddBook", limiter, AddBook);
router.put("/Book/UpdateBook/:id", UpdateBook);
router.delete("/Book/DeleteBook/:id", DeleteBook);

export default router;