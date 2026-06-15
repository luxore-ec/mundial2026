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
    fechaLimiteFase: "2026-06-12T14:00:00-05:00",
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
  // Solo la faseActiva se muestra en el formulario.
  fases: {

    grupos_j1: {
      label: "Fase de Grupos Completa",
      descripcion: "Todos los partidos de la fase de grupos (72 encuentros)",
      partidos: [
        // ── JORNADA 1 ──────────────────────────────────────────────
        //!{ id:"a_j1_1", local:"México",           visitante:"Sudáfrica",            fecha:"11 de junio", hora:"14:00", grupo:"A" },
        //!{ id:"a_j1_2", local:"Corea del Sur",    visitante:"República Checa",      fecha:"11 de junio", hora:"21:00", grupo:"A" },
        //!{ id:"b_j1_1", local:"Canadá",           visitante:"Bosnia y Herzegovina", fecha:"12 de junio", hora:"14:00", grupo:"B" },
        //!{ id:"b_j1_2", local:"Qatar",            visitante:"Suiza",                fecha:"13 de junio", hora:"14:00", grupo:"B" },
        //!{ id:"c_j1_1", local:"Brasil",           visitante:"Marruecos",            fecha:"13 de junio", hora:"17:00", grupo:"C" },
        //!{ id:"c_j1_2", local:"Haití",            visitante:"Escocia",              fecha:"13 de junio", hora:"20:00", grupo:"C" },
        //!{ id:"d_j1_1", local:"Estados Unidos",   visitante:"Paraguay",             fecha:"12 de junio", hora:"20:00", grupo:"D" },
        //!{ id:"d_j1_2", local:"Australia",        visitante:"Turquía",              fecha:"13 de junio", hora:"23:00", grupo:"D" },
        //!{ id:"e_j1_1", local:"Alemania",         visitante:"Curazao",              fecha:"14 de junio", hora:"12:00", grupo:"E" },
        //!{ id:"f_j1_1", local:"Países Bajos",     visitante:"Japón",                fecha:"14 de junio", hora:"15:00", grupo:"F" },
        //!{ id:"e_j1_2", local:"Costa de Marfil",  visitante:"Ecuador",              fecha:"14 de junio", hora:"18:00", grupo:"E" },
        { id:"f_j1_2", local:"Suecia",           visitante:"Túnez",                fecha:"14 de junio", hora:"21:00", grupo:"F" },
        { id:"g_j1_1", local:"Bélgica",          visitante:"Egipto",               fecha:"15 de junio", hora:"14:00", grupo:"G" },
        { id:"g_j1_2", local:"Irán",             visitante:"Nueva Zelanda",        fecha:"15 de junio", hora:"20:00", grupo:"G" },
        { id:"h_j1_1", local:"España",           visitante:"Cabo Verde",           fecha:"15 de junio", hora:"11:00", grupo:"H" },
        { id:"h_j1_2", local:"Arabia Saudí",     visitante:"Uruguay",              fecha:"15 de junio", hora:"17:00", grupo:"H" },
        { id:"i_j1_1", local:"Francia",          visitante:"Senegal",              fecha:"16 de junio", hora:"14:00", grupo:"I" },
        { id:"i_j1_2", local:"Irak",             visitante:"Noruega",              fecha:"16 de junio", hora:"17:00", grupo:"I" },
        { id:"j_j1_1", local:"Argentina",        visitante:"Argelia",              fecha:"16 de junio", hora:"20:00", grupo:"J" },
        { id:"j_j1_2", local:"Austria",          visitante:"Jordania",             fecha:"16 de junio", hora:"23:00", grupo:"J" },
        { id:"k_j1_1", local:"Portugal",         visitante:"Congo",                fecha:"17 de junio", hora:"12:00", grupo:"K" },
        { id:"k_j1_2", local:"Uzbekistán",       visitante:"Colombia",             fecha:"17 de junio", hora:"21:00", grupo:"K" },
        { id:"l_j1_1", local:"Inglaterra",       visitante:"Croacia",              fecha:"17 de junio", hora:"15:00", grupo:"L" },
        { id:"l_j1_2", local:"Panamá",           visitante:"Ghana",                fecha:"17 de junio", hora:"18:00", grupo:"L" },

        // ── JORNADA 2 ──────────────────────────────────────────────
        { id:"a_j2_1", local:"República Checa", visitante:"Sudáfrica",             fecha:"18 de junio", hora:"11:00", grupo:"A" },
        { id:"a_j2_2", local:"México",          visitante:"Corea del Sur",         fecha:"18 de junio", hora:"20:00", grupo:"A" },
        { id:"b_j2_1", local:"Suiza",           visitante:"Bosnia y Herzegovina",  fecha:"18 de junio", hora:"14:00", grupo:"B" },
        { id:"b_j2_2", local:"Canadá",          visitante:"Qatar",                 fecha:"18 de junio", hora:"17:00", grupo:"B" },
        { id:"c_j2_1", local:"Escocia",         visitante:"Marruecos",             fecha:"19 de junio", hora:"17:00", grupo:"C" },
        { id:"c_j2_2", local:"Brasil",          visitante:"Haití",                 fecha:"19 de junio", hora:"20:00", grupo:"C" },
        { id:"d_j2_1", local:"Estados Unidos",  visitante:"Australia",             fecha:"19 de junio", hora:"14:00", grupo:"D" },
        { id:"d_j2_2", local:"Turquía",         visitante:"Paraguay",              fecha:"19 de junio", hora:"23:00", grupo:"D" },
        { id:"e_j2_1", local:"Alemania",        visitante:"Costa de Marfil",       fecha:"20 de junio", hora:"15:00", grupo:"E" },
        { id:"e_j2_2", local:"Ecuador",         visitante:"Curazao",               fecha:"20 de junio", hora:"21:00", grupo:"E" },
        { id:"f_j2_1", local:"Países Bajos",    visitante:"Suecia",                fecha:"20 de junio", hora:"12:00", grupo:"F" },
        { id:"f_j2_2", local:"Túnez",           visitante:"Japón",                 fecha:"20 de junio", hora:"23:00", grupo:"F" },
        { id:"g_j2_1", local:"Bélgica",         visitante:"Irán",                  fecha:"21 de junio", hora:"14:00", grupo:"G" },
        { id:"g_j2_2", local:"Nueva Zelanda",   visitante:"Egipto",                fecha:"21 de junio", hora:"20:00", grupo:"G" },
        { id:"h_j2_1", local:"España",          visitante:"Arabia Saudí",          fecha:"21 de junio", hora:"11:00", grupo:"H" },
        { id:"h_j2_2", local:"Uruguay",         visitante:"Cabo Verde",            fecha:"21 de junio", hora:"17:00", grupo:"H" },
        { id:"i_j2_1", local:"Francia",         visitante:"Irak",                  fecha:"22 de junio", hora:"16:00", grupo:"I" },
        { id:"i_j2_2", local:"Noruega",         visitante:"Senegal",               fecha:"22 de junio", hora:"19:00", grupo:"I" },
        { id:"j_j2_1", local:"Argentina",       visitante:"Austria",               fecha:"22 de junio", hora:"12:00", grupo:"J" },
        { id:"j_j2_2", local:"Jordania",        visitante:"Argelia",               fecha:"22 de junio", hora:"22:00", grupo:"J" },
        { id:"k_j2_1", local:"Portugal",        visitante:"Uzbekistán",            fecha:"23 de junio", hora:"12:00", grupo:"K" },
        { id:"k_j2_2", local:"Colombia",        visitante:"Congo",                 fecha:"23 de junio", hora:"21:00", grupo:"K" },
        { id:"l_j2_1", local:"Inglaterra",      visitante:"Ghana",                 fecha:"23 de junio", hora:"15:00", grupo:"L" },
        { id:"l_j2_2", local:"Panamá",          visitante:"Croacia",               fecha:"23 de junio", hora:"18:00", grupo:"L" },

        // ── JORNADA 3 ──────────────────────────────────────────────
        { id:"a_j3_1", local:"Sudáfrica",            visitante:"Corea del Sur",   fecha:"24 de junio", hora:"20:00", grupo:"A" },
        { id:"a_j3_2", local:"República Checa",      visitante:"México",          fecha:"24 de junio", hora:"20:00", grupo:"A" },
        { id:"b_j3_1", local:"Bosnia y Herzegovina", visitante:"Qatar",           fecha:"24 de junio", hora:"14:00", grupo:"B" },
        { id:"b_j3_2", local:"Suiza",                visitante:"Canadá",          fecha:"24 de junio", hora:"14:00", grupo:"B" },
        { id:"c_j3_1", local:"Escocia",              visitante:"Brasil",          fecha:"24 de junio", hora:"17:00", grupo:"C" },
        { id:"c_j3_2", local:"Marruecos",            visitante:"Haití",           fecha:"24 de junio", hora:"17:00", grupo:"C" },
        { id:"d_j3_1", local:"Turquía",              visitante:"Estados Unidos",  fecha:"25 de junio", hora:"21:00", grupo:"D" },
        { id:"d_j3_2", local:"Paraguay",             visitante:"Australia",       fecha:"25 de junio", hora:"21:00", grupo:"D" },
        { id:"e_j3_1", local:"Ecuador",              visitante:"Alemania",        fecha:"25 de junio", hora:"15:00", grupo:"E" },
        { id:"e_j3_2", local:"Curazao",              visitante:"Costa de Marfil", fecha:"25 de junio", hora:"15:00", grupo:"E" },
        { id:"f_j3_1", local:"Japón",                visitante:"Suecia",          fecha:"25 de junio", hora:"18:00", grupo:"F" },
        { id:"f_j3_2", local:"Túnez",                visitante:"Países Bajos",    fecha:"25 de junio", hora:"18:00", grupo:"F" },
        { id:"g_j3_1", local:"Nueva Zelanda",        visitante:"Bélgica",         fecha:"26 de junio", hora:"22:00", grupo:"G" },
        { id:"g_j3_2", local:"Egipto",               visitante:"Irán",            fecha:"26 de junio", hora:"22:00", grupo:"G" },
        { id:"h_j3_1", local:"Uruguay",              visitante:"España",          fecha:"26 de junio", hora:"19:00", grupo:"H" },
        { id:"h_j3_2", local:"Cabo Verde",           visitante:"Arabia Saudí",    fecha:"26 de junio", hora:"19:00", grupo:"H" },
        { id:"i_j3_1", local:"Senegal",              visitante:"Irak",            fecha:"26 de junio", hora:"14:00", grupo:"I" },
        { id:"i_j3_2", local:"Noruega",              visitante:"Francia",         fecha:"26 de junio", hora:"14:00", grupo:"I" },
        { id:"j_j3_1", local:"Jordania",             visitante:"Argentina",       fecha:"27 de junio", hora:"21:00", grupo:"J" },
        { id:"j_j3_2", local:"Argelia",              visitante:"Austria",         fecha:"27 de junio", hora:"21:00", grupo:"J" },
        { id:"k_j3_1", local:"Colombia",             visitante:"Portugal",        fecha:"27 de junio", hora:"18:30", grupo:"K" },
        { id:"k_j3_2", local:"Congo",                visitante:"Uzbekistán",      fecha:"27 de junio", hora:"18:30", grupo:"K" },
        { id:"l_j3_1", local:"Croacia",              visitante:"Ghana",           fecha:"27 de junio", hora:"16:00", grupo:"L" },
        { id:"l_j3_2", local:"Panamá",               visitante:"Inglaterra",      fecha:"27 de junio", hora:"16:00", grupo:"L" }
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

  // ── RANKING
  ranking: [
    { nombre:"Bruno",       apellido:"Arevalo",      aciertos:3, total:72, campeon: " Portugal | España | Brasil | Francia | Cuartos " },
    { nombre:"Toga",        apellido:"Kevin",        aciertos:4, total:72, campeon: " Francia | España | Argentina | Francia | Cuartos " },
    { nombre:"JOSE",        apellido:"XAVIER",       aciertos:5, total:72, campeon: " España | Francia | Argentina | Francia | Octavos " },
    { nombre:"David",       apellido:"Sellan",       aciertos:6, total:72, campeon: " Francia | España | Argentina | Francia | Octavos " },
    { nombre:"Elizabeth",   apellido:"Cabeza",       aciertos:3, total:72, campeon: " Francia | España | Portugal | Francia | Fase de grupos " },
    { nombre:"Victor",      apellido:"Gonzalez",     aciertos:3, total:72, campeon: " España | Portugal | Francia | España | Octavos " },
    { nombre:"Fabian",      apellido:"Cevallos",     aciertos:5, total:72, campeon: " España | Argentina | Francia | España | Octavos " },
    { nombre:"JEFFERSON",   apellido:"ARÉVALO",      aciertos:3, total:72, campeon: " Portugal| Brasil| Ecuador| Francia| Semifinales " },
    { nombre:"Carlos",      apellido:"Delgado",      aciertos:4, total:72, campeon: " Ecuador| Países Bajos| España| Francia| Final " },
    { nombre:"Paul",        apellido:"Garcia",       aciertos:8, total:72, campeon: " Portugal | España | Argentina | Portugal | Cuartos " },

    { nombre:"Paul",        apellido:"Rodríguez",    aciertos:5, total:72, campeon: " Portugal | España | Argentina | Brasil | Octavos " },
    { nombre:"Juan",        apellido:"Navarrete",    aciertos:4, total:72, campeon: " Francia| Portugal| Ecuador| Francia| Semifinales " },
    { nombre:"Dussan",      apellido:"Maruri",       aciertos:3, total:72, campeon: " Argentina | Francia | Brasil | Francia | Octavos " },
    { nombre:"Francisco",   apellido:"Camacho",      aciertos:6, total:72, campeon: " Portugal | Francia | Argentina | Francia | Octavos " },
    { nombre:"Gary",        apellido:"Laborde",      aciertos:5, total:72, campeon: " Francia | Portugal | Ecuador | Francia | Semifinales " },
    { nombre:"Julio",       apellido:"Mazacon",      aciertos:5, total:72, campeon: " Francia | España | Argentina | Francia | Octavos " },
    { nombre:"Kelvin",      apellido:"Cornejo",      aciertos:4, total:72, campeon: " España | Francia | Francia | España | Octavos " },
    { nombre:"Julio",       apellido:"Sanchez",      aciertos:5, total:72, campeon: " Portugal | Alemania | Brasil | Portugal | Octavos " },
    { nombre:"Oscar",       apellido:"Ortega",       aciertos:4, total:72, campeon: " Argentina | Francia | España | Francia | Octavos " },
    { nombre:"Andrés",      apellido:"Soto",         aciertos:4, total:72, campeon: " España | Argentina | Portugal | Francia | Octavos " },

    { nombre:"Jonathan",    apellido:"Di Luca",      aciertos:5, total:72, campeon: " Países Bajos | Portugal | España | Francia | Octavos " },
    { nombre:"JEAN",        apellido:"Arévalo",      aciertos:4, total:72, campeon: " Portugal | Francia | Ecuador | Marruecos | Cuartos " },
    { nombre:"Andrea",      apellido:"Soto",         aciertos:6, total:72, campeon: " España | Francia | Argentina | España | Octavos " },
    { nombre:"Jose",        apellido:"Garcia",       aciertos:4, total:72, campeon: " Portugal | España | Argentina | Portugal | Cuartos " },
    { nombre:"Jose",        apellido:"Bailon",       aciertos:4, total:72, campeon: " Francia | España | Países Bajos | Francia | Cuartos " },
    { nombre:"Joselyn",     apellido:"Salcedo",      aciertos:3, total:72, campeon: " Argentina | Portugal | Ecuador | Ecuador | Semifinales " },
    { nombre:"Jose",        apellido:"Crespo",       aciertos:3, total:72, campeon: " Francia | Argentina | España | Francia | Octavos " },
    { nombre:"Victor",      apellido:"Camacho",      aciertos:4, total:72, campeon: " Portugal | Francia | Brasil | Francia | Cuartos " },
    { nombre:"Marcos",      apellido:"Ramírez",      aciertos:5, total:72, campeon: " Portugal | Francia | Ecuador | Portugal | Semifinales " },
    { nombre:"Mayra",       apellido:"Huerts",       aciertos:6, total:72, campeon: " Portugal | Francia | España | Portugal | Dieciseisavos " },

    { nombre:"Ronny",       apellido:"Moreira",      aciertos:4, total:72, campeon: " Francia | Argentina | Ecuador | Francia | Cuartos " },
    { nombre:"Aldo",        apellido:"Arevalo",      aciertos:3, total:72, campeon: " Portugal | Inglaterra | Argentina | Argentina | Semifinales " },
    { nombre:"Sandy",       apellido:"Carpio",       aciertos:6, total:72, campeon: " Francia | Argentina | Inglaterra | Francia | Fase de grupos " },
    { nombre:"Cristopher",  apellido:"Crespo",       aciertos:4, total:72, campeon: " Argentina | Brasil | Paraguay | Portugal | Octavos " },
    { nombre:"Bolívar",     apellido:"Pérez",        aciertos:2, total:72, campeon: " España | Brasil | Inglaterra | Sudáfrica | Octavos " },
    { nombre:"Steven",      apellido:"Ley",          aciertos:3, total:72, campeon: " Francia | Portugal | Brasil | Francia | Octavos " },
    { nombre:"Freddy",      apellido:"Pincay",       aciertos:5, total:72, campeon: " España | Argentina | Países Bajos | España | Octavos " },
    { nombre:"CARLOS",      apellido:"LOPEZ",        aciertos:7, total:72, campeon: " Francia | Portugal | Ecuador | España | Semifinales " },
    { nombre:"Lissette",    apellido:"Banchon",      aciertos:4, total:72, campeon: " España | Francia | Argentina | Argentina | Octavos " },
    { nombre:"Carlos",      apellido:"Ochoa",        aciertos:5, total:72, campeon: " Francia | Brasil | Ecuador | Francia | Semifinales " },

    { nombre:"Rufo",        apellido:"Castro",       aciertos:4, total:72, campeon: " Portugal | Ecuador | Francia | España | Final " },
    { nombre:"Jorge",       apellido:"Rodriguez",    aciertos:3, total:72, campeon: " España | Portugal | Francia | España | Octavos " },    
    { nombre:"JUAN",        apellido:"PARRAGA",      aciertos:4, total:70, campeon: " Portugal | España | Ecuador | Portugal | Semifinales " },
    { nombre:"Fernando",    apellido:"Parraga",      aciertos:2, total:70, campeon: " Francia | Portugal | España | Francia | Octavos " },
    { nombre:"Gabriel",     apellido:"Parraga",      aciertos:2, total:70, campeon: " Países Bajos | Portugal | España | Países Bajos | Octavos " },
    { nombre:"Bryan",       apellido:"Parrales",     aciertos:1, total:70, campeon: " Francia | Alemania | Ecuador | España | Cuartos " },
    { nombre:"Livia",       apellido:"Arévalo",      aciertos:3, total:70, campeon: " España | Alemania | Brasil | Argentina | Octavos " },
    { nombre:"Pablo",       apellido:"Zambrano",     aciertos:3, total:70, campeon: " España | Francia | Portugal | España | Octavos " },
    { nombre:"Josue",       apellido:"Villacis",     aciertos:3, total:70, campeon: " Brasil | Francia | Ecuador | Brasil | Cuartos " },
    { nombre:"Junior",      apellido:"Castro",       aciertos:3, total:70, campeon: " Francia | Alemania | Argentina | Francia | Octavos " }
    
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