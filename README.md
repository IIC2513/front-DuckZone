# DuckZone 🦆

## Descripción

DuckZone es un juego estratégico de cartas donde los jugadores compiten utilizando cartas de patos. Este proyecto está desarrollado con React y utiliza diversas herramientas y bibliotecas para su funcionamiento.

## Herramientas Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **Vite**: Herramienta de construcción rápida para proyectos de frontend.
- **Axios**: Cliente HTTP basado en promesas para realizar solicitudes a la API.
- **Socket.io-client**: Biblioteca para la comunicación en tiempo real entre el cliente y el servidor.
- **React Router**: Biblioteca para el manejo de rutas en aplicaciones React.
- **MUI (Material-UI)**: Biblioteca de componentes de interfaz de usuario para React.
- **ESLint**: Herramienta de análisis estático para identificar y reportar patrones en el código JavaScript.
- **Slick Carousel**: Biblioteca para crear sliders en React.

## Pasos para Ejecutar la Aplicación

### Prerrequisitos

Asegúrate de tener instalados los siguientes programas:

- Node.js (versión 14 o superior)
- npm (versión 6 o superior)

### Instalación

1. Clona el repositorio:

    ```sh
    git clone https://github.com/IIC2513/front-DuckZone.git
    git clone https://github.com/IIC2513/back-DuckZone.git
    cd front-DuckZone
    ```

2. Instala las dependencias:

    ```sh
    npm install
    ```

### Configuración

1. Crea un archivo `.env` en la raíz del proyecto y agrega las variables de entorno necesarias. En caso de probarlo local,

    ```env
    VITE_BACKEND_URL=http://localhost:5000
    ```
    Y en caso de definirlo para el deploy,

    ```env
    VITE_BACKEND_URL="https://back-duckzone.onrender.com"
    ```


### Ejecución

1. Inicia el servidor de desarrollo:

    ```sh
    yarn dev
    ```

2. Abre tu navegador y navega a `http://localhost:3000` para ver la aplicación en funcionamiento.

### Construcción para Producción

1. En producción, se usan comandos personalizados en el back. En el caso del back, se usa,

    ```sh
    yarn deploy
    yarn start
    ```

### Linting

1. Ejecuta ESLint para analizar el código:

    ```sh
    npm run lint
    ```



## Documentación de Vistas

### Índice de vistas 📑
1. [Componentes comunes ](#componentes-comunes-en-las-vistas-) 
2. [Página principal ](#página-principal) 
3. [Acerca de nosotros ](#acerca-de-nosotros) 
4. [Cómo Jugar ](#cómo-jugar)
5. [Ranking ](#ranking)
6. [Login ](#login)
7. [Sign Up ](#sign-up)
8. [Perfil ](#perfil)
9. [Partidas](#partidas)
10. [Tablero](#tablero)
11. [Análisis de Reportes](#análisis-de-reportes)
12. [Nuevo Reporte](#nuevo-reporte)
14. [Editar Perfil](#editar-perfil)
16. [Lista de Usuarios](#lista-de-usuarios)

### Componentes comunes en las vistas 🔧
En todas las vistas se poseerá una barra de navegación en la que se tienen acceso directo a las vistas de mayor importancia como la página de inicio, reglas, ranking y temas de sesión. Cuando la sesión no está iniciada, se muestra un hipervínculo al inicio de sesión, mientras que si uno ya posee una sesión iniciada, se muestra el perfil y una opción para cerrar sesión.
Un componente relevante común en múltiples vistas son los toasts. Estos son popups que permiten visualizar cuando uno cierra sesión, el proceso de cargado de salas, entre otros. Estos últimos facilitan la visualización por el usuario.

### Página principal 🏠
#### Descripción
La página principal es la página principal de DuckZone. Aquí los usuarios pueden obtener una visión general del juego y sus características. Desde esta se puede acceder a la barra de navegación, un acceso directo a jugar en el botón de "juguemos" e información relevante de manera resumida en un slider que lleva a páginas como las reglas del juego o el acerca de nosotros.

#### Componentes
- **Banner Principal**: Muestra el nombre y el logo del juego.
- **Descripción del Juego**: Breve descripción de DuckZone.
- **Slider de Navegación**: Acceso rápido a otras secciones como About Us, Cómo Jugar, etc.

#### Funcionalidades
- Navegación a otras secciones del sitio.
- Información introductoria sobre el juego.

### Acerca de nosotros 👥
#### Descripción
La vista de "Nosotros" proporciona información sobre el equipo detrás de DuckZone y la historia del juego. Esta es una vista provisional que posee información introductoria, los nombres de los desarrolladores y nuestros usuarios de github.

#### Componentes
- **Historia del equipo**: Información sobre la creación y evolución de DuckZone.
- **Información del Equipo**: Detalles sobre los desarrolladores y usuarios de git.

#### Funcionalidades
- Visualización de la información del equipo y la historia del juego.

### Cómo Jugar 🎮
#### Descripción
La vista de Cómo Jugar explica las reglas y mecánicas del juego DuckZone.

#### Componentes
- **Objetivo del Juego**: Instrucciones detalladas sobre qué trata el juego y cómo ganar.
- **Componentes del Juego**: Explicación de las cartas de cada jugador y la descripción de las mismas.
- **Desarrollo del Juego**: Instrucciones detalladas sobre cómo jugar, el desarrollo de cada ronda y como se evaluan los turnos.
- **Evento Especial**: Explicación del evento especial posible.
- **Fin del Juego**: Explicación de en qué momento finaliza el juego.
- **Esquema de Tipos**: Esquema de los elementos posibles en cada carta y cuales son más efectivos ante otros.

#### Funcionalidades
- Proveer información educativa sobre el juego.
- Ayudar a los jugadores a entender las reglas y mejorar su desempeño.

### Ranking 🏆
#### Descripción
La vista de Ranking muestra las clasificaciones de los jugadores en DuckZone.

#### Componentes
- **Tabla de Clasificación**: Lista de jugadores ordenados por su puntuación.
- **Botón de cargar más**: Permite cargar más páginas para ver más posicionados en el top.

#### Funcionalidades
- Visualización de las clasificaciones de los mejores jugadores.

### Login 🔑
#### Descripción
La vista de Login permite a los usuarios acceder a sus cuentas de DuckZone.

#### Componentes
- **Formulario de Login**: Campos para ingresar el nombre de usuario y la contraseña.
- **Hipervínculo de Sign up**: Link que redirije a la vista de registro de usuarios nuevos.

#### Funcionalidades
- Autenticación de usuarios.
- Acceso a la cuenta del usuario.

### Sign Up ✍️
#### Descripción
La vista de Sign Up permite a los nuevos usuarios registrarse en DuckZone.

#### Componentes
- **Formulario de Registro**: Campos para ingresar la información necesaria para crear una cuenta.

#### Funcionalidades
- Registro de nuevos usuarios.
- Creación de cuentas de usuario.

### Perfil 👤
#### Descripción
La vista de perfil permite a los usuarios ver y editar su información personal.

#### Componentes
- **Información Personal**: Muestra la información del usuario.
- **Hipervínculo de editar perfil**: Link  para una vista en la que se podrán modificar los datos de usuario.
- **Hipervínculo de volver al inicio**: Link para volver a la página principal.

#### Funcionalidades
- Edición de información personal.
- Visualización de información personal

### Partidas 🎲
#### Descripción
La vista de Partidas permite a los usuarios ver y gestionar sus partidas en DuckZone.

#### Componentes
- **Lista de Partidas**: Muestra las partidas activas y finalizadas del usuario.
- **Botón de Nueva Partida**: Permite iniciar una nueva partida.
- **Detalles de Partida**: Información detallada sobre cada partida seleccionada.

#### Funcionalidades
- Gestión de partidas activas y finalizadas.
- Inicio de nuevas partidas.
- Visualización de detalles de partidas.

### Tablero 🎯
#### Descripción
La vista de Tablero permite a los usuarios jugar sus partidas en DuckZone.

#### Componentes
- **Maná del Jugador**: Muestra la cantidad de maná disponible para el jugador.
- **Vida del Jugador**: Muestra la cantidad de vida restante del jugador.
- **Cartas del Jugador**: Muestra las 5 cartas en mano del jugador.
- **Zona de Juego**: Área donde se juegan las cartas.

#### Funcionalidades
- Gestión de maná y vida del jugador.
- Visualización y uso de cartas en mano.
- Interacción con la zona de juego.

### Análisis de Reportes 📝
#### Descripción
La vista de Análisis de Reportes permite a los administradores revisar y gestionar los reportes de los usuarios.

#### Componentes
- **Detalles del Reporte**: Muestra la información detallada del reporte, incluyendo la víctima, el reportado, el estado y la descripción.
- **Botón de Marcar como Revisado**: Permite a los administradores marcar el reporte como revisado.
- **Estado del Reporte**: Indica si el reporte ha sido revisado o no.

#### Funcionalidades
- Visualización de detalles de reportes.
- Gestión del estado de los reportes.
- Marcado de reportes como revisados por los administradores.

### Nuevo Reporte 📝
#### Descripción
La vista de Nuevo Reporte permite a los usuarios reportar a otros jugadores.

#### Componentes
- **Formulario de Reporte**: Campos para ingresar la descripción del reporte.
- **Botón de Enviar Reporte**: Permite enviar el reporte al backend.
- **Información del Reportado**: Muestra el nombre del usuario reportado.

#### Funcionalidades
- Envío de reportes de usuarios.
- Visualización de la información del usuario reportado.


### Editar Perfil ✏️
#### Descripción
La vista de Editar Perfil permite a los usuarios modificar su información personal.

#### Componentes
- **Formulario de Edición**: Campos para editar la información del usuario.
- **Botón de Guardar Cambios**: Permite guardar los cambios realizados en la información del usuario.
- **Botón de Cancelar**: Permite cancelar la edición y volver al perfil.

#### Funcionalidades
- Edición de la información personal del usuario.
- Guardado de cambios en la información del usuario.
- Cancelación de la edición y regreso al perfil.

### Lista de Usuarios 👥
#### Descripción
La vista de Lista de Usuarios permite a los administradores ver y gestionar los usuarios de DuckZone.

#### Componentes
- **Lista de Usuarios**: Muestra una lista de usuarios con su estado y cantidad de reportes.
- **Botón de Suspender/Activar Cuenta**: Permite a los administradores suspender o activar la cuenta de un usuario.

#### Funcionalidades
- Visualización de la lista de usuarios.
- Suspensión y activación de cuentas de usuario.

## Agradecimientos

Sabemos que probablemente nadie va a leer esto, pero igual. Gracias por hacer que el semestre fuera un poco más entrete aunque luchamos mucho. Perdón por que nuestra página funcione medio funky pero es lo que pudimos hacer con todo el cariño del mundo. Gracias<3