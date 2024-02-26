const multer = require('multer');
const SharpMulter = require('sharp-multer');
const fs = require('fs');
const path = require('path');

const options = {
  fileFormat: 'webp',
  quality: 60,
  resize: { height: 600, resizeMode: "contain" },
  useTimestamp: true,
};

exports.dirExists = (directory) => {
  const fileDirectory = path.join(__dirname, '..', directory);
  if (!fs.existsSync(fileDirectory)) {
    fs.mkdirSync(fileDirectory);
    console.log('dossier non existant créé');
  } else {
    console.log('dossier existant');
  }
};

const newFilename = (ogFilename, options, req) => {
  const timestamp = options.useTimestamp ? `${Date.now()}` : '';
  const finalname = `upload_${timestamp}.${options.fileFormat}`;
  return finalname;
};

const storage = SharpMulter({
  destination: (req, file, callback) => callback(null, 'images'),
  imageOptions: options,
  filename: newFilename,
});

const upload = multer({ storage });

exports.uploadMiddleware = (req, res, next) => {
  upload.single('image')(req, res, next);
};

// module.exports = uploadMiddleware;
