import { Controller, Get, Post, Delete, HttpCode,Headers, Header, BadRequestException, Param,Query, Body, Req, Res ,Put } from "@nestjs/common";
import { MascotaCreateDto } from "../Mascota/dto/mascota.create-dto";
import { ValidationError, validate } from "class-validator";
import { NumerosCreateDto } from "./dto/numeros.create-dto";


//Definimos a que URL 
// /juegos-http
// http://localhost:3001/juegos-http
@Controller('juegos-http')
export class HttpJuegoController{
    @Get('hola')
    @HttpCode(201)
    
    holaGet(){
        throw new BadRequestException('No envia nada')
       // return 'Hola GET! :)';
    }
    @Post('hola')
    @HttpCode(202)
    holaPost(){
        
        return 'Hola POST! :)';
    }
    @Delete('hola')
    @HttpCode(204)
    @Header('Cache-control','none')
    @Header('EPN','Probando las cosas')
    holaDelete(){
        return 'Hola Delete! :)';
    }
    //Parametros de Ruta para  gestionar URLs
    @Get('/parametros-ruta/:edad/gestion/:altura')
    parametrosRutaEjemplo(
        @Param() parametrosRuta

    ){
        
        
        if(isNaN(parametrosRuta.edad )||isNaN(parametrosRuta.altura)){
            throw new BadRequestException('Ingrese bien los números')
           
        }else{
            const  edad = Number(parametrosRuta.edad);
            const altura = Number(parametrosRuta.altura);
            return  edad+altura;
        }
       
    }
    //averiguar mas como se mandan los parametros

    @Get('parametros-consulta')
    parametrosConsulta(
        @Query()  parametrosDeconsulta
    ){
        const  nombre = String(parametrosDeconsulta.nombre);
            const apellido = String(parametrosDeconsulta.nombre);
        

      if(nombre ||apellido ){
        console.log('parametros de consulta',parametrosDeconsulta);

      }else{
        return '=);'    

      }
    }
@HttpCode(200)
    @Post('parametros-cuerpo')
   async parametrosCuerpo(
        @Body() parametrosDeCuerpo
    ){
        //promesas
        const  mascotaValida = new MascotaCreateDto();
        mascotaValida.casada = parametrosDeCuerpo.casada;
        mascotaValida.edad = parametrosDeCuerpo.edad;
        mascotaValida.ligada = parametrosDeCuerpo.ligada;
        mascotaValida.nombre = parametrosDeCuerpo.nombre;
        mascotaValida.peso = parametrosDeCuerpo.peso;
        try{
                const errores: ValidationError[] = await validate(mascotaValida)
                if(errores.length>0){
                    console.error('error',errores);
                    throw new BadRequestException('Error validando');
                }else{
                    return {
                        mensaje:'Se crea correctamente'
                    }
                }
        }catch(e){
            console.log('Error',e)
         
            throw new BadRequestException('Error Validando');
        }

        

    }
    @Get('guardarCookienInsegura')
    guardarCookieInsegura(
        @Query() parametrosConsulta,
        @Req()  req,  // request = PETICION
        @Res()  res //response - RESPUESTA
    ){
        res.cookie('galletaInsegura',//nombre
        'Tengo Hambre'//valor
        );
        //return mensaje; //NO SE PUEDE USAR RETURN CUANDO TENGO UN RES
        res.send({
            mensaje:'ok'
        });
    }
     @Get('guardarCookieSegura')
    guardarCookieSegura(
        @Query() parametrosConsulta,
        @Req()  req,  // request = PETICION
        @Res()  res //response - RESPUESTA
    ){
        res.cookie('galletaSegura',//nombre
        'Tengo Hambre',//valor
        {
            secure:true
        }
        );
        
        //return mensaje; //NO SE PUEDE USAR RETURN CUANDO TENGO UN RES
        res.send({
            mensaje:'ok'
        });
    }
    @Get('mostrarCookies')
    mostarCookies(
        @Query() parametrosConsulta,
        @Req()  req,  // request = PETICION
    ){
        const mensaje = {
            sinFirmar: req.cookies,
            firmadas: req.signedCookies,
        }
        return  mensaje;
    }
    @Get('guardarCookieFirmada')
    public guardarCookieFirmada(
        @Res() res,
         @Headers() headers
        )
    {
        //ALGORTIMO DE ENCRIPTADO DE COOKIES
        console.log(headers);
        res.headers('cabecera','dinamica'); // respuesta -response
        res.cookie('Firmada', 'Poliburguer',{signed:true}) //puedo poner mas cookies
        const mensaje = {
            mensaje:'ok'
        }
        res.send(mensaje);
    }
  
   //2 Guardar Cookie  segura
 //3 mostas cookien

 //acceder a headers
// @Headers 




//Deber 24/jul/2020
//EXAMEN
//SUMAR (n1 + n2)
//GET
//200
//QUERY (n1)
//HEADERS, RUTA, QUERY, (n2)

    @Get('/calculadora/suma/:n2')
    @HttpCode(200)

   async sumar(
        @Query()  n1,
        @Param() parametrosRuta,
        @Req() req,
        @Res() res,
    ){
          //promesas
        const  numerosValida = new NumerosCreateDto();
        numerosValida.n1 = Number(n1.n1);
        numerosValida.n2 = Number(parametrosRuta.n2) ;
        var total;
        try{
            const errores: ValidationError[] = await validate(numerosValida)
            console.log('usuario',req.signedCookies.nombreDeUsuario)
            if(errores.length>0 ||!req.signedCookies.nombreDeUsuario ){
            //    console.error('error',errores);
                throw new BadRequestException('Error de validación esta seguro de que ingreso un usuario?');
            }else{
                total = (numerosValida.n1 +numerosValida.n2);
                this.validacionPuntaje(req,res,total,'El resultado de su suma es:');
                
            }
        }catch(e){
            //console.log('Error',e)
        
            throw new BadRequestException('Error Validando, Ingrese Usuario ');
        }
       
    }
    
    //RESTA (n1 - n2)
    //PUT
    //201
    //BODY (n1)
    //HEADERS, RUTA, QUERY, BODY (n2)
    
    @Put('/calculadora/resta')
    @HttpCode(201)

   async resta(
        @Body() parametrosDeCuerpo,
        @Req() req,
        @Res() res,
    ){
          //promesas
        const  numerosValida = new NumerosCreateDto();
        numerosValida.n1 = Number(parametrosDeCuerpo.n1);
        numerosValida.n2 = Number(parametrosDeCuerpo.n2);
        var total;
        try{
            const errores: ValidationError[] = await validate(numerosValida)
            if(errores.length>0 ||!req.signedCookies.nombreDeUsuario ){
               // console.error('error',errores);
                throw new BadRequestException('Error validando');
            }else{
                total = numerosValida.n1 - numerosValida.n2 ;
                
                this.validacionPuntaje(req,res,total,'El resultado de  su resta es:');
                
            }
        }catch(e){
           // console.log('Error',e)
        
            throw new BadRequestException('Error Validando');
        }
       
    }
    //MULTIPLICACION (n1 * n2)
    //DELETE
    //200
    //HEADERS (n1)
    //HEADERS, RUTA, QUERY, BODY (n2)

    @Delete('/calculadora/multiplicar')
    @HttpCode(200)
    async multiplicar(
        @Headers() headersP,
        @Req() req,
        @Res() res,
    ) {
        
        const  numerosValida = new NumerosCreateDto();
        numerosValida.n1 = Number(headersP.n1);
        numerosValida.n2 = Number(headersP.n2) ;
        var total;
        try{
            const errores: ValidationError[] = await validate(numerosValida)
            if(errores.length>0 ||!req.signedCookies.nombreDeUsuario ){
                console.error('error',errores);
                throw new BadRequestException('Error validando');
            }else{
                total = numerosValida.n1 * numerosValida.n2 
                this.validacionPuntaje(req,res,total,'El resultado de  su multiplicación es:');
            }
        }catch(e){
            //console.log('Error',e)
        
            throw new BadRequestException('Error Validando');
        }
        
    }
        
    //DIVISION (n1 / n2)
    //POST
    //201
    //RUTA (n1)
    //HEADERS, RUTA, QUERY, BODY (n2)
    @Post('/calculadora/dividir/:n1/:n2')
    @HttpCode(201)
    async dividir(
        @Param() parametrosRuta,
        @Req() req,
        @Res() res,
    ) {
        console.log(req.cookies.galletaInseguraNombre);
        const  numerosValida = new NumerosCreateDto();
        numerosValida.n1 = Number(parametrosRuta.n1);
        numerosValida.n2 = Number(parametrosRuta.n2);
        var total;
        try{
            
            const errores: ValidationError[] = await validate(numerosValida)
            if(errores.length>0 || numerosValida.n2 === 0 || !(req.signedCookies.nombreDeUsuario) ){
               // console.error('error',errores);
                throw new BadRequestException('Error validando');
            }else{
                total = numerosValida.n1 / numerosValida.n2 
                this.validacionPuntaje(req,res,total,'El resultado de  su división es:');
            }
        }catch(e){
            console.log('Error',e)
         this.validacionPuntaje(req,res,total,'El resultado de  su multiplicación es:');
            throw new BadRequestException('Error Validando');
        }
    }
    //METODO GUARDAR (nombre)
    //GET 
    //(Guardar cookie inseguro y no firmada) nombre del usuario
    //QUERY (nombre)
    @Get('/calculadora/guardarCookieNombre/:usuario')
    guardarCookieNombre(
        @Param() parametrosRuta,
        @Req()  req,  // request = PETICION
        @Res()  res //response - RESPUESTA
    ){
        res.cookie('nombreDeUsuario',//nombre
        parametrosRuta.usuario,{signed:true} //valor
        );
        res.cookie('puntaje','100',{signed:true});
        //return mensaje; //NO SE PUEDE USAR RETURN CUANDO TENGO UN RES
        res.send({
            mensaje:'Bienvenido, usuario registrado tiene 100  puntos'
        });
    }
    validacionPuntaje(
        @Req()  req,  // request = PETICION
        @Res()  res, //response - RESPUESTA
        total,
        mensajeOperacion
    ){
        req.signedCookies.puntaje = Number(req.signedCookies.puntaje)- Math.abs(total); // 

        console.log('puntajesote',Number(req.signedCookies.puntaje))
        if(Number(req.signedCookies.puntaje)<=0){
            res.cookie('puntaje','100',{signed:true});
            res.send({
                mensaje: req.signedCookies.nombreDeUsuario +'haz terminado tus puntos,se te han restablecido denuevo' 
            })
        } else {
            res.cookie('puntaje',req.signedCookies.puntaje,{signed:true});
           
            res.send({
                mensaje: mensajeOperacion+'='+total+' Recuerda que dispone de ' + Number(req.signedCookies.puntaje) + ' puntos'
            })
        }
        
        
    }
       

}

