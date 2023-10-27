import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', (req, res) => {
	res
		.status(404)
		.render('404.pug', {title: 'Not found'});
});

app.listen(3000);
