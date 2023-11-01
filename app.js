import express from 'express';
import bodyParser from 'body-parser';
import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js';

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

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use('/', (req, res) => {
	const {url} = req;

	res
		.status(404)
		.render('404.ejs', {title: 'Not found', path: url});
});

app.listen(3000);
