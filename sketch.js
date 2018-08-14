var X = [];
var Y = [];

function generarY (f, X, a) {
  return X.map((x)=> {
    return f(x) + a*Math.random();
  });
}
////////////////////////////////////////////////////

function calcJ (f, X, Y) {
    var J = {J:0,a:0,b:0,c:0};
    
    for(var i in X ){
        e = f(X[i]) - Y[i];
        J.J += e * e;
        J.a += 2 * e * X[i] * X[i];
        J.b += 2 * e * X[i];
        J.c += 2 * e;
    }
    
    return J;
}

////////////////////////////////////////////////////
var Alpha = 0.05, a = 0, b = 0, c = 0;

function f1(x){
  return a*x*x + b*x + c;
}

//Calcula el J y las derivadas parciales ∂
function trainingStep(){
  J = calcJ(f1, X, Y);
  a = a - Alpha * J.a * 4;
  b = b - Alpha * J.b * 2;
  c = c - Alpha * J.c;
}

/////////////////////////////////////////////////////
//Posición de mi pendiente.
function setup() {
  createCanvas(800, 800);
  Alpha = 0.05
  a = 0
  b = -0.5
  c = Math.random();
  console.log('SETUP')
  console.log(JSON.stringify({a,b,c}))
}

function mousePressed() {
  let x = map(mouseX, 0, width, 0, 1);
  let y = map(mouseY, 0, height, 1, 0);
  X.push(x);
  Y.push(y);
}

const N = 200;
const lineX = [];

for(var i=0; i<=N; i++){
  lineX.push(i/N)
}

function draw() {
  background(0);

  //color('white')
  stroke('rgb(100%,0%,10%)');
  strokeWeight(8);
  for (let i = 0; i < X.length; i++) {
    let px = map(X[i], 0, 1, 0, width);
    let py = map(Y[i], 0, 1, height, 0);
    point(px, py);
  }

  const lineY = generarY(f1,lineX,0)
  
  strokeWeight(3);
  for (let i = 0; i < lineX.length; i++) {
    let px = map(lineX[i], 0, 1, 0, width);
    let py = map(lineY[i], 0, 1, height, 0);
    point(px, py);
  }

  trainingStep()
  console.log(JSON.stringify({a,b,c,J}))
  //noLoop();
}