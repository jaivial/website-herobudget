# Guía de Despliegue - Hero Budget Website

Esta guía te ayudará a desplegar la página web de Hero Budget en tu VPS usando nginx.

## 🚀 Pasos de Despliegue

### 1. Preparar los archivos
Sube todos los archivos de la carpeta `website-herobudget/` a tu VPS:

```bash
# En tu máquina local, desde la carpeta website-herobudget
scp -r . usuario@tu-servidor.com:/var/www/herobudget/
```

O usando SFTP/rsync según tu preferencia.

### 2. Estructura en el servidor
Los archivos deben quedar así en tu VPS:
```
/var/www/herobudget/
├── index.html
├── privacidad.html
├── soporte.html
├── styles.css
└── DEPLOYMENT_GUIDE.md
```

### 3. Permisos correctos
```bash
# Conectarse al VPS
ssh usuario@tu-servidor.com

# Establecer permisos correctos
sudo chown -R www-data:www-data /var/www/herobudget
sudo chmod -R 755 /var/www/herobudget
```

### 4. Configuración de nginx

Crea o edita el archivo de configuración para tu subdominio:

```bash
sudo nano /etc/nginx/sites-available/herobudget.jaimedigitalstudio.com
```

**Contenido del archivo nginx:**

```nginx
server {
    listen 80;
    listen [::]:80;
    
    server_name herobudget.jaimedigitalstudio.com;
    root /var/www/herobudget;
    index index.html;

    # Configuración de seguridad básica
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;
    add_header Content-Security-Policy "default-src 'self' http: https: data: blob: 'unsafe-inline'" always;

    # Configuración de archivos estáticos
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
        try_files $uri =404;
    }

    # Configuración principal
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Configuración específica para política de privacidad
    location /privacidad {
        try_files /privacidad.html =404;
    }

    location /soporte {
        try_files /soporte.html =404;
    }

    # Manejo de errores
    error_page 404 /index.html;
    
    # Logs
    access_log /var/log/nginx/herobudget_access.log;
    error_log /var/log/nginx/herobudget_error.log;

    # Compresión gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied expired no-cache no-store private must-revalidate auth;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
}
```

### 5. Habilitar el sitio

```bash
# Crear enlace simbólico
sudo ln -s /etc/nginx/sites-available/herobudget.jaimedigitalstudio.com /etc/nginx/sites-enabled/

# Verificar configuración de nginx
sudo nginx -t

# Si todo está bien, recargar nginx
sudo systemctl reload nginx
```

### 6. Configurar SSL (Recomendado)

```bash
# Instalar certbot si no lo tienes
sudo apt update
sudo apt install certbot python3-certbot-nginx

# Obtener certificado SSL
sudo certbot --nginx -d herobudget.jaimedigitalstudio.com

# Verificar renovación automática
sudo certbot renew --dry-run
```

### 7. Verificar DNS

Asegúrate de que tu DNS apunte al VPS:
```
A record: herobudget.jaimedigitalstudio.com -> IP_DE_TU_VPS
```

## 🔧 Configuración Adicional para HTTPS (Post-SSL)

Después de instalar SSL, nginx actualizará automáticamente la configuración, pero puedes optimizarla:

```nginx
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    
    server_name herobudget.jaimedigitalstudio.com;
    root /var/www/herobudget;
    index index.html;

    # Certificados SSL (gestionados por certbot)
    ssl_certificate /etc/letsencrypt/live/herobudget.jaimedigitalstudio.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/herobudget.jaimedigitalstudio.com/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Configuración de seguridad mejorada
    add_header Strict-Transport-Security "max-age=31536000" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header X-Content-Type-Options "nosniff" always;

    # Resto de configuración igual...
    location / {
        try_files $uri $uri/ /index.html;
    }

    location /privacidad {
        try_files /privacidad.html =404;
    }

    location /soporte {
        try_files /soporte.html =404;
    }
}

# Redirigir HTTP a HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name herobudget.jaimedigitalstudio.com;
    return 301 https://$server_name$request_uri;
}
```

## 📋 URLs para App Store Connect

Una vez desplegado, usa estas URLs en App Store Connect:

- **URL de Política de Privacidad:**
  ```
  https://herobudget.jaimedigitalstudio.com/privacidad
  ```

- **URL de Soporte:**
  ```
  https://herobudget.jaimedigitalstudio.com/soporte
  ```

- **URL de Marketing (opcional):**
  ```
  https://herobudget.jaimedigitalstudio.com
  ```

## ✅ Verificación del Despliegue

1. **Accede a:** `https://herobudget.jaimedigitalstudio.com`
2. **Verifica que funcionen:**
   - `https://herobudget.jaimedigitalstudio.com/privacidad`
   - `https://herobudget.jaimedigitalstudio.com/soporte`
3. **Comprueba que el SSL esté activo** (candado verde en el navegador)

## 🛠️ Solución de Problemas

### Error 502 Bad Gateway
```bash
sudo systemctl status nginx
sudo nginx -t
sudo systemctl restart nginx
```

### Error de permisos
```bash
sudo chown -R www-data:www-data /var/www/herobudget
sudo chmod -R 755 /var/www/herobudget
```

### Error de DNS
- Verifica que el registro A apunte al IP correcto
- Espera hasta 24h para propagación completa

### Error de SSL
```bash
sudo certbot certificates
sudo certbot renew --force-renewal -d herobudget.jaimedigitalstudio.com
```

## 📞 Email de Contacto

El email de contacto configurado es `jaimevillalcon@hotmail.com`. Si quieres cambiarlo en el futuro, busca y reemplaza todas las referencias en los archivos HTML.

## 🔄 Actualizaciones Futuras

Para actualizar el sitio:
1. Sube los nuevos archivos a `/var/www/herobudget/`
2. No necesitas reiniciar nginx para cambios en HTML/CSS
3. Solo reinicia nginx si cambias la configuración del servidor

¡Tu sitio web estará listo para App Store Connect! 