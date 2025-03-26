import { InferSchemaType, Schema, model } from "mongoose";

const budgetSchema = new Schema ({
    budget: { type: Number, required: true},
});

type Budget = InferSchemaType<typeof budgetSchema>;

export default model<Budget>("Budget", budgetSchema);