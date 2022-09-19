/*  
por prompt el nombre a la persona
por prompt la edad a la persona

salude con un alert "hola nombre tu edad es: edad"

va a mostrar en el documento : la cantidad de letras de tu nombre sumado a 
tu edad da un resultado de : resultado */

let nombre = prompt("Ingrese su nombre")
let edad = Number(prompt("Ingrese su edad"))
alert(`Hola ${nombre}, tu edad es: ${edad}`)

document.write(`la cantidad de letras de ${nombre}(${nombre.length}) sumado a 
 ${edad} da un resultado de : ${nombre.length + edad}`)

let num1 = 10
let num2 = "10"

let res = (num1 !== num2)

document.write(res)

// tarea: operadores de comparacion y su funcionalidad
//AND(&&), OR(||)
//Distinto: !=
//Estrictamente distinto: !==
