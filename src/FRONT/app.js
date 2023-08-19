// Variables
const formulario = document.querySelector('#formulario')
const lista = document.querySelector('#lista-recetas')

// Eventos
eventListeners()

function eventListeners () {
  // Cuando el usuario agrega una receta
  formulario.addEventListener('submit', agregarReceta)

  // Cuando el documento esta listo
  document.addEventListener('DOMContentLoaded', cargarDatosDesdeAPI)

  // funciones

  // Funcion para cargar los datos directamente desde la api
  function cargarDatosDesdeAPI () {
    fetch('http://localhost:5000/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        const recetas = data
        crearHTML(recetas)
      })
      .catch(error => {
        console.log('El error es', error)
      })
  }

  // Funcion de agregar la receta
  function agregarReceta (e) {
    e.preventDefault()

    const receta = document.querySelector('#receta').value
    const ingredientes = document.querySelector('#ingredientes').value
    const comensales = document.querySelector('#numero_comensales').value
    const descripcion = document.querySelector('#descripcion').value

    if (receta === '' || ingredientes === '' || comensales <= 0 || descripcion === '') {
      formulario.reset()
      return
    }

    formulario.reset()

    const nuevaReceta = {
      receta,
      ingredientes,
      comensales,
      descripcion
    }

    fetch('http://localhost:5000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaReceta)
    })
      .then(response => response.json())
      .then(data => {
        cargarDatosDesdeAPI() // Cargar datos nuevamente después de agregar la receta
      })
      .catch(error => {
        console.log('El error es', error)
      })
  }

  // Muestra el html de las recetas
  function crearHTML (recetas) {
    const lista = document.getElementById('lista-recetas') // Supongo que tienes un elemento <ul> con id 'lista-recetas'
    lista.innerHTML = '' // Limpia la lista antes de agregar elementos nuevos

    // Recorre las recetas y crea elementos li y botones
    recetas.forEach(objeto => {
      const button = document.createElement('button')
      const li = document.createElement('li')

      button.innerText = '-'
      li.innerText = objeto.receta

      button.classList.add('btn-eliminar')
      li.classList.add('elemento-lista')

      button.onclick = () => {
        eliminarElemento(objeto.id)
      }

      li.appendChild(button)
      lista.appendChild(li)
    })
  }

  // Eliminar elementos al pulsar el boton
  function eliminarElemento (recetas) {
    if (!Array.isArray(recetas)) {
      console.log('Recetas no es un array válido')
      return
    }

    recetas = recetas.filter((receta) => {
      return receta.id !== elemento
    })

    crearHTML(recetas)
  }
}
