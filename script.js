// ====== CONFIGURACIÓN Y DATOS ======
const audio = {
    menu: document.getElementById('bgm-menu'),
    facil: document.getElementById('bgm-facil'),
    normal: document.getElementById('bgm-normal'),
    dificil: document.getElementById('bgm-dificil'),
    tutorial: document.getElementById('bgm-tutorial'),
    supervivencia: document.getElementById('bgm-supervivencia'),
    moneda: document.getElementById('bgm-moneda'),
    kaboom: document.getElementById('bgm-kaboom'),
    click: document.getElementById('sfx-click'),
    punto: document.getElementById('sfx-punto'),
    explosion: document.getElementById('sfx-explosion'),
    desactivacion: document.getElementById('sfx-desactivacion')
};

let audioUnlocked = false;
let currentBGM = 'menu';

function unlockAudioAndHide() {
    audioUnlocked = true;
    const btn = document.getElementById('audio-unlock-container');
    if(btn) btn.style.display = 'none';
    playBGM(currentBGM);
}

function playBGM(id) {
    currentBGM = id;
    if(!audioUnlocked) return;
    Object.keys(audio).forEach(k => {
        if(!['click','punto','explosion','desactivacion'].includes(k) && audio[k]) {
            audio[k].pause(); audio[k].currentTime = 0;
        }
    });
    if(audio[id]) {
        audio[id].volume = 0.4;
        audio[id].play().catch(e => console.warn('No se pudo reproducir ' + id + ': ' + e.message));
    }
}

function playSFX(id) {
    if(!audioUnlocked || !audio[id]) return;
    audio[id].currentTime = 0;
    audio[id].volume = 0.6;
    audio[id].play().catch(()=>{});
}

// AVISO SI ALGÚN AUDIO NO SE ENCUENTRA (revisa que la carpeta "audio" esté junto a index.html y los nombres coincidan)
const missingAudio = [];
function reportMissingAudio(a) {
    const f = a.getAttribute('src');
    if(missingAudio.includes(f)) return;
    missingAudio.push(f);
    console.warn('No se pudo cargar el audio: ' + f);
    let box = document.getElementById('audio-warning');
    if(!box) {
        box = document.createElement('div');
        box.id = 'audio-warning';
        box.className = 'fixed bottom-1 left-1 z-[200] bg-red-900/90 text-white text-[8px] p-1 rounded max-w-[70%]';
        document.body.appendChild(box);
    }
    box.innerText = 'Audio no encontrado: ' + missingAudio.join(', ');
}
Object.values(audio).forEach(a => { if(a) a.addEventListener('error', () => reportMissingAudio(a)); });
window.addEventListener('load', () => {
    Object.values(audio).forEach(a => { if(a && (a.error || a.networkState === 3)) reportMissingAudio(a); });
});

// BARAJA
const POLLITO_CARDS = [
    { id: 'p1', name: 'Ing. Industrial', icon: 'fa-industry' },
    { id: 'p2', name: 'Veterinaria', icon: 'fa-stethoscope' },
    { id: 'p3', name: 'Ing. Sistemas', icon: 'fa-laptop-code' },
    { id: 'p4', name: 'Médico', icon: 'fa-user-doctor' },
    { id: 'p5', name: 'Arquitecto', icon: 'fa-compass-drafting' },
    { id: 'p6', name: 'Abogado', icon: 'fa-scale-balanced' },
    { id: 'p7', name: 'Profesor', icon: 'fa-chalkboard-user' },
    { id: 'p8', name: 'Chef', icon: 'fa-utensils' },
    { id: 'p9', name: 'Astronauta', icon: 'fa-user-astronaut' },
    { id: 'p10', name: 'Mecatrónico', icon: 'fa-robot' },
    { id: 'p11', name: 'Químico', icon: 'fa-flask' },
    { id: 'p12', name: 'Diseñador', icon: 'fa-palette' },
    { id: 'p13', name: 'Bombero', icon: 'fa-fire-extinguisher' },
    { id: 'p14', name: 'Detective', icon: 'fa-user-shield' },
    { id: 'p15', name: 'Piloto', icon: 'fa-plane' },
    { id: 'p16', name: 'Ing. Civil', icon: 'fa-helmet-safety' },
    { id: 'p17', name: 'Ing. Eléctrico', icon: 'fa-plug' },
    { id: 'p18', name: 'Enfermero', icon: 'fa-syringe' },
    { id: 'p19', name: 'Dentista', icon: 'fa-tooth' },
    { id: 'p20', name: 'Contador', icon: 'fa-calculator' },
    { id: 'p21', name: 'Psicólogo', icon: 'fa-brain' },
    { id: 'p22', name: 'Programador', icon: 'fa-code' },
    { id: 'p23', name: 'Periodista', icon: 'fa-newspaper' },
    { id: 'p24', name: 'Músico', icon: 'fa-music' },
    { id: 'p25', name: 'Ing. Ambiental', icon: 'fa-leaf' }
];
const BOMBA_CARDS = [
    { id: 'b1', name: 'Calcetín Apestoso', icon: 'fa-shoe-prints' },
    { id: 'b2', name: 'B. Atómica', icon: 'fa-radiation' },
    { id: 'b3', name: 'Dinamita', icon: 'fa-burst' },
    { id: 'b4', name: 'Mina', icon: 'fa-land-mine-on' },
    { id: 'b5', name: 'Humo', icon: 'fa-smog' },
    { id: 'b6', name: 'Granada', icon: 'fa-volcano' },
    { id: 'b7', name: 'Agua', icon: 'fa-droplet' },
    { id: 'b8', name: 'Reloj', icon: 'fa-stopwatch' },
    { id: 'b9', name: 'C4', icon: 'fa-box' },
    { id: 'b10', name: 'Pastel Fétido', icon: 'fa-cake-candles' },
    { id: 'b11', name: 'Destellos', icon: 'fa-bolt' },
    { id: 'b12', name: 'Molotov', icon: 'fa-fire' },
    { id: 'b13', name: 'EMP', icon: 'fa-plug-circle-xmark' },
    { id: 'b14', name: 'Picante', icon: 'fa-pepper-hot' },
    { id: 'b15', name: 'Hielo', icon: 'fa-snowflake' },
    { id: 'b16', name: 'Confeti', icon: 'fa-gift' },
    { id: 'b17', name: 'Glitter', icon: 'fa-wand-magic-sparkles' },
    { id: 'b18', name: 'Mal Aliento', icon: 'fa-wind' },
    { id: 'b19', name: 'Lodo', icon: 'fa-poo' },
    { id: 'b20', name: 'Tarea', icon: 'fa-book' },
    { id: 'b21', name: 'Examen', icon: 'fa-pencil' },
    { id: 'b22', name: 'Lunes', icon: 'fa-calendar-day' },
    { id: 'b23', name: 'Spoiler', icon: 'fa-eye-slash' },
    { id: 'b24', name: 'Queso Fétido', icon: 'fa-cheese' },
    { id: 'b25', name: 'Fantasma', icon: 'fa-ghost' }
];

const MOTIVATIONAL = [
    "No te rindas, eres alguien especial que puede lograr muchas cosas.",
    "El éxito es la suma de pequeños esfuerzos.",
    "Un pollito valiente vale por dos.",
    "El fracaso es solo la oportunidad de empezar de nuevo con más inteligencia.",
    "Cree en ti, incluso cuando las bombas caigan." // Añadir hasta 100 en tu versión final
];

const RIVAL_ANIMALS = [
    { name: 'Paloma migajera', icon: 'fa-dove' }, { name: 'Perro cobarde', icon: 'fa-dog' },
    { name: 'Vaca sin cola', icon: 'fa-cow' }, { name: 'Gato miserable', icon: 'fa-cat' },
    { name: 'Pingüino espía', icon: 'fa-user-secret' }, { name: 'Pez poca memoria', icon: 'fa-fish' },
    { name: 'Toro sin cuernos', icon: 'fa-circle' }, { name: 'Venado huérfano', icon: 'fa-square' },
    { name: 'Panda kung fu', icon: 'fa-paw' }, { name: 'Cabra veloz', icon: 'fa-play' },
    { name: 'Ganso fuerte', icon: 'fa-star' }, { name: 'Hormiga inventora', icon: 'fa-bug' },
    { name: 'Elefante orejón', icon: 'fa-circle' }, { name: 'Conejo presumido', icon: 'fa-carrot' },
    { name: 'Pato loco', icon: 'fa-square' }, { name: 'Gato zombie', icon: 'fa-cat' }
];

// RIVALES FÁCIL: animales con profesión
const RIVAL_ANIMALS_PROF = [
    { name: 'Gato chef', icon: 'fa-cat' }, { name: 'Perro policía', icon: 'fa-dog' },
    { name: 'Rana doctora', icon: 'fa-frog' }, { name: 'Vaca barista', icon: 'fa-cow' },
    { name: 'Paloma cartera', icon: 'fa-dove' }, { name: 'Pez buzo', icon: 'fa-fish' },
    { name: 'Caballo repartidor', icon: 'fa-horse' }, { name: 'Hipopótamo bombero', icon: 'fa-hippo' },
    { name: 'Nutria arquitecta', icon: 'fa-otter' }, { name: 'Cuervo detective', icon: 'fa-crow' },
    { name: 'Araña programadora', icon: 'fa-spider' }, { name: 'Hormiga ingeniera', icon: 'fa-bug' },
    { name: 'Gusano electricista', icon: 'fa-worm' }, { name: 'Dragón cocinero', icon: 'fa-dragon' },
    { name: 'Conejo contador', icon: 'fa-carrot' }
];

// RIVALES MEDIO: profesionistas con humor mexicano
const RIVAL_PROFESIONISTAS = [
    { name: 'Panadero con el pan', icon: 'fa-bread-slice' }, { name: 'Abogado nervioso', icon: 'fa-scale-balanced' },
    { name: 'Taquero sin cebolla', icon: 'fa-pepper-hot' }, { name: 'Mecánico «ahorita lo checo»', icon: 'fa-wrench' },
    { name: 'Médico con letra ilegible', icon: 'fa-user-doctor' }, { name: 'Plomero «ya mero llego»', icon: 'fa-faucet' },
    { name: 'Albañil «mañana sin falta»', icon: 'fa-helmet-safety' }, { name: 'Contador huyendo del SAT', icon: 'fa-calculator' },
    { name: 'Cartero con perro furioso', icon: 'fa-envelope' }, { name: 'Chef sin cilantro', icon: 'fa-utensils' },
    { name: 'Programador sin wifi', icon: 'fa-laptop-code' }, { name: 'Maestro con 40 tareas por revisar', icon: 'fa-chalkboard-user' },
    { name: 'Chofer de micro desvelado', icon: 'fa-bus' }, { name: 'Mesero «ahorita le traigo»', icon: 'fa-bell-concierge' },
    { name: 'Peluquero «nomás despuntamos»', icon: 'fa-scissors' }, { name: 'Tamalero con megáfono', icon: 'fa-bullhorn' },
    { name: 'Electricista con cables cruzados', icon: 'fa-plug' }
];

// RIVALES DIFÍCIL: personajes históricos con profesión
const RIVAL_HISTORICOS = [
    { name: 'Nikola Tesla, inventor', icon: 'fa-bolt' }, { name: 'Albert Einstein, físico', icon: 'fa-atom' },
    { name: 'Marie Curie, química', icon: 'fa-flask' }, { name: 'Leonardo da Vinci, inventor y pintor', icon: 'fa-palette' },
    { name: 'Isaac Newton, matemático', icon: 'fa-apple-whole' }, { name: 'Galileo Galilei, astrónomo', icon: 'fa-moon' },
    { name: 'Ada Lovelace, programadora', icon: 'fa-laptop-code' }, { name: 'Thomas Edison, inventor', icon: 'fa-lightbulb' },
    { name: 'Frida Kahlo, pintora', icon: 'fa-paintbrush' }, { name: 'Sor Juana, poeta', icon: 'fa-feather-pointed' },
    { name: 'Miguel de Cervantes, escritor', icon: 'fa-book-open' }, { name: 'Mozart, compositor', icon: 'fa-music' },
    { name: 'Cleopatra, reina', icon: 'fa-crown' }, { name: 'Napoleón, estratega', icon: 'fa-chess-king' },
    { name: 'Charles Darwin, naturalista', icon: 'fa-leaf' }, { name: 'Sigmund Freud, psicoanalista', icon: 'fa-brain' },
    { name: 'Pitágoras, matemático', icon: 'fa-ruler-combined' }, { name: 'Copérnico, astrónomo', icon: 'fa-sun' }
];

function getRivalPool(mode) {
    if(mode === 'facil') return RIVAL_ANIMALS_PROF;
    if(mode === 'normal') return RIVAL_PROFESIONISTAS;
    if(mode === 'dificil') return RIVAL_HISTORICOS;
    return RIVAL_ANIMALS; // tutorial y supervivencia
}

// TEXTOS DE LA COLECCIÓN (se ven al desbloquear la carta)
const CARD_TEXTS = {
    p1: 'Todo empezó a principios del siglo XX, cuando Frederick Taylor y el matrimonio Gilbreth se pusieron a medir tiempos y movimientos para que las fábricas trabajaran mejor.',
    p2: 'La primera escuela de veterinaria del mundo se fundó en Lyon, Francia, en 1762, para frenar las plagas que acababan con el ganado.',
    p3: 'En 1843, Ada Lovelace escribió el primer algoritmo pensado para una máquina: la Máquina Analítica de Charles Babbage, que nunca llegó a terminarse.',
    p4: 'Hace unos 2,400 años, Hipócrates separó la medicina de la magia y la basó en observar al paciente. Por eso lo llaman el padre de la medicina.',
    p5: 'Imhotep diseñó la pirámide escalonada de Djoser hace unos 4,600 años y es de los primeros arquitectos de quienes se conoce el nombre.',
    p6: 'En la antigua Roma nacieron los juristas y abogados profesionales. Cicerón, famoso por sus discursos en los tribunales, fue uno de los más célebres.',
    p7: 'Platón fundó la Academia en Atenas hacia el 387 a. C., una de las primeras escuelas de enseñanza superior de Occidente. Su alumno más famoso fue Aristóteles.',
    p8: 'A fines del siglo XIX, Auguste Escoffier organizó las cocinas en brigadas, con cada cocinero en su estación. Los restaurantes todavía trabajan así.',
    p9: 'El 12 de abril de 1961, Yuri Gagarin fue el primer ser humano en viajar al espacio y le dio una vuelta a la Tierra en unos 108 minutos.',
    p10: 'La palabra «mecatrónica» la inventó en 1969 el ingeniero japonés Tetsuro Mori, de la empresa Yaskawa, para unir mecánica y electrónica.',
    p11: 'Antoine Lavoisier demostró en el siglo XVIII que la materia no se crea ni se destruye, solo se transforma. Con eso nació la química moderna.',
    p12: 'En 1919, Walter Gropius fundó la Bauhaus en Alemania, la escuela que mezcló arte, artesanía e industria y cambió el diseño para siempre.',
    p13: 'Hace unos 2,000 años, el emperador Augusto creó en Roma los Vigiles, un cuerpo que patrullaba las calles y apagaba incendios.',
    p14: 'En 1833, el francés Eugène François Vidocq abrió la que se considera la primera agencia de detectives privados de la historia.',
    p15: 'El 17 de diciembre de 1903, los hermanos Wright lograron el primer vuelo con motor de la historia. El primero duró apenas 12 segundos.',
    p16: 'John Smeaton, en el siglo XVIII, fue de los primeros en llamarse a sí mismo «ingeniero civil» para distinguirse de los ingenieros militares.',
    p17: 'En 1882, Thomas Edison abrió en Nueva York la estación Pearl Street, una de las primeras centrales eléctricas comerciales del mundo.',
    p18: 'Florence Nightingale cuidó soldados en la guerra de Crimea y en 1860 fundó una escuela de enfermería en Londres que sentó las bases de la profesión moderna.',
    p19: 'En 1728, el francés Pierre Fauchard publicó el primer tratado completo sobre los dientes, por eso se le considera el padre de la odontología moderna.',
    p20: 'En 1494, el fraile Luca Pacioli publicó un libro que explicaba la contabilidad por partida doble, un método que se sigue usando hoy.',
    p21: 'En 1879, Wilhelm Wundt abrió en Leipzig el primer laboratorio de psicología experimental, y la psicología empezó a trabajar como ciencia.',
    p22: 'Grace Hopper creó en 1952 uno de los primeros compiladores, para poder programar con palabras en lugar de solo con números.',
    p23: 'El primer periódico impreso salió en Estrasburgo en 1605, publicado por Johann Carolus.',
    p24: 'Las flautas de hueso más antiguas que se conocen tienen unos 40,000 años: la música es más vieja que la escritura.',
    p25: 'El libro «Primavera silenciosa» de Rachel Carson (1962) y el primer Día de la Tierra (1970) despertaron al mundo para cuidar el ambiente, y de ahí tomó fuerza esta carrera.',

    b1: 'Lleva tres semanas sin lavarse. Hasta los zapatos le piden que se aleje.',
    b2: 'Hizo tanto ruido que hasta el vecino que nunca saluda se asomó.',
    b3: 'Chiquita, roja y con muy mal carácter. No le preguntes la hora.',
    b4: 'Se hace la dormida bajo la tierra. Cuando la pisas, ya no es tan tímida.',
    b5: 'Explota sin ruido, pero tu ropa huele a asado por tres días.',
    b6: 'No es fruta, y nadie le quiere sacar los gajos.',
    b7: 'De niña soñaba con ser globo. Ahora ataca primos desprevenidos en vacaciones.',
    b8: 'Hace tic, tac, tic, tac... igualito que tu mamá esperándote en la puerta.',
    b9: 'Dice C4, pero hace como cuarenta de ruido.',
    b10: 'Era de tres leches. Ahora es de tres semanas. Nadie quiere probarlo.',
    b11: 'Un destello y listo: ahora ves estrellitas, como cuando te paras muy rápido.',
    b12: 'Es un cóctel, pero nadie lo quiere tomar. Ni con limón.',
    b13: 'Apagó todo: el radio, la tele y el wifi del vecino. Por fin, paz.',
    b14: 'El taquero dijo «no pica». Y tú le creíste.',
    b15: 'Te dejó más frío que un «ok» de tu crush.',
    b16: 'Explota de alegría. Lo malo: tú vas a barrer después.',
    b17: 'Lo limpias hoy y aparece dentro de tres años en tu café.',
    b18: 'Ni la menta, ni el chicle, ni la buena voluntad pudieron con ella.',
    b19: 'Splash. Y eran tus tenis nuevos.',
    b20: 'Era para mañana. Eran 30 hojas. Es para hoy.',
    b21: 'Estudiaste toda la noche... el tema equivocado.',
    b22: 'No explota, pero te arruina la semana completa.',
    b23: '«Al final se descubre que todo era un sueño». De nada.',
    b24: 'Dicen que es un queso muy fino. El refri opina otra cosa.',
    b25: 'Su especialidad: dejarte en «visto» por tres días y volver a las 3 a. m.'
};

const STORE_AVATARS = [
    { id: 'a0', icon: 'fa-kiwi-bird', locked: false },
    { id: 'a1', icon: 'fa-dog', locked: false },
    { id: 'a2', icon: 'fa-cat', locked: false },
    { id: 'a3', icon: 'fa-dove', locked: false },
    { id: 'a4', icon: 'fa-cow', locked: false },
    { id: 'a5', icon: 'fa-fish', locked: true },
    { id: 'a6', icon: 'fa-spider', locked: true },
    { id: 'a7', icon: 'fa-bug', locked: true },
    { id: 'a8', icon: 'fa-frog', locked: true },
    { id: 'a9', icon: 'fa-horse', locked: true },
    { id: 'a10', icon: 'fa-hippo', locked: true },
    { id: 'a11', icon: 'fa-otter', locked: true },
    { id: 'a12', icon: 'fa-crow', locked: true },
    { id: 'a13', icon: 'fa-dragon', locked: true },
    { id: 'a14', icon: 'fa-paw', locked: true },
    { id: 'a15', icon: 'fa-feather', locked: true },
    { id: 'a16', icon: 'fa-worm', locked: true }
];

const COLORS = [
    { id: 'yellow', hex: 'bg-yellow-400' }, { id: 'blue', hex: 'bg-cyan-400' },
    { id: 'pink', hex: 'bg-pink-400' }, { id: 'green', hex: 'bg-emerald-400' },
    { id: 'orange', hex: 'bg-orange-500' }, { id: 'purple', hex: 'bg-purple-500' },
    { id: 'red', hex: 'bg-red-500' }, { id: 'white', hex: 'bg-slate-100' }
];

// ESTADO GLOBAL
let userData = JSON.parse(localStorage.getItem('pb_user_data')) || {
    name: '', prof: '', color: 'yellow', avatarId: 'a0', points: 0,
    stats: { facil: 0, normal: 0, dificil: 0, super: 0, superStreak: 0 },
    unlockedAvatars: ['a0','a1','a2','a3','a4']
};
// El pollito (a0) siempre está desbloqueado y es el avatar inicial
if(!userData.unlockedAvatars.includes('a0')) { userData.unlockedAvatars.unshift('a0'); userData.avatarId = 'a0'; }
if(!userData.collection) userData.collection = [];
if(!userData.ach) userData.ach = {};
if(!userData.extra) userData.extra = {};
{ const d = { games: 0, kaboomBest: 0, purchases: 0, modesDone: {}, cardsRead: [] };
  Object.keys(d).forEach(k => { if(userData.extra[k] === undefined) userData.extra[k] = d[k]; }); }

let gameState = {
    mode: '', deck: [],
    pScore: { c: 0, b: 0 }, rScore: { c: 0, b: 0 },
    round: { pCard: null, rCard: null, pClaim: null, rClaim: null, pAction: null, rAction: null },
    aiMemory: { lies: 0, truths: 0, hasLostPoint: false }
};

let currentRival = RIVAL_ANIMALS[0];
let kaboomInterval, kaboomTimer, timeLeft, kaboomRAF, kaboomLast = 0;

// ====== INICIALIZACIÓN ======
document.addEventListener('DOMContentLoaded', () => {
    // Si es estricto el navegador, mostrar el botón de audio
    document.getElementById('audio-unlock-container').classList.remove('hidden');
    // El primer clic en cualquier parte activa el sonido
    document.addEventListener('click', () => { if(!audioUnlocked) unlockAudioAndHide(); }, { once: true });

    updateGlobalPoints();
    renderColorOptions();
    renderAvatarDrawer();
    
    if (!userData.name) {
        document.getElementById('screen-name-input').classList.remove('hidden');
    } else {
        showSetupMenu();
    }
});

function updateGlobalPoints() {
    document.getElementById('global-points').innerText = userData.points;
    document.getElementById('store-points').innerText = userData.points;
}

function saveNameAndProceed() {
    const val = document.getElementById('input-name').value.trim();
    if(val) {
        userData.name = val;
        saveData();
        document.getElementById('screen-name-input').classList.add('hidden');
        showSetupMenu();
        playSFX('click');
    }
}

function saveData() { localStorage.setItem('pb_user_data', JSON.stringify(userData)); }

function showSetupMenu() {
    document.getElementById('display-welcome-name').innerText = userData.name;
    document.getElementById('input-profession').value = userData.prof || '';
    
    document.getElementById('stat-facil').innerText = userData.stats.facil;
    document.getElementById('stat-normal').innerText = userData.stats.normal;
    document.getElementById('stat-dificil').innerText = userData.stats.dificil;
    document.getElementById('stat-super').innerText = userData.stats.super;
    document.getElementById('stat-super-streak').innerText = userData.stats.superStreak;

    document.getElementById('motivation-container').innerText = `"${MOTIVATIONAL[Math.floor(Math.random()*MOTIVATIONAL.length)]}"`;
    
    document.getElementById('screen-setup').classList.remove('hidden');
    updatePreviewAvatar();
    playBGM('menu');
}

// ====== RENDER MENÚ ======
function renderColorOptions() {
    const c = document.getElementById('color-options-container');
    c.innerHTML = COLORS.map(col => `
        <label class="color-label cursor-pointer border-2 p-1 rounded bg-slate-900 flex flex-col items-center transition ${userData.color === col.id ? 'data-selected border-white' : 'border-transparent'}" onclick="selectColor('${col.id}')">
            <span class="w-4 h-4 rounded-full ${col.hex} border border-white"></span>
        </label>
    `).join('');
}

function selectColor(id) {
    userData.color = id;
    renderColorOptions();
    updatePreviewAvatar();
    playSFX('click');
    saveData();
    checkAchievements();
}

function renderAvatarDrawer() {
    const d = document.getElementById('avatar-drawer');
    d.innerHTML = STORE_AVATARS.filter(a => userData.unlockedAvatars.includes(a.id)).map(a => `
        <div onclick="selectAvatar('${a.id}')" class="avatar-siluette cursor-pointer border-2 p-1 rounded bg-slate-900 flex justify-center items-center h-8 transition ${userData.avatarId === a.id ? 'data-selected border-white' : 'border-transparent'}">
            <i class="fa-solid ${a.icon} text-amber-300"></i>
        </div>
    `).join('');
}

function selectAvatar(id) {
    userData.avatarId = id;
    renderAvatarDrawer();
    updatePreviewAvatar();
    playSFX('click');
    saveData();
    checkAchievements();
}

function updatePreviewAvatar() {
    const box = document.getElementById('preview-avatar-box');
    const icon = document.getElementById('preview-avatar-icon');
    const colorHex = COLORS.find(c => c.id === userData.color)?.hex || 'bg-yellow-400';
    box.className = `w-16 h-16 rounded-xl border-2 border-white flex items-center justify-center text-slate-900 shadow-xl mb-2 transition-all ${colorHex}`;
    
    const av = STORE_AVATARS.find(a => a.id === userData.avatarId);
    if(av) icon.className = `fa-solid ${av.icon} text-3xl`;
}

// ====== TIENDA ======
function toggleStore() {
    const m = document.getElementById('store-modal');
    m.classList.toggle('hidden');
    if(!m.classList.contains('hidden')) renderStore();
    playSFX('click');
}

function renderStore() {
    const g = document.getElementById('store-grid');
    g.innerHTML = STORE_AVATARS.map(a => {
        const isUnlocked = userData.unlockedAvatars.includes(a.id);
        return `
        <div id="store-item-${a.id}" class="border-2 ${isUnlocked ? 'border-emerald-500 bg-emerald-900/40' : 'border-slate-600 bg-slate-800'} rounded p-2 flex flex-col items-center gap-1 ${!isUnlocked ? 'avatar-locked cursor-pointer' : ''}" ${!isUnlocked ? `onclick="buyAvatar('${a.id}')"` : ''}>
            <i class="fa-solid ${a.icon} text-xl ${isUnlocked ? 'text-emerald-400' : 'text-slate-400'}"></i>
            <span class="text-[8px]">${isUnlocked ? 'Tuyo' : '10 pts'}</span>
        </div>
        `;
    }).join('');
}

function buyAvatar(id) {
    if(userData.points >= 10) {
        userData.points -= 10;
        userData.unlockedAvatars.push(id);
        userData.extra.purchases++;
        saveData();
        checkAchievements();
        updateGlobalPoints();
        renderStore();
        renderAvatarDrawer();
        playSFX('punto');
    } else {
        const el = document.getElementById(`store-item-${id}`);
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 300);
        playSFX('click');
    }
}

// ====== CONTROL DE MODOS ======
function showStoryMode() {
    playSFX('click');
    document.getElementById('story-modal').classList.remove('hidden');
}

function closeStoryModal() {
    playSFX('click');
    document.getElementById('story-modal').classList.add('hidden');
}

// ====== COLECCIÓN ======
let collectionTab = 'pollito';

function showToast(msg) {
    const wrap = document.createElement('div');
    wrap.className = 'fixed top-16 inset-x-0 flex justify-center z-[150] pointer-events-none';
    wrap.innerHTML = `<div class="toast-pop bg-amber-400 text-slate-950 font-pixel text-[8px] px-3 py-2 rounded-xl border-2 border-white shadow-2xl">${msg}</div>`;
    document.body.appendChild(wrap);
    setTimeout(() => wrap.remove(), 2300);
}

// Desbloquea las cartas vistas durante la partida
function unlockCards(cards) {
    let nuevas = 0;
    cards.forEach(c => {
        if(c && !userData.collection.includes(c.id)) { userData.collection.push(c.id); nuevas++; }
    });
    if(nuevas > 0) {
        saveData();
        showToast(`<i class="fa-solid fa-layer-group"></i> ${nuevas === 1 ? '¡Nueva carta en tu colección!' : '¡' + nuevas + ' cartas nuevas en tu colección!'}`);
        checkAchievements();
    }
}

function toggleCollection() {
    const m = document.getElementById('collection-modal');
    m.classList.toggle('hidden');
    if(!m.classList.contains('hidden')) renderCollection();
    playSFX('click');
}

function setCollectionTab(t) {
    collectionTab = t;
    renderCollection();
    playSFX('click');
}

function renderCollection() {
    const pollitos = POLLITO_CARDS.map(c => ({ ...c, type: 'pollito' }));
    const bombas = BOMBA_CARDS.map(c => ({ ...c, type: 'bomba' }));
    const countP = pollitos.filter(c => userData.collection.includes(c.id)).length;
    const countB = bombas.filter(c => userData.collection.includes(c.id)).length;
    document.getElementById('col-count-pollito').innerText = `${countP}/25`;
    document.getElementById('col-count-bomba').innerText = `${countB}/25`;

    const on = 'bg-amber-500 text-slate-950 border-white';
    const off = 'bg-slate-800 text-slate-300 border-slate-600';
    document.getElementById('tab-col-pollito').className = `p-2 rounded-lg text-[9px] font-pixel border-2 ${collectionTab === 'pollito' ? on : off}`;
    document.getElementById('tab-col-bomba').className = `p-2 rounded-lg text-[9px] font-pixel border-2 ${collectionTab === 'bomba' ? 'bg-blue-600 text-white border-white' : off}`;

    const list = collectionTab === 'pollito' ? pollitos : bombas;
    document.getElementById('collection-grid').innerHTML = list.map(c => {
        if(userData.collection.includes(c.id)) {
            return `<div class="collection-card cursor-pointer" onclick="openCardDetail('${c.id}')">${renderCardHTML(c)}</div>`;
        }
        return `<div class="collection-card" onclick="shakeLockedCard(this)"><div class="card-locked">?</div></div>`;
    }).join('');
}

function shakeLockedCard(el) {
    playSFX('click');
    el.classList.remove('card-vibrate');
    void el.offsetWidth;
    el.classList.add('card-vibrate');
    setTimeout(() => el.classList.remove('card-vibrate'), 1000);
}

function openCardDetail(id) {
    const card = [...POLLITO_CARDS.map(c => ({ ...c, type: 'pollito' })), ...BOMBA_CARDS.map(c => ({ ...c, type: 'bomba' }))].find(c => c.id === id);
    if(!card) return;
    playSFX('click');
    document.getElementById('card-detail-card').innerHTML = `<div class="collection-card">${renderCardHTML(card)}</div>`;
    document.getElementById('card-detail-text').innerText = CARD_TEXTS[id] || '';
    if(!userData.extra.cardsRead.includes(id)) { userData.extra.cardsRead.push(id); saveData(); checkAchievements(); }
    document.getElementById('card-detail-modal').classList.remove('hidden');
}

function closeCardDetail() {
    playSFX('click');
    document.getElementById('card-detail-modal').classList.add('hidden');
}

function returnToMenu() {
    if(!userData.name) return;
    playSFX('click');
    clearTimeout(kaboomInterval);
    cancelAnimationFrame(kaboomRAF);
    clearInterval(kaboomTimer);
    stopExploded();
    ['screen-game', 'screen-explotado', 'screen-kaboom', 'game-over-modal', 'tutorial-rules-modal', 'store-modal', 'story-modal', 'collection-modal', 'card-detail-modal', 'achievements-modal', 'tutorial-bubble', 'deck-anim'].forEach(id => document.getElementById(id).classList.add('hidden'));
    saveData();
    showSetupMenu();
}

function startGame(mode) {
    playSFX('click');
    userData.prof = document.getElementById('input-profession').value.trim();
    saveData();
    checkAchievements();
    gameState.mode = mode;
    
    document.getElementById('screen-setup').classList.add('hidden');

    if(mode === 'moneda') { // Modo "Pollito explotado"
        document.getElementById('screen-explotado').classList.remove('hidden');
        resetExplodedScreen();
        playBGM('moneda');
    } else if (mode === 'kaboom') {
        document.getElementById('screen-kaboom').classList.remove('hidden');
        document.getElementById('kaboom-intro').classList.remove('hidden');
        document.getElementById('kaboom-area').innerHTML = '';
        document.getElementById('kaboom-score').innerText = '0';
        document.getElementById('kaboom-timer').innerText = '2:00';
        kaboomScore = 0; kaboomCharges = 0;
        updateKaboomDefuseBtn();
        playBGM('kaboom');
    } else {
        initTableGame(mode);
    }
}

function startTutorial() { startGame('tutorial'); }

function renderCardHTML(card) {
    const p = card.type === 'pollito';
    return `<div class="${p ? 'card-front-pollito' : 'card-front-bomba'}"><div class="${p ? 'card-inner-pollito' : 'card-inner-bomba'}">
        <i class="fa-solid ${p ? 'fa-kiwi-bird' : 'fa-bomb'} card-main-icon"></i>
        <i class="fa-solid ${card.icon} card-sub-icon"></i>
        <span class="card-name">${card.name}</span></div></div>`;
}

function renderCardBackHTML() {
    return `<div class="card-back w-full h-full"><span class="card-back-text-mid">Pb</span></div>`;
}

// ====== JUEGO DE MESA (FÁCIL, NORMAL, DIFÍCIL, SUPERV, TUTORIAL) ======
function initTableGame(mode) {
    playBGM(mode);
    tutorialExplained = false;
    gameState.pScore = {c:0,b:0};
    gameState.rScore = {c:0,b:0};
    gameState.aiMemory = { lies: 0, truths: 0, hasLostPoint: false };
    
    // Config UI Jugador
    document.getElementById('player-display-name').innerText = userData.name || 'Pollito';
    document.getElementById('player-display-prof').innerText = userData.prof ? `El pollito ${userData.prof} de color` : 'Pollito';
    const colorHex = COLORS.find(c => c.id === userData.color)?.hex || 'bg-yellow-400';
    document.getElementById('player-avatar').className = `w-8 h-8 rounded-lg border-2 border-white flex items-center justify-center text-slate-900 shadow-md ${colorHex}`;
    const av = STORE_AVATARS.find(a => a.id === userData.avatarId);
    document.getElementById('player-avatar-icon').className = `fa-solid ${av ? av.icon : 'fa-kiwi-bird'} text-sm`;

    // Config Rival
    const rivalPool = getRivalPool(mode);
    currentRival = rivalPool[Math.floor(Math.random() * rivalPool.length)];
    document.getElementById('rival-display-name').innerText = currentRival.name;
    document.getElementById('rival-small-name').innerText = currentRival.name;
    document.getElementById('rival-avatar').innerHTML = `<i class="fa-solid ${currentRival.icon}"></i>`;
    document.getElementById('rival-small-avatar').innerHTML = `<i class="fa-solid ${currentRival.icon}"></i>`;

    document.getElementById('screen-game').classList.remove('hidden');
    updateScoreBoard();
    
    if(mode === 'tutorial' || mode === 'supervivencia') {
        showTutorialBubble(mode === 'supervivencia' ? "La meta en este juego son 2 bombas para perder y dos pollitos para ganar, se crearán nuevas rondas hasta que pierdas." : "Primero se reparte una carta a cada jugador.", () => startNewRound());
    } else {
        startNewRound();
    }
}

function updateScoreBoard() {
    document.getElementById('player-chicks').innerText = gameState.pScore.c;
    document.getElementById('player-bombs').innerText = gameState.pScore.b;
    document.getElementById('rival-chicks').innerText = gameState.rScore.c;
    document.getElementById('rival-bombs').innerText = gameState.rScore.b;
}

// Lógica de diálogos burbuja (Tutorial)
let currentBubbleCallback = null;
let tutorialExplained = false; // true cuando ya se explicaron las reglas una vez
function showTutorialBubble(text, callback) {
    if(gameState.mode !== 'tutorial' && gameState.mode !== 'supervivencia') {
        if(callback) callback();
        return;
    }
    const b = document.getElementById('tutorial-bubble');
    document.getElementById('tutorial-bubble-text').innerHTML = text;
    b.classList.remove('hidden');
    currentBubbleCallback = callback;
    document.getElementById('tutorial-bubble-btn').onclick = () => {
        playSFX('click');
        b.classList.add('hidden');
        if(currentBubbleCallback) currentBubbleCallback();
    };
}

function startNewRound() {
    clearTableSlots();
    let fullDeck = [...POLLITO_CARDS.map(c=>({...c, type:'pollito'})), ...BOMBA_CARDS.map(c=>({...c, type:'bomba'}))];
    fullDeck.sort(() => Math.random() - 0.5);
    gameState.deck = fullDeck;

    const anim = document.getElementById('deck-anim');
    anim.classList.remove('hidden');
    setPanel("Barajando...", "");

    setTimeout(() => {
        anim.classList.add('hidden');
        gameState.round.pCard = gameState.deck.pop();
        gameState.round.rCard = gameState.deck.pop();
        
        if(gameState.mode === 'tutorial' && !tutorialExplained) {
            showTutorialBubble(`Existen 2 tipos de cartas: Las de pollito que son de color <span class="text-yellow-500">amarillo</span>, te suman 1 punto.`, () => {
                showTutorialBubble(`También están las cartas bomba, son de color <span class="text-blue-500">azul</span> y te restan 1 punto.`, () => {
                    showTutorialBubble(`El juego inicia repartiendo una carta a cada jugador.`, () => {
                        showTutorialBubble(`Puedes ver la carta pero deberás voltearla después ya que debes dársela al otro jugador, él te dará la que recibió para iniciar la fase de mención.`, () => {
                            renderPhaseObserve();
                        });
                    });
                });
            });
        } else {
            renderPhaseObserve();
        }
    }, 1200);
}

function renderPhaseObserve() {
    const slot = document.getElementById('player-card-slot');
    slot.innerHTML = renderCardHTML(gameState.round.pCard, true);
    unlockCards([gameState.round.pCard]);
    
    // Vista rival top
    document.getElementById('top-rival-slot').innerHTML = renderCardBackHTML();
    document.getElementById('top-player-slot').innerHTML = renderCardBackHTML();
    // Vista rival chiquita mesa
    document.getElementById('rival-card-slot').innerHTML = renderCardBackHTML();

    const typeTxt = gameState.round.pCard.type === 'pollito' ? 'pollito' : 'bomba';
    setPanel(`Tu carta: ${typeTxt}`, `<button onclick="actionGiveCard()" class="bg-amber-500 px-4 py-2 rounded text-[10px] font-bold">Entregar Carta</button>`);
}

function actionGiveCard() {
    playSFX('click');
    setPanel('Intercambiando cartas...', '');
    // Voltear
    document.getElementById('player-card-slot').innerHTML = `<div class="card-flip-anim w-full h-full">${renderCardBackHTML()}</div>`;
    
    setTimeout(() => {
        document.getElementById('player-card-slot').innerHTML = renderCardBackHTML();
        // Animaciones intercambio
        // Vertical
        const tR = document.getElementById('top-rival-slot');
        const tP = document.getElementById('top-player-slot');
        tR.classList.add('translate-y-[80px]'); // va abajo
        tP.classList.add('-translate-y-[80px]'); // va arriba

        // Mesa 
        const pSlot = document.getElementById('player-card-slot');
        const rSlot = document.getElementById('rival-card-slot');
        
        pSlot.classList.add('translate-x-[150px]', '-translate-y-[100px]', 'opacity-0');
        
        setTimeout(() => {
            // Regresar clases de animación mesa y simular que llegó la nueva
            pSlot.classList.remove('translate-x-[150px]', '-translate-y-[100px]', 'opacity-0');
            pSlot.classList.add('receive-anim');
            
            setTimeout(() => {
                pSlot.classList.remove('receive-anim');
                // Vista de arriba: las cartas se quedan intercambiadas (solo animación de ida, sin regreso)

                if(gameState.mode === 'tutorial' && !tutorialExplained) {
                    showTutorialBubble("Como verás, acaban de intercambiar cartas con tu rival.", () => {
                        showTutorialBubble("Tú sabes qué carta tiene él y él sabe la carta que tienes ahora.", () => {
                            showTutorialBubble("En la fase de mención debes elegir qué carta decir que viste, ¿Una carta pollito o una carta bomba?", () => {
                                showTutorialBubble("Recuerda que los pollitos suman y las bombas restan.", () => {
                                    showTutorialBubble("Di la verdad o miente.", () => {
                                        renderPhaseMention();
                                    });
                                });
                            });
                        });
                    });
                } else {
                    renderPhaseMention();
                }
            }, 1000);
        }, 1000);

    }, 600);
}

function renderPhaseMention() {
    setPanel("Fase de mención, ¿Qué carta tenías?", `
        <button onclick="handleClaim('pollito')" class="bg-yellow-500 text-slate-900 px-3 py-1.5 rounded font-bold text-[9px]">Decir Pollito</button>
        <button onclick="handleClaim('bomba')" class="bg-blue-600 text-white px-3 py-1.5 rounded font-bold text-[9px]">Decir Bomba</button>
    `);
}

function handleClaim(claim) {
    playSFX('click');
    gameState.round.pClaim = claim;
    const isTruth = claim === gameState.round.pCard.type;
    if(isTruth) gameState.aiMemory.truths++; else gameState.aiMemory.lies++;

    // Lógica IA claim (El rival dice qué vio, que es la carta que ahora tiene el jugador)
    const rType = gameState.round.rCard.type;
    let rClaim = rType;
    if(gameState.mode === 'tutorial') {
        rClaim = rType;
    } else if (gameState.mode === 'facil') {
        rClaim = Math.random() < 0.5 ? 'pollito' : 'bomba'; // Aleatorio
    } else if (gameState.mode === 'normal') {
        rClaim = gameState.aiMemory.hasLostPoint ? (Math.random() < 0.5 ? 'pollito' : 'bomba') : rType;
    } else if (gameState.mode === 'dificil' || gameState.mode === 'supervivencia') {
        // En superv random total. En difícil miente 30%.
        rClaim = (gameState.mode === 'supervivencia' || Math.random() < 0.3) ? (rType==='pollito'?'bomba':'pollito') : rType;
    }
    gameState.round.rClaim = rClaim;

    const claimColor = rClaim === 'pollito' ? 'text-yellow-400' : 'text-blue-400';
    setPanel(`Tu rival dijo ver: <span class="${claimColor} uppercase">${rClaim}</span>. ¿Qué haces con la carta que recibiste?`, `
        <button onclick="handleAction(true)" class="bg-emerald-600 px-3 py-1.5 rounded font-bold text-[9px]">Quedarme con la carta</button>
        <button onclick="handleAction(false)" class="bg-rose-600 px-3 py-1.5 rounded font-bold text-[9px]">Aventar carta</button>
    `);

    if(gameState.mode === 'tutorial' && !tutorialExplained) {
        showTutorialBubble("Aquí la razón de mentir o decir la verdad, cada jugador tiene la opción de quedarse con la carta o aventársela al rival según le convenga.", () => {
            showTutorialBubble("Después de decidir si quedarte con la carta o aventarla, las cartas se revelan.", null);
        });
    }
}

function handleAction(playerKeeps) {
    playSFX('click');
    gameState.round.pAction = playerKeeps;

    // Lógica IA Action (decide sobre la carta que recibió del jugador, o sea pCard)
    let rivalKeeps = true;
    if (gameState.mode === 'tutorial') {
        rivalKeeps = (gameState.round.pClaim === 'pollito');
    } else if (gameState.mode === 'facil') {
        rivalKeeps = (gameState.round.pClaim === 'pollito');
    } else if (gameState.mode === 'normal') {
        rivalKeeps = gameState.aiMemory.hasLostPoint ? (Math.random()<0.5) : (gameState.round.pClaim === 'pollito');
    } else if (gameState.mode === 'supervivencia') {
        rivalKeeps = Math.random() < 0.5;
    } else if (gameState.mode === 'dificil') {
        // Analiza si mientes mucho
        if (gameState.aiMemory.lies > gameState.aiMemory.truths) {
            rivalKeeps = (gameState.round.pClaim === 'bomba'); // No te cree
        } else {
            rivalKeeps = (gameState.round.pClaim === 'pollito'); // Te cree
        }
    }
    gameState.round.rAction = rivalKeeps;

    executeFinalAnimations(playerKeeps, rivalKeeps);
}

function executeFinalAnimations(pKeeps, rKeeps) {
    setPanel("Resolviendo...", "");
    
    const pSlot = document.getElementById('player-card-slot');
    const rSlot = document.getElementById('rival-card-slot'); // Mesa miniatura
    const topR = document.getElementById('top-rival-slot'); // vertical
    const topP = document.getElementById('top-player-slot');

    // Si jugador avienta
    if(!pKeeps) {
        pSlot.classList.add('throw-away-anim');
        topR.classList.remove('translate-y-[80px]'); // la carta que tiene el jugador ahora está en topR
        topR.classList.add('translate-y-[40px]');
    }
    // Si rival avienta
    if(!rKeeps) {
        // Rival miniatura la tira hacia nosotros
        rSlot.classList.add('translate-y-[50px]', 'opacity-0');
        topP.classList.remove('-translate-y-[80px]'); // la carta que tiene el rival ahora está en topP
        topP.classList.add('-translate-y-[40px]');
    }

    setTimeout(() => {
        // Render de cartas resultantes
        let pFinalCards = [];
        let rFinalCards = [];
        
        // La carta que tiene físicamente el jugador es rCard (la recibió en el intercambio)
        if(pKeeps) pFinalCards.push(gameState.round.rCard); else rFinalCards.push(gameState.round.rCard);
        // La carta que tiene físicamente el rival es pCard
        if(rKeeps) rFinalCards.push(gameState.round.pCard); else pFinalCards.push(gameState.round.pCard);

        if(gameState.mode === 'tutorial' && !tutorialExplained) {
            showTutorialBubble("Si tienes un pollito sumarás un punto. Si tienes una bomba te restará un punto.", () => {
                showTutorialBubble("Puedes tener 2 cartas o ninguna al final del turno.", () => {
                    showTutorialBubble("Si las cartas son iguales, doblarás el puntaje sumado o restado.", () => {
                        showTutorialBubble("Si las cartas son un pollito y una bomba no pasará nada, el pollito habrá desactivado la bomba.", () => {
                            showTutorialBubble("Tener ninguna carta es asegurar 0 puntos, tener 1 carta dependerá de la suerte o estrategia, tener 2 cartas es arriesgado.", () => {
                                showTutorialBubble("Cada carta que recibas se va a ir acumulando, gana el jugador que tenga 3 pollitos, o pierde el primero en acumular 3 bombas.", () => {
                                    showTutorialBubble("¿Podrás ganar o acabarás por explotar?", () => {
                                        tutorialExplained = true;
                                        finishRoundLogic(pFinalCards, rFinalCards, pKeeps, rKeeps);
                                    });
                                });
                            });
                        });
                    });
                });
            });
        } else {
            finishRoundLogic(pFinalCards, rFinalCards, pKeeps, rKeeps);
        }
    }, 1000);
}

function snapTopSlots() {
    // Regresa al instante (sin animación) los espacios de la vista de arriba a su lugar para mostrar el resultado
    ['top-rival-slot', 'top-player-slot'].forEach(id => {
        const el = document.getElementById(id);
        el.style.transition = 'none';
        el.className = el.className.replace(/-?translate-y-\[[^\]]+\]/g, '');
        void el.offsetWidth;
        el.style.transition = '';
    });
}

function finishRoundLogic(pCards, rCards, pKeeps, rKeeps) {
    snapTopSlots();
    // Revelar cartas físicamente
    const pSlot = document.getElementById('player-card-slot');
    pSlot.classList.remove('throw-away-anim');
    pSlot.innerHTML = pCards.length > 0 ? pCards.map(c => `<div class="absolute w-full h-full transform transition-all" style="margin-left:${pCards.indexOf(c)*40}px; rotate:${pCards.indexOf(c)*10}deg">${renderCardHTML(c, true)}</div>`).join('') : '<span class="text-white text-[10px]">Ninguna</span>';
    
    document.getElementById('top-player-slot').innerHTML = pCards.length > 0 ? pCards.map(c => `<div class="absolute w-full h-full ml-[${pCards.indexOf(c)*10}px]">${renderCardHTML(c, true)}</div>`).join('') : '';
    document.getElementById('top-rival-slot').innerHTML = rCards.length > 0 ? rCards.map(c => `<div class="absolute w-full h-full ml-[${rCards.indexOf(c)*10}px]">${renderCardHTML(c, true)}</div>`).join('') : '';

    unlockCards([...pCards, ...rCards]);

    // Evaluar
    const pRes = evalCards(pCards, true); // true = es jugador
    const rRes = evalCards(rCards, false);
    
    if(rRes.points < 0) gameState.aiMemory.hasLostPoint = true;

    updateScoreBoard();
    
    let txtP = pKeeps ? "Te quedaste tu carta." : "Aventaste tu carta.";
    let txtR = rKeeps ? "El rival decidió quedarse con la carta." : "El rival decidió aventarte la carta.";

    setPanel(`${txtP} ${pRes.msg} <br> ${txtR} ${rRes.msg}`, `<button onclick="checkWinOrNext()" class="bg-amber-500 px-4 py-2 rounded text-[10px] font-bold">Siguiente</button>`);
}

function evalCards(cards, isPlayer) {
    if(cards.length === 0) return { points: 0, msg: "Sin cartas (0 pts)." };
    
    let cCount = cards.filter(c=>c.type==='pollito').length;
    let bCount = cards.filter(c=>c.type==='bomba').length;
    let points = 0;
    let msg = "";

    if(cCount === 1 && bCount === 0) {
        points = 1; msg = "+1 Pollito";
        if(isPlayer) playSFX('punto');
    } else if(bCount === 1 && cCount === 0) {
        points = -1; msg = "-1 Bomba";
        if(isPlayer) playSFX('explosion');
    } else if(cCount === 2) {
        points = 2; msg = "+2 Pollitos";
        if(isPlayer) playSFX('punto');
    } else if(bCount === 2) {
        points = -2; msg = "-2 Bombas";
        if(isPlayer) playSFX('explosion');
    } else if(cCount === 1 && bCount === 1) {
        points = 0; msg = "Desactivación (0 pts)";
        if(isPlayer) playSFX('desactivacion');
    }

    if(isPlayer) {
        if(points > 0) gameState.pScore.c += points;
        if(points < 0) gameState.pScore.b += Math.abs(points);
    } else {
        if(points > 0) gameState.rScore.c += points;
        if(points < 0) gameState.rScore.b += Math.abs(points);
    }
    return { points, msg };
}

function checkWinOrNext() {
    playSFX('click');
    const pC = gameState.pScore.c; const pB = gameState.pScore.b;
    const rC = gameState.rScore.c; const rB = gameState.rScore.b;
    const m = gameState.mode;

    let pWon = false; let rWon = false;

    if(m === 'tutorial') {
        if(pC >= 3 || rB >= 3) pWon = true;
        if(rC >= 3 || pB >= 3) rWon = true;
        if(pWon || rWon) {
            recordGame('tutorial', true);
            document.getElementById('tutorial-rules-modal').classList.remove('hidden');
            return;
        }
    } else if(m === 'facil') {
        // Fácil: 3 pollitos ganas, sin importar las bombas
        if(pC >= 3) pWon = true;
        if(rC >= 3) rWon = true;
    } else if (m === 'normal') {
        if(pC >= 3 || rB >= 3) pWon = true;
        if(pB >= 3 || rC >= 3) rWon = true;
    } else if (m === 'dificil') {
        if(pC >= 5 || rB >= 4) pWon = true;
        if(pB >= 4 || rC >= 5) rWon = true;
    } else if (m === 'supervivencia') {
        if(pC >= 2) pWon = true;
        if(pB >= 2) rWon = true;
    }

    if(pWon && !rWon) { triggerGameOver(true); }
    else if(rWon) { triggerGameOver(false); }
    else { startNewRound(); }
}

function triggerGameOver(isWin) {
    const m = gameState.mode;
    let pts = 0;
    if(isWin) {
        if(m==='facil') pts=1; if(m==='normal') pts=2; if(m==='dificil') pts=5; if(m==='supervivencia') pts=3;
        userData.points += pts;
        userData.stats[m === 'supervivencia' ? 'super' : m]++;
        if(m==='supervivencia' && userData.stats.super > userData.stats.superStreak) {
            userData.stats.superStreak = userData.stats.super;
        }
    } else {
        if(m==='supervivencia') {
            userData.stats.super = 0; // reset racha
        }
    }
    saveData();
    updateGlobalPoints();

    const mod = document.getElementById('game-over-modal');
    document.getElementById('game-over-title').innerText = isWin ? '¡VICTORIA!' : '¡DERROTA!';
    document.getElementById('game-over-title').className = `text-2xl font-pixel ${isWin?'text-emerald-400':'text-rose-500'}`;
    document.getElementById('game-over-msg').innerText = isWin ? 'Has superado a tu rival.' : 'Has sido derrotado.';
    document.getElementById('game-over-rewards').innerText = isWin ? `+${pts} Puntos Globales` : '';
    
    document.getElementById('btn-play-again').onclick = () => {
        playSFX('click'); mod.classList.add('hidden'); startGame(m);
    };
    mod.classList.remove('hidden');
    recordGame(m, isWin);
}

function closeTutorialRules() {
    playSFX('click');
    document.getElementById('tutorial-rules-modal').classList.add('hidden');
    returnToMenu();
}

// ====== MODO POLLITO EXPLOTADO ======
const EX_COLS = 7, EX_ROWS = 9;
const EX_LIVES = 5;               // vidas máximas
const EX_CHICK_SPEED = 4.2;       // casillas por segundo
const EX_COIN_MULT = 1.6;         // multiplicador de velocidad al tomar la moneda
const EX_HIT_RADIUS = 0.7;        // distancia de contacto bomba-pollito (en casillas)
const EX_SECTION_TIME = 15;       // segundos en una sección para poder salir
const EX_FINAL_TIME = 20;         // segundos que hay que resistir en la salida

// MAPA (6 x 5): S = inicio, . = camino, E = salida (la más lejana; no se ve en el minimapa), # = sin sección
// Las desviaciones son de una sola sección y tienen objeto: P = plato, H = corazón, C = moneda
const EX_MAP = [
    'S..P##',
    'H#.#H#',
    '#C...H',
    '##H#.#',
    '####.E'
];
const EX_DIRS = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
const EX_OPP = { up: 'down', down: 'up', left: 'right', right: 'left' };
const EX_ITEM_ICON = { P: 'fa-plate-wheat', H: 'fa-heart', C: 'fa-coins' };
const EX_ITEM_COLOR = { P: '#e2e8f0', H: '#fb7185', C: '#facc15' };

let exActive = false, exRAF = null, exLast = 0;
let exChick = { x: 3.5, y: 4.5, face: 'up' };   // face = hacia dónde se mueve (el plato protege el lado opuesto)
let exBombs = [], exQueue = [], exLives = EX_LIVES, exNextWave = 0;
let exKeys = {}, exStick = null;
let exCell = { x: 0, y: 0 }, exSectionT = 0, exUnlocked = false, exFinal = false, exFinalT = EX_FINAL_TIME;
let exSecT = {};   // segundos acumulados en cada sección (para no repetir la espera)
let exVisited = new Set(), exTaken = new Set(), exHasPlate = false, exHasCoin = false;

function exMapCell(x, y) { return (EX_MAP[y] || '')[x] || '#'; }
function exOpen(x, y) { return exMapCell(x, y) !== '#'; }

function stopExploded() {
    exActive = false;
    cancelAnimationFrame(exRAF);
}

function resetExplodedScreen() {
    stopExploded();
    exBombs = []; exQueue = []; exKeys = {}; exStick = null;
    exLives = EX_LIVES; exHasPlate = false; exHasCoin = false;
    exTaken = new Set(); exVisited = new Set(['0,0']); exSecT = {};
    exCell = { x: 0, y: 0 };
    exChick = { x: EX_COLS / 2, y: EX_ROWS / 2, face: 'up' };
    exLast = performance.now();
    document.getElementById('ex-intro').classList.remove('hidden');
    setupExplodedSection(null);
    renderExplodedMap();
    updateExplodedHUD();
    updateExplodedChick();
    updateExplodedPlate();
}

function startExplodedGame() {
    playSFX('click');
    resetExplodedScreen();
    document.getElementById('ex-intro').classList.add('hidden');
    exActive = true;
    exLast = performance.now();
    exNextWave = exLast + 1200;
    exRAF = requestAnimationFrame(explodedLoop);
}

// Prepara la sección actual (fondo, objeto, bordes) y coloca al pollito si viene de otra sección
function setupExplodedSection(fromDir) {
    const ch = exMapCell(exCell.x, exCell.y);
    exSectionT = exSecT[exCell.x + ',' + exCell.y] || 0; exUnlocked = exSectionT >= EX_SECTION_TIME;
    exFinal = ch === 'E';
    exFinalT = EX_FINAL_TIME;
    exBombs = []; exQueue = [];
    document.getElementById('ex-bombs').innerHTML = '';
    exNextWave = exLast + 1200;

    const f = document.getElementById('ex-field');
    f.classList.toggle('ex-sec-exit', exFinal);
    f.classList.toggle('ex-sec-item', 'PHC'.includes(ch) && ch !== '.');

    const item = document.getElementById('ex-item');
    const key = exCell.x + ',' + exCell.y;
    if('PHC'.includes(ch) && !exTaken.has(key)) {
        item.style.display = 'flex';
        item.style.color = EX_ITEM_COLOR[ch];
        item.innerHTML = `<i class="fa-solid ${EX_ITEM_ICON[ch]}"></i>`;
    } else {
        item.style.display = 'none';
    }

    if(fromDir === 'right') exChick.x = 0.9;
    else if(fromDir === 'left') exChick.x = EX_COLS - 0.9;
    else if(fromDir === 'down') exChick.y = 0.9;
    else if(fromDir === 'up') exChick.y = EX_ROWS - 0.9;
    updateExplodedEdges();
    updateExplodedChick();
}

// Un borde está abierto si la sección ya esperó 15 s, o si lleva a una sección que ya visitaste
function exEdgeOpen(d) {
    if(exFinal) return false;
    const nx = exCell.x + EX_DIRS[d][0], ny = exCell.y + EX_DIRS[d][1];
    if(!exOpen(nx, ny)) return false;
    return exUnlocked || exVisited.has(nx + ',' + ny);
}

function updateExplodedEdges() {
    Object.keys(EX_DIRS).forEach(d => {
        const el = document.getElementById('ex-edge-' + d);
        const has = !exFinal && exOpen(exCell.x + EX_DIRS[d][0], exCell.y + EX_DIRS[d][1]);
        el.style.display = has ? 'flex' : 'none';
        el.classList.toggle('ex-edge-open', exEdgeOpen(d));
    });
}

function renderExplodedMap() {
    const m = document.getElementById('ex-map');
    m.style.gridTemplateColumns = `repeat(${EX_MAP[0].length}, 14px)`;
    let html = '';
    EX_MAP.forEach((row, y) => [...row].forEach((ch, x) => {
        if(ch === '#') { html += '<span class="ex-mc ex-mc-wall"></span>'; return; }
        const here = exCell.x === x && exCell.y === y;
        const vis = exVisited.has(x + ',' + y);
        // la salida no se distingue en el mapa hasta que llegas a ella
        const cls = 'ex-mc ' + (ch === 'E' && vis ? 'ex-mc-exit' : vis ? 'ex-mc-vis' : 'ex-mc-open') + (here ? ' ex-mc-here' : '');
        // los objetos sí se ven (hasta que los tomas)
        const dot = ('PHC'.includes(ch) && !exTaken.has(x + ',' + y)) ? `<i class="ex-md" style="background:${EX_ITEM_COLOR[ch]}"></i>` : '';
        html += `<span class="${cls}">${dot}</span>`;
    }));
    m.innerHTML = html;
}

function updateExplodedHUD() {
    document.getElementById('ex-lives').innerHTML = Array.from({ length: EX_LIVES }, (_, i) =>
        `<span class="ex-life-seg ${i < exLives ? '' : 'ex-life-off'}"></span>`).join('');
    document.getElementById('ex-inv-plate').style.display = exHasPlate ? 'inline' : 'none';
    document.getElementById('ex-inv-coin').style.display = exHasCoin ? 'inline' : 'none';
}

function updateExplodedChick() {
    const ch = document.getElementById('ex-chick');
    ch.style.left = ((exChick.x - 0.5) * 100 / EX_COLS) + '%';
    ch.style.top = ((exChick.y - 0.5) * 100 / EX_ROWS) + '%';
}

// El plato protege el lado contrario a la dirección en que se mueve el pollito
function updateExplodedPlate() {
    const p = document.getElementById('ex-plate');
    p.style.display = exHasPlate ? 'block' : 'none';
    p.className = 'ex-plate ex-plate-' + EX_OPP[exChick.face];
}

function exPopup(text, color) {
    const d = document.createElement('div');
    d.className = 'ex-pop';
    d.textContent = text;
    d.style.color = color || '#fff';
    d.style.left = ((exChick.x - 1.2) * 100 / EX_COLS) + '%';
    d.style.top = ((exChick.y - 1) * 100 / EX_ROWS) + '%';
    document.getElementById('ex-field').appendChild(d);
    setTimeout(() => d.remove(), 900);
}

// Parámetros de cada oleada. Las bombas cruzan la pantalla en línea recta apuntando al pollito al salir.
function exWaveParams() {
    if(exFinal) return { count: 4, travel: 1.5, interval: 1.6, spread: 0.8, aim: 'mixed' };
    const depth = exVisited.size;
    const travel = Math.max(2.0, 2.6 - depth * 0.06);
    const count = exSectionT < 5 ? 1 : (exSectionT < 10 ? 2 : 3);
    return { count, travel, interval: 2.4, spread: 1.0, aim: 'chick' };
}

function exQueueWave(now) {
    const p = exWaveParams();
    for(let i = 0; i < p.count; i++) {
        const delay = p.count > 1 ? (i * p.spread / (p.count - 1)) * 1000 : 0;
        let aim = p.aim;
        if(aim === 'mixed') aim = i === 0 ? 'chick' : 'random';
        exQueue.push({ t: now + delay, aim, travel: p.travel });
    }
    exNextWave = now + p.interval * 1000;
}

function spawnExplodedBomb(q) {
    const side = Math.floor(Math.random() * 4), m = 0.6;
    let x, y;
    if(side === 0)      { x = Math.random() * EX_COLS; y = -m; }
    else if(side === 1) { x = EX_COLS + m; y = Math.random() * EX_ROWS; }
    else if(side === 2) { x = Math.random() * EX_COLS; y = EX_ROWS + m; }
    else                { x = -m; y = Math.random() * EX_ROWS; }

    let tx, ty;
    if(q.aim === 'chick') { tx = exChick.x; ty = exChick.y; }
    else                  { tx = Math.random() * EX_COLS; ty = Math.random() * EX_ROWS; }

    const dx = tx - x, dy = ty - y, d = Math.hypot(dx, dy) || 1;
    const speed = EX_ROWS / q.travel; // casillas por segundo: cruza la pantalla en "travel" segundos

    const el = document.createElement('div');
    el.className = 'ex-bomb';
    el.innerHTML = '<i class="fa-solid fa-bomb"></i>';
    document.getElementById('ex-bombs').appendChild(el);
    const b = { el, x, y, vx: dx / d * speed, vy: dy / d * speed };
    exBombs.push(b);
    placeExplodedBomb(b);
}

function placeExplodedBomb(b) {
    b.el.style.left = ((b.x - 0.5) * 100 / EX_COLS) + '%';
    b.el.style.top = ((b.y - 0.5) * 100 / EX_ROWS) + '%';
}

function exPickItem() {
    const ch = exMapCell(exCell.x, exCell.y), key = exCell.x + ',' + exCell.y;
    if(!'PHC'.includes(ch) || exTaken.has(key)) return;
    if(Math.hypot(exChick.x - EX_COLS / 2, exChick.y - EX_ROWS / 2) > 0.8) return;
    if(ch === 'H') {
        if(exLives >= EX_LIVES) return; // vida llena: el corazón se queda para después
        exLives++;
        exPopup('+1 vida', '#fb7185');
    } else if(ch === 'P') {
        exHasPlate = true;
        exPopup('¡Plato!', '#e2e8f0');
    } else if(ch === 'C') {
        exHasCoin = true;
        exPopup('¡Velocidad!', '#facc15');
    }
    exTaken.add(key);
    renderExplodedMap();
    document.getElementById('ex-item').style.display = 'none';
    playSFX('punto');
    updateExplodedHUD();
    updateExplodedPlate();
}

function explodedLoop(t) {
    if(!exActive) return;
    const dt = Math.min((t - exLast) / 1000, 0.05);
    exLast = t;

    // Tiempo en la sección
    if(exFinal) {
        exFinalT -= dt;
        document.getElementById('ex-timer').innerText = `¡Resiste! ${Math.max(0, Math.ceil(exFinalT))}s`;
        document.getElementById('ex-progress-fill').style.width = (100 * (1 - Math.max(0, exFinalT) / EX_FINAL_TIME)) + '%';
        if(exFinalT <= 0) { endExploded('win'); return; }
    } else {
        exSectionT += dt;
        if(!exUnlocked && exSectionT >= EX_SECTION_TIME) {
            exUnlocked = true;
            updateExplodedEdges();
            exPopup('¡Camino abierto!', '#facc15');
        }
        document.getElementById('ex-timer').innerText = exUnlocked ? '¡Ya puedes salir!' : `Sección: ${Math.ceil(EX_SECTION_TIME - exSectionT)}s`;
        document.getElementById('ex-progress-fill').style.width = (100 * Math.min(1, exSectionT / EX_SECTION_TIME)) + '%';
    }

    // Movimiento libre del pollito (teclado o arrastrando el dedo/mouse)
    let ix = (exKeys.arrowright || exKeys.d ? 1 : 0) - (exKeys.arrowleft || exKeys.a ? 1 : 0);
    let iy = (exKeys.arrowdown || exKeys.s ? 1 : 0) - (exKeys.arrowup || exKeys.w ? 1 : 0);
    if(exStick) { ix += exStick.vx; iy += exStick.vy; }
    const mag = Math.hypot(ix, iy);
    if(mag > 0.2) {
        const face = Math.abs(ix) > Math.abs(iy) ? (ix > 0 ? 'right' : 'left') : (iy > 0 ? 'down' : 'up');
        if(face !== exChick.face) { exChick.face = face; updateExplodedPlate(); }
    }
    if(mag > 1) { ix /= mag; iy /= mag; }
    const spd = EX_CHICK_SPEED * (exHasCoin ? EX_COIN_MULT : 1);
    exChick.x = Math.max(0.5, Math.min(EX_COLS - 0.5, exChick.x + ix * spd * dt));
    exChick.y = Math.max(0.5, Math.min(EX_ROWS - 0.5, exChick.y + iy * spd * dt));
    updateExplodedChick();

    exPickItem();

    // Cambio de sección: solo tras 15 s y hacia secciones que existan en el mapa
    if(!exFinal) {
        let dir = null;
        if(exChick.x <= 0.52) dir = 'left';
        else if(exChick.x >= EX_COLS - 0.52) dir = 'right';
        else if(exChick.y <= 0.52) dir = 'up';
        else if(exChick.y >= EX_ROWS - 0.52) dir = 'down';
        if(dir) {
            const nx = exCell.x + EX_DIRS[dir][0], ny = exCell.y + EX_DIRS[dir][1];
            if(exEdgeOpen(dir)) {
                exSecT[exCell.x + ',' + exCell.y] = exSectionT;
                exCell = { x: nx, y: ny };
                exVisited.add(nx + ',' + ny);
                playSFX('click');
                setupExplodedSection(dir);
                renderExplodedMap();
                exPopup(exFinal ? '¡LA SALIDA!' : '¡Nueva sección!', exFinal ? '#f87171' : '#a5b4fc');
            }
        }
    }

    // Oleadas de bombas
    if(t >= exNextWave) exQueueWave(t);
    for(let i = exQueue.length - 1; i >= 0; i--) {
        if(exQueue[i].t <= t) { spawnExplodedBomb(exQueue[i]); exQueue.splice(i, 1); }
    }

    for(let i = exBombs.length - 1; i >= 0; i--) {
        const b = exBombs[i];
        b.x += b.vx * dt; b.y += b.vy * dt;
        placeExplodedBomb(b);

        const dx = b.x - exChick.x, dy = b.y - exChick.y;
        if(Math.hypot(dx, dy) < EX_HIT_RADIUS) {
            // lado del pollito por el que llegó la bomba
            const side = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 'right' : 'left') : (dy > 0 ? 'down' : 'up');
            exBombs.splice(i, 1);
            if(exHasPlate && side === EX_OPP[exChick.face]) {   // el plato (lado opuesto al movimiento) la desactiva
                b.el.innerHTML = '<i class="fa-solid fa-circle-check text-emerald-400"></i>';
                playSFX('desactivacion');
                exPopup('¡Desactivada!', '#6ee7b7');
                setTimeout(() => b.el.remove(), 250);
            } else {                                            // explota y quita una vida
                b.el.innerHTML = '<i class="fa-solid fa-burst text-orange-400"></i>';
                setTimeout(() => b.el.remove(), 250);
                registerExplodedHit();
                if(!exActive) return;
            }
            continue;
        }
        if(b.x < -2 || b.x > EX_COLS + 2 || b.y < -2 || b.y > EX_ROWS + 2) {
            b.el.remove();
            exBombs.splice(i, 1);
        }
    }
    if(exActive) exRAF = requestAnimationFrame(explodedLoop);
}

function registerExplodedHit() {
    exLives--;
    playSFX('explosion');
    const ch = document.getElementById('ex-chick');
    ch.classList.remove('ex-hit');
    void ch.offsetWidth;
    ch.classList.add('ex-hit');
    const f = document.getElementById('ex-field');
    f.classList.remove('ex-shake');
    void f.offsetWidth;
    f.classList.add('ex-shake');
    updateExplodedHUD();
    if(exLives <= 0) endExploded('bombs');
}

function endExploded(result) { // 'win' | 'bombs'
    stopExploded();
    document.getElementById('ex-bombs').innerHTML = '';
    exBombs = []; exQueue = [];

    const win = result === 'win';
    const mod = document.getElementById('game-over-modal');
    document.getElementById('game-over-title').innerText = win ? '¡VICTORIA!' : '¡BOOM!';
    document.getElementById('game-over-title').className = `text-2xl font-pixel ${win ? 'text-emerald-400' : 'text-rose-500'}`;
    document.getElementById('game-over-msg').innerText = win ? `¡Escapaste! Resististe ${EX_FINAL_TIME} segundos en la salida con ${exLives} vida(s).` : 'Las bombas acabaron con tus 5 vidas.';
    document.getElementById('game-over-rewards').innerText = '';
    document.getElementById('btn-play-again').onclick = () => {
        playSFX('click'); mod.classList.add('hidden'); startExplodedGame();
    };
    mod.classList.remove('hidden');
    recordGame('moneda', win);
}

// Controles: arrastrar el dedo/mouse o flechas/WASD para moverse
document.addEventListener('DOMContentLoaded', () => {
    const f = document.getElementById('ex-field');
    if(!f) return;
    f.addEventListener('pointerdown', e => {
        exStick = { ox: e.clientX, oy: e.clientY, vx: 0, vy: 0 };
        try { f.setPointerCapture(e.pointerId); } catch(_) {}
    });
    f.addEventListener('pointermove', e => {
        if(!exStick) return;
        const dx = e.clientX - exStick.ox, dy = e.clientY - exStick.oy;
        const d = Math.hypot(dx, dy);
        if(d < 10) { exStick.vx = 0; exStick.vy = 0; return; }
        const k = Math.min(d / 40, 1) / d;
        exStick.vx = dx * k; exStick.vy = dy * k;
    });
    ['pointerup', 'pointercancel'].forEach(ev => f.addEventListener(ev, () => { exStick = null; }));
});
document.addEventListener('keydown', e => {
    if(!exActive) return;
    const k = e.key.toLowerCase();
    if(['arrowleft', 'arrowright', 'arrowup', 'arrowdown', 'w', 'a', 's', 'd'].includes(k)) {
        e.preventDefault();
        exKeys[k] = true;
    }
});
document.addEventListener('keyup', e => { exKeys[e.key.toLowerCase()] = false; });

// ====== MODO KABOOM ======
let kaboomBombsHit = 0;
let kaboomScore = 0;
let kaboomCharges = 0;      // usos de "Desactivar" disponibles (1 por cada 5 pollitos recogidos)
let kaboomLastCollect = 0;  // momento en que se recogió el último pollito
let kaboomRunnerAcc = 0, kaboomRunnerNext = 2000, kaboomNextRush = 25, kaboomRushT = 0, kaboomRushChickAcc = 0, kaboomRushBombAcc = 0;
let kaboomBombAcc = 0;      // milisegundos acumulados para la siguiente bomba (1 cada 7 s)
let kaboomSpawnAcc = 0;     // milisegundos acumulados para la siguiente aparición

function startKaboomGame() {
    playSFX('click');
    cancelAnimationFrame(kaboomRAF);
    clearInterval(kaboomTimer);
    document.getElementById('kaboom-intro').classList.add('hidden');
    kaboomBombsHit = 0;
    kaboomScore = 0;
    kaboomCharges = 0;
    kaboomSpawnAcc = 0;
    kaboomBombAcc = 0;
    kaboomRunnerAcc = 0; kaboomRunnerNext = 2000; kaboomNextRush = 25; kaboomRushT = 0; kaboomRushChickAcc = 0; kaboomRushBombAcc = 0;
    timeLeft = 120; // 2 minutos
    document.getElementById('kaboom-score').innerText = kaboomScore;
    document.getElementById('kaboom-timer').innerText = '2:00';
    document.getElementById('kaboom-area').innerHTML = '';
    updateKaboomDefuseBtn();
    kaboomLastCollect = performance.now();

    kaboomTimer = setInterval(() => {
        timeLeft--;
        let m = Math.floor(timeLeft/60);
        let s = timeLeft%60;
        document.getElementById('kaboom-timer').innerText = `${m}:${s<10?'0':''}${s}`;
        if(timeLeft <= 0) { endKaboom(true); return; }
        // Si pasan más de 15 segundos sin recoger ningún pollito, se pierde
        if(performance.now() - kaboomLastCollect > 15000) endKaboom(false, 'idle');
    }, 1000);

    // Al iniciar, varios pollitos salen corriendo hacia el lado opuesto
    for(let i = 0; i < 6; i++) createKaboomChick();

    kaboomLast = performance.now();
    kaboomRAF = requestAnimationFrame(kaboomLoop);
}

// Intervalo de aparición de pollitos (ms): aparecen constantemente y cada vez más seguido
function getKaboomSpawnRate() {
    const elapsed = 120 - timeLeft;
    if(elapsed >= 45) return 350;
    if(elapsed >= 30) return 450;
    if(elapsed >= 15) return 550;
    return 700;
}

// Movimiento: pollitos cruzan la pantalla, bombas persiguen al pollito más cercano y lo eliminan
function kaboomLoop(t) {
    const area = document.getElementById('kaboom-area');
    const dt = Math.min((t - kaboomLast) / 1000, 0.05);
    kaboomLast = t;
    const W = area.clientWidth, H = area.clientHeight;
    const maxX = W - 40, maxY = H - 40;

    // Pollitos constantes; una bomba nueva cada 3 segundos (máximo 4 persiguiendo a la vez)
    kaboomSpawnAcc += dt * 1000;
    const rate = getKaboomSpawnRate();
    while(kaboomSpawnAcc >= rate) {
        kaboomSpawnAcc -= rate;
        createKaboomChick();
    }
    kaboomBombAcc += dt * 1000;
    if(kaboomBombAcc >= 3000) {
        kaboomBombAcc -= 3000;
        if([...area.querySelectorAll('.kaboom-circle')].filter(c => c._bomb && !c._runner).length < 4) createKaboomBomb();
    }

    // Bombas que cruzan al azar con el comportamiento de los pollitos (cada 1.5 a 3.5 s)
    kaboomRunnerAcc += dt * 1000;
    if(kaboomRunnerAcc >= kaboomRunnerNext) {
        kaboomRunnerAcc = 0;
        kaboomRunnerNext = 1500 + Math.random() * 2000;
        createKaboomRunnerBomb();
    }

    // Cada 25 s llega una oleada de muchos pollitos y bombas; después vuelve el flujo normal
    if(120 - timeLeft >= kaboomNextRush) {
        kaboomNextRush += 25;
        kaboomRushT = 4;
        showToast('<i class="fa-solid fa-burst"></i> ¡OLEADA!');
    }
    if(kaboomRushT > 0) {
        kaboomRushT -= dt;
        kaboomRushChickAcc += dt * 1000;
        kaboomRushBombAcc += dt * 1000;
        while(kaboomRushChickAcc >= 120) { kaboomRushChickAcc -= 120; createKaboomChick(); }
        while(kaboomRushBombAcc >= 350) { kaboomRushBombAcc -= 350; createKaboomRunnerBomb(); }
    }

    const circles = [...area.querySelectorAll('.kaboom-circle')];
    const chicks = circles.filter(c => !c._bomb);

    circles.forEach(c => {
        if(!c.parentNode) return;
        if(c._bomb && !c._runner) {
            let target = null, best = Infinity;
            chicks.forEach(p => {
                if(!p.parentNode) return;
                const d = Math.hypot(p._x - c._x, p._y - c._y);
                if(d < best) { best = d; target = p; }
            });
            if(target) {
                if(best < 28) {
                    target.remove(); // la bomba hace desaparecer al pollito (la bomba se queda)
                } else {
                    c._x += (target._x - c._x) / best * c._speed * dt;
                    c._y += (target._y - c._y) / best * c._speed * dt;
                }
            } else { // sin pollitos: la bomba vaga rebotando
                c._x += c._vx * dt; c._y += c._vy * dt;
                if(c._x < 0 || c._x > maxX) c._vx *= -1;
                if(c._y < 0 || c._y > maxY) c._vy *= -1;
            }
        } else { // pollito: corre en línea recta hasta salir por el lado opuesto
            c._x += c._vx * dt;
            c._y += c._vy * dt;
            if((c._vx > 0 && c._x > W) || (c._vx < 0 && c._x < -40) ||
               (c._vy > 0 && c._y > H) || (c._vy < 0 && c._y < -40)) {
                c.remove();
                return;
            }
        }
        c.style.left = c._x + 'px';
        c.style.top = c._y + 'px';
    });
    kaboomRAF = requestAnimationFrame(kaboomLoop);
}

function createKaboomChick() {
    const area = document.getElementById('kaboom-area');
    const W = area.clientWidth, H = area.clientHeight, size = 40;
    const dir = Math.floor(Math.random() * 4); // 0 izq→der, 1 der→izq, 2 arriba→abajo, 3 abajo→arriba
    const speed = 320 + Math.random() * 200;     // píxeles por segundo
    let x, y, vx = 0, vy = 0;
    if(dir === 0)      { x = -size; y = Math.random() * (H - size); vx = speed; }
    else if(dir === 1) { x = W;     y = Math.random() * (H - size); vx = -speed; }
    else if(dir === 2) { y = -size; x = Math.random() * (W - size); vy = speed; }
    else               { y = H;     x = Math.random() * (W - size); vy = -speed; }

    const c = document.createElement('div');
    c.className = 'kaboom-circle w-10 h-10 bg-yellow-400 text-slate-900';
    c.innerHTML = `<i class="fa-solid fa-kiwi-bird" style="${vx < 0 ? 'transform:scaleX(-1)' : ''}"></i>`;
    c._bomb = false;
    c._x = x; c._y = y; c._vx = vx; c._vy = vy;
    c.style.left = x + 'px';
    c.style.top = y + 'px';

    c.addEventListener('pointerdown', e => {
        e.preventDefault();
        if(!c.parentNode) return;
        c.remove();
        playSFX('punto');
        kaboomScore++;
        kaboomLastCollect = performance.now();
        if(kaboomScore % 5 === 0) kaboomCharges++; // cada 5 pollitos se habilita "Desactivar"
        document.getElementById('kaboom-score').innerText = kaboomScore;
        updateKaboomDefuseBtn();
    });
    area.appendChild(c);
}

function createKaboomBomb() {
    const area = document.getElementById('kaboom-area');
    const W = area.clientWidth, H = area.clientHeight, size = 40;
    const side = Math.floor(Math.random() * 4); // la bomba aparece por un borde al azar
    let x, y;
    if(side === 0)      { x = 0;         y = Math.random() * (H - size); }
    else if(side === 1) { x = W - size;  y = Math.random() * (H - size); }
    else if(side === 2) { y = 0;         x = Math.random() * (W - size); }
    else                { y = H - size;  x = Math.random() * (W - size); }

    const c = document.createElement('div');
    c.className = 'kaboom-circle w-10 h-10 bg-blue-500 text-white';
    c.innerHTML = '<i class="fa-solid fa-bomb"></i>';
    c._bomb = true;
    c._x = x; c._y = y;
    c._speed = 520 + (120 - timeLeft) * 1.5; // velocidad de persecución muy rápida (px por segundo), sube con el tiempo
    c._vx = (Math.random() < 0.5 ? -1 : 1) * (60 + Math.random() * 60);
    c._vy = (Math.random() < 0.5 ? -1 : 1) * 60;
    c.style.left = x + 'px';
    c.style.top = y + 'px';

    c.addEventListener('pointerdown', e => {
        e.preventDefault();
        if(!c.parentNode) return;
        playSFX('explosion');
        kaboomBombsHit++;
        c.remove();
        kaboomExplodeAt(c._x, c._y);
        if(kaboomBombsHit >= 3) endKaboom(false, 'bombs');
    });
    area.appendChild(c);
}

// Bomba que cruza la pantalla en línea recta, igual que los pollitos
function createKaboomRunnerBomb() {
    const area = document.getElementById('kaboom-area');
    const W = area.clientWidth, H = area.clientHeight, size = 40;
    const dir = Math.floor(Math.random() * 4); // 0 izq→der, 1 der→izq, 2 arriba→abajo, 3 abajo→arriba
    const speed = 320 + Math.random() * 200;
    let x, y, vx = 0, vy = 0;
    if(dir === 0)      { x = -size; y = Math.random() * (H - size); vx = speed; }
    else if(dir === 1) { x = W;     y = Math.random() * (H - size); vx = -speed; }
    else if(dir === 2) { y = -size; x = Math.random() * (W - size); vy = speed; }
    else               { y = H;     x = Math.random() * (W - size); vy = -speed; }

    const c = document.createElement('div');
    c.className = 'kaboom-circle w-10 h-10 bg-blue-500 text-white';
    c.innerHTML = '<i class="fa-solid fa-bomb"></i>';
    c._bomb = true; c._runner = true;
    c._x = x; c._y = y; c._vx = vx; c._vy = vy;
    c.style.left = x + 'px';
    c.style.top = y + 'px';

    c.addEventListener('pointerdown', e => {
        e.preventDefault();
        if(!c.parentNode) return;
        playSFX('explosion');
        kaboomBombsHit++;
        c.remove();
        kaboomExplodeAt(c._x, c._y);
        if(kaboomBombsHit >= 3) endKaboom(false, 'bombs');
    });
    area.appendChild(c);
}

// Al explotar una bomba desaparecen los 4 pollitos más cercanos
function kaboomExplodeAt(x, y) {
    const area = document.getElementById('kaboom-area');
    [...area.querySelectorAll('.kaboom-circle')].filter(c => !c._bomb && c.parentNode)
        .sort((a, b) => Math.hypot(a._x - x, a._y - y) - Math.hypot(b._x - x, b._y - y))
        .slice(0, 4).forEach(c => c.remove());
    const fx = document.createElement('div');
    fx.className = 'kaboom-boom';
    fx.style.left = (x + 20) + 'px';
    fx.style.top = (y + 20) + 'px';
    fx.innerHTML = '<i class="fa-solid fa-burst"></i>';
    area.appendChild(fx);
    setTimeout(() => fx.remove(), 450);
}

// Botón "Desactivar": gris sin usos, rojo e iluminado cuando se puede usar
function updateKaboomDefuseBtn() {
    const b = document.getElementById('kaboom-defuse-btn');
    const cnt = document.getElementById('kaboom-defuse-count');
    if(!b || !cnt) return;
    const ready = kaboomCharges > 0;
    b.disabled = !ready;
    b.classList.toggle('defuse-ready', ready);
    cnt.innerText = ready ? `x${kaboomCharges}` : `${kaboomScore % 5}/5`;
}

function useKaboomDefuse() {
    if(kaboomCharges <= 0) return;
    kaboomCharges--;
    playSFX('desactivacion');
    const area = document.getElementById('kaboom-area');
    area.querySelectorAll('.kaboom-circle').forEach(c => { if(c._bomb) c.remove(); }); // borra todas las bombas
    area.classList.remove('kaboom-flash');
    void area.offsetWidth;
    area.classList.add('kaboom-flash');
    updateKaboomDefuseBtn();
}

function endKaboom(survived, reason) {
    cancelAnimationFrame(kaboomRAF);
    clearInterval(kaboomTimer);
    clearTimeout(kaboomInterval);
    document.getElementById('kaboom-area').innerHTML = '';
    
    // 1 punto global por cada 5 pollitos capturados
    const earned = Math.floor(kaboomScore / 5);
    userData.points += earned;
    if(kaboomScore > userData.extra.kaboomBest) userData.extra.kaboomBest = kaboomScore;
    saveData();
    updateGlobalPoints();

    const mod = document.getElementById('game-over-modal');
    document.getElementById('game-over-title').innerText = survived ? '¡SOBREVIVISTE!' : '¡BOOM!';
    document.getElementById('game-over-title').className = `text-2xl font-pixel ${survived?'text-emerald-400':'text-rose-500'}`;
    document.getElementById('game-over-msg').innerText = survived
        ? `Atrapaste ${kaboomScore} pollitos.`
        : (reason === 'idle' ? 'Pasaron 15 segundos sin atrapar un pollito.' : 'Tocaste 3 bombas.');
    document.getElementById('game-over-rewards').innerText = earned > 0 ? `+${earned} Puntos Globales (1 pt por cada 5 pollitos)` : 'No ganaste puntos.';
    
    document.getElementById('btn-play-again').onclick = () => {
        playSFX('click'); mod.classList.add('hidden'); startKaboomGame();
    };
    mod.classList.remove('hidden');
    recordGame('kaboom', survived);
}

// ====== LOGROS ======
const ACHIEVEMENTS = [
    { id: 'tutorial', name: 'No le entendí', desc: 'Completa el modo tutorial.', icon: 'fa-circle-question', color: '#38bdf8', check: () => !!userData.extra.modesDone.tutorial },
    { id: 'novato', name: 'Novato', desc: 'Completa 5 partidas en cualquier modo.', icon: 'fa-baby', color: '#f472b6', check: () => userData.extra.games >= 5 },
    { id: 'facil5', name: 'No es tan difícil', desc: 'Gana 5 partidas en fácil.', icon: 'fa-face-smile', color: '#34d399', check: () => userData.stats.facil >= 5 },
    { id: 'normal5', name: 'Estás entendiendo', desc: 'Gana 5 partidas en dificultad media.', icon: 'fa-lightbulb', color: '#fb923c', check: () => userData.stats.normal >= 5 },
    { id: 'dificil7', name: 'Maestro', desc: 'Gana 7 partidas en difícil.', icon: 'fa-crown', color: '#f43f5e', check: () => userData.stats.dificil >= 7 },
    { id: 'super5', name: 'Sobreviviente', desc: 'Logra una racha de 5 partidas ganadas en modo supervivencia.', icon: 'fa-heart-pulse', color: '#a855f7', check: () => userData.stats.superStreak >= 5 },
    { id: 'kaboomwin', name: 'kBOOM', desc: 'Gana una partida en modo kaboom.', icon: 'fa-explosion', color: '#f97316', check: () => !!userData.extra.modesDone.kaboom },
    { id: 'ileso', name: 'Pollito ileso', desc: 'Gana una partida en modo explotado.', icon: 'fa-shield-heart', color: '#818cf8', check: () => !!userData.extra.modesDone.moneda },
    { id: 'hermanos', name: 'Mis hermanos', desc: 'Obtén una puntuación de 35 pollitos en modo kaboom.', icon: 'fa-kiwi-bird', color: '#facc15', check: () => userData.extra.kaboomBest >= 35 },
    { id: 'tienda3', name: '¿Solo sirve para esto?', desc: 'Gasta en 3 artículos de la tienda.', icon: 'fa-cart-shopping', color: '#2dd4bf', check: () => userData.extra.purchases >= 3 },
    { id: 'teampollito', name: 'Team pollito', desc: 'Completa la colección de cartas pollito.', icon: 'fa-egg', color: '#fde047', check: () => POLLITO_CARDS.every(c => userData.collection.includes(c.id)) },
    { id: 'bombaa', name: 'Bombaa', desc: 'Completa la colección de cartas bomba.', icon: 'fa-bomb', color: '#3b82f6', check: () => BOMBA_CARDS.every(c => userData.collection.includes(c.id)) },

    // Ocultos
    { id: 'casinadie', hidden: true, name: 'Casi nadie lo hace', desc: 'Escribe una profesión en el apartado de profesión.', icon: 'fa-briefcase', check: () => (userData.prof || '').trim().length > 0 },
    { id: 'gracias', hidden: true, name: 'Gracias por jugar', desc: 'Completa cada uno de los modos al menos una vez.', icon: 'fa-hands-clapping', check: () => ['tutorial', 'facil', 'normal', 'dificil', 'supervivencia', 'moneda', 'kaboom'].every(m => userData.extra.modesDone[m]) },
    { id: 'curiosidad', hidden: true, name: 'Curiosidad', desc: 'Lee todos los apartados de las cartas.', icon: 'fa-book-open-reader', check: () => userData.extra.cardsRead.length >= POLLITO_CARDS.length + BOMBA_CARDS.length },
    { id: 'trabajar', hidden: true, name: 'Ponte a trabajar cara de vrg', desc: 'Selecciona el color rojo y el avatar de la araña.', icon: 'fa-spider', check: () => userData.color === 'red' && userData.avatarId === 'a6' }
];

// Registra una partida terminada (win = ganada). El tutorial cuenta como completado al terminar.
function recordGame(mode, win) {
    userData.extra.games++;
    if(win || mode === 'tutorial') userData.extra.modesDone[mode] = true;
    saveData();
    checkAchievements();
}

function checkAchievements() {
    if(!userData.name) return;
    ACHIEVEMENTS.forEach(a => {
        if(!userData.ach[a.id] && a.check()) {
            userData.ach[a.id] = true;
            saveData();
            showToast(`<i class="fa-solid fa-trophy"></i> ¡Logro: ${a.hidden ? 'oculto - ' : ''}${a.name}!`);
        }
    });
}

function toggleAchievements() {
    const m = document.getElementById('achievements-modal');
    m.classList.toggle('hidden');
    if(!m.classList.contains('hidden')) renderAchievements();
    playSFX('click');
}

function renderAchievements() {
    const total = ACHIEVEMENTS.length;
    const got = ACHIEVEMENTS.filter(a => userData.ach[a.id]).length;
    document.getElementById('ach-count').innerText = `${got}/${total}`;
    document.getElementById('achievements-grid').innerHTML = ACHIEVEMENTS.map(a => {
        const on = !!userData.ach[a.id];
        if(!on && a.hidden) {
            return `<div class="ach-card" style="background:#000;border-color:#334155;color:#64748b"><i class="fa-solid fa-question ach-icon"></i><div class="ach-name">???</div><div class="ach-desc">Logro oculto</div></div>`;
        }
        if(!on) {
            return `<div class="ach-card" style="background:#334155;border-color:#475569;color:#94a3b8;filter:grayscale(1)"><i class="fa-solid ${a.icon} ach-icon"></i><div class="ach-name">${a.name}</div><div class="ach-desc">${a.desc}</div></div>`;
        }
        const bg = a.hidden ? 'linear-gradient(135deg,#fde047,#d97706)' : a.color;
        const border = a.hidden ? '#fef3c7' : '#ffffff';
        return `<div class="ach-card" style="background:${bg};border-color:${border};color:#0f172a"><i class="fa-solid ${a.icon} ach-icon"></i><div class="ach-name">${a.name}</div><div class="ach-desc">${a.desc}</div></div>`;
    }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
    const inp = document.getElementById('input-profession');
    if(inp) inp.addEventListener('change', () => {
        userData.prof = inp.value.trim();
        saveData();
        checkAchievements();
    });
});

// ====== UTILIDADES ======
function setPanel(msg, btns) {
    document.getElementById('action-message').innerHTML = msg;
    document.getElementById('action-buttons').innerHTML = btns;
}

function clearTableSlots() {
    ['player-card-slot', 'rival-card-slot', 'top-rival-slot', 'top-player-slot'].forEach(id => {
        const el = document.getElementById(id);
        if(el) { el.innerHTML = ''; el.className = el.className.replace(/translate-\S+/g, '').replace(/opacity-0/g, '').replace(/throw-away-anim/g, ''); el.style.transition = 'none'; void el.offsetWidth; el.style.transition = ''; }
    });
}

// Eliminar intro 3 seg
setTimeout(() => {
    const intro = document.getElementById('intro-screen');
    if(intro) intro.style.display = 'none';
}, 3000);