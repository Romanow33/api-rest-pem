import mongoose from "mongoose";
const uri = process.env.URI_MONGO;

try {
  await mongoose.connect(uri);
  console.log("succes DB connect")
} catch (error) {
  console.log(error);
}
