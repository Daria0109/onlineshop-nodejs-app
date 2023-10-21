import path from 'path';
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
		.sendFile(path.join(process.cwd(), 'views', '404.html'));
});

app.listen(3000);
