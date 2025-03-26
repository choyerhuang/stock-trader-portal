import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import searchStockRoutes from "./routes/search";
import favoriteRoutes from "./routes/favorite";
import BudgetRoutes from "./routes/Budget";
import tradeRoutes from "./routes/trade";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import session from "express-session";
import env from "./util/validateEnv";
import MongoStore from "connect-mongo";
import path from 'path';

var cors = require('cors');
const app = express();

app.use(cors());

app.use(morgan("dev"));

app.use(express.json());

app.use(session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
        mongoUrl: env.MONGO_CONNECTION_STRING
    })
}));

app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);
app.use("/favorite", favoriteRoutes);
app.use("/search", searchStockRoutes);
app.use("/budget", BudgetRoutes);
app.use("/trade", tradeRoutes);

app.use(express.static(path.join(__dirname, '..')));



app.get('*', (req, res) => {
    console.log(__dirname);
    console.log(path.join(__dirname, '..', 'index.html'));
    res.sendFile(path.join(__dirname, '..', 'index.html'));
  });

  






app.use((req: Request, res: Response, next: NextFunction) => {
    next(createHttpError(404, "Endpoint not found."));
});


app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(error);
    let errorMessage = "An unknown error occurred";
    let statusCode = 500;
    if (isHttpError(error)) {
        statusCode = error.status;
        errorMessage = error.message;
    }
    res.status(statusCode).json({ error: errorMessage });
});

export default app;