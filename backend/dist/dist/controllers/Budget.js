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
exports.refreshBudget = exports.minusBudget = exports.addBudget = exports.initialBudget = exports.getBudget = void 0;
const Budget_1 = __importDefault(require("../models/Budget"));
const http_errors_1 = __importDefault(require("http-errors"));
const getBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const budgets = yield Budget_1.default.find().exec();
        res.status(200).json(budgets);
    }
    catch (error) {
        next(error);
    }
});
exports.getBudget = getBudget;
const initialBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const budget = req.body.budget;
    try {
        if (!budget) {
            throw (0, http_errors_1.default)(400, "The budget is needed.");
        }
        const newBudget = yield Budget_1.default.create({
            budget: budget,
        });
        res.status(201).json(newBudget);
    }
    catch (error) {
        next(error);
    }
});
exports.initialBudget = initialBudget;
const addBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const budget = req.body.budget;
    try {
        if (!budget) {
            throw (0, http_errors_1.default)(400, "The budget is needed.");
        }
        const existingBudget = yield Budget_1.default.findOne();
        if (!existingBudget) {
            throw (0, http_errors_1.default)(404, "Budget not found.");
        }
        existingBudget.budget += budget;
        const updatedBudget = yield existingBudget.save();
        res.status(200).json(updatedBudget);
    }
    catch (error) {
        next(error);
    }
});
exports.addBudget = addBudget;
const minusBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const budget = req.body.budget;
    try {
        if (!budget) {
            throw (0, http_errors_1.default)(400, "The budget is needed.");
        }
        const existingBudget = yield Budget_1.default.findOne();
        if (!existingBudget) {
            throw (0, http_errors_1.default)(404, "Budget not found.");
        }
        existingBudget.budget -= budget;
        const updatedBudget = yield existingBudget.save();
        res.status(200).json(updatedBudget);
    }
    catch (error) {
        next(error);
    }
});
exports.minusBudget = minusBudget;
const refreshBudget = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingBudget = yield Budget_1.default.findOne();
        if (!existingBudget) {
            throw (0, http_errors_1.default)(404, "Budget not found.");
        }
        existingBudget.budget = 25000;
        const updatedBudget = yield existingBudget.save();
        res.status(200).json(updatedBudget);
    }
    catch (error) {
        next(error);
    }
});
exports.refreshBudget = refreshBudget;
