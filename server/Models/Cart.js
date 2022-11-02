import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const cartSchema = new mongoose.Schema({
  idBook: {
    type: 'string',
    required: true
  },
  nameBook: {
    type: 'string',
    required: true
  },
  username: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  total_price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  max_quan:{
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

export default mongoose.model('cart', cartSchema);
