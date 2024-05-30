import mongoose from "mongoose";

const HotelSchema = new mongoose.Schema({});

const Hotel = mongoose.model("Hotel", HotelSchema);

export default Hotel;
