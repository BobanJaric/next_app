import mongoose from "mongoose";

const CrewSchema = new mongoose.Schema({
  rank: { type: String, required: true },
  rankNbr: { type: String, required: true },
  fullname: { type: String, required: true },
  dob: { type: String, required: true },
  nationality: { type: String, required: true },
  passport: { type: String, required: true },
  passportValidity: { type: String },
  licenceNbr: { type: String },
  img: { type: String },
  opc: { type: String },
  lpc: { type: String },
  hours: {},
  workingFrom: { type: String },
});

const Crew = mongoose.models.Crew || mongoose.model("Crew", CrewSchema);

export default Crew;
