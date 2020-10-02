import { Controller, Get, Post, Delete, HttpCode,Headers, Header, BadRequestException, Param,Query, Body, Req, Res ,Put, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UsuarioService } from "./usuario.service";
import {MascotaService} from '../Mascota/mascota.service';
import { UsuarioEntity } from "./usuario.entity";


@Controller('usuario')
export class UsuarioController{
   

    public arregloUsuario = [
        {
            id:1,
            nombre:'Andres'
        },
        {
            id:2,
            nombre:'Poleth'

        },
        {
            id:3,
            nombre:'Cris'

        }
        
    ]
    public contActual = 3;
    constructor(//inyeccion de dependencia
        private readonly _usuarioService: UsuarioService,
        private readonly _mascotaService: MascotaService
        ){
            
        }
   
    @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){
        try{
            console.log('okay')
            //validación de DTO
            const  respuesta  = await this._usuarioService.crearUno(parametrosCuerpo);
            return respuesta;
        }catch(e){
            console.error(e)
            throw new BadRequestException( {
                mensaje: 'Error validando datos'
            } );
        }
    }
    @Get()
    async mostrarTodos(){
        try{
            
            return await this._usuarioService.buscarTodos();

        }catch(e){
            console.error(e)
            throw  new InternalServerErrorException({
                mensaje:  'Error del servidor'
            })
        }
    }
    @Get(':id')
    async verUno(
        @Param() parametrosRuta
    ){
        try{
            
            return await this._usuarioService.buscarUno(Number(parametrosRuta.id));

        }catch(e){
            console.error(e)
            throw  new InternalServerErrorException({
                mensaje:  'Error del servidor'
            })
        }
    }
    @Put(':id')
    async editarUno(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo
    ){
        const id =Number(parametrosRuta.id);
        const usuarioEditado= parametrosCuerpo;
        usuarioEditado.id=id;
        try{
           
            return   await this._usuarioService.editarUno(usuarioEditado);
        }catch(e){
            console.error(e);
            throw new InternalServerErrorException({
                mensaje:'Error del servidor'
            })
        }
      
       
    }
   
   
    @Delete(':id')
    async eliminarUno(
        @Param() parametrosRuta,
    ){
        const id =Number(parametrosRuta.id);
    
        try{
           const respuesta = await this._usuarioService.eliminarUno(id);

            return {
                mensaje: 'Registro con id '+ id +' eliminado'
            };
        }catch(e){
            console.error(e);
            throw new InternalServerErrorException({
                mensaje:'Error del servidor'
            })
        }
    }


    //XML <usuario><nombre>ANDRES</nombre></usuario> //notese la cantidad de caracteres
    //JSON {"nombre":"ANDRES"}  //mas eficiente en el numero de caracteres
    //RESTful-JSON
    //ver todos 
    // http://localhost:3001/
    //RESTful MASCOTA
    //ver todos 
    //GET  http://localhost:3001/mascota
    //ver uno
    //GET  http://localhost:3001/mascota/1
    //CREAR UNO
    //POST http://localhost:3001/mascota (BODY)
    //EDITAR UNO
    //PUT http://localhost:3001/mascota/1 (BODY)
    //ELIMINAR UNO
    //DELETE http://localhost:3001/mascota/1
    
///////////////////////RELACIONES//////////////////
//Usuario->Mascotas
//Mascota-> Vacunas

    @Post('/crearUsuarioYCrearMascota')
    async crearUsuarioYCrearMascota(
        @Body() parametrosCuerpo
    ){
        const usuario = parametrosCuerpo.usuario;
        const mascota = parametrosCuerpo.mascota;
        //Validad Usuario
        //validad mascota
        //--> creamos los dos
        let usuarioCreado;
        try{
            usuarioCreado = await this._usuarioService.crearUno(usuario);
        }catch(e){
            console.error(e);
            throw new InternalServerErrorException({
                mensaje:'Error creando usuario'
            })
        }
     


        if(usuarioCreado){
        mascota.usuario= usuarioCreado.id;
        let mascotaCreada;
        try{
            mascotaCreada = await this._mascotaService.crearNuevaMascota(mascota);

        }catch(e){
            console.error(e);
            throw new InternalServerErrorException({
                mensaje:'Error creando mascota'
            })
        }
        
        if(mascotaCreada){
            return{
                mascota:mascotaCreada,
                usuario:usuarioCreado

            }
        
        }else{
            throw new InternalServerErrorException({
                mensaje:'Error creando mascota'
            })
        }



        }

    }

    //vistas
    @Get('vista/usuario')
    vistaUsuario(
        @Res() res
    ){
        const nombreControlador = 'Andres';
        return res.render(
            'usuario/ejemplo', //nombre de la vista (archivo)
        {  // parametros de la vista
            nombre: nombreControlador,
        })
    }
    @Get('vista/faq')
    vistaFaq(
        @Res() res
    ){
    
        return res.render('usuario/faq')
    }
     @Get('vista/inicio')
     async vistaInicio(
        @Res() res,
        @Query() parametrosConsulta
    ){
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._usuarioService.buscarTodos(parametrosConsulta.busqueda
                
                );
        } catch (error) {
            throw new InternalServerErrorException('Error encontrando usuarios')
        }
        if (resultadoEncontrado) {
          return   res.render(
                'usuario/inicio',
                {
                    arregloUsuarios: resultadoEncontrado,
                    parametrosConsulta:parametrosConsulta
                });
        } else {
            throw new NotFoundException('No se encontraron usuarios')
        }
    }
    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._usuarioService.eliminarUno(id)
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario eliminado')
        } catch (error) {
            console.log(error);
            return res.redirect('/usuario/vista/inicio?error=Error eliminando usuario')
        }
    }
    @Get('vista/crear') // Controlador
    crearUsuarioVista(
        @Query() parametrosConsulta,
        @Res() res
    ) {
        return res.render(
            'usuario/crear',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.apellido,
                cedula: parametrosConsulta.cedula
            }
        )
    }
    @Get('vista/login')
    vistaLogin(
        @Res() res
    ){
        
        return res.render('usuario/login')
    }
   
    @Get('vista/editar/:id') // Controlador
    async editarUsuarioVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ) {
        const id = Number(parametrosRuta.id)
        let usuarioEncontrado;
        try {
            usuarioEncontrado = await this._usuarioService.buscarUno(id);
        } catch (error) {
            console.error('Error del servidor');
            return res.redirect('/usuario/vista/inicio?mensaje=Error buscando usuario');
        }
        if (usuarioEncontrado) {
            return res.render(
                'usuario/crear',
                {
                    error: parametrosConsulta.error,
                    usuario: usuarioEncontrado
                }
            )
        } else {
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario no encontrado');
        }

    }
    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const usuarioEditado = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            apellido: parametrosCuerpo.apellido,
            // cedula: parametrosCuerpo.cedula,
        } as UsuarioEntity;
        try {
            await this._usuarioService.editarUno(usuarioEditado);
            return res.redirect('/usuario/vista/inicio?mensaje=Usuario editado');
        }catch (error) {
            console.error(error);
            return res.redirect('/usuario/vista/inicio?mensaje=Error editando usuario');
        }

    }
    @Post('crearDesdeVista')
    async crearDesdeVista(
    @Body() parametrosCuerpo,
    @Res() res,
) {
    // Validar los datos con un rico DTO
    let nombreApellidoConsulta;
    let cedulaConsulta;
    if (parametrosCuerpo.cedula && parametrosCuerpo.nombre && parametrosCuerpo.apellido) {
        nombreApellidoConsulta = `&nombre=${parametrosCuerpo.nombre}&apellido=${parametrosCuerpo.apellido}`
        if (parametrosCuerpo.cedula.length === 10) {
            cedulaConsulta = `&cedula=${parametrosCuerpo.cedula}`
        } else {
            const mensajeError = 'Cedula incorrecta'
            return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta)
        }
    } else {
        const mensajeError = 'Enviar cedula(10) nombre y apellido'
        return res.redirect('/usuario/vista/crear?error=' + mensajeError)
    }
    let respuestaCreacionUsuario;
    try {
        respuestaCreacionUsuario = await this._usuarioService.crearUno(parametrosCuerpo);
    } catch (error) {
        console.error(error);
        const mensajeError = 'Error creando usuario'
        return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta)
    }
    if (respuestaCreacionUsuario) {
        return res.redirect('/usuario/vista/inicio');
    } else {
        const mensajeError = 'Error creando usuario'
        return res.redirect('/usuario/vista/crear?error=' + mensajeError + nombreApellidoConsulta + cedulaConsulta);
    }
}
}