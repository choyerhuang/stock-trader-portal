import { RequestHandler } from "express";
import mongoose from "mongoose";
import TradeModel from "../models/trade";
import BudgetModel from "../models/Budget";
import createHttpError from "http-errors";

export const getTrades: RequestHandler = async(req, res, next) => {
    try {
        const trades = await TradeModel.find().exec();

        res.status(200).json(trades);
    } catch (error) {
        next(error);
    }
};

interface buySellStockBody {
    companyStick?: string,
    stockPrice?: number,
    amount?: number,
    prevAmount? : number,
    prevCost? : number,
};

export const buyStock: RequestHandler<buySellStockBody, unknown, buySellStockBody, unknown> = async(req, res, next) => {
    const stick = req.body.companyStick;
    const price = req.body.stockPrice;
    const amount = req.body.amount;
    const prevAmount = req.body.prevAmount;
    const prevCost = req.body.prevCost;

    console.log(req.body);
    
    try {
        if (!stick||!price||!amount){
            throw createHttpError(400, "There is required parameter missing.")
        }

        // check budget
        const existingBudget = await BudgetModel.findOne();

        if (!existingBudget) {
            throw createHttpError(404, "Budget not found.");
        }

        if (existingBudget.budget < price * amount) {
            throw createHttpError(404, "You don't have enough money.");
        }

        // check already have or not
        const result = await TradeModel.findOne({ companyStick: stick });

        if (!result) {
            const newStock = await TradeModel.create({
                companyStick: stick,
                stockAmount: amount,
                averageCost: price,
                totalCost: price * amount,
            })

            res.status(200).json(newStock);
        } else {
            result.stockAmount += amount;
            result.averageCost = (prevCost || 0 + price * amount)/result.stockAmount;
            result.totalCost = (prevCost || 0 + price * amount);

            const updatedStock = await result.save();

            res.status(200).json(updatedStock);
        }        
    } catch (error) {
        next(error);
    }
};
    

export const sellStock: RequestHandler<buySellStockBody, unknown, buySellStockBody, unknown> = async(req, res, next) => {
    const stick = req.body.companyStick;
    const price = req.body.stockPrice;
    const amount = req.body.amount;
    const prevAmount = req.body.prevAmount;
    const prevCost = req.body.prevCost;
    
    try {
        if (!stick||!price||!amount){
            throw createHttpError(400, "There is required parameter missing.")
        }

        // check already have or not
        const result = await TradeModel.findOne({ companyStick: stick });

        if (!result) {
            throw createHttpError(404, "Not such stock found.");
        }

        if (result.stockAmount >= amount) {
            result.stockAmount -= amount;
            result.totalCost -= price * amount;
            result.averageCost = result.totalCost/result.stockAmount;

            if (result.stockAmount === 0) {
                const deleteResult = await TradeModel.findOneAndDelete({companyStick: stick});
                res.status(200).json(deleteResult);
            } else {
                const updatedStock = await result.save();
                res.status(200).json(updatedStock);
            }

            

            
        } else {
            throw createHttpError(400, "Not enough stock.")
        }

    } catch (error) {
        next(error);
    }
};    