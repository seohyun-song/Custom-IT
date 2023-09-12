const valiedatePostProduct = async (req, res, next) => {
    const { name, price, description, company, categoryName } = req.body;

    if (!name || !price || !description || !company || !categoryName) {
        const error = new Error('모든 값은 필수 값입니다.');
        error.statusCode = 400;
        throw error;
    }

    if (
        req.file.mimetype !== 'image/png' &&
        req.file.mimetype !== 'image/jpg' &&
        req.file.mimetype !== 'image/jpeg'
    ) {
        const error = new Error('.png, .jpeg, .jpg 파일만 업로드 가능합니다.');
        error.statusCode = 400;
        throw error;
    }

    next();
};

const validatePutProduct = async (req, res, next) => {
    const { name, price, description, company, categoryName } = req.body;
    if (!name || !price || !description || !company || !categoryName) {
        const error = new Error('모든 값은 필수 값입니다.');
        error.statusCode = 400;
        throw error;
    }
    if (req.file) {
        if (
            req.file.mimetype !== 'image/png' &&
            req.file.mimetype !== 'image/jpg' &&
            req.file.mimetype !== 'image/jpeg'
        ) {
            const error = new Error('.png, .jpeg, .jpg 파일만 업로드 가능합니다.');
            error.statusCode = 400;
            throw error;
        }
    }

    next();
};

module.exports = {
    valiedatePostProduct,
    validatePutProduct,
};
