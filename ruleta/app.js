
let agregarFichaState = false
let cantFichas = 0;
let response = document.querySelector("#res");
let numeros = document.querySelectorAll(".numeros")
let fichaActuall = {
    pos: 0,
    ficha: "",
    numFicha: 0,
    cantFicha: 0
}
let fichasApostadas = []
let cantFichaActual;
let notificacion = document.querySelector(".notificacion")
let contReglas = document.querySelector(".contenedor-reglas").classList
const btnReglas = document.querySelectorAll(".btn-reglas")
btnReglas.forEach(btn => {
    btn.addEventListener("click", () => {
        if (contReglas.contains("show")) {
            contReglas.remove("show")
        } else {
            contReglas.add("show")
        }
    })
})
cargarTablero()


function cargarTablero() {
    for (let index = 0; index <= 36; index++) {
        if (index != 0) {
            document.querySelector(".tablero").innerHTML += `<div class="numeros" onclick="colocarFicha(${index})">
            <p>${index}</p>
        </div>`
        } else {
            document.querySelector(".tablero").innerHTML = `<div class="numeros cero" onclick="colocarFicha(${index})">
            <p>${index}</p>
        </div>`
        }
    }
}
function colocarFicha(pos) {
    let numeros = document.querySelectorAll(".numeros")
    if (agregarFichaState) {
        if (fichaActuall.ficha != "") {
            cantFichas++;
            if (cantFichas <= 5) {
                numeros[pos].innerHTML = `<div class="ficha ficha-x${fichaActuall.numFicha}" id="${fichaActuall.numFicha}">
                        ${fichaActuall.ficha}
                        </div>`
                fichasApostadas.push(fichaActuall)
                fichaActuall.cantFichaN -= 1
                document.getElementsByClassName("cantFichas")[fichaActuall.pos].innerHTML = fichaActuall.cantFichaN
            } else {
                mostrarNotificacion("Ya alcanzaste el limite", "error")
            }
        } else {
            mostrarNotificacion("Tenes que seleccionar una ficha para apostar.", "alert")
        }
    } else {
        mostrarNotificacion("Para agregar fichas a su tablero debe tocar en el boton de APOSTAR.", "alert")
    }
}
function girarRuleta() {
    if (cantFichas != 0) {
        document.querySelector(".ruleta").classList.remove("off")
        document.querySelector("#ruleta").classList.add("spin")
        setTimeout(() => {
            document.querySelector("#ruleta").classList.remove("spin")
            let res = Math.round(Math.random() * 36)
            response.innerHTML = `No va mas... el numero que salio es: ${res}`
            document.querySelector(".ruleta").classList.add("off")
            if (comprobarCoincidencia(res)) {
                mostrarNotificacion("Ganaste, bien por vos 😒😒", "success")
                moverFichas("tuyas")
                llenarFichasGanadas(fichasApostadas)
                setTimeout(() => {
                    fichasApostadas = []
                }, 1000);
            } else {
                mostrarNotificacion("No acertaste, ahora es de la casa 😈", "error")
                moverFichas("decasa")
            }
        }, 4000);
    } else {
        mostrarNotificacion("Para poder girar la ruleta tenes que apostar fichas", "alert")
    }
    cantFichas = 0
}
function agregarFicha() {
    if (agregarFichaState) {
        agregarFichaState = false
        document.querySelector("#agregar").innerHTML = 'APOSTAR'
        // }
    } else {
        response.innerHTML = `Selecciona la ficha que queres apostar!`
        agregarFichaState = true
        document.querySelector("#agregar").innerHTML = 'DEJAR'
    }
}

let ficha = document.querySelectorAll(".slot")
for (let i = 0; i < ficha.length; i++) {
    ficha[i].addEventListener("click", (e) => {
        e.preventDefault()
        fichaActuall = {}
        if (ficha[i].children[1].children[0].innerHTML != 0) {
            fichaActuall.pos = i
            fichaActuall.ficha = ficha[i].children[0].innerHTML
            fichaActuall.cantFichaN = ficha[i].children[1].children[0].innerHTML
            fichaActuall.numFicha = parseInt(ficha[i].children[0].id)

        } else {
            mostrarNotificacion("No tenes mas de estas fichas :/", "alert")
        }
    })
}

function comprobarCoincidencia(res) {
    let numeros = document.getElementsByClassName("numeros")

    for (let i = 0; i < numeros.length; i++) {
        if (numeros[res].querySelector(".ficha") != null) {
            return true
        } else {
            return false
        }
    }
}
function limpiarCasilleros() {
    cantFichas = 0;
    let numeros = document.getElementsByClassName("numeros")
    for (let i = 0; i < numeros.length; i++) {
        numeros[i].innerHTML = `<p>${i}</p>`
    }

}
function mostrarNotificacion(msg, st) {
    notificacion.classList.add("show")
    notificacion.innerHTML = `<p>${msg}</p>`
    switch (st) {
        case 'alert':
            notificacion.style.background = "#ffc107"
            break;
        case 'error':
            notificacion.style.background = "#dc3545"
            break;
        case 'success':
            notificacion.style.background = "#28a745"
            break;
    }
    setTimeout(() => {
        notificacion.classList.remove("show")
    }, 3000);
}
function moverFichas(cl) {
    let numeross = document.querySelectorAll(".numeros")
    numeross.forEach((numero, index) => {
        if (index != parseInt(numero.children[0].innerHTML)) {
            numero.children[0].classList.add(cl)
            setTimeout(() => {
                numero.innerHTML = `<p>${index}</p>`
            }, 500);
        }
    })
}
function llenarFichasGanadas(apostadas) {
    ficha.forEach(fich => {
        apostadas.forEach(apos => {
            if (parseInt(fich.children[0].id) == apos.numFicha) {
                fich.children[1].children[0].innerHTML = parseInt(fich.children[1].children[0].innerHTML) + 2
            }
        })
    })
}