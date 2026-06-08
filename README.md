# 🏆 Mundial 2026 · Sitio de Pronósticos

Sitio estático listo para **GitHub Pages**. Construido con HTML + CSS + JS puro.

---

## 🚀 Configuración en 5 pasos

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

### 3. Sube a GitHub Pages

1. Sube todos los archivos a un repositorio GitHub
2. Ve a **Settings → Pages**
3. Source: `Deploy from a branch` → `main` → `/ (root)`
4. ¡Tu sitio estará en `https://TU_USUARIO.github.io/REPO/`!

---

## ✏️ Actualizar contenido manualmente

### Agregar/editar partidos → `data/partidos.js`

```js
fechas: [
  {
    id: "fecha1",
    nombre: "Fase de Grupos · Jornada 1",
    partidos: [
      {
        id: "p01",           // ID único (no repetir)
        local: "Argentina",  // Equipo local
        visitante: "Francia",// Equipo visitante
        fecha: "11 Jun 2026",
        hora: "18:00"
      },
      // ... más partidos
    ]
  }
]
```

### Actualizar el ranking → `data/partidos.js`

```js
ranking: [
  { nombre: "Juan", apellido: "Pérez", correo: "juan@mail.com", aciertos: 12, total: 20 },
  { nombre: "María", apellido: "López", correo: "maria@mail.com", aciertos: 10, total: 20 },
],
```

### Registrar resultados reales → `data/partidos.js`

```js
resultados: {
  "p01": "local",      // Ganó el local
  "p02": "empate",     // Empate
  "p03": "visitante",  // Ganó el visitante
}
```

### Cambiar fecha límite

```js
fechaLimite: "2026-06-11T00:00:00",  // Formato: YYYY-MM-DDTHH:MM:SS
```

---

## 🔒 Anti-duplicados

El sistema usa `localStorage` del navegador para evitar que una persona envíe más de una vez desde el mismo dispositivo/navegador. Es suficiente para uso informal entre amigos.

---

## 📁 Estructura de archivos

```
mundial2026/
├── index.html          ← Página principal
├── css/
│   └── styles.css      ← Todos los estilos
├── js/
│   └── app.js          ← Toda la lógica
├── data/
│   └── partidos.js     ← EDITAR AQUÍ los partidos y ranking
└── README.md           ← Esta guía
```

---

## 📧 Qué recibes en cada email

```
PRONÓSTICO MUNDIAL 2026
═══════════════════════════════
Participante: Juan Pérez
Email: juan@mail.com
Enviado: 10/6/2026, 14:32:00

📅 Fase de Grupos · Jornada 1
─────────────────────────
Argentina vs Francia: ✅ Argentina
Brasil vs España: 🤝 Empate
México vs Canadá: ✅ Canadá
```
