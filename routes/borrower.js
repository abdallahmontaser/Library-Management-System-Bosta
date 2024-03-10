import { Router } from 'express';
import { rateLimit } from 'express-rate-limit';
import {
    getBorrowers,
    getBorrowerBooks,
    RegisterBorrower,
    UpdateBorrower,
    DeleteBorrower,
} from '../controllers/borrower.js';

const router = Router();
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5,
    message: "Too many requests from this IP, please try again later."
});

router.get("/", getBorrowers);
router.get("/Borrower/:borrowerId/CurrentBooks", getBorrowerBooks);
router.post("/Borrower/RegisterBorrower", limiter, RegisterBorrower);
router.put("/Borrower/UpdateBorrower/:id", UpdateBorrower);
router.delete("/Borrower/DeleteBorrower/:id", DeleteBorrower);

export default router;