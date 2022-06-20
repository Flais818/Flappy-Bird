var contexto = document.getElementById("LienzoJuego").getContext("2d")
contexto.canvas.width = 300
contexto.canvas.height =530
//VARIABLES
var score = 0
var FPS = 60
var gravedad = 1.5

var personaje = {
    x:50,
    y:150,
    w:50,
    h:50
}
var tuberias = new Array ()
tuberias [0] = {
    x: contexto.canvas.width,
    y:0
}
//VARIABLES AUDIOS
var punto = new Audio()
punto.src = "audios/punto.mp3"
//VARIABLES IMAGENES
var bird = new Image ()
bird.src = "imagenes/bird.png"

var background = new Image ()
background.src = "imagenes/background.png"

var suelo = new Image ()
suelo.src = "imagenes/suelo.png"

var tuberiaNorte = new Image ()
tuberiaNorte.src = "imagenes/tuberiaNorte.png"

var tuberiaSur = new Image ()
tuberiaSur.src = "imagenes/tuberiaSur.png"

//CONTROL
function keyDown(){
    personaje.y -= 35
}

/*resize () 
function resize () {
    CANVAS_HEIGHT = window.innerHeight;
    CANVAS_WIDTH = window.innerWidth;

    contexto.width = WIDTH;
    contexto.height = HEIGHT;

    contexto.style.height = ""+CANVAS_HEIGHT+"xp";
}*/

//BUCLE
setInterval(loop, 1000/FPS)
function loop () {
    contexto.clearRect(0,0,300, 530)
    //FONDO
    contexto.drawImage(background, 0, 0)
    contexto.drawImage(suelo, 0, contexto.canvas.height - suelo.height)
    //PERSONAJE
    contexto.drawImage(bird, personaje.x, personaje.y)
    //TUBERIAS
    for (var i = 0; i < tuberias.length; i++) {
        var constante = tuberiaNorte.height + 80
        contexto.drawImage(tuberiaNorte, tuberias[i].x, tuberias[i].y)
        contexto.drawImage(tuberiaSur,tuberias[i].x, tuberias[i].y + constante)
        tuberias[i].x--

        if (tuberias[i].y + tuberiaNorte.height < 80) {
            tuberias[i].y = 0 
        }

        if (tuberias[i].x == 150) {
            tuberias.push ({
                x: contexto.canvas.width,
                y: Math.floor (Math.random()*tuberiaNorte.height) - tuberiaNorte.height
            })
        }

        //COLISONES
        if (personaje.x + bird.width >= tuberias[i].x &&
            personaje.x <= tuberias[i].x + tuberiaNorte.width &&
            (personaje.y <= tuberias[i].y + tuberiaNorte.height ||
            personaje.y + bird.height >= tuberias[i].y + constante)
            || personaje.y + bird.height >= contexto.canvas.height - suelo.height) {
            location.reload()
        }
        if (tuberias[i].x == 50) {
            score++
            punto.play()
        }
    }
    //CONDICIONES
    personaje.y += gravedad
    contexto.fillStyle = "rgba(0,0,0,1)"
    contexto.font = "25px Arial"
    contexto.fillText ("Score: "+score, 10, contexto.canvas.height-40)
}

//EVENTOS
//window.addEventListener("resize", resize)
window.addEventListener("keydown", keyDown)
