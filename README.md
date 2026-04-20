# Jandy Tours - Tu Aventura Premium en Venezuela 🌴⛰️

¡Bienvenido al repositorio de **Jandy Tours**! Una plataforma web moderna, rápida y visualmente impactante diseñada para ofrecer la mejor experiencia de usuario en la búsqueda y reserva de paquetes turísticos en Venezuela.

## 🚀 Descripción del Proyecto

Este proyecto es una **Landing Page Premium** de Single Page Application (SPA) construida con **React** y **Vite**. La web permite a los usuarios explorar destinos emblemáticos (Canaima, Los Roques, Roraima), gestionar un carrito de compras, guardar favoritos y optimizar su visibilidad en buscadores mediante SEO dinámico.

---

## 🛠️ Tecnologías Utilizadas

- **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/) (para un desarrollo ultra rápido).
- **Estilos**: [Tailwind CSS 4](https://tailwindcss.com/) para un diseño responsive y moderno.
- **Animaciones**: [Framer Motion](https://www.framer.com/motion/) para transiciones suaves y micro-interacciones.
- **Iconografía**: [Lucide React](https://lucide.dev/).
- **SEO**: [React Helmet Async](https://github.com/staylor/react-helmet-async).
- **Gestión de Estado**: React Context API.
- **Navegación**: [React Router Dom 7](https://reactrouter.com/).

---

## 📂 Estructura del Código

La carpeta `src` está organizada siguiendo las mejores prácticas de modularidad:

```text
src/
├── assets/           # Imágenes, vectores y recursos multimedia.
├── components/       # Componentes de UI reutilizables y atómicos.
│   ├── Hero.jsx      # Banner principal interactivo.
│   ├── CartDrawer.jsx # Lógica y UI del carrito lateral.
│   ├── SEO.jsx       # Componente para meta-tags dinámicos.
│   └── ...           # Navbar, Footer, Newsletter, etc.
├── context/          # Capa de estado global (Context API).
│   ├── AuthContext.js # Lógica de sesión de usuario.
│   ├── CartContext.js # Gestión del carrito de compras.
│   └── FavoritesContext.js # Gestión de la lista de deseos.
├── data/             # Archivos de datos estáticos (tours.js).
├── pages/            # Vistas principales de la aplicación (Routes).
│   ├── Home.jsx      # Página de inicio con secciones destacadas.
│   ├── DestinationsPage.jsx # Catálogo de destinos.
│   ├── TourDetailsPage.jsx # Detalles, itinerarios y precios de cada tour.
│   └── ...           # Contacto, Nosotros, Login, Favoritos.
├── App.jsx           # Configurador de rutas y proveedores globales.
├── main.jsx          # Punto de entrada de la aplicación.
└── index.css         # Configuraciones globales de Tailwind CSS.
```

---

## 🧩 Funcionalidades Clave

1. **Gestión de Carrito (CartDrawer)**: Permite agregar tours, modificar cantidades y ver el total a pagar en tiempo real. Se sincroniza globalmente mediante `CartContext`.
2. **Sistema de Favoritos**: Mejora el engagement permitiendo a los usuarios guardar los destinos que desean visitar más tarde.
3. **Optimización de Imágenes**: Uso de carga perezosa (Lazy Loading) y componentes optimizados para reducir el tiempo de carga.
4. **SEO Dinámico**: Cada página cambia sus meta-etiquetas (título, descripción, imagen social) según el contenido que visualiza el usuario.
5. **Navegación Móvil (Tab Bar)**: Una barra de navegación inferior optimizada para la experiencia móvil, similar a las apps nativas.

---

## 🧠 Lógica y Arquitectura

### 1. Flujo de Datos
La aplicación utiliza la **Context API** para evitar el "prop drilling". 
- El `CartContext` maneja la lógica de adición/remoción y persistencia (vía local storage) de los paquetes.
- Los datos de los tours provienen de `src/data/tours.js`, actuando como una fuente de verdad única para evitar inconsistencias de precios o descripciones.

### 2. Enrutamiento Inteligente
Usamos `react-router-dom` con **Suspense** y **Lazy Loading** en `App.jsx`. Esto significa que el navegador solo descarga el código de la página que el usuario está viendo actualmente, mejorando drásticamente el rendimiento inicial.

### 3. Animaciones de Interfaz
Se ha implementado `Framer Motion` para crear efectos de:
- **Fade-in** al hacer scroll.
- **Micro-interacciones** al pasar el cursor (hover) por las tarjetas.
- **Transiciones de página** fluidas para evitar el "salto" brusco entre vistas.

---

## ⚙️ Instalación y Desarrollo

Para ejecutar este proyecto en tu máquina local:

1. **Clona el repositorio**:
   ```bash
   git clone [URL-DEL-REPO]
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. **Entra en el navegador**:
   Visita `http://localhost:3000`

---

---

## ☁️ Despliegue en Vercel

Este proyecto está optimizado para ser desplegado en **Vercel** de forma sencilla:

1. **Conexión con GitHub**: Vercel se conecta directamente a este repositorio.
2. **CI/CD Automático**: Cada vez que realices un `git push` a la rama principal (`main` o `master`), Vercel detectará el cambio y generará una nueva versión de producción automáticamente.
3. **Configuración de Vite**: No es necesario realizar configuraciones adicionales; el archivo `vercel.json` o la configuración automática de Vercel reconocerá el comando `npm run build` y la carpeta de salida `dist`.

---

## 🔄 Gestión de Contenido y Cambios Futuros

Si necesitas actualizar el contenido de la página, aquí tienes una guía rápida:

### 1. Actualizar el Catálogo de Tours
Para cambiar precios, descripciones de destinos o imágenes de los paquetes turísticos:
- Dirígete a `src/data/tours.js`.
- Modifica el objeto del tour correspondiente. Los cambios se reflejarán inmediatamente en la `DestinationsPage` y en `TourDetailsPage`.

### 2. Cambios en la Interfaz (UI)
- **Logos y Colores**: Revisa `tailwind.config.js` para los colores de marca y `src/components/Navbar.jsx` para el logo.
- **Secciones de la Home**: Cada sección (Hero, Testimonials, WhyUs, etc.) vive en su propio archivo dentro de `src/components/`.
- **Textos de Preguntas Frecuentes**: Se encuentran dentro de `src/components/ContactFAQ.jsx`.

### 3. Procedimiento para cambios:
1. Realiza los cambios en tu código local.
2. Verifica los cambios con `npm run dev`.
3. Haz commit y sube los cambios: `git add .`, `git commit -m "Descripción del cambio"`, `git push`.
4. Vercel desplegará los cambios en cuestión de segundos.

---

## ✒️ Créditos

Proyecto desarrollado por el equipo de **Viajes Landing**. Enfocado en transformar el turismo convencional en experiencias digitales de alta gama.
