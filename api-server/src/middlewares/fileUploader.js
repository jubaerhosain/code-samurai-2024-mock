import multer from "multer";

const storage = multer.diskStorage({});

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5, // Limit file size to 5MB
    },
});
