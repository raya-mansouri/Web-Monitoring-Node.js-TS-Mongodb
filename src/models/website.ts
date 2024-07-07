import mongoose, { Document, Schema } from 'mongoose';

export interface IWebsite extends Document {
  url: string;
  status: string;
  lastChecked: Date;
  downtimeCount: number;
  alertMethods: string[];
}

const websiteSchema: Schema = new Schema({
  url: { type: String, required: true },
  status: { type: String, default: 'unknown' },
  lastChecked: { type: Date, default: Date.now },
  downtimeCount: { type: Number, default: 0 },
  alertMethods: { type: [String], default: [] }
});

const Website = mongoose.model<IWebsite>('Website', websiteSchema);

export default Website;