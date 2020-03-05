const opciones = {
    descripcion: {
        demand: true,
        alias: 'd',
        desc: 'Descripción de la tarea por hacer'
    },
    completado: {
        alias: 'c',
        default: true,
        desc: 'Marca como completado o pendiente la tarea'
    }
}
const argv = require('yargs')
    .command('crear', 'Crear un elemento por hacer', opciones)
    .command('actualizar', 'Actualiza el estado de una tarea', opciones)
    .command('borrar', 'Borra una tarea', opciones)
    .help()
    .argv;

module.exports = {
    argv
}