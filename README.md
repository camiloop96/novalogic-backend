# 🚀 Novalogic – Plataforma de Gestión para Negocios Inteligentes

> 🏪 Multi-tenant | 🧾 Ventas & Pedidos | 📦 Inventario | 📊 Reportes | 🔐 Seguridad

Novalogic es una plataforma todo-en-uno diseñada para ayudar a pequeñas y medianas empresas a gestionar sus operaciones de forma eficiente y escalable. Ideal para tiendas físicas, ecommerce, franquicias o negocios con múltiples sucursales.

---

## ✨ Características principales

### 🔐 Seguridad y control de acceso

- Gestión de usuarios y roles por tenant (empresa)
- Inicio de sesión seguro y control de sesiones
- Arquitectura multi-tenant con aislamiento lógico por negocio

### 🏪 Gestión empresarial (Tenant)

- Información legal, contactos y representantes
- Soporte para múltiples tiendas por empresa
- Personalización de logo, slug y estado de actividad

### 👥 Clientes y direcciones

- Registro y administración de clientes
- Múltiples direcciones por cliente con control de dirección principal
- Información de contacto, documentos y notas internas

### 🛍️ Catálogo de productos

- Productos con SKU, descripción, imagen y categoría
- Control de estado y sincronización multicanal
- Relación con inventario y precios administrables

### 📦 Inventario y asignaciones

- Control de stock por producto
- Asignación de inventario por canal (POS, Ecommerce, etc.)
- Gestión por almacén y porcentaje de asignación

### 🛒 Órdenes y ventas

- Creación de pedidos con múltiples productos
- Registro de tienda, cliente y estado de la orden
- Relación directa con pagos y envíos

### 💳 Pagos e integraciones

- Soporte para múltiples métodos de pago (efectivo, transferencia, etc.)
- Verificación de pagos y referencias externas
- Control de montos, moneda y estados de pago

### 🚚 Envíos y logística

- Métodos de envío personalizables
- Integración con direcciones de clientes y seguimiento de órdenes
- Gestión de tiempos estimados y precios de envío

---

## 🛠️ Instalación y uso

### Prerequisitos

- Node.js v14 o superior
- PostgreSQL 12 o superior

### Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/novalogic/novalogic-app.git
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura tu archivo `.env` con las credenciales de tu base de datos y otras configuraciones necesarias.
4. Ejecuta las migraciones de la base de datos:
   ```bash
   npm run migrate
   ```

### Iniciar la aplicación

```bash
npm run start:dev
```

---

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si tienes alguna sugerencia o mejora, por favor abre un _issue_ o envía un _pull request_.

---

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

## 🌐 Contacto

- Sitio web: [www.novalogic.com](http://www.novalogic.com)
- Soporte: support@novalogic.com
