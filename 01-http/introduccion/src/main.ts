import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';  //importar cosas en TS
const cookieParser = require('cookie-parser');//Importar cosas en JS
const express= require('express');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
async function bootstrap() {
  const app = await NestFactory.create(AppModule) as any;
  console.log('Esperando por el puerto 3001');
  //todas las configuraciones extras estan aqui arriba;
  app.use(cookieParser('ANDRES'));
  app.set('view engine','ejs') //Comando de instalación npm install ejs
  app.use(express.static('publico'));
  app.use(
    session({
      name: 'server-session-id',
      secret: 'No sera de tomar un traguito',
      resave: true,
      saveUninitialized: true,
      cookie: {secure: false},
      store: new FileStore(),
    }),
);
  await app.listen(3001);
}
bootstrap();
