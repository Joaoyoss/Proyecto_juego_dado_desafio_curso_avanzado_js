'use strict';

//Selectores de elementos y declaraciòn de variables
const player0E1 = document.querySelector(".player--0");
const player0E2 = document.querySelector(".player--1");
const score0 = document.querySelector("#score--0");
const score1 = document.querySelector("#score--1");
const dado = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
let currentScore = 0;
let jugadorActivo = 0;
const scoreAcum = [0,0];
let activJuego = true; //Variable para implementar la activaciòn del uso de botones

//colocando en cero los elementos de puntaje y tirada inicio
score0.textContent = 0;
score1.textContent = 0;
dado.classList.add("hidden");
player0E1.classList.add("player--active"); 

//Elemento de escucha de los botones
btnHold.addEventListener("click",botonHold);
btnNew.addEventListener("click",botonNew); 
btnRoll.addEventListener("click",botonRoll);

function interfAct (){
    player0E1.classList.add("player--active"); 
    player0E2.classList.remove("player--active");
}

function botonNew (){
    activJuego = true;
    jugadorActivo=0;
    currentScore = 0;
    score1.textContent=0;
    score0.textContent=0;
    current0El.textContent=currentScore;
    current1El.textContent=currentScore; 
    document.querySelector(`.player--${jugadorActivo}`).classList.remove("player--winner");
    document.querySelector(`.player--${jugadorActivo}`).classList.add("player--active");
    dado.classList.remove("hidden");
    interfAct ();
};

function cambJugadorAct (){
    if (jugadorActivo===0){
        jugadorActivo=1;
        player0E1.classList.remove("player--active");
        player0E2.classList.add("player--active");   
   }else {
       jugadorActivo=0;
       interfAct ();  
   }
    //player0E1.classList.toggle("player--active");
}

function botonHold (){
    if (activJuego){
    scoreAcum[jugadorActivo]=currentScore+(scoreAcum[jugadorActivo]);
    document.querySelector(`#score--${jugadorActivo}`).textContent=scoreAcum[jugadorActivo];
    currentScore=0;
    document.getElementById(`current--${jugadorActivo}`).textContent=currentScore;
    if(scoreAcum[jugadorActivo]>=20){
        activJuego = false;
        document.querySelector(`.player--${jugadorActivo}`).classList.add("player--winner");
        document.querySelector(`.player--${jugadorActivo}`).classList.remove("player--active");
        dado.classList.add("hidden");
    }else{
        cambJugadorAct ();
    }   
};
};

function marcador (){   
    document.getElementById(`current--${jugadorActivo}`).textContent=currentScore; 
}

function botonRoll (){ 
    if (activJuego){ //Ojo ponerla dentro de la funcion
//1. Generar una tirada de dados aleatoria
const numAleat = Math.trunc(Math.random()*6)+1;
//2. Mostramos los dados
dado.classList.remove("hidden");
dado.src = `dice-${numAleat}.png`;
//3. Buscamos una tirada a uno basicamente
if (numAleat==1){
    currentScore=0;
    marcador ();
    //cambiar de jugador
    cambJugadorAct ();
    currentScore=0;
    marcador();   
    }else{
    //pasar los puntos de dado a la puntuaciòn
    currentScore=currentScore+numAleat;
    marcador();  
    }
};
};//Tirnr dos problemas: 
// Queda negra la izquierda despuesde nuevo juego
// Aumenta como le sale de la pinga
