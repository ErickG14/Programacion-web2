
// ===== IMPORTACIÓN DE MÓDULOS NECESARIOS =====
const express = require('express');        // Framework web para Node.js
const mysql = require('mysql2');           // Cliente para conectar con MySQL
const bodyParser = require('body-parser'); // Para procesar datos de formularios
const path = require('path');              // Para manejar rutas de archivos
const session = require('express-session'); // Para manejar sesiones de usuario

// Creamos la aplicación Express
const app = express();

// ===== CONFIGURACIÓN DE MIDDLEWARE =====
// Middleware para servir archivos estáticos (CSS, JS, imágenes)
app.use(express.static('public'));

// Middleware para procesar datos de formularios (application/x-www-form-urlencoded)
app.use(bodyParser.urlencoded({ extended: false }));

// Configuración de sesiones para mantener el estado del usuario logueado
app.use(session({
  secret: 'mi_secreto_seguro',    // Clave para firmar la sesión (en producción usar variable de entorno)
  resave: false,                  // No guardar la sesión si no se modificó
  saveUninitialized: false        // No guardar sesiones vacías
}));

// ===== CONFIGURACIÓN DEL MOTOR DE PLANTILLAS =====
// Usamos EJS como motor de plantillas para generar HTML dinámicamente
app.set('view engine', 'ejs');
// Especificamos la carpeta donde están las vistas (archivos .ejs)
app.set('views', path.join(__dirname, 'views'));

// ===== CONEXIÓN A LA BASE DE DATOS MYSQL =====
const db = mysql.createConnection({
  host: '127.0.0.1',           // Dirección del servidor MySQL (localhost)
  user: 'root',                // Usuario de la base de datos
  password: 'YAZMIN1980',      // Contraseña del usuario
  database: 'sistema_carros',  // Nombre de la base de datos que vamos a usar
  port: 3306                   // Puerto donde corre MySQL
});

// Intentamos conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('❌ Error conectando a la base de datos:', err.message);
  } else {
    console.log('✅ Conectado a la base de datos sistema_carros');
  }
});

// ===== MIDDLEWARE PERSONALIZADO PARA VERIFICAR LOGIN =====
// Este middleware protege las rutas que requieren estar logueado
const requireLogin = (req, res, next) => {
  if (req.session.user) {
    // Si hay un usuario en la sesión, permite continuar
    next();
  } else {
    // Si no hay usuario, redirige al login
    res.redirect('/login');
  }
};

// ===== INICIO DEL SERVIDOR =====
const port = 3008;
app.listen(port, () => {
  console.log(`🚀 Servidor ejecutándose en http://localhost:${port}`);
});

// ================= DEFINICIÓN DE RUTAS =================

// ===== RUTAS DE LOGIN =====

// GET /login - Muestra el formulario de login
app.get('/login', (req, res) => {
  // Renderiza la plantilla login.ejs sin errores inicialmente
  res.render('login', { error: null });
});

// POST /login - Procesa el formulario de login
app.post('/login', (req, res) => {
  // Obtenemos los datos del formulario
  const { username, password } = req.body;
  
  // Consulta SQL para verificar credenciales
  const sql = 'SELECT * FROM usuarios WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      // Error del servidor (problema con la base de datos)
      console.error('Error en login:', err);
      res.render('login', { error: 'Error del servidor' });
    } else if (results.length > 0) {
      // Credenciales correctas - guardamos el usuario en la sesión
      req.session.user = results[0];
      // Redirigimos al dashboard
      res.redirect('/dashboard');
    } else {
      // Credenciales incorrectas
      res.render('login', { error: 'Usuario o contraseña incorrectos' });
    }
  });
});

// GET /logout - Cierra la sesión del usuario
app.get('/logout', (req, res) => {
  // Destruimos la sesión actual
  req.session.destroy();
  // Redirigimos al login
  res.redirect('/login');
});

// ===== RUTAS DE REGISTRO =====

// GET /register - Muestra el formulario de registro
app.get('/register', (req, res) => {
  res.render('register', { error: null, success: null });
});

// POST /register - Procesa el formulario de registro
app.post('/register', (req, res) => {
  // Obtenemos los datos del formulario
  const { username, email, password, confirmPassword } = req.body;
  
  console.log(`📝 Intentando registrar usuario: ${username}`);
  
  // ===== VALIDACIONES =====
  
  // Validación: Las contraseñas deben coincidir
  if (password !== confirmPassword) {
    return res.render('register', { 
      error: 'Las contraseñas no coinciden', 
      success: null 
    });
  }
  
  // Validación: La contraseña debe tener al menos 6 caracteres
  if (password.length < 6) {
    return res.render('register', { 
      error: 'La contraseña debe tener al menos 6 caracteres', 
      success: null 
    });
  }
  
  // ===== VERIFICACIÓN EN BASE DE DATOS =====
  
  // Consulta para verificar si el usuario o email ya existen
  const checkUserSql = 'SELECT * FROM usuarios WHERE username = ? OR email = ?';
  db.query(checkUserSql, [username, email], (err, results) => {
    if (err) {
      // Error de la base de datos
      console.error('Error verificando usuario:', err);
      return res.render('register', { 
        error: 'Error del servidor', 
        success: null 
      });
    }
    
    // Si ya existe un usuario con ese username o email
    if (results.length > 0) {
      return res.render('register', { 
        error: 'El usuario o email ya están registrados', 
        success: null 
      });
    }
    
    // ===== CREACIÓN DEL NUEVO USUARIO =====
    
    // Consulta para insertar el nuevo usuario
    const insertSql = 'INSERT INTO usuarios (username, email, password) VALUES (?, ?, ?)';
    db.query(insertSql, [username, email, password], (err, results) => {
      if (err) {
        // Error al insertar en la base de datos
        console.error('Error registrando usuario:', err);
        return res.render('register', { 
          error: 'Error al registrar el usuario', 
          success: null 
        });
      }
      
      // Registro exitoso
      console.log(`✅ Usuario registrado: ${username}`);
      res.render('register', { 
        error: null, 
        success: '✅ Usuario registrado exitosamente. Ahora puedes iniciar sesión.' 
      });
    });
  });
});

// ===== RUTAS DEL DASHBOARD (PROTEGIDAS) =====

// GET /dashboard - Página principal después del login
app.get('/dashboard', requireLogin, (req, res) => {
  // Consulta para obtener todos los carros ordenados por ID descendente
  const sql = 'SELECT * FROM carros ORDER BY id DESC';
  db.query(sql, (err, results) => {
    if (err) {
      // Error al obtener los carros
      console.error('Error al recuperar carros:', err);
      // Mostramos el dashboard con lista vacía
      res.render('dashboard', { carros: [], user: req.session.user });
    } else {
      // Mostramos el dashboard con la lista de carros
      res.render('dashboard', { carros: results, user: req.session.user });
    }
  });
});

// ===== OPERACIONES CRUD PARA CARROS =====

// POST /add-car - Agrega un nuevo carro a la base de datos
app.post('/add-car', requireLogin, (req, res) => {
  // Obtenemos los datos del formulario
  const { marca, modelo, año, color, precio } = req.body;
  
  // Consulta SQL para insertar el nuevo carro
  const sql = 'INSERT INTO carros (marca, modelo, año, color, precio) VALUES (?, ?, ?, ?, ?)';
  
  db.query(sql, [marca, modelo, año, color, precio], (err, results) => {
    if (err) {
      // Error al insertar el carro
      console.error('Error al agregar carro:', err);
      res.send('Error, no se pudo agregar el carro');
    } else {
      // Carro agregado exitosamente - redirigimos al dashboard
      res.redirect('/dashboard');
    }
  });
});

// POST /update-car/:id - Actualiza un carro existente (desde el modal)
app.post('/update-car/:id', requireLogin, (req, res) => {
  // Obtenemos el ID del carro desde los parámetros de la URL
  const { id } = req.params;
  // Obtenemos los nuevos datos del formulario
  const { marca, modelo, año, color, precio } = req.body;
  
  // Consulta SQL para actualizar el carro
  const sql = 'UPDATE carros SET marca = ?, modelo = ?, año = ?, color = ?, precio = ? WHERE id = ?';
  
  db.query(sql, [marca, modelo, año, color, precio, id], (err, results) => {
    if (err) {
      // Error al actualizar el carro
      console.error('Error al actualizar carro:', err);
      res.send('Error, no se pudo actualizar el carro');
    } else {
      // Carro actualizado exitosamente - redirigimos al dashboard
      res.redirect('/dashboard');
    }
  });
});

// GET /delete-car/:id - Elimina un carro de la base de datos
app.get('/delete-car/:id', requireLogin, (req, res) => {
  // Obtenemos el ID del carro desde los parámetros de la URL
  const { id } = req.params;
  
  // Consulta SQL para eliminar el carro
  const sql = 'DELETE FROM carros WHERE id = ?';
  
  db.query(sql, [id], (err, results) => {
    if (err) {
      // Error al eliminar el carro
      console.error('Error al eliminar carro:', err);
      res.send('Error, no se pudo eliminar el carro');
    } else {
      // Carro eliminado exitosamente - redirigimos al dashboard
      res.redirect('/dashboard');
    }
  });
});

// ===== RUTA PRINCIPAL =====
// GET / - Redirige al login (página de inicio)
app.get('/', (req, res) => {
  res.redirect('/login');
});

// ===== MANEJO DE ERRORES =====
// Middleware para rutas no encontradas (404)
app.use((req, res) => {
  res.status(404).send('Página no encontrada');
});