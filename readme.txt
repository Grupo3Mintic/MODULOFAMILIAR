🧭 MÓDULO FAMILIAR — INSTRUCCIONES DE USO

1. REQUISITOS
---------------
- Node.js (https://nodejs.org) v16 o superior
- PostgreSQL (base de datos local o en la nube)
- Visual Studio Code
- Cordova (para compilar como APK)
    npm install -g cordova


2. INSTALAR DEPENDENCIAS BACKEND
----------------------------------
cd moduloFamiliar
npm install


3. CREAR BASE DE DATOS EN POSTGRESQL
--------------------------------------
Nombre de la base: modulofamiliar

Ejecutar el archivo:
  server/modelo.sql

Esto crea:
- grupo_familiar
- usuarios
- bitacora_salud


4. CONFIGURAR CONEXIÓN A LA BASE
-----------------------------------
Edita el archivo: server/database.js

const pool = new Pool({
  user: 'TU_USUARIO',
  host: 'localhost',
  database: 'modulofamiliar',
  password: 'TU_CONTRASEÑA',
  port: 5432
});


5. EJECUTAR EL SERVIDOR
--------------------------
node app.js

Accede desde tu navegador:
http://localhost:3000


6. USAR LA APLICACIÓN
------------------------
Desde el navegador:
- www/index.html — pantalla principal
- www/registro.html — registrar usuario
- www/login.html — iniciar sesión
- www/bitacora.html — ver miembros del grupo y bitácora


7. OPCIONAL: COMPILAR COMO APK
--------------------------------
cordova platform add android
cordova build android

Salida: platforms/android/app/build/outputs/apk/debug/app-debug.apk


8. OPCIONAL: PUBLICAR EN RENDER
--------------------------------
- Crear cuenta en https://render.com
- Subir proyecto (desde GitHub o ZIP)
- Crear base de datos PostgreSQL desde el panel
- Establecer variables de entorno DB_HOST, DB_USER, etc.
- Tu dominio quedará como https://modulofamiliar.onrender.com


Hecho con ❤️ por Julio desde Cartagena 🇨🇴