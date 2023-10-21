import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', (req, res) => {
	res
		.status(404)
		.send('<h1>Page is not found!</h1>');
});

app.listen(3000);
