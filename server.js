const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const handlebars = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configuración de Handlebars
 app.engine('handlebars', handlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


app.use(express.static('public'));

// Rutas
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});


const productos = [];


io.on('connection', (socket) => {
  console.log('Cliente conectado');


  socket.on('nuevoProducto', (producto) => {
    
    productos.push(producto);

    
    io.emit('productoAgregado', producto);
  });

  socket.on('eliminarProducto', (productoId) => {
  
    const indice = productos.findIndex((producto) => producto.id === productoId);
    if (indice !== -1) {
      const productoEliminado = productos.splice(indice, 1);
   
      io.emit('productoEliminado', productoEliminado);
    }
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});