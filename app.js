import 'dotenv/config';
import express from 'express';
import 'express-async-errors';

// middlewares
import errorHandler from './middlewares/error-handler.js';

// routes
import bookRoutes from './routes/book.js';
import borrowerRoutes from './routes/borrower.js';
import borrowingRoutes from './routes/borrowing.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/Api/Books', bookRoutes);
app.use('/Api/Borrowers', borrowerRoutes);
app.use('/Api/Borrowing', borrowingRoutes);

app.use(errorHandler);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`server is running on port: ${port}`);
});