import app from "./app";
import env from "./util/validateEnv";
import mongoose from "mongoose";
import path from 'path';

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING)
    .then(()=> {
        console.log("Mongoose connected");
        app.listen(port, () => {
            console.log("Server running on Port: " + port);
        });     
    })
    .catch(console.error);

