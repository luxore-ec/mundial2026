// ═══════════════════════════════════════════════════════════
//  MUNDIAL 2026 · DATOS OFICIALES
//  Editar manualmente según avance el torneo
// ═══════════════════════════════════════════════════════════
const MUNDIAL_DATA = {

  config: {
    titulo: "Mundial 2026 · Pronósticos",
    subtitulo: "México · USA · Canadá",
    emailDestino: "TU_EMAIL@gmail.com",
    // faseActiva controla qué fase se muestra para pronosticar.
    // Valores: "grupos_j1" | "grupos_j2" | "grupos_j3" | "dieciseisavos" | "octavos" | "cuartos" | "semifinales" | "final"
    faseActiva: "grupos_j1",
    fechaLimiteFase: "2026-06-11T18:00:00",
  },

  // ── EQUIPOS CAMPEÓN (todos los 48 para el pronóstico inicial)
  equipos: [
    "México","Sudáfrica","Corea del Sur","República Checa",
    "Canadá","Bosnia y Herzegovina","Qatar","Suiza",
    "Brasil","Marruecos","Haití","Escocia",
    "Estados Unidos","Paraguay","Australia","Turquía",
    "Alemania","Curazao","Costa de Marfil","Ecuador",
    "Países Bajos","Japón","Suecia","Túnez",
    "Bélgica","Egipto","Irán","Nueva Zelanda",
    "España","Uruguay","Arabia Saudita","Cabo Verde",
    "Francia","Senegal","Noruega","Irak",
    "Argentina","Argelia","Austria","Jordania",
    "Portugal","Colombia","Uzbekistán","Rep. D. del Congo",
    "Inglaterra","Croacia","Panamá","Ghana"
  ],

  // ── GRUPOS OFICIALES
  grupos: [
    { id:"A", equipos:["México","Sudáfrica","Corea del Sur","República Checa"] },
    { id:"B", equipos:["Canadá","Bosnia y Herzegovina","Qatar","Suiza"] },
    { id:"C", equipos:["Brasil","Marruecos","Haití","Escocia"] },
    { id:"D", equipos:["Estados Unidos","Paraguay","Australia","Turquía"] },
    { id:"E", equipos:["Alemania","Curazao","Costa de Marfil","Ecuador"] },
    { id:"F", equipos:["Países Bajos","Japón","Suecia","Túnez"] },
    { id:"G", equipos:["Bélgica","Egipto","Irán","Nueva Zelanda"] },
    { id:"H", equipos:["España","Uruguay","Arabia Saudita","Cabo Verde"] },
    { id:"I", equipos:["Francia","Senegal","Noruega","Irak"] },
    { id:"J", equipos:["Argentina","Argelia","Austria","Jordania"] },
    { id:"K", equipos:["Portugal","Colombia","Uzbekistán","Rep. D. del Congo"] },
    { id:"L", equipos:["Inglaterra","Croacia","Panamá","Ghana"] },
  ],

  // ── FASES DE PRONÓSTICO
  // Cada fase tiene su propio bloque de partidos.
  // Solo la faseActiva se muestra en el formulario.
  fases: {

    grupos_j1: {
      label: "Fase de Grupos · Jornada 1",
      descripcion: "Primera jornada de todos los grupos (11–13 Jun)",
      partidos: [
        // GRUPO A
        { id:"a_j1_1", local:"México",         visitante:"Sudáfrica",    fecha:"11 Jun", hora:"12:00", grupo:"A" },
        { id:"a_j1_2", local:"Corea del Sur",   visitante:"Rep. Checa",   fecha:"11 Jun", hora:"15:00", grupo:"A" },
        // GRUPO B
        { id:"b_j1_1", local:"Canadá",          visitante:"Bosnia y Herz.",fecha:"11 Jun", hora:"18:00", grupo:"B" },
        { id:"b_j1_2", local:"Qatar",            visitante:"Suiza",        fecha:"11 Jun", hora:"21:00", grupo:"B" },
        // GRUPO C
        { id:"c_j1_1", local:"Brasil",           visitante:"Marruecos",    fecha:"12 Jun", hora:"12:00", grupo:"C" },
        { id:"c_j1_2", local:"Haití",            visitante:"Escocia",      fecha:"12 Jun", hora:"15:00", grupo:"C" },
        // GRUPO D
        { id:"d_j1_1", local:"Estados Unidos",   visitante:"Paraguay",     fecha:"12 Jun", hora:"18:00", grupo:"D" },
        { id:"d_j1_2", local:"Australia",        visitante:"Turquía",      fecha:"12 Jun", hora:"21:00", grupo:"D" },
        // GRUPO E
        { id:"e_j1_1", local:"Alemania",         visitante:"Curazao",      fecha:"13 Jun", hora:"12:00", grupo:"E" },
        { id:"e_j1_2", local:"Costa de Marfil",  visitante:"Ecuador",      fecha:"13 Jun", hora:"15:00", grupo:"E" },
        // GRUPO F
        { id:"f_j1_1", local:"Países Bajos",     visitante:"Japón",        fecha:"13 Jun", hora:"18:00", grupo:"F" },
        { id:"f_j1_2", local:"Suecia",           visitante:"Túnez",        fecha:"13 Jun", hora:"21:00", grupo:"F" },
        // GRUPO G
        { id:"g_j1_1", local:"Bélgica",          visitante:"Egipto",       fecha:"14 Jun", hora:"12:00", grupo:"G" },
        { id:"g_j1_2", local:"Irán",             visitante:"Nueva Zelanda",fecha:"14 Jun", hora:"15:00", grupo:"G" },
        // GRUPO H
        { id:"h_j1_1", local:"España",           visitante:"Uruguay",      fecha:"14 Jun", hora:"18:00", grupo:"H" },
        { id:"h_j1_2", local:"Arabia Saudita",   visitante:"Cabo Verde",   fecha:"14 Jun", hora:"21:00", grupo:"H" },
        // GRUPO I
        { id:"i_j1_1", local:"Francia",          visitante:"Senegal",      fecha:"15 Jun", hora:"12:00", grupo:"I" },
        { id:"i_j1_2", local:"Noruega",          visitante:"Irak",         fecha:"15 Jun", hora:"15:00", grupo:"I" },
        // GRUPO J
        { id:"j_j1_1", local:"Argentina",        visitante:"Argelia",      fecha:"15 Jun", hora:"18:00", grupo:"J" },
        { id:"j_j1_2", local:"Austria",          visitante:"Jordania",     fecha:"15 Jun", hora:"21:00", grupo:"J" },
        // GRUPO K
        { id:"k_j1_1", local:"Portugal",         visitante:"Colombia",     fecha:"16 Jun", hora:"12:00", grupo:"K" },
        { id:"k_j1_2", local:"Uzbekistán",       visitante:"Rep. D. Congo",fecha:"16 Jun", hora:"15:00", grupo:"K" },
        // GRUPO L
        { id:"l_j1_1", local:"Inglaterra",       visitante:"Croacia",      fecha:"16 Jun", hora:"18:00", grupo:"L" },
        { id:"l_j1_2", local:"Panamá",           visitante:"Ghana",        fecha:"16 Jun", hora:"21:00", grupo:"L" },
      ]
    },

    grupos_j2: {
      label: "Fase de Grupos · Jornada 2", // Corregir Fecha y horas de esta jornada
      descripcion: "Segunda jornada de todos los grupos (17–20 Jun)",
      partidos: [
        { id:"a_j2_1", local:"México",         visitante:"Corea del Sur",  fecha:"17 Jun", hora:"12:00", grupo:"A" },
        { id:"a_j2_2", local:"Sudáfrica",       visitante:"Rep. Checa",    fecha:"17 Jun", hora:"15:00", grupo:"A" },
        { id:"b_j2_1", local:"Canadá",          visitante:"Qatar",          fecha:"17 Jun", hora:"18:00", grupo:"B" },
        { id:"b_j2_2", local:"Bosnia y Herz.",  visitante:"Suiza",          fecha:"17 Jun", hora:"21:00", grupo:"B" },
        { id:"c_j2_1", local:"Brasil",          visitante:"Haití",          fecha:"18 Jun", hora:"12:00", grupo:"C" },
        { id:"c_j2_2", local:"Marruecos",       visitante:"Escocia",        fecha:"18 Jun", hora:"15:00", grupo:"C" },
        { id:"d_j2_1", local:"Estados Unidos",  visitante:"Australia",      fecha:"18 Jun", hora:"18:00", grupo:"D" },
        { id:"d_j2_2", local:"Paraguay",        visitante:"Turquía",        fecha:"18 Jun", hora:"21:00", grupo:"D" },
        { id:"e_j2_1", local:"Alemania",        visitante:"Costa de Marfil",fecha:"19 Jun", hora:"12:00", grupo:"E" },
        { id:"e_j2_2", local:"Curazao",         visitante:"Ecuador",        fecha:"19 Jun", hora:"15:00", grupo:"E" },
        { id:"f_j2_1", local:"Países Bajos",    visitante:"Suecia",         fecha:"19 Jun", hora:"18:00", grupo:"F" },
        { id:"f_j2_2", local:"Japón",           visitante:"Túnez",          fecha:"19 Jun", hora:"21:00", grupo:"F" },
        { id:"g_j2_1", local:"Bélgica",         visitante:"Irán",           fecha:"20 Jun", hora:"12:00", grupo:"G" },
        { id:"g_j2_2", local:"Egipto",          visitante:"Nueva Zelanda",  fecha:"20 Jun", hora:"15:00", grupo:"G" },
        { id:"h_j2_1", local:"España",          visitante:"Arabia Saudita", fecha:"20 Jun", hora:"18:00", grupo:"H" },
        { id:"h_j2_2", local:"Uruguay",         visitante:"Cabo Verde",     fecha:"20 Jun", hora:"21:00", grupo:"H" },
        { id:"i_j2_1", local:"Francia",         visitante:"Noruega",        fecha:"21 Jun", hora:"12:00", grupo:"I" },
        { id:"i_j2_2", local:"Senegal",         visitante:"Irak",           fecha:"21 Jun", hora:"15:00", grupo:"I" },
        { id:"j_j2_1", local:"Argentina",       visitante:"Austria",        fecha:"21 Jun", hora:"18:00", grupo:"J" },
        { id:"j_j2_2", local:"Argelia",         visitante:"Jordania",       fecha:"21 Jun", hora:"21:00", grupo:"J" },
        { id:"k_j2_1", local:"Portugal",        visitante:"Uzbekistán",     fecha:"22 Jun", hora:"12:00", grupo:"K" },
        { id:"k_j2_2", local:"Colombia",        visitante:"Rep. D. Congo",  fecha:"22 Jun", hora:"15:00", grupo:"K" },
        { id:"l_j2_1", local:"Inglaterra",      visitante:"Panamá",         fecha:"22 Jun", hora:"18:00", grupo:"L" },
        { id:"l_j2_2", local:"Croacia",         visitante:"Ghana",          fecha:"22 Jun", hora:"21:00", grupo:"L" },
      ]
    },

    grupos_j3: {
      label: "Fase de Grupos · Jornada 3",
      descripcion: "Tercera jornada — partidos simultáneos (23–26 Jun)",
      partidos: [
        { id:"a_j3_1", local:"México",         visitante:"Rep. Checa",     fecha:"23 Jun", hora:"18:00", grupo:"A" },
        { id:"a_j3_2", local:"Sudáfrica",      visitante:"Corea del Sur",  fecha:"23 Jun", hora:"18:00", grupo:"A" },
        { id:"b_j3_1", local:"Canadá",         visitante:"Suiza",          fecha:"24 Jun", hora:"18:00", grupo:"B" },
        { id:"b_j3_2", local:"Bosnia y Herz.", visitante:"Qatar",          fecha:"24 Jun", hora:"18:00", grupo:"B" },
        { id:"c_j3_1", local:"Brasil",         visitante:"Escocia",        fecha:"24 Jun", hora:"21:00", grupo:"C" },
        { id:"c_j3_2", local:"Marruecos",      visitante:"Haití",          fecha:"24 Jun", hora:"21:00", grupo:"C" },
        { id:"d_j3_1", local:"Estados Unidos", visitante:"Turquía",        fecha:"25 Jun", hora:"18:00", grupo:"D" },
        { id:"d_j3_2", local:"Paraguay",       visitante:"Australia",      fecha:"25 Jun", hora:"18:00", grupo:"D" },
        { id:"e_j3_1", local:"Alemania",       visitante:"Ecuador",        fecha:"25 Jun", hora:"21:00", grupo:"E" },
        { id:"e_j3_2", local:"Curazao",        visitante:"Costa de Marfil",fecha:"25 Jun", hora:"21:00", grupo:"E" },
        { id:"f_j3_1", local:"Países Bajos",   visitante:"Túnez",          fecha:"26 Jun", hora:"18:00", grupo:"F" },
        { id:"f_j3_2", local:"Japón",          visitante:"Suecia",         fecha:"26 Jun", hora:"18:00", grupo:"F" },
        { id:"g_j3_1", local:"Bélgica",        visitante:"Nueva Zelanda",  fecha:"26 Jun", hora:"21:00", grupo:"G" },
        { id:"g_j3_2", local:"Egipto",         visitante:"Irán",           fecha:"26 Jun", hora:"21:00", grupo:"G" },
        { id:"h_j3_1", local:"España",         visitante:"Cabo Verde",     fecha:"27 Jun", hora:"18:00", grupo:"H" },
        { id:"h_j3_2", local:"Uruguay",        visitante:"Arabia Saudita", fecha:"27 Jun", hora:"18:00", grupo:"H" },
        { id:"i_j3_1", local:"Francia",        visitante:"Irak",           fecha:"27 Jun", hora:"21:00", grupo:"I" },
        { id:"i_j3_2", local:"Senegal",        visitante:"Noruega",        fecha:"27 Jun", hora:"21:00", grupo:"I" },
        { id:"j_j3_1", local:"Argentina",      visitante:"Jordania",       fecha:"28 Jun", hora:"18:00", grupo:"J" },
        { id:"j_j3_2", local:"Argelia",        visitante:"Austria",        fecha:"28 Jun", hora:"18:00", grupo:"J" },
        { id:"k_j3_1", local:"Portugal",       visitante:"Rep. D. Congo",  fecha:"28 Jun", hora:"21:00", grupo:"K" },
        { id:"k_j3_2", local:"Colombia",       visitante:"Uzbekistán",     fecha:"28 Jun", hora:"21:00", grupo:"K" },
        { id:"l_j3_1", local:"Inglaterra",     visitante:"Ghana",          fecha:"29 Jun", hora:"18:00", grupo:"L" },
        { id:"l_j3_2", local:"Croacia",        visitante:"Panamá",         fecha:"29 Jun", hora:"18:00", grupo:"L" },
      ]
    },

    dieciseisavos: {
      label: "Dieciseisavos de Final",
      descripcion: "Ronda de 32 — partidos eliminatorios (1–5 Jul)",
      partidos: [
        // Se completan cuando se conozcan los clasificados
        { id:"r32_01", local:"1º Grupo A", visitante:"3º Mejor", fecha:"1 Jul", hora:"18:00", grupo:null },
        { id:"r32_02", local:"1º Grupo B", visitante:"3º Mejor", fecha:"1 Jul", hora:"21:00", grupo:null },
        { id:"r32_03", local:"1º Grupo C", visitante:"2º Grupo D", fecha:"2 Jul", hora:"18:00", grupo:null },
        { id:"r32_04", local:"1º Grupo D", visitante:"2º Grupo C", fecha:"2 Jul", hora:"21:00", grupo:null },
      ]
    },

    octavos: {
      label: "Octavos de Final",
      descripcion: "Ronda de 16 (7–10 Jul)",
      partidos: []
    },

    cuartos: {
      label: "Cuartos de Final",
      descripcion: "Ronda de 8 (12–13 Jul)",
      partidos: []
    },

    semifinales: {
      label: "Semifinales",
      descripcion: "Ronda de 4 (15–16 Jul)",
      partidos: []
    },

    final: {
      label: "Final",
      descripcion: "Gran Final — 19 Jul 2026",
      partidos: [
        { id:"final_01", local:"Por definir", visitante:"Por definir", fecha:"19 Jul", hora:"18:00", grupo:null },
      ]
    },
  },

  // ── RANKING — actualizar manualmente
  // campeon: selección que el participante pronosticó campeón
  ranking: [
    { nombre:"Andrés",    apellido:"Cruz",   aciertos:18, total:24, campeon:"Argentina" },
    { nombre:"Jefferson", apellido:"Arévalo",      aciertos:20, total:24, campeon:"Brasil" },
    { nombre:"Diego",     apellido:"Herrera",   aciertos:14, total:24, campeon:"Francia" },
    { nombre:"Sofía",     apellido:"Paredes",   aciertos:13, total:24, campeon:"España" },
    { nombre:"Andrés",    apellido:"Mora",      aciertos:12, total:24, campeon:"Argentina" },
    { nombre:"Lucía",     apellido:"Vega",      aciertos:12, total:24, campeon:"Portugal" },
    { nombre:"Sebastián", apellido:"Flores",    aciertos:11, total:24, campeon:"Alemania" },
    { nombre:"Camila",    apellido:"Torres",    aciertos:10, total:24, campeon:"Francia" },
    { nombre:"Mateo",     apellido:"Guzmán",    aciertos:10, total:24, campeon:"Brasil" },
    { nombre:"Isabella",  apellido:"Castro",    aciertos:9,  total:24, campeon:"México" },
    { nombre:"Tomás",     apellido:"Navarro",   aciertos:8,  total:24, campeon:"Inglaterra" },
    { nombre:"Paula",     apellido:"Jiménez",   aciertos:7,  total:24, campeon:"Argentina" },
    { nombre:"Ricardo",   apellido:"Salazar",   aciertos:6,  total:24, campeon:"España" },
    { nombre:"Natalia",   apellido:"Peña",      aciertos:5,  total:24, campeon:"Brasil" },
    { nombre:"Felipe",    apellido:"Ramos",     aciertos:4,  total:24, campeon:"Estados Unidos" },
  ],  // ── RESULTADOS REALES — llenar cuando terminen los partidos
  resultados: {
    // "a_j1_1": "local" | "empate" | "visitante"
  }

};

  const CODIGOS = {
    México: "mx",
    Sudáfrica: "za",
    "Corea del Sur": "kr",
    "República Checa": "cz",
    Canadá: "ca",
    "Bosnia y Herzegovina": "ba",
    Qatar: "qa",
    Suiza: "ch",
    Brasil: "br",
    Marruecos: "ma",
    Haití: "ht",
    Escocia: "gb-sct",
    "Estados Unidos": "us",
    Paraguay: "py",
    Australia: "au",
    Turquía: "tr",
    Alemania: "de",
    Curazao: "cw",
    "Costa de Marfil": "ci",
    Ecuador: "ec",
    "Países Bajos": "nl",
    Japón: "jp",
    Suecia: "se",
    Túnez: "tn",
    Bélgica: "be",
    Egipto: "eg",
    Irán: "ir",
    "Nueva Zelanda": "nz",
    España: "es",
    Uruguay: "uy",
    "Arabia Saudita": "sa",
    "Cabo Verde": "cv",
    Francia: "fr",
    Senegal: "sn",
    Noruega: "no",
    Irak: "iq",
    Argentina: "ar",
    Argelia: "dz",
    Austria: "at",
    Jordania: "jo",
    Portugal: "pt",
    Colombia: "co",
    Uzbekistán: "uz",
    "Rep. D. del Congo": "cd",
    Inglaterra: "gb-eng",
    Croacia: "hr",
    Panamá: "pa",
    Ghana: "gh",
  };