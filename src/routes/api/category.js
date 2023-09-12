const { Router } = require('express');
const { nanoid } = require('nanoid');

const categoryService = require('../../services/category');

const asyncHandler = require('../../utils/async-handler');
const { validateCategory } = require('../../middlewares/category-validate');

const router = Router();

router.post(
    '/',
    validateCategory,
    asyncHandler(async (req, res) => {
        const { name } = req.body;
        const id = nanoid(10);

        categoryService.createCategory({ id, name });

        res.status(201);
        res.json({
            data: {
                id,
            },
        });
    }),
);

router.put(
    '/:id',
    validateCategory,
    asyncHandler(async (req, res) => {
        const { name } = req.body;
        const { id } = req.params;

        categoryService.updateCategory({ id, name });

        res.status(201);
    }),
);

router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        categoryService.deleteCategory({ id });

        res.status(200);
    }),
);

module.exports = router;
