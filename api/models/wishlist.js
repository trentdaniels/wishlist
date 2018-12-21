const { Schema, model } = require('mongoose');

const wishlistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  products: [
    {
      item: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
    },
  ],
});

module.exports = model('WishList', wishlistSchema);
