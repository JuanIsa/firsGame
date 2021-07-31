"use strict";

const contenedor = document.querySelector("#contenedor");
const lienzo = document.querySelector("#lienzo");
const boton = document.querySelector("#boton");
/*===============================================================================================
INTERACTIVIDAD DEL CANVA
================================================================================================*/
function ampliar() {
    //cambio las propiedades del contenedor del canva al clickear en el botón "fullscreen"
    contenedor.style.width = "100%";
    contenedor.style.height = "100vh";
    contenedor.style.margin = "0";
    //Cambio las propiedades del canva para que acompañen al contenedor previamente ampliado
    lienzo.style.width = "100%";
    lienzo.style.height = "100vh";
    lienzo.style.backgroundSize = "cover";
    lienzo.style.backgroundRepeat = "no-repeat";
    //Cambio las propiedades del botón
    boton.innerHTML = "FullScreen Out";
    boton.style.position = "fixed";
    boton.style.top = "10px";
    boton.style.left = "10px";
    boton.style.zIndex = "50";
    //Le asigno al botón un nuevo atributo, en este caso, la escucha de una nueva función
    boton.setAttribute("onClick", "reducir()");

}
function reducir() {
    //cambio las propiedades del contenedor del canva al clickear en el botón "fullscreen out"
    contenedor.style.width = "1000px";
    contenedor.style.height = "470px";
    contenedor.style.margin = "5vh auto";
    //Cambio las propiedades del canva para que acompañen al contenedor previamente ampliado
    lienzo.style.width = "1000px";
    lienzo.style.height = "470px";
    //Cambio las propiedades del botón
    boton.innerHTML = "FullScreen";
    //si boton.innerHTML += "FullScreen Out" esto agrega texto al ya existente en el botón
    boton.style.position = "relative";
    boton.style.top = "0";
    boton.style.left = "0";
    boton.style.zIndex = "0";
    //Le asigno al botón un nuevo atributo, en este caso, la escucha de una nueva función
    boton.setAttribute("onClick", "ampliar()");

}
/*===============================================================================================
CARGA DE FONDOS DEL CANVA
================================================================================================*/
//Instancio el objeto imageno que va a ir en el canvas
const fondo = new Image();
//Cargo la imagen desde la fuente "source"
fondo.src = "img/fondo.jpg";
//Cargo la imagen en el contexto del canva ni bien se carga la página
fondo.onload = function() {
    ctx.drawImage(fondo,0,0,1300,779,0,0,1000,470);
}

const fondo1 = new Image();
fondo1.src = "img/fondo1.jpg";
fondo1.onload = function() {
    ctx.drawImage(fondo1,0,0,1300,779,1000,0,1000,470);
}
/*===============================================================================================
Personaje DEL CANVA
================================================================================================*/
const sprite = new Image();
sprite.src = "./img/secuencia.png";
sprite.onload = function() {
    /*ctx.drawImage(objeto imagen, pos_x de inicio de recorte, pos_y de inicio de recorte,
    pos_x fin de recorte, pos_y fin de recorte,
    pos_x de inicio imagen, pos_y de inicio imagen,
    pos_x de fin de imagen, pos_y de fin imagen);*/
    ctx.drawImage(sprite, 0, 0, 112, 156, 200, 220, 112, 156);
}
/*===============================================================================================
BOTONES DE INTERACCIÓN DEL CANVA
================================================================================================*/
const play = new Image();
play.src = "img/play.png";
play.onload = function() {
    ctx.drawImage(play,0,0,256,256,800,20,50,50);
}

const pause = new Image();
pause.src = "img/pause.png";
pause.onload = function() {
    ctx.drawImage(pause,0,0,256,256,900,20,50,50);
}

/*===============================================================================================
SONIDOS
================================================================================================*/

function reproducirExplosion(){
    let audioElement = new Audio("./audio/explosion.mp3");
    audioElement.play();
    audioElement.volume=0.5;
}

function reproducirLevel(){
    let audioElement = new Audio("./audio/beeps-bonks-boinks 16.mp3");
    audioElement.play();
    audioElement.volume=0.5;
}

function reproducirBotones(){
    let audioElement = new Audio("./audio/beeps-bonks-boinks 19.mp3");
    audioElement.play();
    audioElement.volume=0.5;
}
/*===============================================================================================
EXPLOSIÓN
================================================================================================*/

const explo= window.requestAnimationFrame;

const explosion = new Image();
explosion.src = "img/explosion.png";
explosion.onload = function() {
    ctx.drawImage(explosion,0,0,240,240,1000,200,250,250);
}

var animacion_explo;
var ancho_explo=0;
var alto_explo=0;



var frecuencia2=0;

function boom(){
    animacion_explo= explo(boom);
    if (frecuencia2%2==0){
        if (ancho_explo<1680)
        {
            ancho_explo+=240;
        } else{
            ancho_explo=0;
            if (alto_explo<1200){
                alto_explo+=240;
            }else{
                alto_explo=0;
                ancho_explo=0;
                cancelAnimationFrame(animacion_explo);
            }
        }
    }
    frecuencia2++;
   if (frecuencia2%2==0){
        ctx.clearRect(0, 0, 1000, 470);

        ctx.drawImage(fondo,0,0,1300,779,corrimiento,0,1000,470);
        ctx.drawImage(fondo1,0,0,1300,779,corrimiento1,0,1000,470);

        ctx.drawImage(explosion,ancho_explo,alto_explo,240,240,90,150,320,320);

        ctx.fillText("Puntuación: "+puntuacion_local, 500,30);
        ctx.font="20px Arial";
        ctx.fillStyle="Blue";
        ctx.textAlign="center";
   }
}


/*===============================================================================================
OBSTÁCULOS DELPERSONAJE
================================================================================================*/


const obstaculo = new Image();
obstaculo.src = "img/libros.png";
obstaculo.onload = function() {
    ctx.drawImage(obstaculo,0,0,512,512,1000,326,50,50);
}


/*===============================================================================================
VELOCIDAD GLOBAL DEL JUEGO
================================================================================================*/

//Variable de control de la velocidad de juego/movimiento
var velocidad_juego=1;

function speed(velocidad_juego){
    let aux= new Array
    aux[0]=Math.round(aux[0]=3*velocidad_juego,0);//Velocidad de paisaje
    aux[1]=Math.round(aux[1]=10/velocidad_juego,0);//Velocida de personaje
    return aux;
}


/*===============================================================================================
LECTURA DE EVENTOS DE TECLADO
================================================================================================*/
//Pongo todo el documento a la escucha de un evento de teclado, en este caso cuando se presiona una tecla
//Cuando esto pasa se ejecuta la función pulsar.
document.onkeydown=pulsar;

//Altura del personaje
var altura=220;
var tiempoSalto=900;
//La función pulstar lleva como parámetro un evento nativo
function pulsar (e){
    if (e.keyCode===32 || e.keyCode===38){
        altura=140;
    }
    //Luego de 300miliSegundos el personaje retoma la altura inicial ejecutando la función anónima "Bajar"
    setTimeout(function(){
        altura=220;
    }, tiempoSalto);
}

/*===============================================================================================
DIBUJO Y MANEJO DEL CANVA
================================================================================================*/
const canva = document.querySelector("#lienzo");
//definición del contexto del canva
const ctx = canva.getContext("2d");
 /*requestAnimationFrame  vendria a reemplazar al setInterval (acción, tiempo de accion en ms)
    y al setTimeout(acción, tiempo de accion en ms)
    requestAnimationFrame es una función optimizada de animaciones para navegadores de escritorio
    que funciona a 60FPS*/
const frame = window.requestAnimationFrame;

/*===============================================================================================
FUNCIONES DE ANIMACIÓN
================================================================================================*/
//variable netrual en la que se va a almacenar el estado de la animación
var animacion;
//Bandera booleana de control de juego en ejecución
var bandera=false;

//Variables de control del fondo continuo
var corrimiento =  0;
var corrimiento1 =  1000;

var obst=0;
obst= aleatorio();
function aleatorio(){
    let aux=0;
    aux= Math.random()*1000;
    aux+=1000;
    aux=Math.trunc(aux);
    return aux;
}
//Variable que me permite controlar el ancho del corte de la secuencia Sprite
var personaje =  0;
//Esta variable se va a incrementar a 60fps en el animationFrame, me sirve de control de tiempo
var frecuencia1 = 0;

var puntuacion_local=0;

function tiempo() {
    //Animación cíclica con 60 FPS
    animacion = frame(tiempo);//CallBack asociado a un objeto
    
    
    
    //Uso esta bandera booleana para saber si está corriendo o no el juego
    bandera=true;
    //Cargo la puntuación del personaje
    if (frecuencia1%6==0){
        puntuacion_local+=1;
        if (puntuacion_local%100==0){
            reproducirLevel();
            velocidad_juego+=0.3;
            tiempoSalto-=40;
        }
    }
    //Condicionales de animación del personaje
    if (frecuencia1%speed(velocidad_juego)[1]==0){
        if(personaje<560){
            personaje+=112;
        }else{
            personaje=0;
        }
    }
    //Condicional de desplazamiento cíclico del primer fondo animado
    if (corrimiento>-1000 && corrimiento1==1000){
        corrimiento=0;
    }else if(corrimiento>-1000){
        corrimiento-=speed(velocidad_juego)[0];
    }else{
        corrimiento=1000;
    }
    //Condicional de desplazamiento cíclico del segundo fondo animado
    if (corrimiento1>-1000 && corrimiento==1000){
        corrimiento1=0
    } else if(corrimiento1>-1000){
        corrimiento1-=speed(velocidad_juego)[0];
    }else{
        corrimiento1=1000;
    }

    //Borrado del canvas entre cada ciclo de animación
    ctx.clearRect(0, 0, 1000, 470);

    //Impresión de ambos fondos en el camva
    ctx.drawImage(fondo,0,0,1300,779,corrimiento,0,1000,470);
    ctx.drawImage(fondo1,0,0,1300,779,corrimiento1,0,1000,470);

    //Impresión del personaje en el canva
    ctx.drawImage(sprite, personaje, 0, 112, 156, 200, altura, 112, 156);

    //Impresón de los botones de control en el canva
    ctx.drawImage(play,0,0,256,256,800,20,50,50);
    ctx.drawImage(pause,0,0,256,256,900,20,50,50);

    ctx.drawImage(obstaculo,0,0,512,512,obst,326,50,50);

    obst-=speed(velocidad_juego)[0];
    if (obst<-50){
        obst=aleatorio();
    }
    if (obst>200 && obst<312 && altura==220){
        cancelAnimationFrame(animacion);
        reproducirExplosion();
        boom();       
    }
 

    ctx.fillText("Puntuación: "+puntuacion_local, 500,30);
    ctx.font="20px Arial";
    ctx.fillStyle="Blue";
    ctx.textAlign="center";

    //Esta variable se va a incrementar 60 veces por segundo controlando el ciclo de puntuación global
    frecuencia1+=1;
}

/*===============================================================================================
LECTURA DE EVENTOS DE MOUSE
================================================================================================*/
//Pongo el canva a la escucha del evento click y que además reciba parámetros
lienzo.addEventListener("click",function(e){
    // Con la el método getBoundingClientRect, obtengo las distancias en píxeles del ancho interno de la ventana con respecto al elemento Canva
    const tam=lienzo.getBoundingClientRect();
    let x= tam.left;
    let y=tam.top;
    let ancho=0;
    let alto=0;
    //Trunco o corto esos valores de distancias en píxeles
    x=Math.trunc(x,0);
    y=Math.trunc(y,0);
    //El atributo "page" me devuelve  la ubicación del puntero con respecto a la ventana interna total, por eso hago la resta.
    x = e.pageX-x;
    y = e.pageY-y;
    //Estas dos líneas  de código me permiten obtener el alto y ancho total del elemento canva, ya sea en fullScreen o fuera de ella.
    ancho=lienzo.clientWidth;
    alto=lienzo.clientHeight;
    //Función de escucha de click al botón de play
    if((x>= ancho*0.8) && (x<= ancho*0.85)){
        if((y >=alto*0.0638) && (y <= alto*0.123)){
            if (bandera==false){
                tiempo();
                reproducirBotones();
            }
        }
    }
    //Función de escucha de click al botón de pause.
    if((x >= ancho*0.9) && (x < ancho*0.95)){
        if(y >=(alto*0.0638) && y <= (alto*0.123)){
            cancelAnimationFrame(animacion);
            reproducirBotones();
            bandera=false;
        }
    }
});

lienzo.addEventListener("mousemove",function(e){
    // Con la el método getBoundingClientRect, obtengo las distancias en píxeles del ancho interno de la ventana con respecto al elemento Canva
    const tam=lienzo.getBoundingClientRect();
    let x= tam.left;
    let y=tam.top;
    let ancho=0;
    let alto=0;
    //Trunco o corto esos valores de distancias en píxeles
    x=Math.trunc(x,0);
    y=Math.trunc(y,0);
    //El atributo "page" me devuelve  la ubicación del puntero con respecto a la ventana interna total, por eso hago la resta.
    x = e.pageX-x;
    y = e.pageY-y;
    //Estas dos líneas  de código me permiten obtener el alto y ancho total del elemento canva, ya sea en fullScreen o fuera de ella.
    ancho=lienzo.clientWidth;
    alto=lienzo.clientHeight;
    //Función de escucha de click al botón de pause.
    if((x >= ancho*0.9) && (x <= ancho*0.95)){
        if(y >=(alto*0.0638) && y <= (alto*0.123)){
            lienzo.style.cursor="pointer";
        }
    }else if((x>= ancho*0.8) && (x<= ancho*0.85)){
            if((y >=alto*0.0638) && (y <= alto*0.123)){
                lienzo.style.cursor="pointer";
            }
        }
    else{
        lienzo.style.cursor="context-menu";
    }
});
/*===============================================================================================
LECTURA  DE EVENTOS EN DISPOSITIVOS MÓVILES
// ================================================================================================*/
// touchstart: Este se genera al hacer cualquier toque a la pantalla, sin importar su duración o movimientos realizados.
// touchend: Este se ejecuta una vez se deja de tocar la pantalla o el objeto que tiene asignado el manejador de eventos.
// touchmove: Este es ejecutado una vez se desliza o desplaza el dedo el usuario, por encima de la pantalla u objeto que
//está siendo controlado a través del manejador de eventos.

lienzo.addEventListener("touchstart",function(){
    altura=140;
    setTimeout(function(){
        altura=220;
    }, 900);
});

/*===============================================================================================
MANEJO DE EVENTOS DE TECLADO
================================================================================================*/

// function pulsar (e){
// 	window.alert ("Tipo de evento: "+  e.type);
// 	window.alert  ("KeyCode: "+e.keyCode);
// }
// function  mantener(){
//     window.alert("Estás pulsando una tecla");
// }

// function  soltar(){
//     window.alert("Soltaste una tecla");
// }

//document.onkeydown=pulsar;
//document.onkeypress=mantener();
//document.onkeyup=soltar();

