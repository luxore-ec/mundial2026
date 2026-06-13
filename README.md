# 🏆 Mundial 2026 · Sitio de Pronósticos


### 1. Tu email (para recibir los pronósticos)

Abre `data/partidos.js` y cambia:
```js
emailDestino: "TU_EMAIL@gmail.com",  // ← PON TU EMAIL AQUÍ
```

### 2. Configura Formspree (envío de emails GRATIS)

> Formspree envía los formularios a tu correo sin necesidad de backend.

1. Ve a **https://formspree.io** y crea una cuenta gratuita
2. Crea un nuevo formulario apuntando a tu email
3. Copia la URL que te dan (ej: `https://formspree.io/f/abcd1234`)
4. Abre `js/app.js` y cambia:
```js
const FORMSPREE_URL = 'https://formspree.io/f/abcd1234';  // ← TU URL
```

> **Nota:** Si no configuras Formspree, el sitio abrirá el cliente de email del usuario como respaldo.

---

## 🔒 Anti-duplicados

El sistema usa `localStorage` del navegador para evitar que una persona envíe más de una vez desde el mismo dispositivo/navegador. Es suficiente para uso informal entre amigos.

---
