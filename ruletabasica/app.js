let nombre = prompt("Ingrese su nombre")
var entro = false
let numero = prompt("Elegi un numero del 0 al 36")
while (!entro) {
    if (numero < 0 || numero > 36) {
        numero = prompt("Numero incorrecto, ingrese otro que si este entre el 0 y 36")
    } else {
        ruleta(nombre, numero)
        entro = true
    }

}


function ruleta(nombre, numero) {
    const random = Math.round(Math.random() * 36)
    document.write(`La ruleta termino de girar ${nombre}, y elegiste ${numero}. <br>`)
    document.writeln(`El numero que salio es ${random}`)
    if (numero == random) {
        document.write(`Felicidades ${nombre}, tu numero salio`)
    } else {
        document.write(`Una lastima, segui participando ${nombre}!`)
    }

}