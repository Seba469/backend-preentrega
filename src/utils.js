import { fileURLToPath } from 'url'
import { dirname } from 'path'
import multer from "multer"

const __filname = fileURLToPath(import.meta.url);
const __dirname = dirname(__filname)

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, __dirname + "/public/images");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + file.originalname);
    },
  });
  
  export const uploader = multer({
    storage,
    onError: function (err, next) {
      console.log(err);
      next();
    },
  });

export default __dirname;