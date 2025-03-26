import express from "express";
import * as BudgetController from"../controllers/Budget";

const router = express.Router();

router.get("/", BudgetController.getBudget);

router.post("/init", BudgetController.initialBudget);

router.post("/add", BudgetController.addBudget);

router.post("/minus", BudgetController.minusBudget);

router.post("/refresh", BudgetController.refreshBudget);

export default router;