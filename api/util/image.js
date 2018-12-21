const fs = require('fs');
const path = require('path');

exports.deleteImage = (filePath) => {
  const newFilePath = path.join(__dirname, '..', filePath);
  fs.unlink(newFilePath, (err) => {
    throw err;
  });
};
