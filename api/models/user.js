const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN', 'CLIENT'],
  },
  wishlists: [
    {
      type: Schema.Types.ObjectId,
      rel: 'Wishlist',
    },
  ],
});

module.exports = model('User', userSchema);
