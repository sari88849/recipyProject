const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'upload/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}- ${file.originalname}`)
    }
})

const fileFilter = (req, file, cb) => {
    //בודק האם מדובר בקובץ מסוג תמונה
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    cb(null, false);
}

const upload = multer({
    // dest:'upload/',
    storage,

    //גודל תמונה אפשרי
    //    limits:{
    //        fileSize:1024*1024*2
    //    },
    fileFilter: fileFilter
});


module.exports = upload;