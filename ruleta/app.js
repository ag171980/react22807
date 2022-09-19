
let agregarFichaState = false
let cantFichas = 0;
let response = document.querySelector("#res");
let numeros = document.getElementsByClassName("numeros")
let fichaActuall = {
    pos: 0,
    ficha: "",
    numFicha: 0,
    cantFicha: 0
}
let fichaActual;
let numFicha;
let cantFichaActual;
for (let i = 0; i < numeros.length; i++) {
    numeros[i].addEventListener("click", () => {
        cantFichas++;
        if (agregarFichaState) {
            if (fichaActuall.ficha != undefined) {
                if (cantFichas <= 5) {
                    // numeros[i].innerHTML = fichaActual
                    numeros[i].innerHTML = `<div class="ficha ficha-x${fichaActuall.numFicha}" id="${fichaActuall.numFicha}">
                    ${fichaActuall.ficha}
                    </div>`
                    // console.log(fichaActuall)
                    fichaActuall.cantFicha -= 1
                    document.getElementsByClassName("cantFichas")[fichaActuall.pos].innerHTML = fichaActuall.cantFicha
                } else {
                    alert("aca ya hay 5")

                }
            } else {
                alert("Tenes que seleccionar una ficha para apostar.")
            }
        } else {
            alert("Para agregar fichas a su tablero debe tocar en el boton de APOSTAR.")
        }
    })
}
function girarRuleta() {
    let res;
    if (cantFichas != 0) {
        document.querySelector(".ruleta").classList.remove("off")
        document.querySelector("#ruleta").classList.add("spin")
        setTimeout(() => {
            document.querySelector("#ruleta").classList.remove("spin")
            res = Math.round(Math.random() * 36)
            response.innerHTML = `No va mas... el numero que salio es: ${res}`
            document.querySelector(".ruleta").classList.add("off")
            if (comprobarCoincidencia(res)) {
                alert("FELICIDADES, GANASTE!!!!")
            } else {
                alert("No acertaste, suerte para la proxima :cc")
            }
        }, 4000);
    } else {
        alert("Para poder girar la ruleta tenes que apostar fichas")
    }
}
function agregarFicha() {
    if (agregarFichaState) {
        // if (seleccionarFicha()) {
        // let fich = seleccionarFicha()
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

        if (ficha[i].children[1].children[0].innerHTML != 0) {
            fichaActuall.pos = i
            fichaActuall.ficha = ficha[i].children[0].innerHTML
            fichaActuall.cantFicha = ficha[i].children[1].children[0].innerHTML
            fichaActuall.numFicha = parseInt(ficha[i].children[0].id)
        }else{
            alert("No tenes mas de estas fichas :/")
        }
    })
}

// seleccionarFicha()
// function seleccionarFicha() {
//     let ficha = document.querySelector(".ficha")

//     ficha.addEventListener("click", (e) => {
//         e.preventDefault()
//         console.log(ficha)
//     })
// }

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