const fs = require('fs');

//las notas las guardaremos en un arreglo.

let listadoPorHacer = [];

//para hacer la tarea persistente hay que guardar en un archivo. db/data.jason. donde se guardaran
// la ifnormacion de todas las tareas por hacer.

const guardarDB = () => {
    //stringify que convierte un objeto en un json. 
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err) => {

        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {

    //Cuando el json estarà vacio, lanzarà error. 

    try {
        //Leeremos un JSON
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        //si el json està vacio, crea un arreglo vacio.
        listadoPorHacer = []
    }

}
const crear = (descripcion) => {

    //Carga la base de datos para guardar màs de un elemento
    cargarDB();
    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarDB();
    return porHacer;
}

const getListado = () => {
    //Carga la base de datos y retornamos  
    cargarDB();
    return listadoPorHacer;

}

const actualizar = (descripcion, completado) => {

    cargarDB();
    let index = listadoPorHacer.findIndex(tarea => {
        return tarea.descripcion === descripcion;
    })
    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else
        return false;
}

const borrar = (descripcion) => {

    cargarDB();
    let nuevoArreglo = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion)
    if (listadoPorHacer.length === nuevoArreglo.length) {
        return false;
    } else {
        listadoPorHacer = nuevoArreglo;
        guardarDB();
        return true;
    }
}
module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}