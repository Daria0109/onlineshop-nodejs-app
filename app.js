import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js';
import controllers from './controllers/index.js';
import sequelize from './util/datadase.js';
import ProductModel from './models/products.js';
import UserModel from './models/user.js';
import CartModel from './models/cart.js';
import CartItemModel from './models/cart-item.js';
import OrderModel from './models/order.js';
import OrderItemModel from './models/order-item.js';

const app = express();

// no need to set pug engine because it's build-in

// enable handlebars templates engine as it's not a build-in engine
// the extension of templates files(f.e. *.hbs) should be equal
// to the first argument in app.engine()
// app.engine('hbs', expressHbs({
// 	layoutsDir: 'views/layouts/',
// 	defaultLayout: 'app-layouts.hbs',
// 	extname: 'hbs'
// }));
// app.set('view engine', 'hbs');

app.set('view engine', 'ejs');

app.use((req, res, next) => {
	UserModel
		.findAll({where: {id: 1}})
		.then((user) => {
			req.user = user[0];
			next();
		})
		.catch((err) => console.log(err));
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', controllers.content.getNotFoundPage);

ProductModel.belongsTo(UserModel, {constraints: true, onDelete: 'CASCADE'});
UserModel.hasMany(ProductModel);
UserModel.hasOne(CartModel);
CartModel.belongsTo(UserModel);
ProductModel.belongsToMany(CartModel, {through: CartItemModel});
CartModel.belongsToMany(ProductModel, {through: CartItemModel});
OrderModel.belongsTo(UserModel);
UserModel.hasMany(OrderModel);
ProductModel.belongsToMany(OrderModel, {through: OrderItemModel});
OrderModel.belongsToMany(ProductModel, {through: OrderItemModel})


sequelize
	.sync({alter: true})
	.then(() => {
		return UserModel.findOrCreate({
			where: {id: 1},
			defaults: {name: 'Max', email: 'test@test.com'}
		})
	})
	.then((user) => {
		return user[0].createCart();
	})
	.then(() => {
		app.listen(3000);
	})
	.catch((err) => console.log(err));

