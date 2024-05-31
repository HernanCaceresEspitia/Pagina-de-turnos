# Proyecto M3 - Gestión de Turnos

## User Stories

- Como usuario invitado quiero
    - Poder ver el home y sobre que trata la App
    - Poder registrarme, crear cuenta nueva
- Como usuario resgistrado quiero:
    - Poder loguearme (iniciar sesión)
    - Poder cerrar sesión
    - Poder reservar un turno
        - Elegir fecha y hora
        - No permitir dos turnos el mismo día
        - Ver horarios disponibles y días laborales
    - Poder ver mis turnos
    - Poder cancelar un turno
        - Hasta un día antes del turno
        - Recibir mensajes de confirmación antes de cancelar
    - **Extra credits** 
        - Editar turno
        - Agregar foto de perfil (Cloudinary)
        - Recibir email de confirmación (Nodemailer)
        - Modificar mis datas
        - Recuperar contraseña
        - Recuperar usuario
        - Usuario Admministrador
        - Envío de información por email y recordatorios
        - Eliminar usuario
        - Permitir dejar reseñas y calificación
- **ACLARACIONES**
    - No manejamos stock
    - Slots de media hora

## UX/UI

- Temática de  nuestra App
- Home con información de la APP
- Redireccionamiento automático luego del login
- Mostrar visualmente horarios y fechas disponibles
- Formularios: 
    - Mostrar errores en tiempo real y tipos de datos esperados
    - Intuitivo y nos muestre los pasos
    - Que no se resetee
    - Seguridad de contraseña
    - Deshabilitar botón hasta completar todo
    - Despliegue de calendario para seleccionar turno
- **Extra credit:**
    - Responsive
    - Dark mode

## Modelo Entidad/Relación

- Usuarios
    - Nombre: *string*
    - Email: *string*
    - Teléfono: *string*
    - **Extra credit**: 
        - Foto de perfil: *string*
- Credenciales
    - id
    - usuario: *number*
    - password: *string*
- Turnos
    - id
    - Fecha y hora: *Date / string*
    - Descripción: *string*
    - Estado: *active | cancelled*
- **Extra Credit**
    - Servicios

- Relaciones:
    - Usuarios 1:1 Credenciales
    - Usuarios 1:N Turnos
    - Turno    N:1 Usuarios


