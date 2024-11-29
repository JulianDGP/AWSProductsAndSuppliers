# ☁️ Gestión de Inventarios y Proveedores - Proyecto AWS

## 🎯 Objetivo General
Desarrollar una aplicación para la **gestión de inventarios y proveedores** con funcionalidades CRUD, integrando los principales servicios de **AWS** aprendidos en el curso. Estos incluyen:

- 🛠️ **Lambdas**
- 🛡️ **WAF**
- 🌐 **CloudFront**
- 📦 **Buckets de S3**
- 🔗 **Amazon API Gateway**
- 📅 **EventBridge**

Además, se implementarán despliegues de infraestructura como código con **CDK** y se explorarán otros servicios como:

- 🚀 **CodePipeline** para despliegues automáticos.
- ✉️ **SNS** para notificaciones por correo.
- 🗄️ **RDS con PostgreSQL** para la base de datos.
- 📊 **CloudWatch** para monitoreo de logs y métricas.

---

## 🎯 Objetivos Específicos

1. 🗄️ **Base de datos**: Diseñar y configurar una base de datos en **RDS** para gestionar los datos de inventarios y proveedores.
2. 🔁 **Lambdas**: Crear al menos **dos Lambdas** por microservicio para manejar operaciones CRUD.
3. 🚪 **API Gateway**: Configurar una **API Gateway** que redirija las solicitudes a las Lambdas.
4. ⚡ **Eventos automáticos**: 
   - Implementar un flujo de eventos con **EventBridge** para tareas automatizadas.
   - Configurar notificaciones mediante **SNS**.
5. 💻 **Interfaz web**: Crear una interfaz web estática alojada en un **bucket S3** y distribuida globalmente con **CloudFront**.
6. 🔒 **Seguridad**: Usar **AWS WAF** para restringir accesos según direcciones IP.
7. 📈 **Monitoreo**: Configurar **CloudWatch** para registrar métricas y logs relevantes.
8. 🛠️ **Despliegue continuo**: Implementar un pipeline **CI/CD** con **CodePipeline**.

---

## 📐 Diseño de Arquitectura
<img src="./Diagrama AWS.png" alt="Diagrama" width="100%">

---

## 🔄 Flujo y Funcionalidades Esperadas

### **📋 Gestión de Proveedores**
- ➕ Crear
- 🔍 Visualizar
- ✏️ Actualizar
- ❌ Eliminar proveedores.

### **📦 Gestión de Productos**
- ➕ Crear
- 🔍 Visualizar
- ✏️ Actualizar
- ❌ Eliminar productos.
- 🔗 Asociar productos con proveedores para trazabilidad.

### **🔔 Notificaciones**
- 📉 Configurar alertas automáticas para niveles bajos de inventario.
  - Usar **EventBridge** para manejar eventos personalizados como "stock bajo".
  - Enviar notificaciones por correo con **SNS**.
- ✉️ Automatizar el envío de correos de bienvenida al registrar un nuevo proveedor.

### **📊 Dashboard**
- Crear visualizaciones para:
  - 📈 Estadísticas de movimientos.
  - 📦 Cantidad de productos.
  - 🛒 Proveedores.

### **🛠️ Pipeline de Despliegue**
- Configurar un pipeline para despliegues automáticos en:
  - **Buckets S3** (interfaz web).
  - **Lambdas** (funcionalidades backend).

### **🔒 Acceso y Seguridad**
- Configurar **AWS WAF** para restringir el acceso únicamente desde IP colombianas (o de otro país).
- Optimizar el acceso global con un **CDN** usando **CloudFront**.

---
