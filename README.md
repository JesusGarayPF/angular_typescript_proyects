# GifsApp - Buscador de GIFs con Angular

Una aplicación moderna y eficiente para buscar y coleccionar tus GIFs favoritos, integrada directamente con la **API de Giphy**. Este proyecto demuestra el uso de tecnologías de vanguardia en el ecosistema Angular para ofrecer una experiencia de usuario fluida y reactiva.

---

##  Funcionalidades Clave

- **Búsqueda en tiempo real**: Encuentra GIFs de cualquier temática de forma instantánea.
- **Historial de búsquedas**: Sidebar dinámico que almacena tus últimas búsquedas para un acceso rápido.
- **Persistencia con LocalStorage**: Tu historial se mantiene intacto incluso si recargas la página o cierras el navegador.
- **Trending Gifs**: Descubre lo más popular del momento automáticamente al iniciar la aplicación.
- **Carga Optimizada**: Gestión eficiente de imágenes para una navegación rápida.

##  Construcción de la UI

La interfaz ha sido diseñada para ser minimalista, elegante y 100% funcional:

- **Framework de Estilos**: Se ha utilizado **Tailwind CSS v4**, aprovechando su sistema de diseño basado en utilidades para crear una interfaz limpia y responsive.
- **Componentes Modulares**: Estructura dividida en componentes reutilizables (`Sidebar`, `Card`, `GifsList`) siguiendo las mejores prácticas de Angular.
- **Experiencia de Usuario**: Uso de transiciones suaves y un layout de rejilla (Grid) que se adapta perfectamente a dispositivos móviles y escritorio.

##  Tecnologías y Servicios Externos

Para este proyecto, se han integrado las siguientes herramientas:

- **Angular (v20)**: Utilizando **Signals** para una gestión de estado reactiva y eficiente.
- **Giphy API**: Servicio externo principal para el consumo de datos multimedia mediante `HttpClient`.
- **TypeScript**: Tipado estricto para asegurar un código robusto y mantenible.
- **RxJS**: Manejo de flujos de datos asíncronos para las peticiones a la API.

## Galería de imágenes  

<img width="1918" height="975" alt="1- Trending" src="https://github.com/user-attachments/assets/ad3e87d5-9a08-41f0-bd77-7cfc2b412c9d" />  
<img width="1918" height="975" alt="2 - Search" src="https://github.com/user-attachments/assets/f0928bc5-00fd-4a18-a7ef-152c8d3f2af8" />  
<img width="1918" height="971" alt="3 - Historial" src="https://github.com/user-attachments/assets/7a7319da-57a5-4d88-a519-4a48215ccc15" />  

##  Guía de Ejecución

Sigue estos pasos para ejecutar el proyecto en tu máquina local:

### 1. Requisitos Previos
Asegúrate de tener instalado [Node.js](https://nodejs.org/) y el Angular CLI.

### 2. Instalación
Clona el repositorio y navega hasta la carpeta del proyecto:
```bash
git clone https://github.com/tu-usuario/02-gifs-app.git
cd 02-gifs-app
```
Instala las dependencias necesarias:
```bash
npm install
```

### 3. Ejecución
Inicia el servidor de desarrollo:
```bash
npm start
```
Abre tu navegador en `http://localhost:4200` para ver la aplicación funcionando.

## Contacto

Para cualquier consulta o contacto:

**Jesús Garay Franco**  
LinkedIn: https://www.linkedin.com/in/jesus-garay-franco/  
Email: jesus.garay.f@gmail.com

