// Variables que contienen los elementos HTML a usar 

const fecha = document.getElementById('fecha');
const input = document.getElementById('input');
const lista = document.getElementById('lista');
const btnEnter = document.getElementById('enter');
const btnChecker= 'checker'
const btnChecked= 'checked'
const lineThrough = 'line-through'
let id
let arreglo


// Creación de fecha
const FECHA = new Date()
fecha.innerHTML= FECHA.toLocaleDateString('es-MX', {weekday:'long', month:'short', day:'numeric'})
// Función que agrega una tarea 

function agregarTarea(tarea,id,realizado,eliminado){
    // el parámetro tarea que recibe esta función viene de lo que haya en la variable "tarea" (que almacena el valor del input)
    // y que se envía como parámetro al dar clic en el botón btnEnter

    if(eliminado){return}

    const tareaMayus = tarea.charAt(0).toUpperCase() + tarea.slice(1);
    const REALIZADO= realizado? btnChecked : btnChecker
    const LINE = realizado? lineThrough: ''
    elemento= `
                <li id="elemento">
                <button class="${REALIZADO}" id="${id}" data="realizado"></button>
                <p class=" text ${LINE}">${tareaMayus}</p>
                <span class="material-symbols-outlined" data="eliminado" id="${id}">delete</span>
                </li>
                `
    lista.insertAdjacentHTML("beforeend", elemento);
}

btnEnter.addEventListener('click', ()=>{
    let tarea= input.value;
    if(tarea){
        agregarTarea(tarea,id,false, false)
        arreglo.push({
            nombre:tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
    }
    localStorage.setItem('TODOLIST', JSON.stringify(arreglo))
    input.value="";
    id++
})

input.addEventListener('keyup', (e)=>{
    if (e.key=='Enter'){
        let tarea= input.value;
        if(tarea) {
            agregarTarea(tarea,id,false, false)
            arreglo.push({
                nombre:tarea,
                id:id,
                realizado:false,
                eliminado:false
            })
        }
        localStorage.setItem('TODOLIST', JSON.stringify(arreglo))
        input.value="";
        id++
    }
});


// Función que marca una tarea como completada


function tareaRealizada(element){
    element.classList.toggle(btnChecker)
    element.classList.toggle(btnChecked)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    arreglo[element.id].realizado= arreglo[element.id].realizado ? false: true
}

// Función que elimina una tarea
function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    arreglo[element.id].eliminado= true

}

lista.addEventListener('click', function(e){
    const element = e.target
    const elementData= element.attributes.data.value

    if(elementData==='realizado'){
        tareaRealizada(element)
    } else if(elementData==='eliminado'){
        tareaEliminada(element)
    }
    localStorage.setItem('TODOLIST', JSON.stringify(arreglo))
})

// local storage get item

let data= localStorage.getItem('TODOLIST')
if(data){
    arreglo=JSON.parse(data)
    id =arreglo.length
    cargarLista(arreglo)
} else {
    arreglo=[]
    id=0
}

function cargarLista(DATA){
    DATA.forEach(function(i) {
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    });

}