
// Asigno las variables del sistema:
var tasksArray = [];
var table = document.getElementById("tasksTable");

// Valido si no hay elementos el array de tareas para setearlo como display=none!
if(tasksArray.length == 0){
  table.style.display = "none";
}

// Función para agregar tareas:
function addTask(tarea, descripcion, fechaVencimiento) {
  // Asigno variables:
  let valuesToAdd = {"tarea": tarea.value, "fechaVencimiento": fechaVencimiento.value, "descripcion": descripcion.value}; 

  // Valido si se ingresó algo en la tarea y fechaVencimiento
  if(tarea.value == "" || fechaVencimiento.value == "" || descripcion.value == ""){
    //Es un error, no agrega la tarea.
  }else{
    // Agrego la tarea con su fecha de vencimiento al array de tareas:
    tasksArray.push(valuesToAdd);

    // Genero la tabla a partir de los elementos del array de tareas:
    generateTableByTasksArray();

    //Asigno los valores a los campos del input en blanco nuevamente:
    document.getElementById('tarea').value            = "";
    document.getElementById('descripcion').value      = "";
    document.getElementById('fechaVencimiento').value = "";
  }

}


// Función para borrar tareas:
function deleteTask(id) {
  // Elimino el elemento del array:
  tasksArray.splice(id, 1);

  // Genero la tabla a partir de los elementos que quedaron:
  generateTableByTasksArray();
}


// Función para editar tareas:
function editTask(id) {
  // Obtengo el elemento a modificar
  element = tasksArray[id];

  //Asigno los valores a los campos del input
  document.getElementById('tarea').value            = element.tarea;
  document.getElementById('descripcion').value      = element.descripcion;
  document.getElementById('fechaVencimiento').value = element.fechaVencimiento;
  
  // Elimino el elemento del array:
  tasksArray.splice(id, 1);

  // Genero la tabla a partir de los elementos que quedaron:
  generateTableByTasksArray();
}

// Función para generar la tabla a partir de las tareas del array de tareas:
function generateTableByTasksArray(){
  // Primero limpio la tabla e inserto los headers de la misma:
  table.innerHTML = '';
  let row = table.createTHead().insertRow(0);
  let th1 = row.insertCell(0);
  let th2 = row.insertCell(1);
  let th3 = row.insertCell(2);
  let th4 = row.insertCell(3);
  th4.innerHTML = "<b>Acciones</b>";
  th3.innerHTML = "<b>Fecha de vencimiento</b>";
  th2.innerHTML = "<b>Descripción</b>";
  th1.innerHTML = "<b>Tarea</b>";


  // Luego itero sobre el array de tareas agregadas y voy asignando uno a uno los valores:
  tasksArray.forEach((item, index)=>{
    let row = table.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    cell1.innerHTML = item.tarea;
    cell2.innerHTML = item.descripcion;
    cell3.innerHTML = item.fechaVencimiento;
    cell4.innerHTML = "<button id='buttonEditTask' type='button' onclick='editTask("+index+")'>Editar</button><button id='buttonDeleteTask' type='button' onclick='deleteTask("+index+")'>Borrar</button>";
  });

  // Valido si no hay elementos el array de tareas para agregar que no tiene tareas pendientes:
  if(tasksArray.length == 0){
    document.querySelector("body > div > div.li-container > p").innerHTML = "No tienes tareas pendientes!";
  }else{
    document.querySelector("body > div > div.li-container > p").innerHTML = "";
  }
  
  //Por último, seteo como visible la tabla:
  table.style.display = "table";
}
