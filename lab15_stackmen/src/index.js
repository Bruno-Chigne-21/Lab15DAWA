import express from 'express';
import morgan from 'morgan';
import { engine } from 'express-handlebars';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import clientesRoutes from '../src/routes/clientes.routes.js';
import proovedoresRoutes from '../src/routes/proovedores.routes.js'
import ordencompraRoutes from '../src/routes/ordencompra.routes.js'
import { handlebars } from './views/ordencompra/handlebarsHelpers.js';

const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.set('port',process.env.PORT || 3000);

app.set('views', join(__dirname, 'views'));


app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: join(app.get('views'), 'layouts'),
    partialsDir: join(app.get('views'), 'partials'),
    extname: '.hbs',
    handlebars: handlebars
}));
app.set('view engine', '.hbs');

//Middlewares
app.use(morgan('dev'));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

//Routes
app.get('/', (req, res)=>{
    res.render('index')
});

app.use(clientesRoutes)

app.use(proovedoresRoutes)

app.use(ordencompraRoutes)

//Public Files
app.use(express.static(join(__dirname, 'public')));


//Run server
app.listen(app.get('port'), ()=>
console.log('cargando el puerto',app.get('port')));