
let totalTareas = 0;
let tareasCompletadas = 0;

const inputTarea = document.getElementById('inputTarea');
const selectCategoria = document.getElementById('categoria');
const listaTareas = document.getElementById('pendingTasks'); 
const contadorVivo = document.getElementById('contadorVivo'); 
const mensajeError = document.getElementById('mensajeError');

function actualizarInterfaz() {
    contadorVivo.innerHTML = `Done: <span class="num">${tareasCompletadas}</span> of <span class="num">${totalTareas}</span>`;
    
    console.log(`Progreso actual: ${tareasCompletadas} de ${totalTareas} tareas.`);
}

document.getElementById('btnAgregar').addEventListener('click', () => {
    const texto = inputTarea.value.trim();
    const categoria = selectCategoria.value;


    if (texto === "") {
        mensajeError.textContent = "Error: Please write a task!";
        mensajeError.style.display = "block";
        mensajeError.style.color = "red";
        return;
    }

    mensajeError.style.display = "none";
    const li = document.createElement('li');
    
    li.innerHTML = `
        <span>${categoria} ${texto}</span>
        <div>
            <button onclick="completarTarea(this)">✅</button>
            <button onclick="hacerUrgente(this)">👽</button>
            <button onclick="eliminarTarea(this)">🛑</button>
        </div>
    `;

    listaTareas.appendChild(li);
    totalTareas++;
    // Console.log descriptivo #2
    console.log("Nueva tarea inyectada en el DOM exitosamente.");
    actualizarInterfaz();
    inputTarea.value = "";
});

function completarTarea(boton) {
    const li = boton.closest('li');
    li.classList.toggle('hecha'); 
    
    if (li.classList.contains('hecha')) {
        tareasCompletadas++;
    } else {
        tareasCompletadas--;
    }
    actualizarInterfaz();
}

function hacerUrgente(boton) {
    const li = boton.closest('li');
    li.classList.toggle('urgente'); 
}

function eliminarTarea(boton) {
    // Confirmación (10 pts)
    if (confirm("Do you want to delete this task?")) {
        const li = boton.closest('li');
        if (li.classList.contains('hecha')) {
            tareasCompletadas--;
        }
        li.remove();
        totalTareas--;
        
        console.log("Tarea eliminada tras confirmación del usuario.");
        actualizarInterfaz();
    }
}

function limpiarHechas() {
    const hechas = document.querySelectorAll('.hecha');
    if (confirm(`Are you sure you want to clear ${hechas.length} completed tasks?`)) {
        hechas.forEach(t => {
            t.remove();
            totalTareas--;
            tareasCompletadas--;
        });
        actualizarInterfaz();
    }
}