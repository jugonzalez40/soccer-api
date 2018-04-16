import express from 'express';
import Ructor from '../ructor.js';
import MJugador from './jugador.model';
import SRV_CONFIG from '../../../config/server.config.json'
//La ruta de consumo sería http://<ip|localhost>:<puerto>/contribuyente
class Jugador {
	constructor() {
		//Model jugador
		this.dbJugador = new MJugador();
		//Instancias de funciones asincronas
		this.get = this.get.bind(this);
		this.getById = this.getById.bind(this);
		this.post = this.post.bind(this);
		this.put = this.put.bind(this);
		this.search = this.search.bind(this);
		this.delete = this.delete.bind(this);
		this.schemaValidator = this.schemaValidator.bind(this);
		//ruteador
		this.router = express.Router();
		//Path de consumo
		this.path = '/jugador';
		//Primer middleware, evalua si la trama que se envia es correcta
		this.router.use(this.path, this.schemaValidator);
		//Mapa de ruteo
		this.router.get(this.path, this.get);
		this.router.get(`${this.path}/:id`, this.getById);
		this.router.post(`${this.path}/search`, this.search);
		this.router.post(this.path, this.post);
		this.router.put(this.path, this.put);
		this.router.delete(this.path, this.delete);
		//
		return this.router;
	}

	schemaValidator(req, res, next) {

		/*let body = req.body;
		//Si tiene cuerpo 
		if (body) {
			this.schema.police(body) ? next() : res.send(SRV_CONFIG.ALERTAS.TRAMA_CORRUPTA);
		} else if (req.method === 'GET') {
			next();
		} else {
			//Si no es get y no tiene cuerpo 
			res.send(SRV_CONFIG.ALERTAS.TRAMA_CORRUPTA)
		}*/

		next();
	}

	getById(req, res, next) {
		this.dbJugador.findById(req.params.id)
			.then((data) => res.send(data))
			.catch((err) => res.end(err));
	}

	get(req, res, next) {
		this.dbJugador.find()
			.then((data) => res.send(data))
			.catch((err) => res.end(err));
	}

	search(req,res,next){
		this.dbJugador.find(req.body)
			.then((data) => res.send(data))
			.catch((err) => res.end(err));
	}
	//Metodo post = insert database
	post(req, res, next) {
		let jugador = new this.dbJugador(req.body);
		jugador.save()
			.then((data) => res.send(data))
			.catch((err) => res.send(err));
	}

	put(req, res, next) {
		this.dbJugador.findById(req.params.id)

	}

	delete(req, res, next) {
		
	}
}

module.exports = Jugador;