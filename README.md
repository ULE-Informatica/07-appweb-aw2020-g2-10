# EJECUCIÓN DE THE CONTENT BOX 📦 

1. Arrancamos el servidor e introducimos los credenciales:
	- usuario : awuser
	- password: aspas
2. Comprobamos con el comando “ifconfig” la IP del servidor. Es importante que sea distinta a la de nuestro equipo. Si no es así, tendremos que refrescar la MAC y reiniciar el servidor residente en la máquina virtual.
3. Se puede utilizar la terminal propia del ordenador y conectarse al servidor a través de ssh con el comando “ssh awuser@ip_servidor”, siendo ip_servidor la IP de nuestro servidor comprobada en el paso 2.
4. En nuestro ordenador, clonamos el proyecto desde el repositorio: https://username:pass@github.com/ULE-Informatica/07-appweb-aw2020-g2-10.git, siendo username el nombre del usuario y pass la contraseña.
5. Entrar en directorio /frontend y ejecutar yarn para instalar dependencias:
	- cd ../frontend/
	- yarn
6. En el archivo backend/config/index.js se deben realizar lo siguiente:
	- Comentar las líneas 6 y 8 que hacen referencia a “user” y “root”.
	- Descomentar las líneas 7 y 9.
7. En el archivo frontend/utils/API.js, en la línea 6 se debe cambiar “localhost” dentro de la referencia “baseURL” por la IP del servidor que hallamos en el paso 2 (debe quedar algo de la forma:
	baseURL: "http://192.168.1.42:3000/"
8. Entramos en la carpeta frontend/ y ejecutamos el comando “yarn build”. Este comando creará dentro de frontend/ una carpeta llamada dist/ que tendremos que copiar y pegar dentro de nuestro servidor.
9. Abrimos FileZilla e introducimos:
	- Servidor: IP del servidor obtenida en el punto 2
	- Nombre de usuario: awuser
	- Contraseña: awpass
10. Pulsamos en “Conexión rápida”. Aceptamos.
11. En la parte izquierda de FileZilla, buscamos la carpeta que hemos generado en el punto 7 y movemos su contenido a la parte derecha de FileZilla (que hace referencia al servidor). Debemos moverlo al directorio html/. El contenido es el siguiente:
	- directorio “css”
	- directorio “img”
	- directorio “js”
	- archivo “favicon.ico”
	- archivo “index.html”
* Si nos da un error de permisos en este paso debemos ejecutar el siguiente comando dentro del servidor: "sudo chown -R awuser:awuser html/"
12. En la parte izquierda de FileZilla, buscamos la /backend dentro del repositorio clonado de GitHub y movemos su contenido a la parte derecha de FileZilla (que hace referencia al servidor). Debemos moverlo al directorio /nodejs. El contenido es el siguiente:
	- directorio “src”
	- archivo “package.json”
	- archivo “package-lock.json”
	- archivo “yarn.lock”
	- archivo “yarn-error.log”
13. Dentro del servidor, entramos en la ruta /var/www/nodejs/ y ejecutamos el comando “npm install” y “yarn”.
14. Abrimos un navegador y navegamos a “ip_servidor/phpmyadmin”, siendo ip_servidor la IP del servidor hallada en el punto 2.
15. Introducimos el usuario “awuser” y la contraseña “awpass”.
16. Creamos una base de datos llamada “TheContentBoxAW” (letras mayúsculas incluidas)
17. Accedemos a la pestaña de “Privilegios” de la base de datos que acabamos de crear y damos todos los privilegios al usuario “awuser” que está ya creado.
18. En nuestro servidor, dentro del directorio /nodejs, ejecutamos el comando “npm start”, que iniciará nuestro servidor bajo el servicio de “nodemon”.
19. En el navegador, podremos acceder a la aplicación web introduciendo la IP de nuestro servidor obtenida en el punto 2.


# FUNCIONALIDAD DE LA APP 🚀 

- Para utilizar la aplicación el usuario deberá registrarse eligiendo un avatar, nombre, nombre de usuario, email y contraseña.
- El usuario podrá iniciar sesión introduciendo su nombre de usuario y su contraseña.
- En la página principal, se podrán visualizar y escuchar los productos del top 50 de España. Si se selecciona “Ver más”, se navegará a otra página.
- En ésta página, el usuario podrá ver información relativa al producto, así como marcarlo como favorito añadiéndole un comentario y una puntuación.
- Además, también podrá ver las puntuaciones y comentarios de otros usuarios sobre el mismo producto.
- En la barra de navegación existe un icono con un corazón que navegará al usuario a su lista de favoritos. Aquí, el usuario podrá consultar todos los productos que ha seleccionado como favoritos, así como eliminarlos y modificar su puntuación y comentario si así lo desea.
- En la barra de navegación también existe un icono con un usuario que navegará al usuario a sus datos personales. Aquí, el usuario podrá consultar sus datos personales, así como modificar su avatar, nombre y email.
- Los productos que se muestran al usuario se obtienen directamente desde nuestro servidor gracias al servidor de Deezer, de tal forma que en nuestra base de datos únicamente se guardan los IDs de los productos y cuando se quiere hacer alguna consulta sobre ellos, se hace gracias a nuestro servidor, que hace de proxy entre el usuario y el servidor de Deezer.
