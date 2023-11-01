import ProductsController from './products.js';
import ContentController from './content.js';

export default {
	products: new ProductsController(),
	content: new ContentController()
}
