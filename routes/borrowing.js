import { Router } from 'express';
import {
    CheckoutBook,
    ReturnBook,
    BorrowedBooks,
    OverdueBooks,
} from '../controllers/borrowing.js';

const router = Router();

router.post("/CheckoutBook", CheckoutBook);
router.post("/ReturnBook", ReturnBook);
router.get("/BorrowedBooks", BorrowedBooks);
router.get("/OverdueBooks", OverdueBooks);

export default router;