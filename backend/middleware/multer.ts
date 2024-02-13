import multer from 'multer'
import { hashFileName } from "../shared/constants";

let logoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/logos')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        // @ts-ignore
        cb(null, file.fieldname + '-' + req.decoded.user._id + '.' + extension)
    }
})

export const logoUploads = multer({ storage: logoStorage });


let productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/product-images')
    },
    filename: function (req, file, cb) {
        let extArray = file.mimetype.split("/");
        let extension = extArray[extArray.length - 1];
        // @ts-ignore
        cb(null, hashFileName(file.originalname) + '-' + Date.now() + '.' + extension)
    }
})

export const productUploads = multer({ storage: productStorage });