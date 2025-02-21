const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    name: String,
  email: [String],
  education:
    [{
      degree: String,
      branch : String,
      institution: String,
      year: String
    }],
  experience: 
    [{
      job_title: String,
      company: String,
      start_date: String,
      end_date: String
    }],
  skills: [
    String
  ],
  summary: String
},{
    timestamps: true
})

module.exports = mongoose.model("Resume",resumeSchema);

