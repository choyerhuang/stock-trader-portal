import { RequestHandler } from "express";
import mongoose from "mongoose";
import FavoriteModel from "../models/favorite";
import createHttpError from "http-errors";

export const getFavorites: RequestHandler = async (req, res, next) => {
    try {
        const favorites = await FavoriteModel.find().exec();
        res.status(200).json(favorites);
    } catch (error) {
        next(error);
    }
};

export const getFavorite: RequestHandler = async (req, res, next) => {
    const favoriteId = req.params.favoriteId;
    
    try {
        if(!mongoose.isValidObjectId(favoriteId)){
            throw createHttpError(400, "Invalid favorite id.");
        }

        const favorite = await FavoriteModel.findById(favoriteId).exec();

        if (!favorite) {
            throw createHttpError(404, "Favorite not found.");
        }

        res.status(200).json(favorite);
    } catch (error) {
        next(error);
    }
};

interface CreateFavoriteBody {
    companyStick?: string,
};

export const createFavorites: RequestHandler<unknown, unknown, CreateFavoriteBody, unknown> = async (req, res, next) => {
    const stick = req.body.companyStick;

    try {
        if (!stick) {
            throw createHttpError(400, "company's stick is required.");
        }

        const newFavorite = await FavoriteModel.create({
            companyStick: stick,
        });

        res.status(201).json(newFavorite);
    } catch (error) {
        next(error);
    }
};

export const deleteFavorites: RequestHandler = async(req, res, next) => {
    const stick = req.params.companyStick;

    try {
        const result = await FavoriteModel.findOneAndDelete({ companyStick: stick });

        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
};