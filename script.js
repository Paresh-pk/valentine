// DOM Elements
const yesBtn = document.getElementById('yes-btn');
const noBtn = document.getElementById('no-btn');
const successOverlay = document.getElementById('success-overlay');
const backgroundContainer = document.getElementById('background-effects');
const musicToggle = document.getElementById('music-toggle');

// Configuration
const PARTICLE_COUNT = 30; // Number of floating hearts

// --- Background Animation ---
function createFloatingHearts() {
    const hearts = ['❤️', '💖', '💕', '🌹', '🌸'];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart-particle');
        heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];

        // Randomize position and animation
        const left = Math.random() * 100;
        const duration = Math.random() * 10 + 10; // 10-20s
        const delay = Math.random() * 5;
        const size = Math.random() * 20 + 10; // 10-30px

        heart.style.left = `${left}%`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${duration}s`;
        heart.style.animationDelay = `${delay}s`;

        backgroundContainer.appendChild(heart);
    }
}

// --- Yes Button Interaction ---
yesBtn.addEventListener('click', handleYesClick);

function handleYesClick() {
    // Trigger Confetti
    triggerConfetti();

    // Show Success Overlay
    setTimeout(() => {
        successOverlay.classList.add('success-visible');
    }, 500);
}

function triggerConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        const left = Math.random() > 0.5 ? 1 : 0;

        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ffccd5', '#ff9aa2', '#c9184a']
        });

        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ffccd5', '#ff9aa2', '#c9184a']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// --- No Button Interaction Logic ---
let rejectionStep = 0;

// Initial behavior
noBtn.addEventListener('click', handleRejection);

function handleRejection() {
    rejectionStep++;

    if (rejectionStep === 1) {
        showStage1();
    } else if (rejectionStep === 2) {
        showStage2();
    }
}

function showStage1() {
    const cardContent = document.querySelector('#invitation-card .space-y-8');

    cardContent.innerHTML = `
        <div class="space-y-6 animate-fade-in-up relative">
            <!-- Background Emoji -->
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none z-0">
                <div class="text-[10rem]">🔪😭</div>
            </div>

            <!-- Content -->
            <div class="relative z-10 flex flex-col items-center">
                <div class="w-56 h-56 rounded-2xl overflow-hidden shadow-xl border-4 border-brand-red/20 bg-brand-pink/20 mb-4 transform -rotate-2 hover:rotate-0 transition duration-300">
                    <img src="dramatic-pic.png" alt="Dramatic picture" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/400x400/ffccd5/c9184a?text=Add+Photo\n(dramatic-pic.png)'">
                </div>
                
                <h2 class="text-3xl font-heading text-brand-red drop-shadow-sm">Hath kaat ke jaan de dunga!</h2>
                <p class="text-brand-dark/70 font-sans font-medium mt-2">Ab to haan bol do... 🥺</p>
            </div>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center h-24 relative mt-8 pt-4">
            <button id="yes-btn-stage1" class="px-8 py-3 bg-brand-red text-white text-lg font-bold rounded-full shadow-lg transform transition hover:scale-110 hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-pink active:scale-95 w-full sm:w-auto">
                YES! ❤️
            </button>
            <button id="no-btn-stage1" class="px-8 py-3 bg-gray-200 text-gray-500 text-lg font-bold rounded-full shadow-inner hover:bg-gray-300 focus:outline-none w-full sm:w-auto transition-all">
                No 😢
            </button>
        </div>
    `;

    document.getElementById('yes-btn-stage1').addEventListener('click', handleYesClick);
    document.getElementById('no-btn-stage1').addEventListener('click', handleRejection);
}

function showStage2() {
    const cardContent = document.querySelector('#invitation-card .space-y-8');

    // Keeping similar layout but new image/text
    cardContent.innerHTML = `
        <div class="space-y-6 animate-fade-in-up relative">
            <!-- Background Emoji -->
            <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none select-none z-0">
                <div class="text-[10rem]">��</div>
            </div>

            <!-- Content -->
            <div class="relative z-10 flex flex-col items-center">
                <div class="w-56 h-56 rounded-2xl overflow-hidden shadow-xl border-4 border-brand-red/20 bg-brand-pink/20 mb-4 transform rotate-2 hover:rotate-0 transition duration-300">
                    <!-- New Image: kadar-pic.png -->
                    <img src="kadar-pic.png" alt="Sad picture" class="w-full h-full object-cover" onerror="this.src='https://placehold.co/400x400/ffccd5/c9184a?text=Add+Photo\n(kadar-pic.png)'">
                </div>
                
                <h2 class="text-3xl font-heading text-brand-red drop-shadow-sm">Mera koi kadar hee nahi ha</h2>
                <p class="text-brand-dark/70 font-sans font-medium mt-2">Pls maan jao na... �</p>
            </div>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center h-24 relative mt-8 pt-4">
            <button id="yes-btn-stage2" class="px-8 py-3 bg-brand-red text-white text-lg font-bold rounded-full shadow-lg transform transition hover:scale-110 hover:bg-brand-dark focus:outline-none focus:ring-4 focus:ring-brand-pink active:scale-95 w-full sm:w-auto">
                YES! ❤️
            </button>
            <button id="no-btn-stage2" class="px-8 py-3 bg-gray-200 text-gray-500 text-lg font-bold rounded-full shadow-inner hover:bg-gray-300 focus:outline-none w-full sm:w-auto transition-all">
                No 😢
            </button>
        </div>
    `;

    document.getElementById('yes-btn-stage2').addEventListener('click', handleYesClick);

    // Now make the No button evasive
    const finalNoBtn = document.getElementById('no-btn-stage2');

    // Add evasion listeners
    finalNoBtn.addEventListener('mouseover', function () { moveNoButton(this); });
    finalNoBtn.addEventListener('click', function () { moveNoButton(this); });
    finalNoBtn.addEventListener('touchstart', function (e) {
        e.preventDefault();
        moveNoButton(this);
    });
}

function moveNoButton(btnElement) {
    if (btnElement.parentElement !== document.body) {
        const rect = btnElement.getBoundingClientRect();
        document.body.appendChild(btnElement);
        btnElement.style.position = 'fixed';
        btnElement.style.left = `${rect.left}px`;
        btnElement.style.top = `${rect.top}px`;
        btnElement.style.zIndex = '100'; // Ensure it's on top of everything
    }

    const x = Math.random() * (window.innerWidth - btnElement.offsetWidth);
    const y = Math.random() * (window.innerHeight - btnElement.offsetHeight);

    btnElement.style.left = `${x}px`;
    btnElement.style.top = `${y}px`;
    btnElement.classList.add('running');
}

// --- Audio Controller ---
const bgMusic = new Audio('Zara Sa.mp3');
bgMusic.loop = true; // Loop the music

let isPlaying = false;

musicToggle.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
        bgMusic.play().catch(e => console.log("Audio play failed (user interaction needed):", e));
        musicToggle.innerHTML = '<i data-lucide="music-2" class="w-6 h-6 animate-pulse"></i>';
        lucide.createIcons();
    } else {
        bgMusic.pause();
        musicToggle.innerHTML = '<i data-lucide="music" class="w-6 h-6"></i>';
        lucide.createIcons();
    }
});

// Initialize
createFloatingHearts();
