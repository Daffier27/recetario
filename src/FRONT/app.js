// Variables
const formulario = document.querySelector('#formulario')
const lista = document.querySelector('#lista-recetas')

let recetas = []

// Eventos
eventListeners()

function eventListeners () {
  // Cuando el usuario agrega una receta
  formulario.addEventListener('submit', agregarReceta)

  // Cuando el documento esta listo
  document.addEventListener('DOMContentLoaded', () => {
    // Llamamos al objeto almacenado
    const recetario = JSON.parse(localStorage.getItem('recetario')) || []
    recetas = recetario // Asinamos el valore del recetario antes de llamar al crearHTML
    crearHTML()
  })
}

// funciones

// Funcion de agregar la receta
function agregarReceta (e) {
  e.preventDefault()

  // Obtener los valores del formulario
  const receta = document.querySelector('#receta').value
  const ingredientes = document.querySelector('#ingredientes').value
  const comensales = document.querySelector('#numero_comensales').value
  const descripcion = document.querySelector('#descripcion').value

  // Validacion del formulario
  if (
    receta === '' ||
    ingredientes === '' ||
    comensales <= 0 ||
    descripcion === ''
  ) {
    formulario.reset() // Ponemos el formulario en blanco
    return // Para evitar que se ejecute el resto del codigo
  }

  formulario.reset() // Ponemos el formulario en blanco

  const objReceta = {
    id: Date.now(), // Sera el identificador hasta que tengamos la base de datos
    receta,
    ingredientes,
    comensales,
    descripcion
  }

  recetas = [...recetas, objReceta]

  crearHTML()
}

// Muestra el html de las recetas
function crearHTML () {
  // Limpiamos la lista antes de agregar las recetas
  lista.innerHTML = ''

  // Recorremos las recetas y creamos un nuevo elemento li por cada una
  recetas.forEach((objeto) => {
    // Creamos elementos
    const button = document.createElement('button')
    const li = document.createElement('li')

    // Asignamos el contenido dentro de los Componentes
    button.innerText = '-'
    li.innerText = objeto.receta

    // Añadir clases a los elementos HTML
    button.classList.add('btn-eliminar')
    li.classList.add('elemento-lista')

    // Añadir la funcion de eliminar elementos
    button.onclick = () => {
      eliminarElemento(objeto.id)
    }

    // Agregamos el li a la lista
    lista.appendChild(li)
    // Agregamos dentro de los elementos li
    li.appendChild(button)
  })
}

// Eliminar elementos al pulsar el boton
function eliminarElemento (elemento) {
  // Seleccionar el String del localStorage
  recetas = recetas.filter((receta) => {
    return receta.id !== elemento
  })

  crearHTML()
}
