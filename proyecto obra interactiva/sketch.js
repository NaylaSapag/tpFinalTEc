//Comisión Matias aula 107
//Sapag Nayla Nahir 93541/6  y  Sampino Lucas 93080/8

//link del video: https://youtu.be/uHrKWcwYrig?si=b0qZU9EfLCArqtbx

//---Colores--------------------------------------------------------------------------------

//let colores = [{r:255,g:0,b:0},{r:255,g:0,b:255}];

let paletas = [
  [
    { r: 253, g: 240, b: 53 },
    { r: 48, g: 198, b: 140 },
    { r: 210, g: 87, b: 83 },
  ],
  [
    { r: 234, g: 100, b: 69 },
    { r: 0, g: 151, b: 143 },
    { r: 252, g: 229, b: 29 },
    { r: 205, g: 14, b: 23 },
  ],
  [
    { r: 169, g: 201, b: 70 },
    { r: 227, g: 197, b: 72 },
    { r: 226, g: 76, b: 86 },
  ],
  [
    { r: 247, g: 242, b: 51 },
    { r: 208, g: 6, b: 11 },
    { r: 0, g: 138, b: 59 },
    { r: 253, g: 189, b: 165 },
  ]
];



//---Configuracion de amplitud---------------------------------------------------------------

let AMP_MIN = 0.01; //umbral minimo de sonido que supera el ruido de fondo
let AMP_MAX = 0.2;  //umbral maximo de sonido que supera el ruido de fondo

let Amortiguacion = 0.90;
//---Microfono-------------------------------------------------------------------------------

let mic;  

//---Amplitud-------------------------------------------------------------------------------

let amp;        //variable para cargar la amplitud
let haySonido = false;

//---imprimir------------------------------------------------------------------------------

let IMPRIMIR = true;


//---Variables circulo-----------------------------------------------------------------------

let MisCirculos = [];
let x,y,r,c,l,limc,col1,col2,col3;

//---tamaño pantalla------------------------------------------------------------------------

let screenWidth, screenHeight;

//---gestor---------------------------------------------------------------------------------

let gestorAmp;

//---Inicio del programa--------------------------------------------------------------------- 

let estado = "inicia";

let marca;
let limCrecer = 3000;
let limColor = 3000;
let finCrecer;


function setup() {    
  
  let sizes = [                                       // Definir los tamaños posibles para la pantalla
    { width: 700, height: 700, probability: 0.75 },   //pantalla grande
    { width: 550, height: 700, probability: 0.25 }   //pantalla pequeña
  ];
  
  let selectedSize = monteCarloSelection(sizes);

  screenWidth = selectedSize.width;
  screenHeight = selectedSize.height;
  
  //ejecución inicial
  createCanvas(screenWidth, screenHeight);  //tamaño de pantalla
  crearCirculos(amp);                          //función de inicialización de circulos

  //----Microfono-----------------------------------------------------------------------------

  mic = new p5.AudioIn(); //comunicacion con entrada de audio
  mic.start();

  //---gestor--------------------------------------------------------------------------------

  gestorAmp = new GestorSenial(AMP_MIN, AMP_MAX);  //inicia genstor con umbrales min y max

  gestorAmp.f = Amortiguacion; 

  //---Motor de Audio(inicio forzado)---------------------------------------------------------

  userStartAudio();
}

//---Inicio del dibujo------------------------------------------------------------------------


function draw() {                           //ejecución reperida

  gestorAmp.actualizar(mic.getLevel());

  //amp = mic.getLevel();
  amp = gestorAmp.filtrada;

  background(0);                            //color de fondo
  //for(let i = 0; i < limc; i++){            //for para cantidad de circulos
  // MisCirculos[i].crecer();
  // MisCirculos[i].dibujar();
  //}


  //background(255);

  haySonido = amp > AMP_MIN;

  if(haySonido && estado == "inicia"){
    estado = "crecer";
  }

  push();
    for(let i = 0; i < limc; i++){            //for para cantidad de circulos
      //MisCirculos[i].crecer();
      MisCirculos[i].dibujar();
    } 
    pop();


  if(estado == "crecer"){
    
    push();
    if( haySonido ){
    evaluarSiSeTocan();
      crecer();
    }
    pop();


    if(!haySonido){
      marca = millis();
    }

    if(!haySonido){ //Estado SILENCIO
      let ahora = millis();
      if(ahora < marca + limCrecer){
        estado = "color";
        marca = millis();
      }
    }

    if(haySonido){
      finCrecer -= limCrecer;
    }else if(haySonido && finCrecer == 0){
      estado = "color";
      }
    }
    

    if(haySonido && estado == "color"){
      colores();
    }

    if(mouseIsPressed){
      crearCirculos(amp);
      estado = "inicia";
    }


    // if(IMPRIMIR){
    //   printData();
    // }
}



//---Funcion crecer-----------------------------------------------------------------------

function crecer(){
  for( let i=0 ; i< limc ; i++ ){
    MisCirculos[i].crecer();
  }
}



function evaluarSiSeTocan(){
  for( let i=0 ; i<limc ; i++ ){
    for( let j=0 ; j<limc ; j++ ){
      if( i!=j){
        MisCirculos[i].seTocaCon( MisCirculos[j] );
      }
    }
  }
}


//---Funcion que crea los cieculos-----------------------------------------------------------

function crearCirculos(amp){ //función de inicialización de circulos

  background(0);
  limc = 1000;

  for(let i = 0; i < limc; i++){  //inicializacion de circulos con datos
    x = random(screenWidth);  //pos x
    y = random(screenHeight); //pos y
    r = 0;                    //radio
    c = random(0.1,0.3);      //crecimiento

    //if(amp < 0.03 && amp >= AMP_MIN){
    //  c = random(0.1, 0.3);
    //} else if(amp > 0.04){
    //  c = random(0.3, 0.6);
    //}
    //let indiceColor = int(random(colores.length));

    l = random(1,3);          //tipo de tamaño

    // col1 = colores[indiceColor].r;  //random(0,255);     //colores
    // col2 = colores[indiceColor].g;  //random(0,255);
    // col3 = colores[indiceColor].b;  //random(0,255);

    let quePaleta = int(random(paletas.length));
    let colorAzar = int(random(paletas[quePaleta].length));
    col1 = color(paletas[quePaleta][colorAzar].r, paletas[quePaleta][colorAzar].g, paletas[quePaleta][colorAzar].b);
    colorAzar = int(random(paletas[quePaleta].length));
    col2 = color(paletas[quePaleta][colorAzar].r, paletas[quePaleta][colorAzar].g, paletas[quePaleta][colorAzar].b);
    colorAzar = int(random(paletas[quePaleta].length));
    col3 = color(paletas[quePaleta][colorAzar].r, paletas[quePaleta][colorAzar].g, paletas[quePaleta][colorAzar].b);


    MisCirculos[i] = new circulo(x, y, r, c, l,col1,col2,col3); //inicialización de los circulos
  }

}


//---Funcion montecarlo----------------------------------------------------------------------

function monteCarloSelection(sizes) {
  let r = random(1);
  let cumulativeProbability = 0;

  for (let size of sizes) {
    cumulativeProbability += size.probability;
    if (r < cumulativeProbability) {
      return size;
    }
  }

  // devuelve el último tamaño si no se selecciona ninguno
  return sizes[sizes.length - 1];
}

//---Funcion texto en pantalla---------------------------------------------------------------

function printData(){

  push();
    textSize(16);
    fill(255);
    let texto;

    texto = "amplitud: " + amp;
    text(texto,20,40);

    //fill(255);
    //ellipse(width/2, height-amp * 1000, 30, 30);

  pop();
}

function colores(){
  for( let i=0 ; i<limc ; i++ ){
  let quePaleta = int(random(paletas.length));
    let colorAzar = int(random(paletas[quePaleta].length));
    col1 = color(paletas[quePaleta][colorAzar].r, paletas[quePaleta][colorAzar].g, paletas[quePaleta][colorAzar].b);
    colorAzar = int(random(paletas[quePaleta].length));
    col2 = color(paletas[quePaleta][colorAzar].r, paletas[quePaleta][colorAzar].g, paletas[quePaleta][colorAzar].b);
    colorAzar = int(random(paletas[quePaleta].length));
    col3 = color(paletas[quePaleta][colorAzar].r, paletas[quePaleta][colorAzar].g, paletas[quePaleta][colorAzar].b);

    MisCirculos[i].col1 = col1;
    MisCirculos[i].col2 = col2;
    MisCirculos[i].col3 = col3;
  }
}
