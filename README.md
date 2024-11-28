# BACKEND API MARVEL TECNOFACTORY 


## 🏠 Descripción General

Esta aplicación Node.js es el backend de una aplicación web que interactúa con la API de Marvel Comics. Proporciona servicios para la autenticación de usuarios, gestión de usuarios y acceso a datos de cómics.

### Funcionalidades
 - **Autenticación de usuarios** Permite a los usuarios registrarse e iniciar sesión.
- **Gestión de usuarios:** Permite crear, modificar usuarios.
- **Acceso a datos de cómics:** Permite obtener información de cómics desde la API de Marvel.

## 📋 Tabla de Contenidos

1. [Estructura del Proyecto](#estructura-del-proyecto)
2. [Instalación y Ejecución](#instalación-y-ejecución)
3. [Puntos finales - EndPoints](#endpoints)
4. [Contacto](#contacto)

## 📒Estructura del proyecto

```code 
PRUEBA-API-MARVEL/
├── src
│   ├── controllers
│   │   ├── auth-controller.js
│   │   ├── comic-controller.js
│   │   └── user-controller.js
│   ├── models
│   │   └── User.js
│   ├── routes
│   │   ├── auth.js
│   │   ├── comics.js
│   │   └── users.js
│   ├── services
│   │   ├── auth-service.js
│   │   ├── comic-service.js
│   │   └── user-service.js
│   ├── utils
│   │   ├── middlewares
│   │   │   └── auth-middleware.js
│   │   └── validators
│   ├── app.js
│   └── server.js
│├── .env
│├── .gitignore
│├── package-lock.json
│└── package.json
```
 - **src:** Contiene el código fuente principal de la aplicación.
- **controllers:** Define los controladores que manejan las solicitudes HTTP y devuelven las respuestas.

- **models:** Define los modelos de datos que representan las entidades de la aplicación.
- **routes:** Define las rutas de la API y cómo se mapean a los controladores.
- **services:** Contiene la lógica de negocio de la aplicación, como la interacción con la base de datos o la API de Marvel.
- **utils:** Contiene utilidades como middleware para autenticación.
- **app.js:** El punto de entrada de la aplicación, donde se configura el servidor Express y se cargan las rutas.
- **server.js:** Archivo adicional para iniciar el servidor.
- **.env:** Almacena las variables de entorno de la aplicación (claves API, URL de base de datos).
- **package.json:** Contiene la información del proyecto y las dependencias.

### Tecnologías Utilizadas
- **Node.js:** Entorno de ejecución de JavaScript para el lado del servidor.
- **Express.js:** Framework web para Node.js que facilita la creación de API REST.
- **Persistencia de datos:** MongoDB Atlas

## ❇️ Instalación y Ejecución

> Prerrequisitos

### Asegúrese de tener instalado

- **Node.js y npm (o yarn):** Node para ejecutar la aplicación (https://nodejs.org/) 
- **GIT:** Git para clonar el repostorio (https://git-scm.com)

### Clonar el Repositorio

Clone este repositorio en su máquina local:

```Bash
git clone https://github.com/ramos29pages/marvel-back.git
```

### Instalar Dependencias

Navegue al directorio del proyecto:

```Bash
cd prueba-api-marvel
```
instale las dependencias necesarias con el comando

```Bash
npm install
```

### Ejecutar proyecto

Cree un archivo **.env** en la raiz del proyecto y copie la siguiente configuración.


```code 
PORT=3000
MONGO_URI=mongodb+srv
JWT_SECRET=pruebaapimarvel
MARVEL_PUBLIC_KEY=52cd8eb21fd006d77
MARVEL_PRIVATE_KEY=aeff44a0481ed132c3
```
Ejecute el siguiente comando 

```Bash
node src/app.js
```

## ⚙️ Puntos Finales - Endpoints
Esta sección describe las API REST disponibles en el backend de la aplicación Marvel. Las rutas están organizadas por módulos para una mejor organización.

### Módulo de Autenticación (/auth)
- POST /login

Descripción: Inicia sesión en la aplicación.

Request body:

```code 
username (string): Nombre de usuario registrado.
password (string): identificación del usuario.
```

Respuesta Exitosa:

```bash
token (string): Token de autenticación para acceder a endpoints protegidos.
```

#### Ejemplo de petición (POST):
```Bash
curl -X POST http://localhost:3000/auth/login -H "Content-Type: application/json" -d '{"username": "usuarioEjemplo", "password": "contraseñaEjemplo"}'
```

### Módulo de Usuarios (/users)

Todos los endpoints de usuarios requieren un token de autenticación válido en la cabecera Authorization para su acceso.

- POST /register

Descripción: Registra un nuevo usuario en la aplicación.

Request body:

```bash
name (string): Nombre de usuario deseado para el registro.
email (string): Contraseña para el nuevo usuario.
id (number): Idetntificacion de usuario que servira de contraseña. 
```
Respuesta Exitosa:
```bash
message (string): Mensaje de confirmación de registro exitoso.
```

#### Ejemplo de petición (POST):
```bash
curl -X POST http://localhost:3000/users/register -H "Content-Type: application/json" -d '{"username": "usuarioNuevo", "password": "contraseñaSegura"}'
```

- GET /get-favorites (Protegido)

Descripción: Obtiene una lista de los cómics favoritos del usuario autenticado.

Respuesta Exitosa:

```bash
favorites (array): Arreglo de objetos con información de los cómics favoritos del usuario.
```

#### Ejemplo de petición (GET):
```bash
curl -X GET http://localhost:3000/users/get-favorites -H "Authorization: Bearer <token_obtenido_en_login>"
```

### Módulo de Cómics (/comics)
Todos los siguientes endpoints requieren un token de autenticación válido en la cabecera Authorization para su acceso.

- GET / (Protegido)

Descripción: Obtiene una lista de cómics disponibles.

Parámetros opcionales:
```bash
limit (number): Cantidad máxima de cómics a devolver.
skip (number): Número de cómics a omitir en la lista.
```
Respuesta Exitosa:
```bash
comics (array): Arreglo de objetos con información básica de los cómics.
```

#### Ejemplo de petición (GET):
```bash
curl -X GET http://localhost:3000/comics -H "Authorization: Bearer <token_obtenido_en_login>"
```

- GET /:comicId (Protegido)

Descripción: Obtiene información detallada de un cómic específico.

Parámetros:

```bash
comicId (string): Identificador único del cómic.
```

Respuesta Exitosa:

```bash
comic (object): Objeto con información detallada del cómic solicitado.
```
#### Ejemplo de petición (GET):
```bash
curl -X GET http://localhost:3000/comics/123456 -H "Authorization: Bearer <token_obtenido_en_login>"
```

- POST /add-favorite (Protegido)

Descripción: Agrega un cómic a la lista de favoritos del usuario autenticado.

Request body:

```bash
comicId (string): Identificador único del cómic que se quiere agregar a favoritos.
```

Respuesta Exitosa:

```bash
success (boolean): Confirmación de agregado exitoso a favoritos.
```

#### Ejemplo de petición (POST):
```bash
curl -X POST http://localhost:3000/comics/add-favorite -H "Authorization: Bearer <token_obtenido_en_login>" -H "Content-Type: application/json" -d
```


## 📲 Contacto
Si tiene alguna pregunta o sugerencia, no dude en contactarme danielramos9991@gmail.com

[Visitar portafolio web](https://danielramos.netlify.app)