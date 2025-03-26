import { InferSchemaType, Schema, model } from "mongoose";

const tradeSchema = new Schema ({
    companyStick: { type: String, required: true},
    stockAmount: { type: Number, required: true},
    averageCost: { type: Number, required: true},
    totalCost: { type: Number, required: true},
});

type Trade = InferSchemaType<typeof tradeSchema>;

export default model<Trade>("Trade", tradeSchema);