@ -1,43 +0,0 @@
# GestionHR
Sistema destinado al departamento de Recursos Humanos, diseñado principalmente para poder manejar y optimizar la gestión de los empleados dentro de la organización. Ofrece herramientas las cuales permite actualizar los datos personales y laborales de los mismos, así como la gestión de programas de capacitación. Además, permite al usuario externo postularse a vacantes laborales disponibles. Con estas funcionalidades, el área de Recursos Humanos podrá mejorar los procesos de análisis, y la toma de decisiones.

---------

## Guía de Instalación

- **Clonar Repositorio**: Se debe clonar el repositorio desde GitHub:
```
https://github.com/MirkoDinamarca/GestionHR.git
```

- **Navegar al Directorio**: Se debe ingresar al directorio del proyecto:
```
cd GestionHR
```

- **Navegar a la carpeta frontend**: Dentro, se debe instalar las dependencias de Node:
```
npm install
```

- **Navegar a la carpeta backend**: Dentro, se debe instalar las dependencias de Composer:
```
composer install
```

- **Configurar entorno .env**: Instalar dependencias de Composer
```
cp .env.example .env
```
Abrir el archivo .env generado y configurar las variables de entorno (Si es que hay conexión con la base de datos).

- **Generar la compilación del frontend**: Es mejor ejecutar este comando si se desea escuchar los cambios en tiempo real.
```
npm run dev
```

- **Iniciar el Servidor de Desarrollo**:
```
php artisan serve
```
IMPORTANTE - Ambos comandos tienen que estar ejecutados en paralelo.