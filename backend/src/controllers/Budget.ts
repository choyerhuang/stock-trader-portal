import { RequestHandler } from "express";
import mongoose from "mongoose";
import BudgetModel from "../models/Budget";
import createHttpError from "http-errors";

export const getBudget: RequestHandler = async(req, res, next) => {
    try {
        const budgets = await BudgetModel.find().exec();
        res.status(200).json(budgets);
    } catch (error) {
        next(error);
    }
};

interface UpdateBudget {
    budget?: number;
}

export const initialBudget: RequestHandler<UpdateBudget, unknown, UpdateBudget, unknown>  = async(req, res, next) => {
    const budget = req.body.budget;

    try {
        if(!budget){
            throw createHttpError(400, "The budget is needed.");
        }

        const newBudget = await BudgetModel.create({
            budget: budget,
        });

        res.status(201).json(newBudget);

    } catch (error) {
        next(error);
    }

};

export const addBudget: RequestHandler<UpdateBudget, unknown, UpdateBudget, unknown>  = async(req, res, next) => {
    const budget = req.body.budget;

    try {
        if (!budget) {
            throw createHttpError(400, "The budget is needed.");
        }

        const existingBudget = await BudgetModel.findOne();

        if (!existingBudget) {
            throw createHttpError(404, "Budget not found.");
        }

        existingBudget.budget += budget;

        const updatedBudget = await existingBudget.save();

        res.status(200).json(updatedBudget);

    } catch (error) {
        next(error);
    }
};

export const minusBudget: RequestHandler<UpdateBudget, unknown, UpdateBudget, unknown>  = async(req, res, next) => {
    const budget = req.body.budget;

    try {
        if (!budget) {
            throw createHttpError(400, "The budget is needed.");
        }

        const existingBudget = await BudgetModel.findOne();

        if (!existingBudget) {
            throw createHttpError(404, "Budget not found.");
        }

        existingBudget.budget -= budget;

        const updatedBudget = await existingBudget.save();

        res.status(200).json(updatedBudget);
        
    } catch (error) {
        next(error);
    }
};

export const refreshBudget: RequestHandler<UpdateBudget, unknown, UpdateBudget, unknown>  = async(req, res, next) => {

    try {
        const existingBudget = await BudgetModel.findOne();

        if (!existingBudget) {
            throw createHttpError(404, "Budget not found.");
        }

        existingBudget.budget = 25000;

        const updatedBudget = await existingBudget.save();

        res.status(200).json(updatedBudget);
        
    } catch (error) {
        next(error);
    }
};