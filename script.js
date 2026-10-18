// --- SISTEMA DE AUDIO SEGURO ---
const audios = {
    menu: document.getElementById('bgm-menu'),
    facil: document.getElementById('bgm-facil'),
    normal: document.getElementById('bgm-normal'),
    dificil: document.getElementById('bgm-dificil'),
    tutorial: document.getElementById('bgm-tutorial'),
    btn: document.getElementById('sfx-btn')
};

function unlockAudioAndHide() {
    playBGM('menu');
    const container = document.getElementById('audio-unlock-container');
    if(container) container.style.display = 'none';
}

function dismissRotateWarning() {
    const warning = document.getElementById('rotate-device-warning');
    if(warning) warning.style.display = 'none';
}

function playBGM(mode) {
    Object.keys(audios).forEach(k => {
        if (k !== 'btn' && audios[k]) {
            audios[k].pause();
            audios[k].currentTime = 0;
        }
    });
    if (audios[mode]) {
        audios[mode].volume = 0.4;
        audios[mode].play().catch(() => {});
    }
}

function playSFX() {
    if (audios.btn) {
        audios.btn.currentTime = 0;
        audios.btn.volume = 0.6;
        audios.btn.play().catch(() => {});
    }
}

document.addEventListener('click', (e) => {
    if (e.target.closest('button') || e.target.closest('label.color-label') || e.target.closest('.avatar-siluette')) {
        playSFX();
    }
});

// BASE DE DATOS DE CARTAS
const POLLITO_CARDS = [
    { id: 'p1', name: 'Ing. Industrial', icon: 'fa-industry', trivia: 'Nació formalmente con la Revolución Industrial y la administración científica de Frederick Taylor a principios del siglo XX.' },
    { id: 'p2', name: 'Veterinaria', icon: 'fa-stethoscope', trivia: 'La primera escuela de veterinaria del mundo se fundó en Lyon, Francia, en 1761 por Claude Bourgelat.' },
    { id: 'p3', name: 'Ing. Sistemas', icon: 'fa-laptop-code', trivia: 'Ada Lovelace es considerada la primera programadora de la historia al escribir un algoritmo para la máquina analítica en 1843.' },
    { id: 'p4', name: 'Ing. Civil', icon: 'fa-helmet-safety', trivia: 'Es la ingeniería más antigua; sus raíces provienen de la necesidad de construir pirámides y acueductos en la antigüedad.' },
    { id: 'p5', name: 'Médico Cirujano', icon: 'fa-user-doctor', trivia: 'Antiguamente los barberos operaban y realizaban cirugías; de ahí el famoso poste rojo y blanco de las barberías.' },
    { id: 'p6', name: 'Arquitectura', icon: 'fa-compass-drafting', trivia: 'Vitruvio estableció en la antigua Roma que la arquitectura debe tener firmeza, utilidad y belleza.' },
    { id: 'p7', name: 'Abogado', icon: 'fa-scale-balanced', trivia: 'En la antigua Grecia y Roma, los primeros defensores legales no cobraban honorarios por ley, sino que lo hacían por prestigio.' },
    { id: 'p8', name: 'Profesor', icon: 'fa-chalkboard-user', trivia: 'Las primeras escuelas organizadas surgieron en Mesopotamia alrededor del año 3000 a. C. para enseñar escritura cuneiforme.' },
    { id: 'p9', name: 'Chef Ejecutivo', icon: 'fa-utensils', trivia: 'El sombrero alto de chef (toque blanche) se popularizó en el siglo XIX para denotar jerarquía y evitar cabellos en la sopa.' },
    { id: 'p10', name: 'Astronauta', icon: 'fa-user-astronaut', trivia: 'Yuri Gagarin fue el primer ser humano en viajar al espacio exterior a bordo del Vostok 1 en 1961.' },
    { id: 'p11', name: 'Ing. Mecatrónica', icon: 'fa-robot', trivia: 'El término "mecatrónica" fue acuñado por primera vez en una empresa japonesa en 1969 combinando mecánica y electrónica.' },
    { id: 'p12', name: 'Ing. Química', icon: 'fa-flask', trivia: 'Surgió a finales del siglo XIX cuando la industria necesitaba escalar procesos de laboratorio a gran escala.' },
    { id: 'p13', name: 'Diseñador Gráfico', icon: 'fa-palette', trivia: 'William Addison Dwiggins acuñó formalmente el término "diseño gráfico" en el año 1922.' },
    { id: 'p14', name: 'Bombero', icon: 'fa-fire-extinguisher', trivia: 'El primer cuerpo de bomberos profesional de la historia fue creado en Roma por el emperador César Augusto.' },
    { id: 'p15', name: 'Policía Detective', icon: 'fa-user-shield', trivia: 'Eugène François Vidocq fundó la primera brigada de detectives moderna en París a principios del siglo XIX.' },
    { id: 'p16', name: 'Piloto', icon: 'fa-plane', trivia: 'Los hermanos Wright realizaron el primer vuelo controlado y sostenido con motor en 1903.' },
    { id: 'p17', name: 'Psicólogo', icon: 'fa-brain', trivia: 'Wilhelm Wundt fundó el primer laboratorio oficial de psicología experimental en Alemania en 1879.' },
    { id: 'p18', name: 'Ing. Agrónomo', icon: 'fa-wheat-awn', trivia: 'Sus orígenes se remontan a la revolución neolítica cuando la humanidad pasó de ser nómada a cultivar la tierra.' },
    { id: 'p19', name: 'Enfermero', icon: 'fa-syringe', trivia: 'Florence Nightingale revolucionó la profesión durante la Guerra de Crimea, profesionalizando la higiene hospitalaria.' },
    { id: 'p20', name: 'Dentista', icon: 'fa-tooth', trivia: 'En el antiguo Egipto ya existían especialistas dedicados exclusivamente a tratar las enfermedades de los dientes.' },
    { id: 'p21', name: 'Músico', icon: 'fa-music', trivia: 'La flauta más antigua descubierta está hecha de hueso y tiene más de 40,000 años de antigüedad.' },
    { id: 'p22', name: 'Fotógrafo', icon: 'fa-camera', trivia: 'Joseph Nicéphore Niépce logró la primera fotografía permanente de la historia en el año 1826.' },
    { id: 'p23', name: 'Biólogo Marino', icon: 'fa-fish', trivia: 'Aristóteles es considerado el primer biólogo marino por sus detalladas descripciones de la vida en el mar Egeo.' },
    { id: 'p24', name: 'Ing. Biomédico', icon: 'fa-heart-pulse', trivia: 'Nació de la unión entre la medicina y la ingeniería tras el desarrollo de los primeros equipos de rayos X y electrocardiogramas.' },
    { id: 'p25', name: 'Periodista', icon: 'fa-newspaper', trivia: 'Las gacetas informativas impresas comenzaron a circular masivamente en Europa tras la imprenta de Gutenberg.' }
];

const BOMBA_CARDS = [
    { id: 'b1', name: 'Calcetín Apestoso', icon: 'fa-socks', trivia: 'Arma biológica casera dejada en el fondo del cesto de ropa sucia por semanas. ¡Peligro de desmayo!' },
    { id: 'b2', name: 'Bomba Atómica', icon: 'fa-radiation', trivia: 'Liberación masiva de energía nuclear descubierta a mediados del siglo XX. ¡Mejor no jugar con esto!' },
    { id: 'b3', name: 'Dinamita Clásica', icon: 'fa-burst', trivia: 'Inventada por Alfred Nobel, quien luego creó los premios Nobel para limpiar su conciencia explosiva.' },
    { id: 'b4', name: 'Mina Terrestre', icon: 'fa-land-mine-on', trivia: 'Utilizadas inicialmente en fortificaciones medievales como trampas sorpresa bajo tierra.' },
    { id: 'b5', name: 'Bomba de Humo', icon: 'fa-smog', trivia: 'Ideal para desaparecer dramáticamente de una fiesta aburrida sin despedirte de nadie.' },
    { id: 'b6', name: 'Granada de Mano', icon: 'fa-volcano', trivia: 'Su nombre proviene de las granadas de fruta debido a su tamaño y forma similar.' },
    { id: 'b7', name: 'Bomba de Agua', icon: 'fa-droplet', trivia: 'El arma masiva favorita en las épocas de calores intensos y peleas callejeras de verano.' },
    { id: 'b8', name: 'Bomba Reloj', icon: 'fa-stopwatch', trivia: 'El cliché favorito de las películas de acción donde el héroe corta el cable rojo o azul en el último segundo.' },
    { id: 'b9', name: 'Bomba C4', icon: 'fa-box', trivia: 'Compuesto plástico moldeable que se puede adaptar a cualquier forma sin detonar por accidente.' },
    { id: 'b10', name: 'Pastel Fétido', icon: 'fa-cake-candles', trivia: 'Un postre horneado con ingredientes caducados hace tres años. ¡Feliz no-cumpleaños!' },
    { id: 'b11', name: 'Bomba Fétida', icon: 'fa-poop', trivia: 'Cápsula de gas ultra apestoso capaz de vaciar un salón de clases en tres segundos.' },
    { id: 'b12', name: 'Bomba de Destellos', icon: 'fa-bolt', trivia: 'Diseñada originalmente para cegar temporalmente a los adversarios en operaciones tácticas.' },
    { id: 'b13', name: 'Bomba Molotov', icon: 'fa-fire', trivia: 'Improvisada por primera vez durante la Guerra Civil Española con botellas de vidrio y combustible.' },
    { id: 'b14', name: 'Bomba Volcánica', icon: 'fa-mountain-city', trivia: 'La furia directa de la madre naturaleza expulsando roca fundida a presión.' },
    { id: 'b15', name: 'Bomba EMP', icon: 'fa-plug-circle-xmark', trivia: 'Pulso electromagnético capaz de apagar cualquier dispositivo electrónico en un radio kilométrico.' },
    { id: 'b16', name: 'Bomba Picante', icon: 'fa-pepper-hot', trivia: 'Una sobredosis extrema de salsa habanera pura en tus ojos y boca. ¡Arde más que tus deudas!' },
    { id: 'b17', name: 'Bomba Confeti', icon: 'fa-gifts', trivia: 'Explota y te deja cubierto de brillantina y papelitos que tardarás meses en limpiar.' },
    { id: 'b18', name: 'Bomba Hielo', icon: 'fa-snowflake', trivia: 'Congela instantáneamente cualquier intento de coqueteo o conversación incómoda.' },
    { id: 'b19', name: 'Bomba Viscosa', icon: 'fa-spaghetti-monster-flying', trivia: 'Te baña en una sustancia pegajosa verde de origen desconocido.' },
    { id: 'b20', name: 'Bomba Sónica', icon: 'fa-bullhorn', trivia: 'Emite un sonido idéntico a la alarma de tu despertador un lunes a las 6:00 AM.' },
    { id: 'b21', name: 'Bomba de Gas', icon: 'fa-wind', trivia: 'Neblinas químicas utilizadas en prácticas de seguridad industrial y simulacros.' },
    { id: 'b22', name: 'Bomba Trampa', icon: 'fa-skull', trivia: 'Un letrero falso que dice "Café gratis" pero activa un resorte en tu cara.' },
    { id: 'b23', name: 'Bomba de Pintura', icon: 'fa-fill-drip', trivia: 'Estalla cubriendo tu ropa limpia favorita de colores neón permanentes.' },
    { id: 'b24', name: 'Bomba Implosiva', icon: 'fa-atom', trivia: 'Colapsa sobre sí misma en lugar de expandirse hacia afuera. Física cuántica pura.' },
    { id: 'b25', name: 'Bomba Megatón', icon: 'fa-meteor', trivia: 'Capaz de borrar ciudades enteras de los mapas de la historia.' }
];

const MOTIVATIONAL_QUOTES = [
    "No te rindas, eres alguien especial que puede lograr muchas cosas.",
    "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
    "Cada examen o reto superado te acerca un paso más a tus grandes sueños.",
    "No importa cuán lento vayas mientras no te detengas.",
    "Tu dedicación actual es la base de tu futuro brillante."
];

const RIVAL_AVATARS = [
    { name: 'Paloma migajera', icon: 'fa-dove' },
    { name: 'Perro cobarde', icon: 'fa-dog' },
    { name: 'Vaca sin cola vestida de uniforme', icon: 'fa-cow' },
    { name: 'Toro sin cuernos', icon: 'fa-circle' },
    { name: 'Gato miserable', icon: 'fa-cat' },
    { name: 'Venado huérfano', icon: 'fa-horse' },
    { name: 'Panda que sabe kung fu', icon: 'fa-yin-yang' },
    { name: 'Pingüino espía', icon: 'fa-user-secret' },
    { name: 'Cabra veloz', icon: 'fa-caret-up' },
    { name: 'Pez con poca memoria', icon: 'fa-fish' },
    { name: 'Ganso fuerte', icon: 'fa-dumbbell' },
    { name: 'Hormiga inventora', icon: 'fa-bug' },
    { name: 'Elefante orejón', icon: 'fa-square' },
    { name: 'Conejo mamón', icon: 'fa-carrot' },
    { name: 'Pato loco', icon: 'fa-crow' },
    { name: 'Gato medio vivo y medio muerto', icon: 'fa-ghost' }
];

// MÁS DE 30 AVATARES DE OBJETOS (SIN TEXTO EN EL ICONO)
const AVATAR_SILUETAS = [
    { id: 's1', icon: 'fa-kiwi-bird' },
    { id: 's2', icon: 'fa-hard-hat' },
    { id: 's3', icon: 'fa-utensils' },
    { id: 's4', icon: 'fa-user-secret' },
    { id: 's5', icon: 'fa-user-astronaut' },
    { id: 's6', icon: 'fa-crown' },
    { id: 's7', icon: 'fa-hat-wizard' },
    { id: 's8', icon: 'fa-shield' },
    { id: 's9', icon: 'fa-user-doctor' },
    { id: 's10', icon: 'fa-ghost' },
    { id: 's11', icon: 'fa-robot' },
    { id: 's12', icon: 'fa-user-ninja' },
    { id: 's13', icon: 'fa-flask' },
    { id: 's14', icon: 'fa-plane' },
    { id: 's15', icon: 'fa-skull-crossbones' },
    { id: 's16', icon: 'fa-bell' },
    { id: 's17', icon: 'fa-tree' },
    { id: 's18', icon: 'fa-fire' },
    { id: 's19', icon: 'fa-gem' },
    { id: 's20', icon: 'fa-bomb' },
    { id: 's21', icon: 'fa-palette' },
    { id: 's22', icon: 'fa-water' },
    { id: 's23', icon: 'fa-book' },
    { id: 's24', icon: 'fa-car' },
    { id: 's25', icon: 'fa-key' },
    { id: 's26', icon: 'fa-lock' },
    { id: 's27', icon: 'fa-bolt' },
    { id: 's28', icon: 'fa-star' },
    { id: 's29', icon: 'fa-moon' },
    { id: 's30', icon: 'fa-sun' },
    { id: 's31', icon: 'fa-anchor' },
    { id: 's32', icon: 'fa-compass' }
];

let selectedAvatarSiluette = AVATAR_SILUETAS[0];
let unlockedCards = JSON.parse(localStorage.getItem('pb_unlocked_cards') || '[]');
let hasPlayedBefore = JSON.parse(localStorage.getItem('pb_has_played') || 'false');
let gameStats = JSON.parse(localStorage.getItem('pb_game_stats') || '{"facil":0, "normal":0, "dificil":0}');

let gameState = {
    playerName: '',
    playerProf: '',
    playerColor: 'yellow',
    mode: 'facil',
    deck: [],
    playerScore: { chicks: 0, bombs: 0 },
    rivalScore: { chicks: 0, bombs: 0 },
    currentRound: { playerCard: null, rivalCard: null, playerClaim: null, rivalClaim: null },
    aiMemory: { playerTruths: 0, playerLies: 0 }
};

let currentRival = RIVAL_AVATARS[0];

document.addEventListener('DOMContentLoaded', () => {
    initCollectionGrid();
    initAvatarDrawer();
    setupEventListeners();
    checkThanksMessage();
    loadRandomMotivation();
    updateStatsDisplay();
});

function loadRandomMotivation() {
    const quoteContainer = document.getElementById('motivation-container');
    if(quoteContainer) {
        const randomQuote = MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
        quoteContainer.innerText = `"${randomQuote}"`;
    }
}

function checkThanksMessage() {
    if (hasPlayedBefore) {
        const thanksContainer = document.getElementById('thanks-message-container');
        if(thanksContainer) thanksContainer.classList.remove('hidden');
    }
}

function updateStatsDisplay() {
    const f = document.getElementById('stat-facil');
    const n = document.getElementById('stat-normal');
    const d = document.getElementById('stat-dificil');
    if(f) f.innerText = gameStats.facil;
    if(n) n.innerText = gameStats.normal;
    if(d) d.innerText = gameStats.dificil;
}

function setupEventListeners() {
    const btnToggle = document.getElementById('btn-collection-toggle');
    const btnClose = document.getElementById('btn-collection-close');
    if(btnToggle) {
        btnToggle.addEventListener('click', () => {
            document.getElementById('collection-drawer').classList.remove('translate-x-full');
        });
    }
    if(btnClose) {
        btnClose.addEventListener('click', () => {
            document.getElementById('collection-drawer').classList.add('translate-x-full');
        });
    }
}

function toggleAvatarDrawer() {
    const drawer = document.getElementById('avatar-drawer');
    const icon = document.getElementById('avatar-drawer-icon');
    if(drawer) drawer.classList.toggle('hidden');
    if(icon) {
        icon.classList.toggle('fa-chevron-down');
        icon.classList.toggle('fa-chevron-up');
    }
}

function initAvatarDrawer() {
    const drawer = document.getElementById('avatar-drawer');
    if(!drawer) return;
    drawer.innerHTML = '';
    AVATAR_SILUETAS.forEach((sil) => {
        const isSelected = sil.id === selectedAvatarSiluette.id;
        const el = document.createElement('div');
        el.className = `avatar-siluette cursor-pointer border-2 ${isSelected ? 'data-selected border-white' : 'border-transparent'} p-2 rounded-lg bg-slate-900 flex flex-col items-center justify-center gap-1 transition h-10`;
        el.innerHTML = `
            <i class="fa-solid ${sil.icon} text-lg text-amber-300"></i>
        `;
        el.onclick = (e) => selectAvatarSiluette(sil, e.currentTarget);
        drawer.appendChild(el);
    });
}

function selectAvatarSiluette(sil, element) {
    selectedAvatarSiluette = sil;
    document.querySelectorAll('.avatar-siluette').forEach(node => node.classList.remove('data-selected', 'border-white'));
    if(element) element.classList.add('data-selected', 'border-white');

    const prevIcon = document.getElementById('preview-avatar-icon');
    const prevName = document.getElementById('preview-avatar-name');
    if(prevIcon) prevIcon.className = `fa-solid ${sil.icon} text-3xl`;
    if(prevName) prevName.innerText = "Objeto Seleccionado";
}

const AVATAR_COLORS = {
    yellow: 'bg-yellow-400 text-slate-900',
    blue: 'bg-cyan-400 text-slate-900',
    pink: 'bg-pink-400 text-slate-900',
    green: 'bg-emerald-400 text-slate-900',
    orange: 'bg-orange-500 text-white',
    purple: 'bg-purple-500 text-white',
    red: 'bg-red-500 text-white',
    white: 'bg-slate-100 text-slate-900'
};

function updateColorSelection(radio) {
    document.querySelectorAll('.color-label').forEach(label => {
        label.classList.remove('data-selected');
    });
    radio.closest('.color-label').classList.add('data-selected');

    const previewBox = document.getElementById('preview-avatar-box');
    const selectedColor = radio.value;
    if(previewBox) {
        previewBox.className = `w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 border-white flex items-center justify-center shadow-xl mb-3 transition-all duration-300 ${AVATAR_COLORS[selectedColor] || 'bg-yellow-400 text-slate-900'}`;
    }
}

function initCollectionGrid() {
    const chicksGrid = document.getElementById('chicks-collection-grid');
    const bombsGrid = document.getElementById('bombs-collection-grid');
    if(!chicksGrid || !bombsGrid) return;

    chicksGrid.innerHTML = '';
    bombsGrid.innerHTML = '';

    POLLITO_CARDS.forEach(card => {
        const isUnlocked = unlockedCards.includes(card.id);
        const el = document.createElement('div');
        el.className = `p-3 rounded-xl border flex flex-col items-start gap-1 text-xs ${isUnlocked ? 'bg-amber-400/10 border-amber-400 text-yellow-200' : 'card-locked border-slate-700 text-slate-500'}`;
        el.innerHTML = `
            <div class="flex items-center gap-2 font-bold">
                <i class="fa-solid ${card.icon} text-base"></i>
                <span>${isUnlocked ? card.name : '???'}</span>
            </div>
            <p class="text-[10px] text-slate-300 italic mt-1">${isUnlocked ? card.trivia : 'Colecciona esta carta jugando.'}</p>
        `;
        chicksGrid.appendChild(el);
    });

    BOMBA_CARDS.forEach(card => {
        const isUnlocked = unlockedCards.includes(card.id);
        const el = document.createElement('div');
        el.className = `p-3 rounded-xl border flex flex-col items-start gap-1 text-xs ${isUnlocked ? 'bg-sky-500/10 border-sky-400 text-sky-200' : 'card-locked border-slate-700 text-slate-500'}`;
        el.innerHTML = `
            <div class="flex items-center gap-2 font-bold">
                <i class="fa-solid ${card.icon} text-base"></i>
                <span>${isUnlocked ? card.name : '???'}</span>
            </div>
            <p class="text-[10px] text-slate-300 italic mt-1">${isUnlocked ? card.trivia : 'Colecciona esta carta jugando.'}</p>
        `;
        bombsGrid.appendChild(el);
    });
}

function unlockCardInCollection(cardId) {
    if (!unlockedCards.includes(cardId)) {
        unlockedCards.push(cardId);
        localStorage.setItem('pb_unlocked_cards', JSON.stringify(unlockedCards));
        initCollectionGrid();
    }
}

function showStoryModeModal() {
    const modal = document.getElementById('tutorial-modal');
    const textEl = document.getElementById('tutorial-text');
    const nextBtn = document.getElementById('tutorial-next-btn');
    if(textEl) textEl.innerHTML = `<div class="flex flex-col items-center gap-3"><i class="fa-solid fa-utensils text-3xl text-amber-400"></i><span>"Espera aun se esta cocinando"</span></div>`;
    if(modal) modal.classList.remove('hidden');
    if(nextBtn) nextBtn.style.display = 'none';
}

function startGame(mode) {
    const nameEl = document.getElementById('input-name');
    const profEl = document.getElementById('input-profession');
    const name = nameEl ? nameEl.value.trim() : '';
    const prof = profEl ? profEl.value.trim() : '';
    const colorRadio = document.querySelector('input[name="chickColor"]:checked');

    if (!name || !prof) {
        alert('Por favor, ingresa tu nombre y profesión antes de comenzar.');
        return;
    }

    playBGM(mode);

    gameState.playerName = name;
    gameState.playerProf = prof;
    gameState.playerColor = colorRadio ? colorRadio.value : 'yellow';
    gameState.mode = mode;
    gameState.playerScore = { chicks: 0, bombs: 0 };
    gameState.rivalScore = { chicks: 0, bombs: 0 };

    hasPlayedBefore = true;
    localStorage.setItem('pb_has_played', 'true');

    const pName = document.getElementById('player-display-name');
    const pProf = document.getElementById('player-display-prof');
    if(pName) pName.innerText = gameState.playerName;
    if(pProf) pProf.innerText = `El jugador ${gameState.playerProf}`;

    const avatarEl = document.getElementById('player-avatar');
    if(avatarEl) {
        avatarEl.className = `w-8 h-8 md:w-10 md:h-10 rounded-lg border-2 border-white flex items-center justify-center shadow-md ${AVATAR_COLORS[gameState.playerColor] || 'bg-yellow-400 text-slate-900'}`;
        avatarEl.innerHTML = `<i class="fa-solid ${selectedAvatarSiluette.icon} text-sm md:text-lg"></i>`;
    }

    currentRival = RIVAL_AVATARS[Math.floor(Math.random() * RIVAL_AVATARS.length)];
    const rName = document.getElementById('rival-display-name');
    const rSmallName = document.getElementById('rival-small-name');
    const rAvatar = document.getElementById('rival-avatar');
    const rSmallAvatar = document.getElementById('rival-small-avatar');

    if(rName) rName.innerText = currentRival.name;
    if(rSmallName) rSmallName.innerText = currentRival.name;
    if(rAvatar) rAvatar.innerHTML = `<i class="fa-solid ${currentRival.icon}"></i>`;
    if(rSmallAvatar) rSmallAvatar.innerHTML = `<i class="fa-solid ${currentRival.icon}"></i>`;

    const setupSec = document.getElementById('screen-setup');
    const gameSec = document.getElementById('screen-game');
    if(setupSec) setupSec.classList.add('hidden');
    if(gameSec) gameSec.classList.remove('hidden');

    updateScoreDisplay();
    startNewRound();
}

let tutorialStepIndex = 0;
const TUTORIAL_DIALOGS = [
    "¡Bienvenido a Pollitos y Bombas Pb! Este es un juego de cartas de estrategia y suerte algo raro pero divertido.",
    "Eres un participante que se metió en problemas en un casino al apostar a sus hermanos.",
    "La forma de sobrevivir a este problema es jugar pollitos y bombas Pb y ganar de vuelta sin explotar."
];

function startTutorial() {
    const nameEl = document.getElementById('input-name');
    const profEl = document.getElementById('input-profession');
    const name = nameEl ? nameEl.value.trim() || 'Jugador' : 'Jugador';
    const prof = profEl ? profEl.value.trim() || 'Ing. Industrial' : 'Ing. Industrial';
    
    if(nameEl) nameEl.value = name;
    if(profEl) profEl.value = prof;

    playBGM('tutorial');

    const setupSec = document.getElementById('screen-setup');
    const tutorialCasino = document.getElementById('screen-tutorial-casino');
    if(setupSec) setupSec.classList.add('hidden');
    if(tutorialCasino) tutorialCasino.classList.remove('hidden');
}

function proceedFromCasinoTutorialToGame() {
    const tutorialCasino = document.getElementById('screen-tutorial-casino');
    if(tutorialCasino) tutorialCasino.classList.add('hidden');
    tutorialStepIndex = 0;
    showTutorialModal(TUTORIAL_DIALOGS[tutorialStepIndex], () => {
        advanceTutorial();
    });
}

function advanceTutorial() {
    tutorialStepIndex++;
    if (tutorialStepIndex < TUTORIAL_DIALOGS.length) {
        showTutorialModal(TUTORIAL_DIALOGS[tutorialStepIndex], () => advanceTutorial());
    } else {
        const modal = document.getElementById('tutorial-modal');
        if(modal) modal.classList.add('hidden');
        startGame('tutorial');
    }
}

function showTutorialModal(text, callback) {
    const modal = document.getElementById('tutorial-modal');
    const textEl = document.getElementById('tutorial-text');
    const nextBtn = document.getElementById('tutorial-next-btn');

    if(textEl) textEl.innerHTML = text;
    if(modal) modal.classList.remove('hidden');
    if(nextBtn) {
        nextBtn.style.display = 'block';
        nextBtn.onclick = () => {
            if (callback) callback();
        };
    }
}

function closeTutorialModalManually() {
    const modal = document.getElementById('tutorial-modal');
    if(modal) modal.classList.add('hidden');
    returnToMenu();
}

function startNewRound() {
    let fullDeck = [
        ...POLLITO_CARDS.map(c => ({ ...c, type: 'pollito' })),
        ...BOMBA_CARDS.map(c => ({ ...c, type: 'bomba' }))
    ];
    
    for (let i = fullDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [fullDeck[i], fullDeck[j]] = [fullDeck[j], fullDeck[i]];
    }

    gameState.deck = fullDeck;

    const deckAnim = document.getElementById('deck-anim');
    if(deckAnim) deckAnim.classList.remove('hidden');

    setTimeout(() => {
        if(deckAnim) deckAnim.classList.add('hidden');

        gameState.currentRound.playerCard = gameState.deck.pop();
        gameState.currentRound.rivalCard = gameState.deck.pop();

        renderPhaseObserveCard();
    }, 1200);
}

function renderPhaseObserveCard() {
    const pSlot = document.getElementById('player-card-slot');
    const verticalPlayer = document.getElementById('vertical-player-slot');
    const verticalRival = document.getElementById('vertical-rival-slot');

    if(pSlot) pSlot.innerHTML = renderCardHTML(gameState.currentRound.playerCard, true);
    if(verticalPlayer) verticalPlayer.innerHTML = renderCardBackHTML();
    if(verticalRival) verticalRival.innerHTML = renderCardBackHTML();

    const pLabel = document.getElementById('player-card-label');
    const puestasLabel = document.getElementById('puestas-card-label');
    if(pLabel) pLabel.innerText = "Tu Carta (Enmedio)";
    if(puestasLabel) puestasLabel.innerText = "Perspectiva Vertical";

    const actionMsg = document.getElementById('action-message');
    const actionBtns = document.getElementById('action-buttons');

    if (gameState.mode === 'tutorial') {
        if(actionMsg) actionMsg.innerText = `Has visto tu carta. Voltea la carta para pasar a la mención.`;
        if(actionBtns) {
            actionBtns.innerHTML = `
                <button onclick="proceedToQuestionPhase()" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs font-pixel">
                    Voltear y Continuar
                </button>
            `;
        }
    } else {
        if(actionMsg) actionMsg.innerText = `Has visto tu carta: "${gameState.currentRound.playerCard.name}". Voltea la carta para pasar a la mención.`;
        if(actionBtns) {
            actionBtns.innerHTML = `
                <button onclick="proceedToQuestionPhase()" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs font-pixel">
                    Voltear y Continuar
                </button>
            `;
        }
    }
}

function proceedToQuestionPhase() {
    const pSlot = document.getElementById('player-card-slot');
    if(pSlot) pSlot.innerHTML = `<div class="card-flip-anim w-full h-full">${renderCardBackHTML()}</div>`;

    const actionMsg = document.getElementById('action-message');
    const actionBtns = document.getElementById('action-buttons');

    if(actionMsg) actionMsg.innerHTML = `<span class="text-amber-300 font-bold">Volteando carta...</span>`;
    if(actionBtns) actionBtns.innerHTML = ``;

    setTimeout(() => {
        if(pSlot) pSlot.innerHTML = renderCardBackHTML();
        if(actionMsg) actionMsg.innerText = `El juego continúa e inicia la fase de mención, debes decir qué tipo de carta tenías ya que es la que ahora tiene tu rival. Puedes decir la verdad o mentir.`;
        renderQuestionButtons();
    }, 800);
}

function renderQuestionButtons() {
    const actionBtns = document.getElementById('action-buttons');
    if(actionBtns) {
        actionBtns.innerHTML = `
            <button onclick="handleClaim('pollito')" class="bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs font-pixel">
                Decir "Pollito"
            </button>
            <button onclick="handleClaim('bomba')" class="bg-sky-600 hover:bg-sky-500 text-white font-bold px-4 py-2 rounded-lg text-xs font-pixel">
                Decir "Bomba"
            </button>
        `;
    }
}

function handleClaim(claim) {
    gameState.currentRound.playerClaim = claim;

    const actualType = gameState.currentRound.playerCard.type;
    if (claim === actualType) {
        gameState.aiMemory.playerTruths++;
    } else {
        gameState.aiMemory.playerLies++;
    }

    let rivalActualType = gameState.currentRound.rivalCard.type;
    let rivalSaid = rivalActualType;

    if (gameState.mode === 'tutorial') {
        rivalSaid = rivalActualType;
    } else if (gameState.mode === 'facil' || gameState.mode === 'normal') {
        rivalSaid = Math.random() < 0.5 ? (rivalActualType === 'pollito' ? 'bomba' : 'pollito') : rivalActualType;
    } else if (gameState.mode === 'dificil') {
        rivalSaid = Math.random() < 0.7 ? rivalActualType : (rivalActualType === 'pollito' ? 'bomba' : 'pollito');
    }
    gameState.currentRound.rivalClaim = rivalSaid;

    performCardExchangeAnimation();
}

function performCardExchangeAnimation() {
    const actionMsg = document.getElementById('action-message');
    const actionBtns = document.getElementById('action-buttons');
    const verticalPlayer = document.getElementById('vertical-player-slot');
    const verticalRival = document.getElementById('vertical-rival-slot');

    if(actionMsg) actionMsg.innerHTML = `<span class="text-amber-400 font-bold">Las cartas han sido intercambiadas.</span>`;
    if(actionBtns) actionBtns.innerHTML = ``;

    if(verticalPlayer) verticalPlayer.innerHTML = `<div class="exchange-vertical-up w-12 h-16">${renderCardBackHTML()}</div>`;
    if(verticalRival) verticalRival.innerHTML = `<div class="exchange-vertical-down w-12 h-16">${renderCardBackHTML()}</div>`;

    setTimeout(() => {
        if(verticalPlayer) verticalPlayer.innerHTML = renderCardBackHTML();
        if(verticalRival) verticalRival.innerHTML = renderCardBackHTML();

        if(actionMsg) actionMsg.innerHTML = `Tu rival (${currentRival.name}) ha dicho que vio una carta: <span class="uppercase text-amber-300 font-bold">${gameState.currentRound.rivalClaim}</span>. Decide qué hacer con la carta recibida.`;
        renderKeepPassButtons();
    }, 1500);
}

function renderKeepPassButtons() {
    const actionBtns = document.getElementById('action-buttons');
    if(actionBtns) {
        actionBtns.innerHTML = `
            <button onclick="handlePassKeep(true)" class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-lg text-xs font-pixel">
                Quedarme la Carta
            </button>
            <button onclick="handlePassKeep(false)" class="bg-rose-600 hover:bg-rose-500 text-white font-bold px-4 py-2 rounded-lg text-xs font-pixel">
                Aventársela al Rival
            </button>
        `;
    }
}

function handlePassKeep(playerWantsToKeep) {
    let rivalWantsToKeep = true;
    let rivalDecisionText = "";

    if (gameState.mode === 'tutorial') {
        if (gameState.currentRound.playerClaim === 'pollito') {
            rivalWantsToKeep = true; 
            rivalDecisionText = "El rival decidió quedarse con la carta.";
        } else {
            rivalWantsToKeep = false; 
            rivalDecisionText = "El rival decidió aventarte la carta.";
        }
    } else if (gameState.mode === 'facil' || gameState.mode === 'normal') {
        rivalWantsToKeep = Math.random() < 0.5;
        rivalDecisionText = rivalWantsToKeep ? "El rival decidió quedarse con la carta." : "El rival decidió aventarte la carta.";
    } else if (gameState.mode === 'dificil') {
        const totalLies = gameState.aiMemory.playerLies;
        const totalTruths = gameState.aiMemory.playerTruths;
        const playerIsLiar = totalLies > totalTruths;
        
        if (playerIsLiar) {
            rivalWantsToKeep = gameState.currentRound.playerClaim !== 'pollito';
        } else {
            rivalWantsToKeep = gameState.currentRound.playerClaim === 'pollito';
        }
        rivalDecisionText = rivalWantsToKeep ? "El rival decidió quedarse con la carta." : "El rival decidió aventarte la carta.";
    }

    let playerFinalCards = [];
    let rivalFinalCards = [];

    let cardOriginallyMine = gameState.currentRound.rivalCard;
    let cardOriginallyRival = gameState.currentRound.playerCard;

    if (playerWantsToKeep) {
        playerFinalCards.push(cardOriginallyMine);
    } else {
        rivalFinalCards.push(cardOriginallyMine);
    }

    if (rivalWantsToKeep) {
        rivalFinalCards.push(cardOriginallyRival);
    } else {
        playerFinalCards.push(cardOriginallyRival);
    }

    evaluateFinalCardsPhase(playerFinalCards, rivalFinalCards, rivalDecisionText);
}

function evaluateFinalCardsPhase(playerFinalCards, rivalFinalCards, rivalDecisionText) {
    const pSlot = document.getElementById('player-card-slot');
    const verticalPlayer = document.getElementById('vertical-player-slot');
    const verticalRival = document.getElementById('vertical-rival-slot');

    if(pSlot) pSlot.innerHTML = playerFinalCards.length > 0 ? playerFinalCards.map(c => `<div class="w-16 h-24 md:w-20 md:h-28 inline-block m-1">${renderCardHTML(c, true)}</div>`).join('') : '<span class="text-xs text-slate-400 font-pixel">Ninguna</span>';
    if(verticalPlayer) verticalPlayer.innerHTML = playerFinalCards.length > 0 ? playerFinalCards.map(c => `<div class="w-10 h-14 md:w-12 md:h-16 inline-block">${renderCardHTML(c, true)}</div>`).join('') : '';
    if(verticalRival) verticalRival.innerHTML = rivalFinalCards.length > 0 ? rivalFinalCards.map(c => `<div class="w-10 h-14 md:w-12 md:h-16 inline-block">${renderCardHTML(c, true)}</div>`).join('') : '';

    playerFinalCards.forEach(c => unlockCardInCollection(c.id));
    rivalFinalCards.forEach(c => unlockCardInCollection(c.id));

    let playerMsg = evaluatePlayerOutcome(playerFinalCards);
    let rivalMsg = evaluateRivalOutcome(rivalFinalCards);

    updateScoreDisplay();

    const actionMsg = document.getElementById('action-message');
    const actionBtns = document.getElementById('action-buttons');
    const fullMessage = `${rivalDecisionText} <br><strong>Tú:</strong> ${playerMsg} <br><strong>Rival:</strong> ${rivalMsg}`;

    if (gameState.mode === 'tutorial') {
        showTutorialModal(`
            <div class="space-y-3 mt-2 text-[11px] md:text-[12px]">
                <h3 class="text-sm md:text-base text-amber-300 font-pixel text-center mb-4">¿Cómo se juega?</h3>
                <p><span class="text-emerald-400 font-bold">L</span>a ronda inicia repartiendo una carta a cada uno.</p>
                <p><span class="text-amber-400 font-bold">S</span>e ve la carta y se voltea de nuevo.</p>
                <p><span class="text-rose-400 font-bold">L</span>as cartas se intercambian e inicia la fase de mención.</p>
                <p><span class="text-sky-400 font-bold">D</span>ebes mencionar la carta que tenías y ahora tiene tu rival, puedes mentir o decir la verdad.</p>
                <p><span class="text-purple-400 font-bold">T</span>u rival también mencionará qué carta tenía, ¿Miente o dice la verdad?</p>
                <p><span class="text-orange-400 font-bold">A</span>hora decide, te quedas con la carta o se la avientas.</p>
                <p><span class="text-pink-400 font-bold">S</span>i al final tienes una carta, 2 cartas o ninguna dependerá de ti y tu rival.</p>
                <p><span class="text-yellow-400 font-bold">L</span>as cartas se voltean, si tienes un pollito sumas un punto, si tienes una bomba pierdes un punto, si tienes una bomba y un pollito no pasa nada porque tu hermano desactiva la bomba y vuelven a la baraja.</p>
            </div>
        `, () => {
            const modal = document.getElementById('tutorial-modal');
            if(modal) modal.classList.add('hidden');
            returnToMenu();
        });
        const nextBtn = document.getElementById('tutorial-next-btn');
        if(nextBtn) nextBtn.style.display = 'none';

    } else {
        const hasEnded = checkGameEndConditions();
        if (!hasEnded) {
            if(actionMsg) actionMsg.innerHTML = fullMessage;
            if(actionBtns) {
                actionBtns.innerHTML = `
                    <button onclick="startNewRound()" class="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2 rounded-lg text-xs font-pixel">
                        Siguiente Ronda
                    </button>
                `;
            }
        }
    }
}

function evaluatePlayerOutcome(cards) {
    if (cards.length === 0) {
        return "Te quedaste sin cartas.";
    }
    if (cards.length === 1) {
        let c = cards[0];
        if (c.type === 'pollito') {
            gameState.playerScore.chicks++;
            return "Tenías 1 pollito (+1 punto).";
        } else {
            gameState.playerScore.bombs++;
            return "Tenías 1 bomba (-1 punto).";
        }
    }
    if (cards.length === 2) {
        let t1 = cards[0].type;
        let t2 = cards[1].type;
        if (t1 === 'pollito' && t2 === 'pollito') {
            gameState.playerScore.chicks += 2;
            return "Tenías 2 pollitos (+2 puntos).";
        } else if (t1 === 'bomba' && t2 === 'bomba') {
            gameState.playerScore.bombs += 2;
            return "Tenías 2 bombas (-2 puntos).";
        } else {
            return "Tenías pollito y bomba (Se desactivan, sin puntos).";
        }
    }
    return "";
}

function evaluateRivalOutcome(cards) {
    if (cards.length === 0) return "Se quedó sin cartas.";
    if (cards.length === 1) {
        let c = cards[0];
        if (c.type === 'pollito') {
            gameState.rivalScore.chicks++;
            return "Obtuvo 1 pollito.";
        } else {
            gameState.rivalScore.bombs++;
            return "Le explotó 1 bomba.";
        }
    }
    if (cards.length === 2) {
        let t1 = cards[0].type;
        let t2 = cards[1].type;
        if (t1 === 'pollito' && t2 === 'pollito') {
            gameState.rivalScore.chicks += 2;
            return "Obtuvo 2 pollitos.";
        } else if (t1 === 'bomba' && t2 === 'bomba') {
            gameState.rivalScore.bombs += 2;
            return "Le explotaron 2 bombas.";
        } else {
            return "Se desactivaron sus cartas.";
        }
    }
    return "";
}

function updateScoreDisplay() {
    const pc = document.getElementById('player-chicks');
    const pb = document.getElementById('player-bombs');
    const rc = document.getElementById('rival-chicks');
    const rb = document.getElementById('rival-bombs');
    if(pc) pc.innerText = gameState.playerScore.chicks;
    if(pb) pb.innerText = gameState.playerScore.bombs;
    if(rc) rc.innerText = gameState.rivalScore.chicks;
    if(rb) rb.innerText = gameState.rivalScore.bombs;
}

function checkGameEndConditions() {
    const pChicks = gameState.playerScore.chicks;
    const pBombs = gameState.playerScore.bombs;
    const rChicks = gameState.rivalScore.chicks;
    const rBombs = gameState.rivalScore.bombs;
    const mode = gameState.mode;

    let playerWon = false;
    let rivalWon = false;

    if (mode === 'facil') {
        if (pChicks >= 3) playerWon = true;
        if (rChicks >= 3 || pBombs >= 3) rivalWon = true;
    } else if (mode === 'normal') {
        if (pChicks >= 3) playerWon = true;
        if (rChicks >= 3 || pBombs >= 3 || rBombs >= 3) rivalWon = true;
    } else if (mode === 'dificil') {
        if (pChicks >= 5) playerWon = true;
        if (rChicks >= 5 || pBombs >= 4) rivalWon = true;
    }

    if (playerWon && !rivalWon) {
        recordWin(mode);
        showGameOver(true, "¡Qué bien, has GANADO! Rescataste a tus hermanos del casino.");
        return true;
    } else if (rivalWon || (playerWon && rivalWon)) {
        showGameOver(false, "El rival cumplió sus condiciones o te superó... HAS PERDIDO.");
        return true;
    }

    return false;
}

function recordWin(mode) {
    if (gameStats[mode] !== undefined) {
        gameStats[mode]++;
        localStorage.setItem('pb_game_stats', JSON.stringify(gameStats));
        updateStatsDisplay();
    }
}

function showGameOver(isWin, message) {
    const modal = document.getElementById('game-over-modal');
    const title = document.getElementById('game-over-title');
    const msg = document.getElementById('game-over-msg');
    if(title) {
        title.innerText = isWin ? "¡VICTORIA!" : "¡DERROTA!";
        title.className = `text-xl md:text-2xl font-pixel ${isWin ? 'text-emerald-400' : 'text-rose-500'}`;
    }
    if(msg) msg.innerText = message;
    if(modal) modal.classList.remove('hidden');
}

function returnToMenu() {
    ['tutorial-modal', 'game-over-modal', 'screen-tutorial-casino', 'screen-game'].forEach(id => {
        const el = document.getElementById(id);
        if(el) el.classList.add('hidden');
    });
    const setup = document.getElementById('screen-setup');
    if(setup) setup.classList.remove('hidden');

    playBGM('menu');
    checkThanksMessage();
    loadRandomMotivation();
    updateStatsDisplay();
}

function renderCardHTML(card, isFront) {
    if (!isFront) return renderCardBackHTML();

    if (card.type === 'pollito') {
        return `
            <div class="card-front-pollito w-full h-full">
                <div class="card-inner-pollito">
                    <div class="text-[8px] md:text-[9px] font-pixel text-amber-800 uppercase">Pollito</div>
                    <i class="fa-solid ${card.icon} text-2xl md:text-4xl text-amber-700 my-auto"></i>
                    <div class="text-[9px] md:text-[10px] font-bold text-center leading-tight text-slate-900">${card.name}</div>
                </div>
            </div>
        `;
    } else {
        return `
            <div class="card-front-bomba w-full h-full">
                <div class="card-inner-bomba">
                    <div class="text-[8px] md:text-[9px] font-pixel text-sky-200 uppercase">Bomba</div>
                    <i class="fa-solid ${card.icon} text-2xl md:text-4xl text-white my-auto"></i>
                    <div class="text-[9px] md:text-[10px] font-bold text-center leading-tight text-white">${card.name}</div>
                </div>
            </div>
        `;
    }
}

function renderCardBackHTML() {
    return `
        <div class="card-back w-full h-full">
            <span>Pb</span>
        </div>
    `;
}