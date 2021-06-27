const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'uploads/');
    },
    filename: (req, file, callback) => {
        callback(null, `${Date.now()}-${file.originalname}`);
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    }
    callback(null, false);
}


const upload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 2
    },
    fileFilter
});

module.exports = upload;