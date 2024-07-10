//---Margen circulos--------------------------------------------------------------------------------

let margen = 4;

//---Inicio objeto circulo------------------------------------------------------------------

class circulo{
    constructor(x, y, r, c, l, col1, col2, col3){
      this.x = x; //pos x
      this.y = y; //pos y
      this.r = r; //radio
      this.c = c; //crecimiento
  
      this.col1 = col1;
      this.col2 = col2;
      this.col3 = col3;
  
      this.puedeCrecer = true;
  
      this.limc = random(map(l, 1, 3, 70, 80)); //limite de crecimieno de circulos
    }
  
    crecer(){   //funcion de crecimiento con click
      if(this.r < this.limc && this.puedeCrecer){
  
        this.mayorC = random(0.2, 0.4);  
  
        if(amp > 0.05){
          this.c += this.mayorC;
        }
  
        this.r += this.c; // this.r + this.c = this.r;
  
        if(this.r >= this.limc){
          this.c = 0;
        }
      } else if(mouseIsPressed){
        //background(0);
        this.r =  0;
      }
    }
  
    dibujar(){                            //funcion de dibujo
      // push();
      // fill(this.col1, this.col2, this.col3);
      // stroke(this.col1, this.col2, this.col3);
      // ellipse(this.x, this.y, this.r*2, this.r*2);
      // pop();
      // push();
      // fill(this.col2, this.col3, this.col1);
      // stroke(this.col2, this.col3, this.col1);
      // ellipse(this.x, this.y, this.r*1.5, this.r*1.5);
      // pop();
      // push();
      // fill(this.col3, this.col1, this.col2);
      // stroke(this.col3, this.col1, this.col2);
      // ellipse(this.x, this.y, this.r, this.r);
      // pop();

      noStroke();
      fill(col1);
      //ellipse(width / 2, height / 2, 170, 170);
      ellipse(this.x, this.y, this.r*2, this.r*2);
      fill(col2);
      //ellipse(width / 2, height / 2, 100, 100);
      ellipse(this.x, this.y, this.r*1.5, this.r*1.5);
      fill(col3);
      //ellipse(width / 2, height / 2, 50, 50);
      ellipse(this.x, this.y, this.r, this.r);
    }
  
    seTocaCon( otro_ ){
      if( dist( this.x, this.y , otro_.x , otro_.y ) < this.r + otro_.r + margen ){
          this.puedeCrecer = false;
      }
    }
    
  }