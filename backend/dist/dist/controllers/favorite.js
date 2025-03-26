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
exports.deleteFavorites = exports.createFavorites = exports.getFavorite = exports.getFavorites = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const favorite_1 = __importDefault(require("../models/favorite"));
const http_errors_1 = __importDefault(require("http-errors"));
const getFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const favorites = yield favorite_1.default.find().exec();
        res.status(200).json(favorites);
    }
    catch (error) {
        next(error);
    }
});
exports.getFavorites = getFavorites;
const getFavorite = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const favoriteId = req.params.favoriteId;
    try {
        if (!mongoose_1.default.isValidObjectId(favoriteId)) {
            throw (0, http_errors_1.default)(400, "Invalid favorite id.");
        }
        const favorite = yield favorite_1.default.findById(favoriteId).exec();
        if (!favorite) {
            throw (0, http_errors_1.default)(404, "Favorite not found.");
        }
        res.status(200).json(favorite);
    }
    catch (error) {
        next(error);
    }
});
exports.getFavorite = getFavorite;
;
const createFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const stick = req.body.companyStick;
    try {
        if (!stick) {
            throw (0, http_errors_1.default)(400, "company's stick is required.");
        }
        const newFavorite = yield favorite_1.default.create({
            companyStick: stick,
        });
        res.status(201).json(newFavorite);
    }
    catch (error) {
        next(error);
    }
});
exports.createFavorites = createFavorites;
const deleteFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const stick = req.params.companyStick;
    try {
        const result = yield favorite_1.default.findOneAndDelete({ companyStick: stick });
        res.sendStatus(204);
    }
    catch (error) {
        next(error);
    }
});
exports.deleteFavorites = deleteFavorites;
