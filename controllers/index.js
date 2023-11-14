import ShopController from './shop.js';
import ContentController from './content.js';
import AdminController from './admin.js';

export default {
	shop: new ShopController(),
	admin: new AdminController(),
	content: new ContentController()
}
