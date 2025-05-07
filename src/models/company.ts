import mongoose, { Schema, Document, Types } from 'mongoose';

interface ICompany extends Document {
  name: string;
  type: string;
  employies: Types.ObjectId[];
  isActive: boolean;
  logo: string;
}

const CompanySchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    type: {
      type: String,
      required: true,
    },
    employies: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Employee', 
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
    logo: {
      type: String,
    },
  },
  { timestamps: true }
);

const Company = mongoose.models.Company || mongoose.model<ICompany>('Company', CompanySchema);
export default Company;

