const { Category } = require('../data-access');

const validateCategory = async (req, res, next) => {
    const { name } = req.body;
    const isExists = await Category.exists({ name });

    if (isExists) {
        const error = new Error('중복된 이름입니다.');
        error.statusCode = 400;
        throw error;
    }
    if (!name) {
        const error = new Error('카테고리명을 1자 이상 입력해주세요.');
        error.statusCode = 400;
        throw error;
    } else if (name.length > 10) {
        const error = new Error('카테고리명을 10자 미만 입력해주세요.');
        error.statusCode = 400;
        throw error;
    }

    next();
};

module.exports = {
    validateCategory,
};
