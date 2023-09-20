document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
  
    // Función para agregar un nuevo producto a la lista en tiempo real
    function agregarProductoALaVista(producto) {
      const productosList = document.getElementById('productosList');
      const newItem = document.createElement('li');
      newItem.textContent = producto.nombre;
      productosList.appendChild(newItem);
    }
  
    // Escuchar evento para actualizar la lista en tiempo real
    socket.on('productoAgregado', (producto) => {
      agregarProductoALaVista(producto);
    });
  
    // Enviar evento al servidor cuando se envía el formulario
    document.getElementById('productoForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const nombre = document.getElementById('nombre').value;
      socket.emit('nuevoProducto', { nombre });
      document.getElementById('nombre').value = '';
    });
  });