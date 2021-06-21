# Prueba-Tecnica

Pasos de Instalacion

#Base de datos

En la carpeta database puedes encontrar la base de datos en el archivo db.sql corre el archivo en tu gestor de base de datos como phpMyAdmin o MySQL Workbench, asi mismo se adjunta el modelo y una imagen de la estructura de la base de datos.

#Backend

Requisitos (programas o paquetes necesarios)
- Composer
- Slim 2.*
- PHP 7.*
- Servidor Apache o Built in Server

Ingresa a la carpeta Backend y ejecuta el comando composer install.
Si utilizas WAMP o un servidor Apache inicialo y carga el archivo index.php
Si utilizaras el Built de PHP, ejecutalo desde la ubicacion del archivo index.php
Agrega las credenciales de acceso a la base de datos en el archivo conexion.php en el directorio: C:user\prueba_tecnica\backend\src\config

$host   = 'localhost';
        $dbuser = 'root';
        $dbpass = '';
        $dbname = 'mydb';
        $dbport = '3306';
        
Por ser un ambiente de desarrollo no se guardan las variables en un archivo .env.

Visita la siguiente URL para verificar si el proyecto esta corriendo correctamente: http://localhost/prueba_tecnica/backend/public/api/categorias/leer deberea devolverte un codigo 200.

Si no tienes activado el mod_rewrite utiliza la siguiente URL: http://localhost/prueba_tecnica/backend/public/index.php/api/categorias/leer

#Frontend 

Requisitos (programas o paquetes necesarios)
- Node v.14+
- NPM v.5+
- Angular CLI v.9+

Ingresa a la carpeta Frontend y ejecuta el comando npm install, posterior a esto ejecuta el comando npm start lo cual iniciara la aplicacion SPA en Angular.



