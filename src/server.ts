import mongoose from "mongoose";
import app from "./app";
import config from "./config";
async function booStrap() {
  try {
    await mongoose.connect(config.mongoURI as string);
    console.log("Connected to database");
    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    console.log("Error connecting to database: ", error);
  }
}

booStrap();
