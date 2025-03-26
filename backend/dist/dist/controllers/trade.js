"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sellStock = exports.buyStock = exports.getTrades = void 0;
const trade_1 = __importDefault(require("../models/trade"));
const Budget_1 = __importDefault(require("../models/Budget"));
const http_errors_1 = __importDefault(require("http-errors"));
const getTrades = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trades = yield trade_1.default.find().exec();
        res.status(200).json(trades);
    }
    catch (error) {
        next(error);
    }
});
exports.getTrades = getTrades;
;
const buyStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const stick = req.body.companyStick;
    const price = req.body.stockPrice;
    const amount = req.body.amount;
    const prevAmount = req.body.prevAmount;
    const prevCost = req.body.prevCost;
    console.log(req.body);
    try {
        if (!stick || !price || !amount) {
            throw (0, http_errors_1.default)(400, "There is required parameter missing.");
        }
        // check budget
        const existingBudget = yield Budget_1.default.findOne();
        if (!existingBudget) {
            throw (0, http_errors_1.default)(404, "Budget not found.");
        }
        if (existingBudget.budget < price * amount) {
            throw (0, http_errors_1.default)(404, "You don't have enough money.");
        }
        // check already have or not
        const result = yield trade_1.default.findOne({ companyStick: stick });
        if (!result) {
            const newStock = yield trade_1.default.create({
                companyStick: stick,
                stockAmount: amount,
                averageCost: price,
                totalCost: price * amount,
            });
            res.status(200).json(newStock);
        }
        else {
            result.stockAmount += amount;
            result.averageCost = (prevCost || 0 + price * amount) / result.stockAmount;
            result.totalCost = (prevCost || 0 + price * amount);
            const updatedStock = yield result.save();
            res.status(200).json(updatedStock);
        }
    }
    catch (error) {
        next(error);
    }
});
exports.buyStock = buyStock;
const sellStock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const stick = req.body.companyStick;
    const price = req.body.stockPrice;
    const amount = req.body.amount;
    const prevAmount = req.body.prevAmount;
    const prevCost = req.body.prevCost;
    try {
        if (!stick || !price || !amount) {
            throw (0, http_errors_1.default)(400, "There is required parameter missing.");
        }
        // check already have or not
        const result = yield trade_1.default.findOne({ companyStick: stick });
        if (!result) {
            throw (0, http_errors_1.default)(404, "Not such stock found.");
        }
        if (result.stockAmount >= amount) {
            result.stockAmount -= amount;
            result.totalCost -= price * amount;
            result.averageCost = result.totalCost / result.stockAmount;
            if (result.stockAmount === 0) {
                const deleteResult = yield trade_1.default.findOneAndDelete({ companyStick: stick });
                res.status(200).json(deleteResult);
            }
            else {
                const updatedStock = yield result.save();
                res.status(200).json(updatedStock);
            }
        }
        else {
            throw (0, http_errors_1.default)(400, "Not enough stock.");
        }
    }
    catch (error) {
        next(error);
    }
});
exports.sellStock = sellStock;
