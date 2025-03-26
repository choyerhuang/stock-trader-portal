import express from "express";
import * as TradeController from "../controllers/trade";

const router = express.Router();

router.get("/", TradeController.getTrades);

router.post("/buy", TradeController.buyStock);

router.post("/sell", TradeController.sellStock);

export default router;