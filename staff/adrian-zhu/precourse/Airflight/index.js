function airlines(){
    const userName=askUserName();
    alert(`Encantad@ ${userName}, \n¡Bienvenido a Skylab Airlines!!`);
    console.log(`<--------------------------------------------------------------->`);    
    showFlights(flights);
    console.log(`<--------------------------------------------------------------->`);
    const avg=average();
    console.log(`El coste promedio de nuestros vuelos ${avg}€  `);
    console.log(`<--------------------------------------------------------------->`);
    withStop();
    console.log(`<--------------------------------------------------------------->`);
    console.log('Los últimos vuelos:');
    console.log(`<--------------------------------------------------------------->`);
    lastFlights();
    let prof=askProfileUser();
}

function withStop(){
    
    for(let i=0;i<flights.length; i++){

        if(flights[i].scale==true){
        
        console.log(`Los siguientes vuelos tienen escalas--> Vuelo ${flights[i].id} desde ${flights[i].from} hasta ${flights[i].to} `);
        }
        
    }
    return
}

function average(){
    let sum=0;
    for(let i=0;i<flights.length; i++){
        
        sum+= flights[i].cost;
    }
    return Math.floor(sum/flights.length);
}

function showFlights(flightList){

    for(let i=0;i<flightList.length; i++){
        let scale='';
        if(flightList[i].scale==true){
        scale='Tiene stops';
        }else{
        scale="No tienen stops.";    
        }
        console.log(`Los vuelos id ${flightList[i].id} desde ${flightList[i].from} hasta ${flightList[i].to} costes ${flightList[i].cost}€ and ${scale}`);
    }
    return
}
function askUserName(){
        let count=0;
        var name=prompt('El nombre de usted?');
        for (let i=0; i<name.length;i++){
            count+= 1;
            if (name[i]==" "){
            break;
            }
        }
        let firstname=name.slice(0,count);
        return firstname;

}
function lastFlights(){

    let lastFlights=flights.slice(5,10);

    for(let i=0;i<lastFlights.length; i++){
        console.log(`To ${lastFlights[i].to}`);
    }
    return
}
function askProfileUser(){

    let profile=prompt('Es su perfil administrador o usuario?');
    if(profile.toLocaleLowerCase() == 'Administrador'){
        showOptionsAdmin();
    }else if(profile.toLocaleLowerCase() == 'Usuario'){
        showOptionsUser();
    }else{
        alert('Lo sentimos, no hemos reconocido tu perfil.')
        askProfileUser();
    }
    return
}

function showOptionsAdmin(){

    let option=prompt('Encantad@ administrador, usted puedes insertar o eliminar un vuelo');

    if (option.toLowerCase() == 'insertar'){
        if(flights.length<15){
            insertFlight();
        }else{
            alert('No puedes insertar más vuelos');
        }
        
        showOptionsAdmin();
    }else if(option.toLocaleLowerCase() == 'eliminar'){
        let flightId=prompt('Por favor diganós el id del vuelo que usted quieres eliminar');
        deleteFlight(flightId);
        showFlights(flights);
        showOptionsAdmin();
    }else if(option==null){
        alert('Hasta luego!');
    }else{
        alert('Lo sentimos, no hemos podido reconocer a este ID que usted has indicado.');
        showOptionsAdmin();
    }
    return
}
function deleteFlight(idFl){

    if(flights.length>0){ 
    let flag=true;
    for(let i=0;i<flights.length; i++){
        
        if(flights[i].id==idFl){
            alert(`Has eliminado a ${flights[i].id}`);
            flights.splice(i, 1);
            flag=false;
        }

    }
    if (flag){
        alert(`Lo sentimos, no hemos podido eliminar a este ${idFl} que usted has indicado. `);
    }
} else{
    alert('Los vuelos están eliminado correctamente.');
    }
    return
}

function insertFlight(){
    
    let idNew=prompt('Id:');
    flights.forEach(function(obj){
        if(obj.id==idNew){
            alert(`este Id ${idNew} ya existe, intenta con el otro ID por favor.`);
            idNew=prompt('Id:'); 
        }
    }); 
    let toNew=prompt('Desde:');
    let fromNew=prompt('Hasta:');
    let costNew=prompt('Coste:');
    if(isNaN(costNew)){
        alert('Lo sentimos, a este parámetro es incorrecto.');
        costNew=prompt('Coste:');
    }
    let scaleNew=prompt('escale: True or False');
    let newFlight={id: parseInt(idNew), to: toNew, from: fromNew, cost: parseFloat(costNew), scale: Boolean(scaleNew)}
    alert(`Has insertado el vuelo con id ${idNew} desde ${fromNew} hasta ${toNew} costes ${costNew}€ y ${scaleNew}`);
    flights.push(newFlight);
    console.log(flights);
    
    return
}

function showOptionsUser(){
    let option=prompt('Encantad@ usuario \nSeleccionar la opción de precios: bajo, alto, igual');
    console.log(option);
    
    if (option.toLowerCase() == 'bajo'){
        let lower=prompt('¿Estás buscando un vuelo con un precio inferior a ...?');
        const lowerThan = flights.filter(flights => flights.cost < lower);
        if (lowerThan.length>0){
        console.log(`<--------------------------------------------------------------->`);
        console.log('Resultados:');
        console.log(`<--------------------------------------------------------------->`);
        showFlights(lowerThan);
        let flightLSelected=prompt('Elige un vuelo, escribe la identificación');
        alert('Gracias por elegir nuestra aerolínea, nos vemos pronto');
        }else{
            alert('No resultados');
            showOptionsUser();
        }
        
    }else if(option.toLocaleLowerCase() == 'alto'){
        let higher=prompt('¿Estás buscando un vuelo con un precio superior a ...?');
        const higherThan = flights.filter(flights => flights.cost > higher);
        if (higherThan.length>0){
        console.log(`<--------------------------------------------------------------->`);
        console.log('Resultados:');
        console.log(`<--------------------------------------------------------------->`);
        showFlights(higherThan);
        let flightHSelected=prompt('Elige un vuelo, escribe la identificación');
        alert('Gracias por elegir nuestra aerolínea, nos vemos pronto');
        }else{
            alert('No resultados');
            showOptionsUser();
        }
    }else if(option.toLocaleLowerCase =='igual'){
        let equal=prompt('Estás buscando un vuelo con un precio igual a ...?');
        const equalTo = flights.filter(flights => flights.cost == equal);
        if(equalTo.length>0){
        console.log(`<--------------------------------------------------------------->`);
        console.log('Resultados:');
        console.log(`<--------------------------------------------------------------->`);
        showFlights(equalTo);
        let flightESelected=prompt('Elige un vuelo, escribe la identificación');
        alert('Gracias por elegir nuestra aerolínea, nos vemos pronto');
        }else{
            alert('No resultados');
            showOptionsUser(); 
        }
    }else if(option==null){
        alert('Hasta luego')
    }else{
        alert('No hemos podido a reconocer su indicación');
        showOptionsUser();
    }
    return
}

var flights = [
    { id: 00, to: 'Bilbao', from: 'Barcelona', cost: 1600, scale: false },
    { id: 01, to: 'New York', from: 'Barcelona', cost: 700, scale: false },
    { id: 02, to: 'Los Angeles', from: 'Madrid', cost: 1100, scale: true },
    { id: 03, to: 'Paris', from: 'Barcelona', cost: 210, scale: false },
    { id: 04, to: 'Roma', from: 'Barcelona', cost: 150, scale: false },
    { id: 05, to: 'London', from: 'Madrid', cost: 200, scale: false },
    { id: 06, to: 'Madrid', from: 'Barcelona', cost: 90, scale: false },
    { id: 07, to: 'Tokyo', from: 'Madrid', cost: 1500, scale: true },
    { id: 08, to: 'Shangai', from: 'Barcelona', cost: 800, scale: true },
    { id: 09, to: 'Sydney', from: 'Barcelona', cost: 150, scale: true },
    { id: 10, to: 'Tel-Aviv', from: 'Madrid', cost: 150, scale: false }
];


airlines()