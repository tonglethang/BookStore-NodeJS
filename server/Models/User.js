import mongoose from 'mongoose';
mongoose.Promise = global.Promise;

const usersSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phonenumber:{
    type: String,
    required: true,
  },
  time_create :{
    type: Date,
    required: true,
  },
  time_update: {
    type: Date
  },
});

export default mongoose.model('users', usersSchema);
