const multer = require('multer');
const SharpMulter = require('sharp-multer');

const options = {
  fileFormat: 'webp',
  quality: 60,
  resize: { width: 338, height: 600 },
  useTimestamp: true,
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

const uploadMiddleware = (req, res, next) => {
  upload.single('image')(req, res, next);
};

module.exports = uploadMiddleware;
