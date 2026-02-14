document.addEventListener('DOMContentLoaded', () => {
    
    // --- BASE DE DONNÉES ---
    const profiles = {
        "celine": {
            songID: "dPRYEZx01qU", // Beirut - Nantes
            image: "celine.jpg",
            polaroid: "celine_photo.jpg",
            letter: "Coucou Céline,\n\nJoyeuse Saint-Valentin. Comme je ne trouvais pas de cadeau matériel à la hauteur, j'ai créé ce site spécialement pour vous. Je voulais simplement vous remercier, toi et Martin, pour tout ce que vous avez fait pour moi et ma famille ; c'est une chose que je ne vous dis pas assez souvent. Votre présence dans ma vie est un véritable réconfort. Vous êtes comme un lit chaud au cœur de l'hiver : cette sensation de tranquillité absolue, la nuit, bien au chaud sous la couverture.\n\nbisous,\nMora"
        },
        "maelle": {
            songID: "ll5uAeEanjY", // Lorde - Melodrama
            image: "maelle.jpg", 
            polaroid: "maelle_photo.jpg",
            letter: "Votre Altesse,\n\njoyeuse saint valentin. J'ai cree ce site pour vous comme jai pas trop d'idée de cadeau. En toute honnêteté, tu es une personne avec qui il est si agréable de passer du temps. J'adore t'écouter me raconter ta journée et ta vie ; c'est un moment où je peux mettre mon cerveau sur pause et simplement me laisser porter par ta voix. Tu es comme un bon chocolat chaud : tu es d'une grande douceur, capable de redonner de l'énergie quand il le faut, mais aussi d'apporter le calme et l'apaisement.\n\nBisous,\nMora"
        },
        "romane": {
            songID: "IpPIK4T068s", // Joji - Test Drive
            image: "romane.jpg",
            polaroid: "romane_photo.JPG",
            letter: "Coucou Romane,\n\nJoyeuse Saint-Valentin. J'ai créé ce site pour vous car je cherchais un cadeau original. Tu es une personne pleine de vitalité et nous avons tous besoin de ça de temps en temps. J'aime ta capacité à être reconnaissante, à dire merci pour ces petites choses auxquelles je ne pense même pas moi-même. Tu me fais penser à un labrador : toujours joyeuse et débordante d'une belle énergie.\n\nBisous,\nMora"
        }
    };

    const giftBox = document.getElementById('gift-box');
    const actionBtn = document.getElementById('action-btn');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const heartsContainer = document.getElementById('hearts-container');
    const nameInput = document.getElementById('name-input');
    
    // --- 1. Logique d'ouverture ---
    function openGift() {
        if (!nameInput) { alert("Erreur: Champ de texte manquant"); return; }

        const rawName = nameInput.value;
        const name = rawName.toLowerCase().trim();

        if (!name || !profiles[name]) {
            alert("Nom introuvable ! Essayez : Celine, Maelle, ou Romane");
            return;
        }

        const data = profiles[name];

        // Vérification des éléments HTML
        const iframe = document.getElementById('youtube-frame');
        const surpriseImg = document.getElementById('surprise-img');
        const polaroidImg = document.getElementById('polaroid-img');
        const letterP = document.getElementById('letter-content');
        const greetingH2 = document.getElementById('personal-greeting');

        if (!iframe || !surpriseImg || !letterP || !greetingH2 || !polaroidImg) {
            alert("Erreur: IDs manquants dans le HTML.");
            return;
        }

        // --- Chargement des données ---
        iframe.src = `https://www.youtube.com/embed/${data.songID}`;
        surpriseImg.src = data.image;
        polaroidImg.src = data.polaroid;
        letterP.innerHTML = data.letter.replace(/\n/g, "<br>");
        greetingH2.innerText = `POUR ${rawName.toUpperCase()}`;

        // --- Animation ---
        giftBox.classList.add('open');
        actionBtn.innerText = "OUVERTURE...";
        spawnConfetti();
        
        setTimeout(() => {
            introScreen.style.opacity = '0';
            setTimeout(() => {
                introScreen.classList.add('hidden');
                mainContent.classList.remove('hidden');
                document.body.style.overflowY = "auto"; 
                window.scrollTo(0,0);
            }, 1000);
        }, 1500);
    }

    if (nameInput) {
        nameInput.addEventListener("keypress", function(event) {
            if (event.key === "Enter") openGift();
        });
    }

    giftBox.addEventListener('click', openGift);
    actionBtn.addEventListener('click', openGift);

    // --- 2. Révélation Surprise ---
    const revealBtn = document.getElementById('reveal-btn');
    if (revealBtn) {
        revealBtn.addEventListener('click', () => {
            document.getElementById('surprise-placeholder').classList.add('hidden');
            document.getElementById('surprise-img').classList.remove('hidden');
            spawnConfetti();
            revealBtn.innerText = "Surprise ! ❤️";
            revealBtn.disabled = true;
        });
    }

    // --- 3. Coeurs Flottants (Emojis) ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        const emojis = ["❤️", "💖", "💝", "💕", "💗", "💌"];
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = Math.random() * 3 + 4 + 's';
        const scale = Math.random() * 1 + 0.8; 
        heart.style.transform = `scale(${scale})`;
        heartsContainer.appendChild(heart);
        setTimeout(() => { heart.remove(); }, 7000);
    }
    setInterval(createHeart, 300);

    // --- 4. Confetti ---
    function spawnConfetti() {
        for(let i=0; i<30; i++) {
            setTimeout(createHeart, i * 50);
        }
    }
});

