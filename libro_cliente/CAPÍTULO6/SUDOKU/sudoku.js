var modificado=[
2,1,5,9,3,8,4,6,7,
7,8,6,1,2,4,3,5,9,
9,3,4,6,5,7,2,8,1,
8,6,9,5,4,2,1,7,3,
1,4,3,7,8,6,5,9,2,
5,2,7,3,9,1,8,4,6,
6,7,2,4,1,5,9,3,8,
4,9,8,2,6,3,7,1,5,
3,5,1,8,7,9,6,2,4];

export function getSudoku(pos){
  return modificado[pos];
}

export function generaSudoku(){
  cambiaColumnas();
  cambiaFilas();
  cambiaColumnas();
  cambiaFilas();
}

export function aleatorio(min,max){
  var horquilla=max-min;
  var aleatorio = Math.round(Math.random()*horquilla)+min;
  return aleatorio;
}

function cambiaColumnas(){
  var pos=0,i,aux;
  var columnaA=aleatorio(0,2)+pos;
  var columnaB=aleatorio(0,2)+pos;

  for (i=0;i<9;i++){
    aux = modificado[columnaA];
    modificado[columnaA]=modificado[columnaB];
    modificado[columnaB]=aux;
    columnaA+=9;
    columnaB+=9;
  }

  pos=3;
  columnaA=aleatorio(0,2)+pos;
  columnaB=aleatorio(0,2)+pos;

  for (i=0;i<9;i++){
    aux = modificado[columnaA];
    modificado[columnaA]=modificado[columnaB];
    modificado[columnaB]=aux;
    columnaA+=9;
    columnaB+=9;
  }

  pos=6;
  columnaA=aleatorio(0,2)+pos;
  columnaB=aleatorio(0,2)+pos;

  for (i=0;i<9;i++){
    aux = modificado[columnaA];
    modificado[columnaA]=modificado[columnaB];
    modificado[columnaB]=aux;
    columnaA+=9;
    columnaB+=9;
  }
}

function cambiaFilas(){
  var pos=0,i,aux;
  var filaA=9*aleatorio(0,2)+pos;
  var filaB=9*aleatorio(0,2)+pos;

  for (i=0;i<9;i++){
    aux = modificado[filaA];
    modificado[filaA]=modificado[filaB];
    modificado[filaB]=aux;
    filaA+=1;
    filaB+=1;
  }

  pos=27;
  filaA=9*aleatorio(0,2)+pos;
  filaB=9*aleatorio(0,2)+pos;

  for (i=0;i<9;i++){
    aux = modificado[filaA];
    modificado[filaA]=modificado[filaB];
    modificado[filaB]=aux;
    filaA+=1;
    filaB+=1;
  }

  pos=54;
  filaA=9*aleatorio(0,2)+pos;
  filaB=9*aleatorio(0,2)+pos;

  for (i=0;i<9;i++){
    aux = modificado[filaA];
    modificado[filaA]=modificado[filaB];
    modificado[filaB]=aux;
    filaA+=1;
    filaB+=1;
  }
}
