import mongoose from "mongoose";

const AircraftSchema = new mongoose.Schema({
  aircraft: { type: String, required: true },
    callsign: { type: String, required: true },
    type: { type: String, required: true },
    mtow: { type: String, required: true },
    operator: { type: String},
   
});

const Aircraft = mongoose.models.Aircraft || mongoose.model("Aircraft", AircraftSchema);

export default Aircraft;