import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const bookSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  nhaxuatban: {
    type: String,
    required: true,
  },
  namxuatban: {
    type: Number,
    required: true,
  },
  tacgia: {
    type: String,
    required: true,
  },
  sotrang: {
    type: Number,
    required: true,
  },
  kichthuoc: {
    type: String,
    required: true,
  },
  soluongbandau: {
    type: Number,
    required: true,
  },
  soluongcon: {
    type: Number,
    required: true,
  },
  mota: {
    type: String,
    required: true,
  },
});

export default mongoose.model('Books', bookSchema);
