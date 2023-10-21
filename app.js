import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({extended: false}));

app.use('/add-product', (req, res, next) => {
	res.send('<form action="/product" method="post"><input' +
		' type="text" name="product"' +
		' /><button type="submit">Add product</button></form>')
});

app.post('/product', (req, res, next) => {
	console.log(req.body);
	res.redirect('/');
});

app.use('/', (req, res, next) => {
	res.send('<h1>Home page</h1>');
});


app.listen(3000);
