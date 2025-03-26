"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const budgetSchema = new mongoose_1.Schema({
    budget: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)("Budget", budgetSchema);
