import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js';
import { mongoConnect } from './util/datadase.js';
import controllers from './controllers/index.js';
import UserModel from './models/user.js';

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

const mongoUserID = '65b8acf00d24df5024e531a8';

app.use((req, res, next) => {
	// GET USER WITH SEQUELIZE
	// UserModel
	// 	.findAll({where: {id: 1}})
	// 	.then((user) => {
	// 		req.user = user[0];
	// 		next();
	// 	})
	// 	.catch((err) => console.log(err));

	// GET USER WITH MONGODB
	UserModel
		.findById(mongoUserID)
		.then((user) => {
			const {_id, username, email, cart} = user;
			req.user = new UserModel(username, email, cart, _id);
			next();
		})
		.catch((err) => console.log(err));
});

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', controllers.content.getNotFoundPage);

mongoConnect(() => {
	app.listen(3000);
});

// CONNECTION TO MYSQL DB

// ProductModel.belongsTo(UserModel, {constraints: true, onDelete: 'CASCADE'});
// UserModel.hasMany(ProductModel);
// UserModel.hasOne(CartModel);
// CartModel.belongsTo(UserModel);
// ProductModel.belongsToMany(CartModel, {through: CartItemModel});
// CartModel.belongsToMany(ProductModel, {through: CartItemModel});
// OrderModel.belongsTo(UserModel);
// UserModel.hasMany(OrderModel);
// ProductModel.belongsToMany(OrderModel, {through: OrderItemModel});
// OrderModel.belongsToMany(ProductModel, {through: OrderItemModel})
//
//
// sequelize
// 	.sync({alter: true})
// 	.then(() => {
// 		return UserModel.findOrCreate({
// 			where: {id: 1},
// 			defaults: {name: 'Max', email: 'test@test.com'}
// 		})
// 	})
// 	.then((user) => {
// 		return user[0].createCart();
// 	})
// 	.then(() => {
// 		app.listen(3000);
// 	})
// 	.catch((err) => console.log(err));

