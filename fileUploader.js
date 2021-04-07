import multer from 'multer';
import path from 'path';

const storageOptions = multer.diskStorage({
    destination : './uploads/images',
    filename: (req, file, imgHandler) => {
        return imgHandler(null, `${Date.now()}${path.extname(file.originalname)}`);
    }
})

export const upload = multer({
    storage: storageOptions
});