import { Schema, model } from "mongoose";

const subscriptionSchema = new Schema({
  endpoint: { type: String, required: true },
  expirationTime: { type: Number, default: null },
  keys: {
    p256dh: { type: String, required: true },
    auth: { type: String, required: true },
  },
});

const Subscription = model("Subscription", subscriptionSchema);

export { Subscription as SubscriptionModel };
