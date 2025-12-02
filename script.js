// ============================================================================
// CONFIGURACIÓN DE URLs DE IMÁGENES
// ============================================================================

const configImagenes = {
    semanas: {
        'semana14': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop',
        'semana13': 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop'
    }
};

// ============================================================================
// SISTEMA DE ECONOMÍA GLOBAL
// ============================================================================

const sistemaEconomia = {
    saldoTotal: 0,
    
    inicializar: function() {
        const datosGuardados = this.cargarDatos();
        if (datosGuardados) {
            this.saldoTotal = datosGuardados.saldoTotal || 0;
        }
        this.actualizarInterfaz();
        console.log("💰 Sistema de economía inicializado. Saldo:", this.saldoTotal);
    },
    
    cargarDatos: function() {
        try {
            const datos = localStorage.getItem('sistemaEconomia');
            return datos ? JSON.parse(datos) : null;
        } catch (e) {
            console.error("Error cargando datos de economía:", e);
            return null;
        }
    },
    
    guardarDatos: function() {
        try {
            localStorage.setItem('sistemaEconomia', JSON.stringify({
                saldoTotal: this.saldoTotal
            }));
            return true;
        } catch (e) {
            console.error("Error guardando datos de economía:", e);
            return false;
        }
    },
    
    agregarDinero: function(cantidad, motivo = "") {
        this.saldoTotal += cantidad;
        this.guardarDatos();
        this.actualizarInterfaz();
        
        console.log(`💰 +${cantidad} S/. ${motivo ? `(${motivo})` : ''} | Saldo total: ${this.saldoTotal} S/.`);
        
        return this.saldoTotal;
    },
    
    actualizarInterfaz: function() {
        const saldoElement = document.getElementById('saldo-total');
        if (saldoElement) {
            saldoElement.textContent = this.saldoTotal;
        }
    }
};

// ============================================================================
// SISTEMA DE MISIONES DIARIAS
// ============================================================================

const misionesDiarias = {
    misiones: [
        { id: 1, nombre: "Completar 1 mazo al 100%", objetivo: 1, progreso: 0, recompensa: 1, completada: false },
        { id: 2, nombre: "Completar 3 mazos al 100%", objetivo: 3, progreso: 0, recompensa: 3, completada: false },
        { id: 3, nombre: "Completar 5 mazos al 100%", objetivo: 5, progreso: 0, recompensa: 5, completada: false }
    ],
    
    mazosCompletadosHoy: 0,
    ultimaFecha: null,
    
    inicializar: function() {
        const hoy = this.obtenerFechaHoy();
        const datosGuardados = this.cargarDatos();
        
        if (!datosGuardados || datosGuardados.ultimaFecha !== hoy) {
            this.reiniciarMisiones();
        } else {
            this.misiones = datosGuardados.misiones;
            this.mazosCompletadosHoy = datosGuardados.mazosCompletadosHoy;
            this.ultimaFecha = datosGuardados.ultimaFecha;
        }
        
        this.actualizarInterfaz();
        console.log("🎯 Sistema de misiones inicializado");
    },
    
    obtenerFechaHoy: function() {
        const ahora = new Date();
        if (ahora.getHours() < 3) {
            ahora.setDate(ahora.getDate() - 1);
        }
        return ahora.toISOString().split('T')[0];
    },
    
    cargarDatos: function() {
        try {
            const datos = localStorage.getItem('misionesDiarias');
            return datos ? JSON.parse(datos) : null;
        } catch (e) {
            console.error("Error cargando misiones:", e);
            return null;
        }
    },
    
    guardarDatos: function() {
        try {
            localStorage.setItem('misionesDiarias', JSON.stringify({
                misiones: this.misiones,
                mazosCompletadosHoy: this.mazosCompletadosHoy,
                ultimaFecha: this.ultimaFecha
            }));
            return true;
        } catch (e) {
            console.error("Error guardando misiones:", e);
            return false;
        }
    },
    
    reiniciarMisiones: function() {
        this.misiones.forEach(mision => {
            mision.progreso = 0;
            mision.completada = false;
        });
        this.mazosCompletadosHoy = 0;
        this.ultimaFecha = this.obtenerFechaHoy();
        this.guardarDatos();
        console.log("🔄 Misiones diarias reiniciadas");
    },
    
    registrarMazoCompletado: function() {
        this.mazosCompletadosHoy++;
        
        this.misiones.forEach(mision => {
            if (!mision.completada) {
                mision.progreso = this.mazosCompletadosHoy;
                
                if (mision.progreso >= mision.objetivo) {
                    this.completarMision(mision);
                }
            }
        });
        
        this.guardarDatos();
        this.actualizarInterfaz();
        
        console.log(`📊 Mazo completado. Total hoy: ${this.mazosCompletadosHoy}`);
    },
    
    completarMision: function(mision) {
        mision.completada = true;
        sistemaEconomia.agregarDinero(mision.recompensa, `Misión ${mision.id} completada`);
        
        console.log(`🎉 Misión ${mision.id} completada! Recompensa: +${mision.recompensa} S/.`);
    },
    
    actualizarInterfaz: function() {
        this.misiones.forEach((mision, index) => {
            const progresoElement = document.getElementById(`mision${index + 1}-progreso`);
            if (progresoElement) {
                progresoElement.textContent = `${Math.min(mision.progreso, mision.objetivo)}/${mision.objetivo}`;
                
                if (mision.completada) {
                    progresoElement.style.color = '#00ff88';
                    progresoElement.style.fontWeight = 'bold';
                }
            }
        });
    }
};

// ============================================================================
// ESTRUCTURA DE LAS SEMANAS
// ============================================================================

const estructuraSemanas = {
    'semana14': {
        nombre: 'Semana 14 - Práctica',
        partes: {
            'parte1': {
                nombre: 'Parte 1 - Alternativas Correctas',
                preguntas: [
                    {
                        pregunta: '1. ¿Qué establece el RPO?',
                        opciones: ['Tiempo máximo de inactividad', 'Cantidad máxima de datos que se pueden perder', 'Tipo de respaldo a realizar'],
                        respuesta: 1
                    },
                    {
                        pregunta: '2. ¿Qué tipo de respaldo copia toda la información completa?',
                        opciones: ['Incremental', 'Diferencial', 'Completo'],
                        respuesta: 2
                    },
                    {
                        pregunta: '3. El respaldo incremental copia:',
                        opciones: ['Todos los datos del sistema', 'Lo cambiado desde el último respaldo incremental o full', 'Solo archivos nuevos'],
                        respuesta: 1
                    },
                    {
                        pregunta: '4. La principal desventaja del respaldo local es:',
                        opciones: ['Es muy lento', 'Requiere internet', 'Riesgo ante desastres locales'],
                        respuesta: 2
                    },
                    {
                        pregunta: '5. El respaldo en la nube requiere obligatoriamente:',
                        opciones: ['Hardware especial', 'Personal técnico', 'Cifrado de datos'],
                        respuesta: 2
                    },
                    {
                        pregunta: '6. ¿Qué etapa según NIST incluye aislar el problema para evitar propagación?',
                        opciones: ['Detección', 'Contención', 'Erradicación'],
                        respuesta: 1
                    },
                    {
                        pregunta: '7. ¿Qué medio es ideal para protección ante desastres físicos?',
                        opciones: ['Disco duro local', 'USB', 'Respaldo off-site'],
                        respuesta: 2
                    },
                    {
                        pregunta: '8. La restauración debe cumplir principalmente con el:',
                        opciones: ['RTO', 'RPO', 'SLA'],
                        respuesta: 0
                    },
                    {
                        pregunta: '9. La validación se realiza para:',
                        opciones: ['Acelerar el proceso', 'Confirmar integridad y funcionamiento', 'Reducir costos'],
                        respuesta: 1
                    },
                    {
                        pregunta: '10. ¿Qué significa CDP?',
                        opciones: ['Complete Data Process', 'Continuous Data Protection', 'Central Data Protocol'],
                        respuesta: 1
                    },
                    {
                        pregunta: '11. ¿Qué etapa incluye elegir el respaldo adecuado?',
                        opciones: ['Preparación', 'Contención', 'Restauración'],
                        respuesta: 2
                    },
                    {
                        pregunta: '12. ¿Quién debe validar que las notas recuperadas son correctas?',
                        opciones: ['Área académica', 'TI', 'Dirección'],
                        respuesta: 0
                    },
                    {
                        pregunta: '13. Un respaldo diferencial copia:',
                        opciones: ['Cambios del día', 'Cambios desde el último full backup', 'Archivos seleccionados'],
                        respuesta: 1
                    },
                    {
                        pregunta: '14. La contención incluye:',
                        opciones: ['Analizar daños', 'Desconectar el equipo afectado', 'Restaurar datos'],
                        respuesta: 1
                    },
                    {
                        pregunta: '15. El almacenamiento en la nube destaca por:',
                        opciones: ['Bajo costo', 'Tener durabilidad extremadamente alta', 'Acceso muy lento'],
                        respuesta: 1
                    },
                    {
                        pregunta: '16. Una desventaja del respaldo off-site es:',
                        opciones: ['Alto costo', 'Falta de seguridad', 'Lenta recuperación si está lejos'],
                        respuesta: 2
                    },
                    {
                        pregunta: '17. El ransomware puede afectar:',
                        opciones: ['Solo datos locales', 'Solo la nube', 'Tanto a datos locales como respaldos conectados'],
                        respuesta: 2
                    },
                    {
                        pregunta: '18. ¿Qué documento exige registrar incidentes críticos?',
                        opciones: ['ISO 9001', 'ISO 27031', 'ISO 14001'],
                        respuesta: 1
                    },
                    {
                        pregunta: '19. ¿Quién autoriza la restauración final?',
                        opciones: ['Usuario afectado', 'Técnico de TI', 'Jefe de sistemas'],
                        respuesta: 2
                    },
                    {
                        pregunta: '20. Los respaldos locales son útiles principalmente porque:',
                        opciones: ['Son gratis', 'No requieren mantenimiento', 'Permiten restauración muy rápida'],
                        respuesta: 2
                    }
                ]
            },
            'parte2': {
                nombre: 'Parte 2 - Verdadero o Falso',
                preguntas: [
                    {
                        pregunta: '21. El respaldo local es suficiente para proteger ante incendios.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 1
                    },
                    {
                        pregunta: '22. El incremental requiere todos los incrementales previos para restaurar.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 0
                    },
                    {
                        pregunta: '23. El RTO mide el tiempo máximo aceptable de inactividad.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 0
                    },
                    {
                        pregunta: '24. El respaldo en la nube no necesita cifrado.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 1
                    },
                    {
                        pregunta: '25. La etapa de validación se realiza después de restaurar.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 0
                    },
                    {
                        pregunta: '26. Un NAS puede ser cifrado por ransomware si está en la misma red.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 0
                    },
                    {
                        pregunta: '27. El respaldo completo genera archivos pequeños y rápidos.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 1
                    },
                    {
                        pregunta: '28. Un respaldo diferencial crece cada día hasta el próximo respaldo completo.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 0
                    },
                    {
                        pregunta: '29. La contención siempre ocurre antes del análisis del daño.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 0
                    },
                    {
                        pregunta: '30. La documentación del incidente es opcional.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 1
                    },
                    {
                        pregunta: '31. El RPO define cuántos datos pueden perderse.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 0
                    },
                    {
                        pregunta: '32. El respaldo off-site se almacena dentro del mismo edificio.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 1
                    },
                    {
                        pregunta: '33. OneDrive y Google Drive pueden funcionar como respaldo en la nube.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 0
                    },
                    {
                        pregunta: '34. Un CDP registra cambios casi en tiempo real.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 0
                    },
                    {
                        pregunta: '35. La restauración se elige según el RPO.',
                        opciones: ['VERDADERO', 'FALSO'],
                        respuesta: 0
                    }
                ]
            },
            'parte3': {
                nombre: 'Parte 3 - Relaciona Conceptos',
                preguntas: [
                    {
                        pregunta: 'Relaciona: Respaldo Completo',
                        opciones: ['4 - Copia de todos los datos', '8 - Copia cambios desde último full', '2 - Protección continua'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Relaciona: Detección y Contención',
                        opciones: ['11 - Identificar y aislar incidente', '9 - Recuperar datos', '3 - Evaluar impacto'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Relaciona: Restauración',
                        opciones: ['9 - Recuperar datos del respaldo', '6 - Registrar lecciones', '1 - Verificar funcionamiento'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Relaciona: Respaldo Continuo (CDP)',
                        opciones: ['2 - Protección continua de datos', '5 - Copia solo cambios', '13 - Proteger infraestructura'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Relaciona: Documentación y Mejora Continua',
                        opciones: ['6 - Registrar lecciones aprendidas', '10 - Autorizar acciones', '7 - Ejecutar tareas'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Relaciona: Respaldo Diferencial',
                        opciones: ['8 - Copia cambios desde último full', '4 - Copia completa', '5 - Copia incremental'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Relaciona: Usuarios responsables del proceso',
                        opciones: ['7 - Ejecutar tareas asignadas', '10 - Tomar decisiones', '13 - Proteger sistemas'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Relaciona: Equipo de TI',
                        opciones: ['7 - Ejecutar tareas técnicas', '1 - Validar resultados', '3 - Analizar daños'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Relaciona: Validación',
                        opciones: ['1 - Verificar que todo funciona', '11 - Contener problema', '9 - Restaurar datos'],
                        respuesta: 0
                    }
                ]
            },
            'parte4': {
                nombre: 'Parte 4 - Respuestas Breves',
                preguntas: [
                    {
                        pregunta: '36. ¿Qué diferencia principal existe entre RPO y RTO?',
                        opciones: ['RPO = datos perdidos, RTO = tiempo inactividad', 'RPO = tiempo, RTO = datos', 'Son lo mismo'],
                        respuesta: 0
                    },
                    {
                        pregunta: '37. ¿Por qué nunca debe dependerse solo del respaldo local?',
                        opciones: ['Puede perderse en desastres físicos', 'Es muy caro', 'Es muy lento'],
                        respuesta: 0
                    },
                    {
                        pregunta: '38. Menciona dos ventajas del respaldo en la nube.',
                        opciones: ['Alta durabilidad y acceso remoto', 'Bajo costo y simplicidad', 'Velocidad y localización'],
                        respuesta: 0
                    },
                    {
                        pregunta: '39. ¿Qué debe analizarse en la etapa de análisis del daño?',
                        opciones: ['Qué, cuándo, cómo y magnitud del impacto', 'Solo el costo', 'Solo quien fue responsable'],
                        respuesta: 0
                    },
                    {
                        pregunta: '40. ¿Por qué es importante verificar la integridad del respaldo?',
                        opciones: ['Para evitar restaurar datos corruptos', 'Para ahorrar tiempo', 'Por requisito legal'],
                        respuesta: 0
                    },
                    {
                        pregunta: '41. ¿Qué sería un ejemplo de respaldo off-site?',
                        opciones: ['Discos en centro de datos externo', 'USB en el mismo edificio', 'Disco duro en el servidor'],
                        respuesta: 0
                    },
                    {
                        pregunta: '42. ¿Por qué un incremental complica la restauración?',
                        opciones: ['Requiere full + todos incrementales', 'Es muy grande', 'No se puede restaurar'],
                        respuesta: 0
                    },
                    {
                        pregunta: '43. ¿Qué información debe registrarse en un incidente?',
                        opciones: ['Fecha, hora, acciones, responsables', 'Solo la solución', 'Solo los costos'],
                        respuesta: 0
                    },
                    {
                        pregunta: '44. ¿Cuál es el rol del área académica en recuperación de notas?',
                        opciones: ['Validar que sean correctas', 'Realizar el backup', 'Autorizar la restauración'],
                        respuesta: 0
                    },
                    {
                        pregunta: '45. ¿Qué acción inicial corresponde a contención ante ransomware?',
                        opciones: ['Desconectar equipo de la red', 'Formatear inmediatamente', 'Llamar a la policía'],
                        respuesta: 0
                    }
                ]
            },
            'parte5': {
                nombre: 'Parte 5 - Casos Prácticos',
                preguntas: [
                    {
                        pregunta: 'Caso A - Falló servidor académico: ¿Qué etapa se realiza al desconectar?',
                        opciones: ['Contención', 'Detección', 'Restauración'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Caso A: ¿Qué respaldo usar según RPO de 2 horas?',
                        opciones: ['Incremental de 2:30 pm', 'Full del día anterior', 'Diferencial'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Caso A: ¿Qué área informar inmediatamente?',
                        opciones: ['Jefe de sistemas / Dirección', 'Área académica', 'Estudiantes'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Caso A: ¿Quién valida notas recuperadas?',
                        opciones: ['Área académica', 'TI', 'Dirección'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Caso B - Ransomware: ¿Por qué NAS resultó afectado?',
                        opciones: ['Estaba en misma red', 'No tenía antivirus', 'Era muy viejo'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Caso B: ¿Qué tipo de respaldo salvó la situación?',
                        opciones: ['Respaldo off-site', 'Respaldo local', 'Respaldo en la nube'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Caso B: ¿Qué etapa es retirar discos del depósito?',
                        opciones: ['Restauración', 'Contención', 'Análisis'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Caso B: ¿Qué demuestra este caso?',
                        opciones: ['Importancia del off-site', 'Que el local es suficiente', 'Que la nube es mala'],
                        respuesta: 0
                    },
                    {
                        pregunta: 'Caso B: ¿Qué medida preventiva añadir?',
                        opciones: ['Aislar NAS de red general', 'Comprar más discos', 'Contratar más personal'],
                        respuesta: 0
                    }
                ]
            }
        }
    },
    'semana13': {
        nombre: 'Semana 13 - Trabajo de Investigación',
        partes: {
            'preguntas': {
                nombre: 'Preguntas de Investigación',
                preguntas: [
                    {
                        pregunta: '1. ¿Qué se entiende por red de computadoras?',
                        opciones: ['Conjunto de equipos interconectados que comparten recursos', 'Grupo de computadoras en una oficina', 'Internet solamente'],
                        respuesta: 0
                    },
                    {
                        pregunta: '2. Diferencia entre seguridad informática y seguridad de red.',
                        opciones: ['Seg. informática protege datos; seg. de red protege infraestructura', 'Son lo mismo', 'Seg. de red es solo para internet'],
                        respuesta: 0
                    },
                    {
                        pregunta: '3. Define: Falla',
                        opciones: ['Interrupción del funcionamiento', 'Error en el código', 'Ataque externo'],
                        respuesta: 0
                    },
                    {
                        pregunta: '4. Define: Error',
                        opciones: ['Defecto en el sistema', 'Falla física', 'Vulnerabilidad'],
                        respuesta: 0
                    },
                    {
                        pregunta: '5. Define: Incidente',
                        opciones: ['Evento que compromete la seguridad', 'Error común', 'Falla menor'],
                        respuesta: 0
                    },
                    {
                        pregunta: '6. Define: Amenaza',
                        opciones: ['Peligro potencial', 'Debilidad del sistema', 'Error humano'],
                        respuesta: 0
                    },
                    {
                        pregunta: '7. Define: Vulnerabilidad',
                        opciones: ['Debilidad explotable', 'Ataque real', 'Error de diseño'],
                        respuesta: 0
                    },
                    {
                        pregunta: '8. Define: Riesgo',
                        opciones: ['Probabilidad de amenaza explote vulnerabilidad', 'Seguro que algo pasará', 'Error inevitable'],
                        respuesta: 0
                    },
                    {
                        pregunta: '9. Diferencia entre falla física y lógica:',
                        opciones: ['Física: hardware; Lógica: software/configuración', 'Ambas son lo mismo', 'Física es temporal; Lógica permanente'],
                        respuesta: 0
                    },
                    {
                        pregunta: '10. Tres principios de seguridad de información:',
                        opciones: ['Confidencialidad, Integridad, Disponibilidad', 'Costo, Velocidad, Calidad', 'Hardware, Software, Personal'],
                        respuesta: 0
                    },
                    {
                        pregunta: '11. ¿Qué es continuidad operativa?',
                        opciones: ['Capacidad de mantener servicios ante fallas', 'Tener backups', 'Tener personal suficiente'],
                        respuesta: 0
                    },
                    {
                        pregunta: '12. ¿Qué es una política de seguridad de red?',
                        opciones: ['Conjunto de reglas para proteger la red', 'Ley del gobierno', 'Contrato con proveedor'],
                        respuesta: 0
                    },
                    {
                        pregunta: '13. Tres objetivos principales de políticas:',
                        opciones: ['Proteger información, Asegurar disponibilidad, Prevenir accesos no autorizados', 'Reducir costos, Aumentar velocidad, Mejorar diseño'],
                        respuesta: 0
                    },
                    {
                        pregunta: '14. Tipos de políticas: Política de acceso',
                        opciones: ['Controla quién accede a qué', 'Define horas de trabajo', 'Establece sanciones'],
                        respuesta: 0
                    },
                    {
                        pregunta: '15. Características de buena política:',
                        opciones: ['Clara, aplicable, actualizable', 'Larga, compleja, técnica', 'Secreta, restrictiva, punitiva'],
                        respuesta: 0
                    },
                    {
                        pregunta: '16. ¿Qué es documento de política?',
                        opciones: ['Documento formal que establece normas', 'Contrato legal', 'Manual de usuario'],
                        respuesta: 0
                    },
                    {
                        pregunta: '17. ¿Quiénes deben participar en políticas?',
                        opciones: ['TI, dirección, legal, usuarios', 'Solo TI', 'Solo dirección'],
                        respuesta: 0
                    },
                    {
                        pregunta: '18. ¿Por qué documentar y comunicar?',
                        opciones: ['Para asegurar cumplimiento y crear conciencia', 'Por requisito legal', 'Para llenar papeles'],
                        respuesta: 0
                    },
                    {
                        pregunta: '19. ISO/IEC 27001 objetivo:',
                        opciones: ['Establecer Sistema de Gestión de Seguridad de la Información', 'Controlar calidad', 'Gestionar proyectos'],
                        respuesta: 0
                    },
                    {
                        pregunta: '20. NIST SP 800-53 objetivo:',
                        opciones: ['Controles de seguridad', 'Estándares de hardware', 'Protocolos de red'],
                        respuesta: 0
                    }
                ]
            }
        }
    }
};

// ============================================================================
// VARIABLES GLOBALES
// ============================================================================

let semanaActual = '';
let parteActual = '';
let mazoActual = [];
let preguntaActual = 0;
let respuestasCorrectas = 0;
let respuestasIncorrectas = 0;

// ============================================================================
// FUNCIONES PRINCIPALES
// ============================================================================

function cargarSemana(semanaId, parteId) {
    if (estructuraSemanas[semanaId] && estructuraSemanas[semanaId].partes[parteId]) {
        semanaActual = semanaId;
        parteActual = parteId;
        
        const semana = estructuraSemanas[semanaId];
        const parte = semana.partes[parteId];
        
        document.getElementById('titulo-semana').textContent = semana.nombre;
        document.getElementById('nombre-semana').textContent = parte.nombre;
        
        // Crear mazos (en este caso solo uno por parte)
        const contenedorMazos = document.getElementById('contenedor-mazos');
        contenedorMazos.innerHTML = '';
        
        const mazoDiv = document.createElement('div');
        mazoDiv.className = 'mazo-card';
        mazoDiv.onclick = () => cargarMazo();
        
        mazoDiv.innerHTML = `
            <img src="${configImagenes.semanas[semanaId]}" alt="${parte.nombre}" class="mazo-imagen">
            <div class="mazo-texto">${parte.nombre}</div>
            <div class="mazo-info">${parte.preguntas.length} preguntas</div>
        `;
        
        contenedorMazos.appendChild(mazoDiv);
        
        cambiarPantalla('pantalla-mazos');
    }
}

function cargarMazo() {
    const semana = estructuraSemanas[semanaActual];
    const parte = semana.partes[parteActual];
    
    if (parte && parte.preguntas) {
        mazoActual = [...parte.preguntas];
        preguntaActual = 0;
        respuestasCorrectas = 0;
        respuestasIncorrectas = 0;
        
        mezclarPreguntas();
        cambiarPantalla('pantalla-quiz');
        mostrarPregunta();
    }
}

function mezclarPreguntas() {
    for (let i = mazoActual.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [mazoActual[i], mazoActual[j]] = [mazoActual[j], mazoActual[i]];
    }
}

function mostrarPregunta() {
    if (preguntaActual < mazoActual.length) {
        const pregunta = mazoActual[preguntaActual];
        
        document.getElementById('numero-pregunta').textContent = preguntaActual + 1;
        document.getElementById('total-preguntas').textContent = mazoActual.length;
        document.getElementById('palabra-japones').textContent = pregunta.pregunta;
        document.getElementById('lectura').textContent = '';
        document.getElementById('resultado').textContent = '';
        document.getElementById('resultado').className = 'resultado';
        document.getElementById('boton-siguiente').style.display = 'none';
        
        const contenedorOpciones = document.getElementById('contenedor-opciones');
        contenedorOpciones.innerHTML = '';
        
        const opcionesMezcladas = [...pregunta.opciones];
        for (let i = opcionesMezcladas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [opcionesMezcladas[i], opcionesMezcladas[j]] = [opcionesMezcladas[j], opcionesMezcladas[i]];
        }
        
        opcionesMezcladas.forEach((opcion, index) => {
            const botonOpcion = document.createElement('button');
            botonOpcion.className = 'opcion';
            botonOpcion.textContent = opcion;
            botonOpcion.onclick = () => verificarRespuesta(opcion, pregunta.opciones[pregunta.respuesta]);
            contenedorOpciones.appendChild(botonOpcion);
        });
    } else {
        mostrarResultados();
    }
}

// FUNCIÓN CON NAVEGACIÓN AUTOMÁTICA
function verificarRespuesta(respuestaSeleccionada, respuestaCorrecta) {
    const opciones = document.querySelectorAll('.opcion');
    const resultado = document.getElementById('resultado');
    
    opciones.forEach(opcion => {
        opcion.disabled = true;
    });
    
    opciones.forEach(opcion => {
        if (opcion.textContent === respuestaCorrecta) {
            opcion.classList.add('correcta');
        } else if (opcion.textContent === respuestaSeleccionada && respuestaSeleccionada !== respuestaCorrecta) {
            opcion.classList.add('incorrecta');
        }
    });
    
    if (respuestaSeleccionada === respuestaCorrecta) {
        resultado.textContent = '¡Correcto! ✓';
        resultado.className = 'resultado correcto';
        respuestasCorrectas++;
        
        // Navegación automática después de 1 segundo
        setTimeout(() => {
            siguientePregunta();
        }, 1000);
        
    } else {
        resultado.textContent = `✗ Incorrecto. Respuesta: ${respuestaCorrecta}`;
        resultado.className = 'resultado incorrecto';
        respuestasIncorrectas++;
        
        // Mostrar botón "Continuar" solo para respuestas incorrectas
        document.getElementById('boton-siguiente').style.display = 'block';
    }
}

function siguientePregunta() {
    preguntaActual++;
    mostrarPregunta();
}

function mostrarResultados() {
    const porcentaje = Math.round((respuestasCorrectas / mazoActual.length) * 100);
    
    if (porcentaje === 100) {
        misionesDiarias.registrarMazoCompletado();
        sistemaEconomia.agregarDinero(1, "Mazo completado al 100%");
        mostrarVideoRecompensa();
    } else if (porcentaje >= 80) {
        misionesDiarias.registrarMazoCompletado();
        sistemaEconomia.agregarDinero(0.5, "Mazo completado al 80%");
        mostrarPantallaResultados(porcentaje);
    } else {
        mostrarPantallaResultados(porcentaje);
    }
}

function mostrarPantallaResultados(porcentaje) {
    cambiarPantalla('pantalla-resultados');
    
    const resultadoFinal = document.getElementById('resultado-final');
    
    resultadoFinal.innerHTML = `
        📊 RESULTADOS:
        
        Preguntas totales: ${mazoActual.length}
        Respuestas correctas: ${respuestasCorrectas}
        Respuestas incorrectas: ${respuestasIncorrectas}
        Porcentaje de aciertos: ${porcentaje}%
        
        ${porcentaje >= 90 ? '🏆 ¡Excelente! Dominas el tema.' : 
          porcentaje >= 70 ? '👍 Buen trabajo, pero puedes mejorar.' : 
          '💪 Sigue practicando, lo lograrás.'}
    `;
}

function mostrarVideoRecompensa() {
    cambiarPantalla('pantalla-video-recompensa');
    
    const videoElement = document.getElementById('video-recompensa');
    videoElement.src = "Belinda.mp4";
    videoElement.loop = true;
    videoElement.play().catch(e => {
        console.log("Autoplay bloqueado");
    });
}

function cerrarVideoRecompensaMazo() {
    const videoElement = document.getElementById('video-recompensa');
    if (videoElement) {
        videoElement.pause();
        videoElement.currentTime = 0;
    }
    
    const porcentaje = Math.round((respuestasCorrectas / mazoActual.length) * 100);
    mostrarPantallaResultados(porcentaje);
}

// ============================================================================
// FUNCIONES DE NAVEGACIÓN
// ============================================================================

function cambiarPantalla(idPantalla) {
    document.querySelectorAll('.pantalla').forEach(pantalla => {
        pantalla.classList.remove('activa');
    });
    document.getElementById(idPantalla).classList.add('activa');
}

function volverAlInicio() {
    cambiarPantalla('pantalla-inicio');
}

function volverAMazos() {
    cambiarPantalla('pantalla-mazos');
}

function repetirQuiz() {
    preguntaActual = 0;
    respuestasCorrectas = 0;
    respuestasIncorrectas = 0;
    mezclarPreguntas();
    cambiarPantalla('pantalla-quiz');
    mostrarPregunta();
}

// ============================================================================
// SISTEMA RPG DE NOVIA (se mantiene igual que antes)
// ============================================================================

const rpgNovia = {
    estado: {
        nombreNovia: "Sakura",
        nivelRelacion: 1,
        experiencia: 0,
        afinidad: 50,
        estadoAnimo: "feliz",
        energia: 100,
        ultimaVisita: null,
        conversacionesDesbloqueadas: [],
        escenasDesbloqueadas: []
    },
    
    economia: {
        moneda: "S/.",
        nombre: "Soles",
        saldo: 0,
        inventario: {
            condones: 0,
            flores: 0,
            chocolates: 0,
            joyas: 0
        }
    },
    
    contenidoAdulto: {
        desbloqueado: false,
        escenasDisponibles: [
            { id: "beso", nombre: "Beso Apasionado", costoCondones: 1, afinidadRequerida: 30 },
            { id: "caricias", nombre: "Carícias Íntimas", costoCondones: 1, afinidadRequerida: 50 },
            { id: "intimidad1", nombre: "Primera Noche", costoCondones: 1, afinidadRequerida: 70 },
            { id: "intimidad2", nombre: "Noche de Pasión", costoCondones: 2, afinidadRequerida: 85 }
        ],
        escenasCompletadas: []
    },
    
    conversaciones: {
        saludos: [
            "¡Hola mi amor! 💕 ¿Cómo estás?",
            "¡Qué alegría verte! 😊",
            "Te extrañaba tanto... 🥰",
            "¡Mi vida ha llegado! 💖"
        ],
        conversacionesNormales: [
            { pregunta: "¿Qué has hecho hoy?", respuestas: ["Estudié mucho 💪", "Pensé en ti todo el día 😘", "Practiqué para mis exámenes 📚"] },
            { pregunta: "¿Te gustaría salir?", respuestas: ["¡Claro! Donde tú quieras 💃", "Solo contigo iría a cualquier lugar 🌸", "Me encanta pasar tiempo contigo 🎮"] }
        ]
    }
};

function iniciarRPGNovia() {
    cambiarPantalla('pantalla-rpg-novia');
    actualizarInterfazRPG();
}

function actualizarInterfazRPG() {
    document.getElementById('nombre-novia').textContent = rpgNovia.estado.nombreNovia;
    document.getElementById('nivel-relacion').textContent = `Nivel ${rpgNovia.estado.nivelRelacion}`;
    document.getElementById('afinidad').textContent = `${rpgNovia.estado.afinidad}%`;
    
    rpgNovia.economia.saldo = sistemaEconomia.saldoTotal;
    document.getElementById('saldo-rpg').textContent = `${rpgNovia.economia.saldo} ${rpgNovia.economia.moneda}`;
    
    document.getElementById('condones-inventario').textContent = rpgNovia.economia.inventario.condones;
    
    const barraAfinidad = document.getElementById('barra-afinidad');
    barraAfinidad.style.width = `${rpgNovia.estado.afinidad}%`;
    
    document.getElementById('estado-animo').textContent = obtenerEmojiEstadoAnimo(rpgNovia.estado.estadoAnimo);
    
    const seccionAdulto = document.getElementById('seccion-adulto');
    seccionAdulto.style.display = rpgNovia.contenidoAdulto.desbloqueado ? 'block' : 'none';
    
    generarDialogoAleatorio();
}

function obtenerEmojiEstadoAnimo(estado) {
    const emojis = {
        feliz: "😊",
        enamorada: "🥰",
        excitada: "😳",
        juguetona: "😏",
        timida: "😊",
        pasional: "🔥"
    };
    return emojis[estado] || "😊";
}

function generarDialogoAleatorio() {
    const dialogoElement = document.getElementById('dialogo-novia');
    const saludos = rpgNovia.conversaciones.saludos;
    const saludoAleatorio = saludos[Math.floor(Math.random() * saludos.length)];
    
    dialogoElement.innerHTML = `
        <div class="dialogo-burbuja">
            <div class="texto-dialogo">${saludoAleatorio}</div>
            <div class="tiempo-dialogo">Ahora</div>
        </div>
    `;
}

function hablarConNovia() {
    const conversaciones = rpgNovia.estado.afinidad >= 60 ? 
        rpgNovia.conversaciones.conversacionesNormales : 
        rpgNovia.conversaciones.conversacionesNormales;
    
    const conversacion = conversaciones[Math.floor(Math.random() * conversaciones.length)];
    const respuesta = conversacion.respuestas[Math.floor(Math.random() * conversacion.respuestas.length)];
    
    const dialogoElement = document.getElementById('dialogo-novia');
    dialogoElement.innerHTML = `
        <div class="dialogo-burbuja">
            <div class="pregunta-dialogo">${conversacion.pregunta}</div>
            <div class="texto-dialogo">${respuesta}</div>
            <div class="tiempo-dialogo">Ahora</div>
        </div>
    `;
    
    aumentarAfinidad(2);
}

function aumentarAfinidad(cantidad) {
    rpgNovia.estado.afinidad = Math.min(100, rpgNovia.estado.afinidad + cantidad);
    actualizarInterfazRPG();
    
    if (rpgNovia.estado.afinidad >= 30 && !rpgNovia.contenidoAdulto.desbloqueado) {
        rpgNovia.contenidoAdulto.desbloqueado = true;
        mostrarMensajeRPG("¡Nueva sección desbloqueada! 💕");
    }
}

function regalarItem(tipo) {
    const costos = {
        flores: 5,
        chocolates: 10,
        joyas: 20
    };
    
    if (rpgNovia.economia.saldo >= costos[tipo]) {
        rpgNovia.economia.saldo -= costos[tipo];
        sistemaEconomia.agregarDinero(-costos[tipo], `Regalo de ${tipo}`);
        rpgNovia.economia.inventario[tipo]++;
        
        const afinidadGanada = {
            flores: 5,
            chocolates: 8,
            joyas: 15
        };
        
        aumentarAfinidad(afinidadGanada[tipo]);
        mostrarMensajeRPG(`Le regalaste ${tipo} a ${rpgNovia.estado.nombreNovia} 💝`);
    } else {
        mostrarMensajeRPG("No tienes suficiente dinero 💸");
    }
}

function comprarCondones() {
    const costo = 15;
    if (rpgNovia.economia.saldo >= costo) {
        rpgNovia.economia.saldo -= costo;
        sistemaEconomia.agregarDinero(-costo, "Compra de condones");
        rpgNovia.economia.inventario.condones++;
        actualizarInterfazRPG();
        mostrarMensajeRPG("¡Condones comprados! 💕");
    } else {
        mostrarMensajeRPG("No tienes suficiente dinero para comprar condones 💸");
    }
}

function usarCondon(escenaId) {
    if (rpgNovia.economia.inventario.condones <= 0) {
        mostrarMensajeRPG("No tienes condones disponibles 💔");
        return;
    }
    
    const escena = rpgNovia.contenidoAdulto.escenasDisponibles.find(e => e.id === escenaId);
    
    if (!escena) {
        mostrarMensajeRPG("Escena no encontrada");
        return;
    }
    
    if (rpgNovia.estado.afinidad < escena.afinidadRequerida) {
        mostrarMensajeRPG(`Necesitas ${escena.afinidadRequerida}% de afinidad para esta escena 💝`);
        return;
    }
    
    rpgNovia.economia.inventario.condones -= escena.costoCondones;
    aumentarAfinidad(10);
    mostrarMensajeRPG(`¡Disfrutaste ${escena.nombre} con ${rpgNovia.estado.nombreNovia}! 💖`);
    actualizarInterfazRPG();
}

function mostrarMensajeRPG(mensaje) {
    const mensajeElement = document.getElementById('mensaje-rpg');
    mensajeElement.textContent = mensaje;
    mensajeElement.style.display = 'block';
    
    setTimeout(() => {
        mensajeElement.style.display = 'none';
    }, 3000);
}

// ============================================================================
// INICIALIZACIÓN
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
    console.log("🚀 Aplicación cargada - Inicializando sistemas...");
    
    sistemaEconomia.inicializar();
    misionesDiarias.inicializar();
    
    console.log("✅ Sistemas inicializados correctamente");
});

// ============================================================================
// FUNCIONES PARA TESTING
// ============================================================================

window.agregarDinero = function(cantidad) {
    sistemaEconomia.agregarDinero(cantidad, "Testing");
};

window.verEstado = function() {
    console.log("Saldo:", sistemaEconomia.saldoTotal);
    console.log("Misiones:", misionesDiarias.misiones);
};
