import { InferSchemaType, model, Schema } from "mongoose";

const favoriteSchema = new Schema({
    companyStick: { type: String, required: true, unique: true},
});

type Favorite = InferSchemaType<typeof favoriteSchema>;

export default model<Favorite>("Favorite", favoriteSchema);