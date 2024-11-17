# Documentación de Vistas - DuckZone

## Índice 📑
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

## Componentes comunes en las vistas 🔧
En todas las vistas se poseerá una barra de navegación en la que se tienen acceso directo a las vistas de mayor importancia como la página de inicio, reglas, ranking y temas de sesión. Cuando la sesión no está iniciada, se muestra un hipervínculo al inicio de sesión, mientras que si uno ya posee una sesión iniciada, se muestra el perfil y una opción para cerrar sesión.
Un componente relevante común en múltiples vistas son los toasts. Estos son popups que permiten visualizar cuando uno cierra sesión, el proceso de cargado de salas, entre otros. Estos últimos facilitan la visualización por el usuario.

## Página principal 🏠
### Descripción
La página principal es la página principal de DuckZone. Aquí los usuarios pueden obtener una visión general del juego y sus características. Desde esta se puede acceder a la barra de navegación, un acceso directo a jugar en el botón de "juguemos" e información relevante de manera resumida en un slider que lleva a páginas como las reglas del juego o el acerca de nosotros.

### Componentes
- **Banner Principal**: Muestra el nombre y el logo del juego.
- **Descripción del Juego**: Breve descripción de DuckZone.
- **Slider de Navegación**: Acceso rápido a otras secciones como About Us, Cómo Jugar, etc.

### Funcionalidades
- Navegación a otras secciones del sitio.
- Información introductoria sobre el juego.

## Acerca de nosotros 👥
### Descripción
La vista de "Nosotros" proporciona información sobre el equipo detrás de DuckZone y la historia del juego. Esta es una vista provisional que posee información introductoria, los nombres de los desarrolladores y nuestros usuarios de github.

### Componentes
- **Historia del equipo**: Información sobre la creación y evolución de DuckZone.
- **Información del Equipo**: Detalles sobre los desarrolladores y usuarios de git.

### Funcionalidades
- Visualización de la información del equipo y la historia del juego.

## Cómo Jugar 🎮
### Descripción
La vista de Cómo Jugar explica las reglas y mecánicas del juego DuckZone.

### Componentes
- **Objetivo del Juego**: Instrucciones detalladas sobre qué trata el juego y cómo ganar.
- **Componentes del Juego**: Explicación de las cartas de cada jugador y la descripción de las mismas.
- **Desarrollo del Juego**: Instrucciones detalladas sobre cómo jugar, el desarrollo de cada ronda y como se evaluan los turnos.
- **Evento Especial**: Explicación del evento especial posible.
- **Fin del Juego**: Explicación de en qué momento finaliza el juego.
- **Esquema de Tipos**: Esquema de los elementos posibles en cada carta y cuales son más efectivos ante otros.

### Funcionalidades
- Proveer información educativa sobre el juego.
- Ayudar a los jugadores a entender las reglas y mejorar su desempeño.

## Ranking 🏆
### Descripción
La vista de Ranking muestra las clasificaciones de los jugadores en DuckZone.

### Componentes
- **Tabla de Clasificación**: Lista de jugadores ordenados por su puntuación.
- **Botón de cargar más**: Permite cargar más páginas para ver más posicionados en el top.

### Funcionalidades
- Visualización de las clasificaciones de los mejores jugadores.

## Login 🔑
### Descripción
La vista de Login permite a los usuarios acceder a sus cuentas de DuckZone.

### Componentes
- **Formulario de Login**: Campos para ingresar el nombre de usuario y la contraseña.
- **Hipervínculo de Sign up**: Link que redirije a la vista de registro de usuarios nuevos.

### Funcionalidades
- Autenticación de usuarios.
- Acceso a la cuenta del usuario.

## Sign Up ✍️
### Descripción
La vista de Sign Up permite a los nuevos usuarios registrarse en DuckZone.

### Componentes
- **Formulario de Registro**: Campos para ingresar la información necesaria para crear una cuenta.

### Funcionalidades
- Registro de nuevos usuarios.
- Creación de cuentas de usuario.

## Perfil 👤
### Descripción
La vista de perfil permite a los usuarios ver y editar su información personal.

### Componentes
- **Información Personal**: Muestra la información del usuario.
- **Hipervínculo de editar perfil**: Link preliminar para una vista a ser implementada en la que se podrán modificar los datos de usuario.
- **Hipervínculo de volver al inicio**: Link para volver a la página principal.

### Funcionalidades
- Edición de información personal.
- Visualización de información personal

## Partidas 🎲
### Descripción
La vista de Partidas permite a los usuarios ver y gestionar sus partidas en DuckZone.

### Componentes
- **Lista de Partidas**: Muestra las partidas activas y finalizadas del usuario.
- **Botón de Nueva Partida**: Permite iniciar una nueva partida.
- **Detalles de Partida**: Información detallada sobre cada partida seleccionada.

### Funcionalidades
- Gestión de partidas activas y finalizadas.
- Inicio de nuevas partidas.
- Visualización de detalles de partidas.

## Tablero 🎯
### Descripción
La vista de Tablero permite a los usuarios jugar sus partidas en DuckZone.

### Componentes
- **Maná del Jugador**: Muestra la cantidad de maná disponible para el jugador.
- **Vida del Jugador**: Muestra la cantidad de vida restante del jugador.
- **Cartas del Jugador**: Muestra las 5 cartas en mano del jugador.
- **Zona de Juego**: Área donde se juegan las cartas.

### Funcionalidades
- Gestión de maná y vida del jugador.
- Visualización y uso de cartas en mano.
- Interacción con la zona de juego.