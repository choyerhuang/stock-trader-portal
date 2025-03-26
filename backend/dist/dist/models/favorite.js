"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const favoriteSchema = new mongoose_1.Schema({
    companyStick: { type: String, required: true, unique: true },
});
exports.default = (0, mongoose_1.model)("Favorite", favoriteSchema);
