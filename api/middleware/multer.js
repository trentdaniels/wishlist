const multer = require('multer');

exports.storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `images/${req.userId}`);
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

exports.fileFilter = (req, file, cb) => {
  switch (file.mimetype) {
    case 'image/jpg':
      cb(null, true);
      break;
    case 'image/png':
      cb(null, true);
      break;
    case 'image/jpeg':
      cb(null, true);
      break;
    default:
      cb(null, false);
  }
};
