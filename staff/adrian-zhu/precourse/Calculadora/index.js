function calculator () {
  alert ('Hola, bienvenidos a SkylabCalculator') 
  let x = prompt('Por favor introduzca tu primer número')
  let y = prompt (`Ahora ya tenemos ${x} \nPor favor introduzca tu segundo digito`) 

  if(Number(x) && (!y || isNaN(y))) return (`El cuadrado de ${x} = ` + Math.sqrt(x).toFixed(3))
  if(Number(y) && (!x || isNaN(x))) return (`El cuadrado de ${y} = ` + Math.sqrt(y).toFixed(3))
  if((isNaN(x) || !(x))  && (isNaN(y) || !(y))) return alert(`Necesitamos al menos un número para hacer el cálculo.`)
  
  if(Number(x) && Number(y)) {
    let sum = (parseFloat(x) + parseFloat(y)).toFixed(3)
    let res = (parseFloat(x) - parseFloat(y)).toFixed(3)
    let mul = (parseFloat(x) * parseFloat(y)).toFixed(3)
    let div = (parseFloat(x) / parseFloat(y)).toFixed(3)
    return [`La suma de ${x} y ${y} = ${(sum)}`,
            `La resta de ${x} y ${y} = ${res}`,
            `La multiplicación de ${x} y ${y} = ${mul}`,
            `La división de ${x} y ${y} = ${div}.`]
  };
};
calculator()