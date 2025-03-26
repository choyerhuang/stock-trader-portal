"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tradeSchema = new mongoose_1.Schema({
    companyStick: { type: String, required: true },
    stockAmount: { type: Number, required: true },
    averageCost: { type: Number, required: true },
    totalCost: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)("Trade", tradeSchema);
