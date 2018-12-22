const { Schema, model } = require('mongoose');

const wishlistSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
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
  },
  { timestamps: true },
);

module.exports = model('WishList', wishlistSchema);
