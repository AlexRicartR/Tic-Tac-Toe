let structure= [0,0,0,0,0,0,0,0,0];
let jugador=1;
let njugadores=0;
let eleccion=0;
let esquinas=[0,2,6,8];
function resetear(){
	document.getElementById("opcion1").removeAttribute("hidden", "hidden");
	document.getElementById("opcion2").setAttribute("hidden", "hidden");
	document.getElementById("pregunta").setAttribute("hidden", "hidden");
  document.getElementById("mensaje").setAttribute("hidden", "hidden");
  document.getElementById("mensaje").textContent="Haz tu primer movimiento";
	jugador=1;
	njugadores=0;
	eleccion=0;
	structure= [0,0,0,0,0,0,0,0,0];
	dibujar();
	document.getElementById("tablero").setAttribute("hidden", "hidden");
}
function jugadores (num) {
	njugadores = num;
	if (num==1){
		document.getElementById("opcion2").removeAttribute("hidden", "hidden");		
	}else jugando(1);
	document.getElementById("opcion1").setAttribute("hidden", "hidden");
}
function jugando(turno) {
	eleccion=turno; 
	document.getElementById("tablero").removeAttribute("hidden", "hidden");
  document.getElementById("opcion2").setAttribute("hidden", "hidden");
  document.getElementById("mensaje").removeAttribute("hidden", "hidden");
	jugar();
}
function final(){
	let espacios=0;
	for (let i = 0; i < structure.length; i++) {
		if (structure[i]==0) espacios++;		 
	}
	for (let a = 0; a < 8; a+=3) {
		if (structure[a]==structure[a+1]&& structure[a+1]==structure[a+2] && structure[a]>0)return structure[a];
	}
	for (let b = 0; b < 3; b++) {
		if (structure[b]==structure[b+3]&& structure[b+3]==structure[b+6] && structure[b]>0)return structure[b];
	}	
	if (structure[0]==structure[4]&& structure[4]==structure[8] && structure[0]>0)return structure[0];
	if (structure[2]==structure[4]&& structure[4]==structure[6] && structure[2]>0)return structure[2];
	if (espacios==9) return 9;
	if (espacios==0) return 0;
}

function dibujar() {
 
	for (let i = 0; i < 9; i++) {
		if(structure[i]==0){
			document.getElementById("celda"+i).textContent="";
      
		}else if (structure[i]==1) {
			document.getElementById("celda"+i).textContent="X";
      document.getElementById("celda"+i).style.color = "yellow";
		} else {document.getElementById("celda"+i).textContent="O";
           document.getElementById("celda"+i).style.color = "red";}
	}
}
function fcelda(celda){
  if (njugadores==1){
			if (eleccion==jugador)document.getElementById("mensaje").textContent="Juego yo";
			else document.getElementById("mensaje").textContent="Juegas tú";
	}else{
    if (jugador == 1) document.getElementById("mensaje").textContent="Turno del jugador 2";
    else document.getElementById("mensaje").textContent="Turno del jugador 1";
  }
  
	if (structure[celda]!=0) {
    document.getElementById("mensaje").textContent="Esa celda ya está ocupada";
    
  }
	else if(jugador==1) {
		structure[celda]=1;
		jugador=2;
	}
	else {
		structure[celda]=2;
		jugador=1;
	}
	//console.log (structure);
	dibujar();  
	switch (final()){
		case 0:
		document.getElementById("mensaje").textContent="Empate, no hay movimientos";
		pregunta();
		break;
		case 1:
		console.log(njugadores, eleccion);
		if (njugadores==1){
			if (eleccion==1) document.getElementById("mensaje").textContent="Has ganado!!!";
			else document.getElementById("mensaje").textContent="Ordenador gana";
		}else document.getElementById("mensaje").textContent="Gana Jugador 1";
		pregunta();
		break;
		case 2:
		//console.log(njugadores, eleccion);
		if (njugadores==1){
			if (eleccion==2) document.getElementById("mensaje").textContent="Has ganado!!!";
			else document.getElementById("mensaje").textContent="Ordenador gana";;
		}else document.getElementById("mensaje").textContent="Gana Jugador 2";
		pregunta();
		break;
		default:
		if (njugadores==1&&jugador!=eleccion){jugar();}
	}
	
}
function jugar(){

if (eleccion==2){// casos en los que empieza el ordenador
	if (jugador!=eleccion){
		if (final()==9){
			fcelda(8);
		}else{
			
			if (!jugadaganadora(1)){
				if(!jugadaganadora(2)){
					if (esigual(structure,[0,2,0,0,0,0,0,0,1])||esigual(structure,[0,0,0,2,0,0,0,0,1])||esigual(structure,[0,0,0,0,0,2,0,0,1]))fcelda(6);
					else if (esigual(structure,[0,0,0,0,0,0,0,2,1])) fcelda(2);
					else if (esigual(structure,[2,0,0,0,0,0,0,0,1])||esigual(structure,[0,0,2,0,0,0,0,0,1]))fcelda(6);
					else if (esigual(structure,[0,0,0,0,0,0,2,0,1])) fcelda(2);
					else if (structure[4]==0){
						if (structure[8]==1 && (structure[6]==1||structure[2]==1)) fcelda(4);
					}
					else if (esigual(structure,[0,0,0,0,2,0,0,0,1]))fcelda(0);
					else if (esigual(structure,[1,0,2,0,2,0,0,0,1]))fcelda(6);
					else if (esigual(structure,[1,0,0,0,2,0,2,0,1]))fcelda(2);
					else{
						fcelda(structure.indexOf(0));
					}
				}
			}
		}
	}
}else if (jugador==2){
	if (!jugadaganadora(2)){
				if(!jugadaganadora(1)){
					if (structure[4]==0)fcelda(4);
					else if (esigual(structure,[0,0,0,0,1,0,0,0,0]))fcelda(8);
					else if((structure[0]==1||structure[2]==1||structure[6]==1||structure[8]==1) && structure[1]==0)fcelda(1);
					else if((structure[0]==1||structure[2]==1||structure[6]==1||structure[8]==1) && structure[3]==0)fcelda(3);
					else if (esigual(structure,[0,1,0,0,2,0,0,1,0])||esigual(structure,[0,0,0,1,2,1,0,0,0]))fcelda(2);
					else{
					fcelda(structure.indexOf(0));
					}
				}
				
	}
}


}
function jugadaganadora(num){
	let finalizado=false;
	let trio=[0,0,0];

	for (let a = 0; a < 8; a+=3) {
		trio[0]=structure[a];
		trio[1]=structure[a+1];
		trio[2]=structure[a+2];
		let primera=trio.indexOf(num);
		let ultima=trio.lastIndexOf(num);
		let cero=trio.indexOf(0);
		if (primera!=ultima&& cero!= -1){

		 fcelda(a+cero);
		 return true;
		}
	}		
	for (let b = 0; b < 3; b++) {
		trio[0]=structure[b];
		trio[1]=structure[b+3];
		trio[2]=structure[b+6];
		let primeraa=trio.indexOf(num);
		let ultimaa=trio.lastIndexOf(num);
		let ceroa=trio.indexOf(0);
		if (primeraa!=ultimaa&& ceroa!= -1){

		 fcelda(b+ceroa*3);
		 return true;
		}
		
	}
	trio[0]=structure[0];
	trio[1]=structure[4];
	trio[2]=structure[8];
	let cerof= trio.indexOf(0);
	if (trio.indexOf(num)!=trio.lastIndexOf(num)&& cerof!=-1){
		 fcelda(cerof*4);
		 return true;
		}
	trio[0]=structure[2];
	trio[1]=structure[4];
	trio[2]=structure[6];
	cerof= trio.indexOf(0);
	if (trio.indexOf(num)!=trio.lastIndexOf(num)&& cerof!=-1){

		 fcelda(2*cerof+2);
		 return true;
		}
	
}


function esigual(a1, a2){
	igual=true;
	for (let i = 0; i < a1.length; i++) {
		if(a1[i]!=a2[i]) igual=false;
	}
	return igual;
}
function pregunta(){
	document.getElementById("final").innerHTML = '<button id="pregunta" type="button" onclick="resetear()" class="btn btn-warning">Volver a jugar</button>';
}