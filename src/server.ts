import path from 'path';
import yamljs from 'yamljs';
import colors from 'colors';
import express from 'express';
import swaggerUI from 'swagger-ui-express';

import router from './router';
import database from './config/database';
import { addMetaResponsive } from './middleware';
import { swaggerUiOptions } from './config/swagger/swagger';

// Conexión a la base de datos
export async function connectDatabase() {
	try {
		await database.authenticate();
		database.sync();
		if (process.env.npm_lifecycle_event !== 'test') console.log(colors.blue.bold('Conexión exitosa a la DB'));
	} catch (error) {
		console.log('Hubo un error al conectarse a la DB');
	}
}

const server = express();

// Leer datos de formulario
server.use(express.json());

// Archivos estáticos
server.use(express.static('public'));
server.use('/swagger.css', express.static(path.join(__dirname, 'config/swagger/swagger.css')));

// Routing
server.use('/api/products', router);

// Documentación
const swaggerDocument = yamljs.load(path.join(__dirname, 'config/swagger/swagger.yaml'));
server.use('/docs', addMetaResponsive, swaggerUI.serve, swaggerUI.setup(swaggerDocument, swaggerUiOptions));

export default server;
