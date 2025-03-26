import express from "express";
import * as FavoriteController from "../controllers/favorite";

const router = express.Router();

router.get("/", FavoriteController.getFavorites);

router.get("/:favoriteId", FavoriteController.getFavorite);

router.post("/", FavoriteController.createFavorites);

router.delete("/:companyStick", FavoriteController.deleteFavorites);

export default router;