import mongoose, { Document, Model, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const BCRYPT_SALT_ROUNDS = 12;

export interface IRefreshToken {
  tokenHash: string;
  createdAt: Date;
  expiresAt: Date;
}

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  refreshTokens: IRefreshToken[];
  avatarUrl: string | null;
  role: 'guest' | 'host';
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidate: string): Promise<boolean>;
}

const refreshTokenSchema = new Schema<IRefreshToken>(
  {
    tokenHash: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiresAt: { type: Date, required: true },
  },
  { _id: false }
);

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [60, 'Name cannot exceed 60 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false, // excluded by default from queries
    },
    refreshTokens: [refreshTokenSchema],
    avatarUrl: {
      type: String,
      default: null,
    },
    role: {
      type: String,
      enum: ['guest', 'host'],
      default: 'guest',
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret: Record<string, any>) {
        delete ret.password;
        delete ret.refreshTokens;
        delete ret.__v;
        return ret;
      },
    },
  }
);

// Hash password before saving if modified
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err: any) {
    next(err);
  }
});

// Compare password candidate with stored hash
userSchema.methods.comparePassword = async function (candidate: string): Promise<boolean> {
  if (!this.password) {
    return false;
  }
  return bcrypt.compare(candidate, this.password);
};

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
