document.addEventListener('DOMContentLoaded', () => {
    
    // --- DATABASE ---
    const profiles = {
        "maelle": {
            songID: "LjhCEhWiKXk", 
            image: "maelle.jpg", // The Surprise Gift Image
            polaroid: "maelle_photo.jpg", // The Photo of you two
            letter: "Dear Maelle,\n\nYou are the sunshine in my day. I love how you always smile..."
        },
        "romane": {
            songID: "450p7goxZqg", 
            image: "romane.jpg",
            polaroid: "romane_photo.jpg",
            letter: "My Dearest Romane,\n\nEvery moment with you is an adventure. Thank you for being my rock..."
        },
        "celine": {
            songID: "lp-EO5I60KA", 
            image: "celine.jpg",
            polaroid: "celine_photo.jpg",
            letter: "To Celine,\n\nYou make the world a brighter place. I cherish every memory we have made..."
        }
    };

    const giftBox = document.getElementById('gift-box');
    const actionBtn = document.getElementById('action-btn');
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const heartsContainer = document.getElementById('hearts-container');
    const nameInput = document.getElementById('name-input');
    
    // --- 1. Open Gift Logic ---
    function openGift() {
        if (!nameInput) { alert("Error: Input box missing"); return; }

        const rawName = nameInput.value;
        const name = rawName.toLowerCase().trim();

        if (!name || !profiles[name]) {
            alert("Name not found! Try: Maelle, Romane, or Celine");
            return;
        }

        const data = profiles[name];

        // CHECK HTML ELEMENTS
        const iframe = document.getElementById('youtube-frame');
        const surpriseImg = document.getElementById('surprise-img');
        const polaroidImg = document.getElementById('polaroid-img');
        const letterP = document.getElementById('letter-content');
        const greetingH2 = document.getElementById('personal-greeting');

        if (!iframe || !surpriseImg || !letterP || !greetingH2 || !polaroidImg) {
            alert("Error: Missing IDs in HTML. Did you copy the new index.html?");
            return;
        }

        // --- LOAD DATA ---
        iframe.src = `https://www.youtube.com/embed/${data.songID}`;
        surpriseImg.src = data.image;
        polaroidImg.src = data.polaroid;
        letterP.innerHTML = data.letter.replace(/\n/g, "<br>");
        greetingH2.innerText = `FOR ${rawName.toUpperCase()}`;

        // --- ANIMATION ---
        giftBox.classList.add('open');
        actionBtn.innerText = "OPENING...";
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

    // --- 2. Reveal Surprise Logic ---
    const revealBtn = document.getElementById('reveal-btn');
    if (revealBtn) {
        revealBtn.addEventListener('click', () => {
            document.getElementById('surprise-placeholder').classList.add('hidden');
            document.getElementById('surprise-img').classList.remove('hidden');
            spawnConfetti();
            revealBtn.innerText = "Surprise! ❤️";
            revealBtn.disabled = true;
        });
    }

    // --- 3. Floating Emoji Hearts (Bottom to Top) ---
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

    // --- 4. Confetti Burst ---
    function spawnConfetti() {
        for(let i=0; i<30; i++) {
            setTimeout(createHeart, i * 50);
        }
    }
});
