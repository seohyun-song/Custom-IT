const { Router } = require('express');
const { nanoid } = require('nanoid');

const productService = require('../../services/product');

const asyncHandler = require('../../utils/async-handler');
const { valiedatePostProduct, validatePutProduct } = require('../../middlewares/product-validate');
const upload = require('../../middlewares/multer');
const { Product } = require('../../data-access');

const router = Router();

router.post(
    '/',
    upload.single('productImage'),
    valiedatePostProduct,
    asyncHandler(async (req, res) => {
        const { name, price, description, company, categoryName } = req.body;

        const id = nanoid(10);

        productService.createProduct({
            id,
            name,
            price: Number(price),
            description,
            company,
            categoryName,
            image: `${req.file.originalname}`,
        });

        res.status(201).redirect('/admin/product');
    }),
);

router.post(
    '/:id',
    upload.single('productImage'),
    validatePutProduct,
    asyncHandler(async (req, res) => {
        const { id } = req.params;
        const { name, price, description, company, categoryName } = req.body;
        let image;
        if (!req.file) {
            const product = await Product.find({ id });
            image = product.image;
        } else {
            image = `${req.file.originalname}`;
        }

        productService.updateProduct({
            id,
            name,
            price: Number(price),
            description,
            company,
            categoryName,
            image,
        });

        res.status(201).redirect('/admin/product');
    }),
);

router.delete(
    '/:id',
    asyncHandler(async (req, res) => {
        const { id } = req.params;

        productService.deleteProduct({ id });

        res.status(200).redirect('/admin/product');
    }),
);

module.exports = router;
