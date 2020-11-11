function guardarDatos(e){
    e.preventDefault();
    //llamar una funcion que cheque que esa descricpion no este
    let imagenProducto=document.querySelector('#imgProducto').value;//#imagen
    let descripcion=document.querySelector('#descProducto').value; //#descripcion
    let cantidad=document.querySelector('#cantProducto').value;//#cantidad
    let precio=document.querySelector('#preProducto').value;//precio
    const stock={
        producto:imagenProducto,//inputFile
        descripcion:descripcion,
        cantidad:cantidad,
        precioUnitario:precio
    }
    let storageData = localStorage.getItem('stock') || "[]";
    debugger
    storageData = JSON.parse(storageData);

    storageData.push(stock);
    
    localStorage.setItem('stock', JSON.stringify(storageData));
    document.formulario.reset();
    actualizarListado();
    document.getElementById('agregar-btn').click();
    limpiar();
}

function borrarItem(element) { //index es el indice
    var elementToDelete = element.parentNode.parentNode.id;
    let muestraDatos = JSON.parse(localStorage.getItem('stock'));
    console.log('elementToDelete ' + elementToDelete);
    localStorage.clear();//limpia el localStorage
    muestraDatos.splice(elementToDelete, 1);//borra el elemento (index=posicion del elemento )
    localStorage.setItem('stock', JSON.stringify(muestraDatos));
    actualizarListado()
}
//funcion que borra todo
function borrarTodo(){
    localStorage.clear();
    actualizarListado()
}
//funcion que muestra
function mostrar(element){
    
    var elementToShow = element.parentNode.parentNode.id;
    let muestraDatos = JSON.parse(localStorage.getItem('stock'));

    /*alert(`Aqui estan sus datos: Productos: ${muestraDatos[elementToShow].producto} Descripcion: ${muestraDatos[elementToShow].descripcion} Cantidad:${muestraDatos[elementToShow].cantidad}Precio: ${muestraDatos[elementToShow].precioUnitario}`);*/
    $("#imagenProducto").attr("src",muestraDatos[elementToShow].producto);
    $("#descripcionProducto").html(muestraDatos[elementToShow].descripcion);
    $("#cantidadProducto").html(muestraDatos[elementToShow].cantidad);
    $("#precioProducto").html(muestraDatos[elementToShow].precioUnitario);
    $("#showModal").modal('toggle');



    let prod=document.querySelector('button');
    prod.classList.add(`${muestraDatos[elementToShow].producto}`);
}
// Form limpiar al enviar
function limpiar() {
    document.getElementById('product-form').reset();
}

//Actualizar listado
function actualizarListado() {
    deleteTable();
    console.log('actualizar');
    let e = document.getElementById('table');
    let index = 0;
    let muestraDatos = JSON.parse(localStorage.getItem('stock')) || [];

    muestraDatos.forEach(element => {
        let elementRow = document.createElement('tr');
        elementRow.id = index;
        let imageTd = document.createElement('td');
        let image = document.createElement('img');
        image.src = element.producto;
        image.width = 200;
        imageTd.appendChild(image);
        elementRow.appendChild(imageTd);
        let description = document.createElement('td');
        description.innerHTML = element.descripcion;
        elementRow.appendChild(description);
        
        let quantity = document.createElement('td');
        quantity.innerHTML= element.cantidad;
        elementRow.appendChild(quantity);
        
        let value = document.createElement('td');
        value.innerHTML= element.precioUnitario;
        elementRow.appendChild(value);
        
        let total = document.createElement('td');
        total.innerHTML= element.precioUnitario * element.cantidad;
        elementRow.appendChild(total);

        let show = document.createElement('td');
        let showButton = document.createElement('button');
        showButton.classList.add('btn');
        showButton.classList.add('btn-dark');
        showButton.innerHTML = '<i class="far fa-eye">';
        showButton.addEventListener('click', function(){
            mostrar(showButton)
        });

        show.appendChild(showButton)
        elementRow.appendChild(show);
        
        let deleteColumn = document.createElement('td');
        let deleteButton = document.createElement('button');
        deleteButton.classList.add('btn');
        deleteButton.classList.add('btn-dark');
        deleteButton.innerHTML = '<i class="fa fa-trash">';
        deleteButton.addEventListener('click', function(){
            borrarItem(deleteButton)
        });

        deleteColumn.appendChild(deleteButton)
        elementRow.appendChild(deleteColumn);
        e.appendChild(elementRow);
        index++;
    });
}

function deleteTable() {
    let e = document.getElementById('table');
    let child = e.lastElementChild;
    while (child) {
        e.removeChild(child);
        child = e.lastElementChild;
    }
}


document.getElementById('borrar-todo').addEventListener('click', () => {
    borrarTodo();
})


document.getElementById('cancelButton').addEventListener('click', () => {
    limpiar();
})