import mongoose, { Schema, model, models } from 'mongoose';

const ContactSchema = new Schema({
  selectedServices: [String],
  primaryService: String,
  budget: String,
  timeline: String,
  projectType: String,
  urgency: String,
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  company: String,
  position: String,
  projectDescription: String,
  goals: String,
  targetAudience: String,
  inspiration: String,
  additionalRequirements: String,
  files: [Object],
  createdAt: { type: Date, default: Date.now },
});

const Contact = models.Contact || model('Contact', ContactSchema);
export default Contact; 