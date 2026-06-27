const MUNDIAL_DATA = {

  config: {
    titulo: "Mundial 2026 · Pronósticos",
    subtitulo: "México · USA · Canadá",
    emailDestino: "TU_EMAIL@gmail.com",
    // faseActiva controla qué fase se muestra para pronosticar.
    // Valores: "grupos_j1" | "grupos_j2" | "grupos_j3" | "dieciseisavos" | "octavos" | "cuartos" | "semifinales" | "final"
    faseActiva: "dieciseisavos",
    fechaLimiteFase: "2026-06-28T14:30:00-05:00",
  },

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
        //? ── JORNADA 1 ──────────────────────────────────────────────
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
        //!{ id:"f_j1_2", local:"Suecia",           visitante:"Túnez",                fecha:"14 de junio", hora:"21:00", grupo:"F" },
        //!{ id:"h_j1_1", local:"España",           visitante:"Cabo Verde",           fecha:"15 de junio", hora:"11:00", grupo:"H" },
        //!{ id:"g_j1_1", local:"Bélgica",          visitante:"Egipto",               fecha:"15 de junio", hora:"14:00", grupo:"G" },
        //!{ id:"h_j1_2", local:"Arabia Saudita",   visitante:"Uruguay",              fecha:"15 de junio", hora:"17:00", grupo:"H" },
        //!{ id:"g_j1_2", local:"Irán",             visitante:"Nueva Zelanda",        fecha:"15 de junio", hora:"20:00", grupo:"G" },
        //!{ id:"i_j1_1", local:"Francia",          visitante:"Senegal",              fecha:"16 de junio", hora:"14:00", grupo:"I" },
        //!{ id:"i_j1_2", local:"Irak",             visitante:"Noruega",              fecha:"16 de junio", hora:"17:00", grupo:"I" },
        //!{ id:"j_j1_1", local:"Argentina",        visitante:"Argelia",              fecha:"16 de junio", hora:"20:00", grupo:"J" },
        //!{ id:"j_j1_2", local:"Austria",          visitante:"Jordania",             fecha:"16 de junio", hora:"23:00", grupo:"J" },
        //!{ id:"k_j1_1", local:"Portugal",         visitante:"Rep. D. del Congo",    fecha:"17 de junio", hora:"12:00", grupo:"K" },
        //!{ id:"l_j1_1", local:"Inglaterra",       visitante:"Croacia",              fecha:"17 de junio", hora:"15:00", grupo:"L" },
        //!{ id:"l_j1_2", local:"Panamá",           visitante:"Ghana",                fecha:"17 de junio", hora:"18:00", grupo:"L" },
        //!{ id:"k_j1_2", local:"Uzbekistán",       visitante:"Colombia",             fecha:"17 de junio", hora:"21:00", grupo:"K" },

        //? ── JORNADA 2 ──────────────────────────────────────────────
        //!{ id:"a_j2_1", local:"República Checa", visitante:"Sudáfrica",             fecha:"18 de junio", hora:"11:00", grupo:"A" },
        //!{ id:"a_j2_2", local:"México",          visitante:"Corea del Sur",         fecha:"18 de junio", hora:"20:00", grupo:"A" },
        //!{ id:"b_j2_1", local:"Suiza",           visitante:"Bosnia y Herzegovina",  fecha:"18 de junio", hora:"14:00", grupo:"B" },
        //!{ id:"b_j2_2", local:"Canadá",          visitante:"Qatar",                 fecha:"18 de junio", hora:"17:00", grupo:"B" },
        //!{ id:"c_j2_1", local:"Escocia",         visitante:"Marruecos",             fecha:"19 de junio", hora:"17:00", grupo:"C" },
        //!{ id:"c_j2_2", local:"Brasil",          visitante:"Haití",                 fecha:"19 de junio", hora:"20:00", grupo:"C" },
        //!{ id:"d_j2_1", local:"Estados Unidos",  visitante:"Australia",             fecha:"19 de junio", hora:"14:00", grupo:"D" },
        //!{ id:"d_j2_2", local:"Turquía",         visitante:"Paraguay",              fecha:"19 de junio", hora:"23:00", grupo:"D" },
        //!{ id:"e_j2_1", local:"Alemania",        visitante:"Costa de Marfil",       fecha:"20 de junio", hora:"15:00", grupo:"E" },
        //!{ id:"e_j2_2", local:"Ecuador",         visitante:"Curazao",               fecha:"20 de junio", hora:"19:00", grupo:"E" },
        //!{ id:"f_j2_1", local:"Países Bajos",    visitante:"Suecia",                fecha:"20 de junio", hora:"12:00", grupo:"F" },
        //!{ id:"f_j2_2", local:"Túnez",           visitante:"Japón",                 fecha:"20 de junio", hora:"23:00", grupo:"F" },
        //!{ id:"g_j2_1", local:"Bélgica",         visitante:"Irán",                  fecha:"21 de junio", hora:"14:00", grupo:"G" },
        //!{ id:"g_j2_2", local:"Nueva Zelanda",   visitante:"Egipto",                fecha:"21 de junio", hora:"20:00", grupo:"G" },
        //!{ id:"h_j2_1", local:"España",          visitante:"Arabia Saudita",        fecha:"21 de junio", hora:"11:00", grupo:"H" },
        //!{ id:"h_j2_2", local:"Uruguay",         visitante:"Cabo Verde",            fecha:"21 de junio", hora:"17:00", grupo:"H" },
        //!{ id:"i_j2_1", local:"Francia",         visitante:"Irak",                  fecha:"22 de junio", hora:"16:00", grupo:"I" },
        //!{ id:"i_j2_2", local:"Noruega",         visitante:"Senegal",               fecha:"22 de junio", hora:"19:00", grupo:"I" },
        //!{ id:"j_j2_1", local:"Argentina",       visitante:"Austria",               fecha:"22 de junio", hora:"12:00", grupo:"J" },
        //!{ id:"j_j2_2", local:"Jordania",        visitante:"Argelia",               fecha:"22 de junio", hora:"22:00", grupo:"J" },
        //!{ id:"k_j2_1", local:"Portugal",        visitante:"Uzbekistán",            fecha:"23 de junio", hora:"12:00", grupo:"K" },
        //!{ id:"k_j2_2", local:"Colombia",        visitante:"Rep. D. del Congo",     fecha:"23 de junio", hora:"21:00", grupo:"K" },
        //!{ id:"l_j2_1", local:"Inglaterra",      visitante:"Ghana",                 fecha:"23 de junio", hora:"15:00", grupo:"L" },
        //!{ id:"l_j2_2", local:"Panamá",          visitante:"Croacia",               fecha:"23 de junio", hora:"18:00", grupo:"L" },

        // ── JORNADA 3 ──────────────────────────────────────────────
        //!{ id:"a_j3_1", local:"Sudáfrica",            visitante:"Corea del Sur",   fecha:"24 de junio", hora:"20:00", grupo:"A" },
        //!{ id:"a_j3_2", local:"República Checa",      visitante:"México",          fecha:"24 de junio", hora:"20:00", grupo:"A" },
        //!{ id:"b_j3_1", local:"Bosnia y Herzegovina", visitante:"Qatar",           fecha:"24 de junio", hora:"14:00", grupo:"B" },
        //!{ id:"b_j3_2", local:"Suiza",                visitante:"Canadá",          fecha:"24 de junio", hora:"14:00", grupo:"B" },
        //!{ id:"c_j3_1", local:"Escocia",              visitante:"Brasil",          fecha:"24 de junio", hora:"17:00", grupo:"C" },
        //!{ id:"c_j3_2", local:"Marruecos",            visitante:"Haití",           fecha:"24 de junio", hora:"17:00", grupo:"C" },
        //!{ id:"e_j3_1", local:"Ecuador",              visitante:"Alemania",        fecha:"25 de junio", hora:"15:00", grupo:"E" },
        //!{ id:"e_j3_2", local:"Curazao",              visitante:"Costa de Marfil", fecha:"25 de junio", hora:"15:00", grupo:"E" },
        //!{ id:"f_j3_1", local:"Japón",                visitante:"Suecia",          fecha:"25 de junio", hora:"18:00", grupo:"F" },
        //!{ id:"f_j3_2", local:"Túnez",                visitante:"Países Bajos",    fecha:"25 de junio", hora:"18:00", grupo:"F" },
        //!{ id:"d_j3_1", local:"Turquía",              visitante:"Estados Unidos",  fecha:"25 de junio", hora:"21:00", grupo:"D" },
        //!{ id:"d_j3_2", local:"Paraguay",             visitante:"Australia",       fecha:"25 de junio", hora:"21:00", grupo:"D" },
        //!{ id:"g_j3_1", local:"Nueva Zelanda",        visitante:"Bélgica",         fecha:"26 de junio", hora:"22:00", grupo:"G" },
        //!{ id:"g_j3_2", local:"Egipto",               visitante:"Irán",            fecha:"26 de junio", hora:"22:00", grupo:"G" },
        //!{ id:"h_j3_1", local:"Uruguay",              visitante:"España",          fecha:"26 de junio", hora:"19:00", grupo:"H" },
        //!{ id:"h_j3_2", local:"Cabo Verde",           visitante:"Arabia Saudita",  fecha:"26 de junio", hora:"19:00", grupo:"H" },
        //!{ id:"i_j3_1", local:"Senegal",              visitante:"Irak",            fecha:"26 de junio", hora:"14:00", grupo:"I" },
        //!{ id:"i_j3_2", local:"Noruega",              visitante:"Francia",         fecha:"26 de junio", hora:"14:00", grupo:"I" },                
        //!{ id:"l_j3_1", local:"Croacia",              visitante:"Ghana",           fecha:"27 de junio", hora:"16:00", grupo:"L" },
        //!{ id:"l_j3_2", local:"Panamá",               visitante:"Inglaterra",      fecha:"27 de junio", hora:"16:00", grupo:"L" },
        //!{ id:"k_j3_1", local:"Colombia",             visitante:"Portugal",        fecha:"27 de junio", hora:"18:30", grupo:"K" },
        //!{ id:"k_j3_2", local:"Rep. D. del Congo",    visitante:"Uzbekistán",      fecha:"27 de junio", hora:"18:30", grupo:"K" },
        { id:"j_j3_1", local:"Jordania",             visitante:"Argentina",       fecha:"27 de junio", hora:"21:00", grupo:"J" },
        { id:"j_j3_2", local:"Argelia",              visitante:"Austria",         fecha:"27 de junio", hora:"21:00", grupo:"J" },
      ]
    },

    dieciseisavos: {
      label: "Dieciseisavos de Final",
      descripcion: "Ronda de 32 — partidos eliminatorios (28 Jun – 3 Jul)",
      fasePenales: true, // <-- Atributo clave indispensable para habilitar el flujo de penales
      partidos: [
        { id:"d01", local:"Sudáfrica",       visitante:"Canadá",               fecha:"28 de junio", hora:"14:00", grupo:null },

        { id:"d02", local:"Brasil",          visitante:"Japón",                fecha:"29 de junio", hora:"12:00", grupo:null },
        { id:"d03", local:"Alemania",        visitante:"Paraguay",             fecha:"29 de junio", hora:"15:30", grupo:null },
        { id:"d04", local:"Países Bajos",    visitante:"Marruecos",            fecha:"29 de junio", hora:"20:00", grupo:null },

        { id:"d05", local:"Costa de Marfil", visitante:"Noruega",              fecha:"30 de junio", hora:"12:00", grupo:null },
        { id:"d06", local:"Francia",         visitante:"Suecia",               fecha:"30 de junio", hora:"16:00", grupo:null },
        { id:"d07", local:"México",          visitante:"Ecuador",              fecha:"30 de junio", hora:"20:00", grupo:null },

        { id:"d08", local:"Inglaterra",      visitante:"null",                 fecha:"1 de julio",  hora:"11:00", grupo:null },
        { id:"d09", local:"Bélgica",         visitante:"null",                 fecha:"1 de julio",  hora:"15:00", grupo:null },
        { id:"d10", local:"Estados Unidos",  visitante:"Bosnia y Herzegovina", fecha:"1 de julio",  hora:"19:00", grupo:null },

        { id:"d11", local:"España",          visitante:"null",                 fecha:"2 de julio",  hora:"14:00", grupo:null },
        { id:"d12", local:"null",            visitante:"Croacia",              fecha:"2 de julio",  hora:"18:00", grupo:null },
        { id:"d13", local:"Suiza",           visitante:"null",                 fecha:"2 de julio",  hora:"22:00", grupo:null },
        
        { id:"d14", local:"Australia",       visitante:"Egipto",               fecha:"3 de julio",  hora:"13:00", grupo:null },
        { id:"d15", local:"Argentina",       visitante:"Cabo Verde",           fecha:"3 de julio",  hora:"17:00", grupo:null },
        { id:"d16", local:"null",            visitante:"Ghana",                fecha:"3 de julio",  hora:"20:30", grupo:null },
      ]
    },

    octavos: {
      label: "Octavos de Final",
      descripcion: "Ronda de 16 (4–7 Jul)",
      partidos: [
        { id:"o01", local:"México",         visitante:"Argentina",     fecha:"4 de julio",  hora:"12:00", grupo:null },
        { id:"o02", local:"Brasil",         visitante:"España",        fecha:"4 de julio",  hora:"16:00", grupo:null },
        { id:"o03", local:"Países Bajos",   visitante:"Suecia",        fecha:"5 de julio",  hora:"15:00", grupo:null },
        { id:"o04", local:"Uruguay",        visitante:"Canadá",        fecha:"5 de julio",  hora:"19:00", grupo:null },
        { id:"o05", local:"Senegal",        visitante:"Marruecos",     fecha:"6 de julio",  hora:"14:00", grupo:null },
        { id:"o06", local:"Estados Unidos", visitante:"Bélgica",       fecha:"6 de julio",  hora:"19:00", grupo:null },
        { id:"o07", local:"Inglaterra",     visitante:"Corea del Sur", fecha:"7 de julio",  hora:"11:00", grupo:null },
        { id:"o08", local:"Noruega",        visitante:"Japón",         fecha:"7 de julio",  hora:"15:00", grupo:null },
      ]
    },

    cuartos: {
      label: "Cuartos de Final",
      descripcion: "Ronda de 8 (9–11 Jul)",
      partidos: [
        { id:"c01", local:"México",       visitante:"Brasil",        fecha:"9 de julio",  hora:"15:00", grupo:null },
        { id:"c02", local:"Países Bajos", visitante:"Uruguay",       fecha:"10 de julio",  hora:"14:00", grupo:null },
        { id:"c03", local:"Senegal",      visitante:"Estados Unidos", fecha:"11 de julio", hora:"16:00", grupo:null },
        { id:"c04", local:"Inglaterra",   visitante:"Noruega",       fecha:"11 de julio", hora:"20:00", grupo:null },
      ]
    },

    semifinales: {
      label: "Semifinales",
      descripcion: "Ronda de 4 (14–15 Jul)",
      partidos: [
        { id:"s01", local:"México",       visitante:"Países Bajos",  fecha:"14 de julio", hora:"14:00", grupo:null },
        { id:"s02", local:"Senegal",      visitante:"Inglaterra",    fecha:"15 de julio", hora:"14:00", grupo:null },
      ]
    },

    final: {
      label: "Final",
      descripcion: "Gran Final — 19 Jul 2026",
      partidos: [
        { id:"f01", local:"México",  visitante:"Senegal",    fecha:"19 de julio", hora:"14:00", grupo:null },
      ]
    },
  },

  ranking: [
    { nombre:"Bruno",       apellido:"Arevalo",      aciertos:12, total:72, campeon: " Portugal | España | Brasil | Francia | Cuartos " },
    { nombre:"Junior",      apellido:"Castro",       aciertos:9, total:70, campeon: " Francia | Alemania | Argentina | Francia | Octavos " }
    
  ],
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