import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
    minlength: [2, "First name must be at least 2 characters"],
    maxlength: [50, "First name cannot exceed 50 characters"]
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
    minlength: [2, "Last name must be at least 2 characters"],
    maxlength: [50, "Last name cannot exceed 50 characters"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please provide a valid email address"
    ]
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
    match: [
      /^[\+]?[1-9][\d]{0,15}$/,
      "Please provide a valid phone number"
    ]
  },
  date: {
    type: Date,
    required: [true, "Reservation date is required"],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: "Reservation date must be in the future"
    }
  },
  time: {
    type: String,
    required: [true, "Reservation time is required"],
    match: [
      /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/,
      "Please provide a valid time format (HH:MM)"
    ]
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled"],
    default: "pending"
  },
  notes: {
    type: String,
    maxlength: [500, "Notes cannot exceed 500 characters"],
    trim: true
  }
}, {
  timestamps: true
});

// Add indexes for better query performance
reservationSchema.index({ email: 1 });
reservationSchema.index({ date: 1 });
reservationSchema.index({ createdAt: -1 });

// Virtual for full name
reservationSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

// Ensure virtual fields are serialized
reservationSchema.set('toJSON', { virtuals: true });

const Reservation = mongoose.model("Reservation", reservationSchema);

export { Reservation };
