import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Your name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
      index: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      maxlength: 20,
    },

    interest: {
      type: String,
      required: [true, "Interest is required"],
      enum: ["hire", "consult", "partner", "invest"],
    },

    // ✅ MATCHES YOUR CONTROLLER EXACTLY
    password: {
      type: String,
      required: [true, "Password is required"],
    },

    authProvider: {
      type: String,
      enum: ["local", "google", "apple", "facebook", "linkedin"],
      default: "local",
    },

    avatarUrl: {
      type: String,
      default: null,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    role: {
      type: String,
      enum: ["user", "agent", "admin"],
      default: "user",
    },

    lastLoginAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

// password harshing
userSchema.pre("save", async function (next) {
  if (!this.isModified("passwordHash")) return next();

  this.passwordHash = await bcrypt.hash(this.passwordHash, 12);
  next();
});

export default User;