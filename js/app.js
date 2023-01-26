//VARIABLES
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//CONTENEDOR PARA LOS RESULTADOS
const resultado = document.querySelector('#resultado');

const max = new Date().getFullYear(); //obtencion de fecha actual
const min = max - 10; // resta 10 años a la fecha actual

//GENERAR OBJETO CON LA BÚSQUEDA para poder leer los datos
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas:'',
    transmision: '',
    color: '',

}



//EVENTOS
document.addEventListener('DOMContentLoaded',()=>{
mostrarAutos(autos); // muestra los autos al cargar

llenarSelect();//llena las opciones de años

})

//Event listener para obtener los cambios en los select de búsqueda
marca.addEventListener('change',(e)=>{
    datosBusqueda.marca = e.target.value; //se pasan los valores seleccionados al objeto de busqueda
    // console.log(datosBusqueda)

    filtrarAuto();
})

year.addEventListener('change',(e)=>{
    datosBusqueda.year = e.target.value;
    filtrarAuto();
})

minimo.addEventListener('change',(e)=>{
    datosBusqueda.minimo = e.target.value;
    filtrarAuto();
})

maximo.addEventListener('change',(e)=>{
    datosBusqueda.maximo = e.target.value;
    filtrarAuto();
})

puertas.addEventListener('change',(e)=>{
    datosBusqueda.puertas = e.target.value;
    filtrarAuto();
})

transmision.addEventListener('change',(e)=>{
    datosBusqueda.transmision = e.target.value;
    filtrarAuto();
})

color.addEventListener('change',(e)=>{
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda)
    filtrarAuto();
})


//FUNCIONES
function mostrarAutos(autos){ // de la "bd" que se hizo en js

    limpiarHTML(); //Elimina el HTML previo

    autos.forEach(auto =>{
        const{marca,modelo,year,precio,puertas,color,transmision}=auto; // desctructuring
        const autoHTML = document.createElement('P');

        autoHTML.textContent = `
        ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} -
        Color: ${color}
        `;

        //insertar en el html en el area de resultados
        resultado.appendChild(autoHTML);
    })
    }

//LIMPIAR HTML
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//GENERA LOS AÑOS DEL SELECT
 function llenarSelect(){
    // console.log('llenando el select')
    for(let i=max; i>=min; i--){ // que se muestre de la mayor fecha a la menor fecha
        // console.log(i);
        //AGREGANDO LAS OPCIONES AL HTML DE LOS AÑOS
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //agrega las opciones de año al select


    }
 }

 //FILTRA EN BASE A LA BÚSQUEDA
 function filtrarAuto(){
    // console.log('filtrando...')
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor) //Funcion de alto nivel osea una funcion que toma otra funcion como parametro
    // console.log(resultado)
    //Mostrar mensaje cuando no se genere un resultado de busqueda
    if(resultado.length){
        mostrarAutos(resultado); //Mostrar los resultados del Filtrado en el HTML
    }else{
        noResultado();
    }
 }
  
 // mensaje cuando no hay resultado 
 function noResultado(){

    limpiarHTML();

    const noResultado = document.createElement('div');
    noResultado.classList.add('alerta', 'error');
    noResultado.textContent = 'No se encontró resultado, Intenta de nuevo';
    resultado.appendChild(noResultado);

 }

 function filtrarMarca(auto){
    if(datosBusqueda.marca){
        return auto.marca === datosBusqueda.marca;
    }
    return auto; // mantiene la referencia de los valores que no han sido filtrados
 }

 function filtrarYear(auto){
    const {year}=datosBusqueda;
    if(year){
        return auto.year === parseInt(year);
    }
    return auto;
 }

 function filtrarMinimo(auto){
    const{minimo}=datosBusqueda;
    if(minimo){
        return auto.precio >= parseInt(minimo);
    }
    return auto;
 }

 function filtrarMaximo(auto){
    const{maximo}=datosBusqueda;
    if(maximo){
        return auto.precio <= parseInt(maximo);
    }
    return auto;
 }

 function filtrarPuertas(auto){
    const {puertas}=datosBusqueda;
    if(puertas){
        return auto.puertas === parseInt(puertas);
    }
    return auto;
 }

 function filtrarTransmision(auto){
    const{transmision}=datosBusqueda;
    if(transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
 }

 function filtrarColor(auto){
    const{color}=datosBusqueda;
    if(color){
        return auto.color === datosBusqueda.color;
    }
    return auto;
 }