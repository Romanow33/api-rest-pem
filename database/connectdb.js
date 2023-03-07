import mongoose from "mongoose";
const uri = process.env.URI_MONGO;
try {
  mongoose.set("strictQuery", false);
  await mongoose.connect(uri);
  console.log("succes DB connect");
} catch (error) {
  console.log(error);
}
