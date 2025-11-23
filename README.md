# Aplicación móvil para registro de mediciones de agua

Esta es una aplicación móvil desarrollada en Ionic + Angular, diseñada para que los medidores del Distrito Metropolitano de Quito puedan registrar lecturas de medidores de agua de forma digital, rápida y verificable.

La app permite registrar:

📸 Fotografía del medidor

🏠 Foto de la fachada

📍 Ubicación GPS automática

🔢 Valor de la lectura

📝 Observaciones

🌍 Enlace directo a Google Maps para validar el punto donde se realizó la medición

Todos los datos se almacenan en Supabase (Auth, Database y Storage).

## Perfiles del sistema
🔹 Administrador

Puede ver todas las lecturas registradas.Accede al panel /admin.Puede revisar fotos, coordenadas y enlaces a mapas.

🔹 Medidor

Puede registrar nuevas lecturas.Solo puede ver sus propias mediciones.Accede a /home.
 
# Credenciales de prueba

🧑‍💼 Administrador

email: admin@agua.gob
password: admin123

👷 Medidor
email: medidor1@agua.gob
password: medidor123

##Tecnologías utilizadas

Ionic + Angular (Frontend)

Supabase Auth (usuarios y roles)

Supabase Storage (fotos)

Supabase Database (lecturas)

Capacitor Camera

Capacitor Geolocation

🗄 Estructura básica de la aplicación
src/
 ├── pages/
 │    ├── login/
 │    ├── home/
 │    ├── admin/
 │    ├── nueva-lectura/
 ├── services/
 │    ├── auth.service.ts
 │    ├── lecturas.service.ts
 │    ├── camera.service.ts
 │    ├── gps.service.ts
 │    └── supabase.service.ts




