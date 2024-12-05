import { Router } from 'express';
import { body, param } from 'express-validator';
import { validateErrors } from './middleware';
import { getProductById, getProducts, createProduct, updateProduct } from './handlers/product';

const router = Router();

// Obtener producto por ID
router.get('/:id', param('id').isInt().withMessage('ID no válido'), validateErrors, getProductById);

// Obtener todos los productos
router.get('/', getProducts);

// Crear Producto
router.post(
	'/',
	body('name').notEmpty().withMessage('Debes ingresar el nombre del producto'),
	body('price')
		.notEmpty()
		.isNumeric()
		.custom(value => value > 0)
		.withMessage('Debes ingresar un precio válido'),
	validateErrors,
	createProduct
);

// Actualizar Producto
router.put(
	'/:id',
	param('id').notEmpty().withMessage('Debes enviar el id del producto a actualizar'),
	body('name').notEmpty().withMessage('Debes ingresar el nombre del producto'),
	body('price')
		.notEmpty()
		.isNumeric()
		.custom(value => value > 0)
		.withMessage('Debes indicar un precio válido'),
	body('availability').isBoolean().withMessage('Debes indicar la disponibilidad'),
	validateErrors,
	updateProduct
);

export default router;
