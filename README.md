# Proyecto Ecommerce Básico

Este proyecto es un **ecommerce básico** desarrollado con tecnologías modernas de frontend y backend. La aplicación permite al usuario explorar productos, autenticarse, buscar y navegar por categorías.

---

## Tecnologías utilizadas

### Frontend

- **React** + **Vite** – para un entorno de desarrollo rápido y moderno.
- **Redux Toolkit** – para manejar el estado global de forma eficiente.
- **Redux Persist** – para mantener el estado del usuario incluso tras recargar.
- **RTK Query** – para gestionar las peticiones a la API de forma declarativa.
- **Sonner** – para mostrar notificaciones de éxito/error.
- **CSS Modules** – para el estilado por componente.

### Backend

- **Express** – servidor básico para autenticar usuarios.
- **bcrypt** – para el manejo de contraseñas de forma segura.
- **Axios** – para gestionar las peticiones HTTP en el backend.
- **dummyjson API** – se usa como fuente de productos, categorías, usuarios, etc.

---

## Cómo ejecutar el proyecto

### 1. Clonar el repositorio

 
```bash
git clone https://github.com/FedericoGoffi/ecommerce-redux.git
cd ecommerce-redux
```

### 2. iniciar el Backend

```bash
cd backend
npm install
npm run dev
```

### 3. iniciar el Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Autenticación

El proyecto cuenta con login. El estado de autenticación se guarda en Redux y se persiste gracias a Redux Persist. Las rutas privadas están protegidas.

---

## Funcionalidades principales

- **Ver productos**

- **Login de usuarios**

- **Carrito de compras básico**

- **Notificaciones amigables con Sonner**

- **Pantalla de detalles del producto**

---

## Próximas mejoras

- **Implementar proceso de pago**
