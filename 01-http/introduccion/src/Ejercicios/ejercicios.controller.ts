import { Controller, Get, Post, Delete, HttpCode,Headers, Header, BadRequestException, Param,Query, Body, Req, Res ,Put, InternalServerErrorException, NotFoundException, Session } from "@nestjs/common";
import { EjerciciosEntity } from "./ejercicios.entity";
import { EjerciciosService } from "./ejercicios.service";

@Controller('ejercicios')
export class EjerciciosController{

    constructor(//inyeccion de dependencia
        private readonly _ejerciciosService: EjerciciosService
        ){
            
        }
     @Post()
    async crearUno(
        @Body() parametrosCuerpo
    ){
        try{
            console.log('okay')
            //validación de DTO
            const  respuesta  = await this._ejerciciosService.crearUno(parametrosCuerpo);
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
            
            return await this._ejerciciosService.buscarTodos();

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
            
            return await this._ejerciciosService.buscarUno(Number(parametrosRuta.id));

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
        const ejerciciosEditado= parametrosCuerpo;
        ejerciciosEditado.id=id;
        try{
           
            return   await this._ejerciciosService.editarUno(ejerciciosEditado);
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
           const respuesta = await this._ejerciciosService.eliminarUno(id);

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

   //vistas
 
   @Get('vista/inicioejercicios')
     async vistaInicio(
        @Res() res,
        @Query() parametrosConsulta
    ){
        let resultadoEncontrado
        try {
            resultadoEncontrado = await this._ejerciciosService.buscarTodos(parametrosConsulta.busqueda
                
                );
        } catch (error) {
            throw new InternalServerErrorException('Error encontrando ejercicios')
        }
        if (resultadoEncontrado) {
          return   res.render(
                'ejercicios/inicioejercicios',
                {
                    arregloEjercicios: resultadoEncontrado,
                    parametrosConsulta:parametrosConsulta
                });
        } else {
            throw new NotFoundException('No se encontraron ejercicios')
        }
 
    }
    @Get('vista/crearejercicios') // Controlador
    crearUsuarioVista(
        @Query() parametrosConsulta,

        @Res() res
    ) {
        return res.render(
            'ejercicios/crearejercicios',
            {
                error: parametrosConsulta.error,
                nombre: parametrosConsulta.nombre,
                apellido: parametrosConsulta.dificultad,
                cedula: parametrosConsulta.kilometros
            }
        )
    }
    @Post('crearDesdeVista')
    async crearDesdeVista(
    @Body() parametrosCuerpo,
    @Res() res,
    ){
            let respuestaCreacionEjercicios;
            try {
                respuestaCreacionEjercicios = await this._ejerciciosService.crearUno(parametrosCuerpo);
            } catch (error) {
                console.error(error);
                const mensajeError = 'Error creando ejercicios'
                return res.redirect('/ejercicios/vista/crearejercicios?error=' + mensajeError)
            }
            if (respuestaCreacionEjercicios) {
                return res.redirect('/ejercicios/vista/inicioejercicios');
            } else {
                const mensajeError = 'Error creando usuario'
                return res.redirect('/ejercicios/vista/crearejercicios?error=' + mensajeError );
            }
       }
    @Get('vista/editarejercicios/:id') // Controlador
    async editarEjerciciosVista(
        @Query() parametrosConsulta,
        @Param() parametrosRuta,
        @Res() res
    ) {
        const id = Number(parametrosRuta.id)
        let ejerciciosEncontrado;
        try {
            ejerciciosEncontrado = await this._ejerciciosService.buscarUno(id);
        } catch (error) {
            console.error('Error del servidor');
            return res.redirect('/ejercicios/vista/inicioejercicios?mensaje=Error buscando ejercicio');
        }
        if (ejerciciosEncontrado) {
            return res.render(
                'ejercicios/crearejercicios',
                {
                    error: parametrosConsulta.error,
                    ejercicios: ejerciciosEncontrado
                }
            )
        } else {
            return res.redirect('/ejercicios/vista/inicioejercicios?mensaje=Usuario no encontrado');
        }

    }
    
    @Post('editarDesdeVista/:id')
    async editarDesdeVista(
        @Param() parametrosRuta,
        @Body() parametrosCuerpo,
        @Res() res,
    ) {
        const ejerciciosEditado = {
            id: Number(parametrosRuta.id),
            nombre: parametrosCuerpo.nombre,
            dificultad: parametrosCuerpo.dificultad,
            kilometros: parametrosCuerpo.kilometros
            // cedula: parametrosCuerpo.cedula,
        } as EjerciciosEntity;
        try {
            await this._ejerciciosService.editarUno(ejerciciosEditado);
            return res.redirect('/ejercicios/vista/inicioejercicios?mensaje=Usuario editado');
        }catch (error) {
            console.error(error);
            return res.redirect('/ejercicios/vista/inicioejercicios?mensaje=Error editando usuario');
        }

    }
    @Post('eliminarDesdeVista/:id')
    async eliminarDesdeVista(
        @Param() parametrosRuta,
        @Res() res
    ) {
        try {
            const id = Number(parametrosRuta.id);
            await this._ejerciciosService.eliminarUno(id)
            return res.redirect('/ejercicios/vista/inicioejercicios?mensaje=Ejercicio eliminado')
        } catch (error) {
            console.log(error);
            return res.redirect('/ejercicios/vista/inicioejercicios?error=Error eliminando ejercicio')
        }
    }
    
}