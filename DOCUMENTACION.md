# Documentación Técnica del Proyecto: Mini Pokédex

**Información General**
*   **Universidad:** Universidad Da Vinci de Guatemala
*   **Catedrático:** Ing. Brandon Antony Chitay Coutiño
*   **Curso:** Programación Web
*   **Estudiante:** Guillermo Mendez
*   **Fecha:** Septiembre 2025

## 1. Objetivo del Proyecto

Desarrollar una aplicación web de tipo "Pokédex" que consume la API pública [PokéAPI](https://pokeapi.co/) para mostrar información detallada de los Pokémon. El proyecto se enfoca en el uso de tecnologías web fundamentales como HTML, CSS (con metodología BEM) y JavaScript puro, sin el uso de librerías o frameworks externos.

## 2. Cumplimiento de Requerimientos

A continuación, se detalla cómo el proyecto cumple con cada uno de los requisitos solicitados.

### Requerimientos Funcionales

*   **Pantalla Inicial:**
    *   **Campo de búsqueda:** Se implementó un campo de texto (`<input class="search__input">`) que, junto a un botón, permite al usuario buscar un Pokémon por su nombre o ID. La lógica se maneja en `app.js`.
    *   **Botón de carga inicial:** El botón (`<button class="pokedex__load-more">`) ejecuta una función en `app.js` que utiliza `fetch` para cargar y renderizar los primeros 20 Pokémon de la API.

*   **Detalle del Pokémon:**
    *   Al buscar o seleccionar un Pokémon, la aplicación renderiza dinámicamente una "tarjeta" (`<article class="pokemon-card">`) que muestra:
        *   **Nombre:** Obtenido de `data.name`.
        *   **Imagen oficial:** Obtenida de `data.sprites.other['official-artwork'].front_default`.
        *   **Tipos:** Mapeados desde `data.types`, con colores distintivos por cada tipo.
        *   **Altura y Peso:** Obtenidos de `data.height` y `data.weight`.
        *   **Estadísticas Base:** Se iteran los valores de `data.stats` (HP, ataque, defensa, etc.) y se muestran en la tarjeta.

*   **Favoritos:**
    *   **Marcar/Desmarcar:** Cada tarjeta de Pokémon tiene un ícono de estrella. Al hacer clic, se activa una función que añade o remueve el ID del Pokémon de un array.
    *   **Guardado en `localStorage`:** Dicho array de favoritos se convierte a formato JSON y se guarda en `localStorage`, asegurando la persistencia de los datos entre sesiones.
    *   **Sección "Mis Favoritos":** Un botón de navegación permite filtrar la vista para mostrar únicamente los Pokémon cuyos IDs están guardados en la lista de favoritos de `localStorage`.

### Requerimientos Técnicos

*   **Fetch API:** Toda la comunicación con `https://pokeapi.co/api/v2/pokemon/` se realiza a través de la `Fetch API` de JavaScript, utilizando funciones asíncronas (`async/await`) para un manejo limpio de las promesas.
*   **Manipulación del DOM:** El contenido de la Pokédex se genera 100% en el lado del cliente. JavaScript crea, modifica y añade los elementos HTML (como las tarjetas de Pokémon) al DOM según la respuesta de la API o las acciones del usuario.
*   **Eventos en JavaScript:** Se utilizan `addEventListener` para gestionar las interacciones del usuario, como clics en los botones de búsqueda, carga, favoritos y navegación.
*   **CSS Responsivo:** El archivo `style.css` incluye una sección de Media Queries (`@media (max-width: 600px)`) que ajusta el layout, el tamaño de las fuentes y la disposición de los elementos para garantizar una correcta visualización en dispositivos móviles.
*   **Metodología BEM:** Todas las clases en el HTML y CSS siguen la convención BEM (`Bloque__Elemento--Modificador`). Ejemplos claros son `pokedex__container`, `pokemon-card__name` y `pokemon-card__favorite--active`. Esto asegura un código CSS estructurado, legible y fácil de mantener.

## 3. Estructura del Repositorio

El proyecto sigue la estructura sugerida, manteniendo la separación de responsabilidades:

*   `/pokedex`
    *   `index.html`: Contiene la estructura principal y los elementos estáticos de la página.
    *   `style.css`: Contiene todos los estilos, aplicando BEM y diseño responsivo.
    *   `app.js`: Contiene toda la lógica de la aplicación, desde el consumo de la API hasta la manipulación del DOM y el manejo de eventos.
    *   `README.md`: Documentación principal orientada al desarrollador y al portafolio.
    *   `DOCUMENTACION.md`: Este mismo archivo, con la documentación técnica para la evaluación.