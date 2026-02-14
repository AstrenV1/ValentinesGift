document.addEventListener('DOMContentLoaded', () => {
    
    // --- DATABASE ---
    const profiles = {
        "maelle": {
            songID: "LjhCEhWiKXk", // Bruno Mars
            image: "maelle.jpg",
            letter: "Dear Maelle,\n\nYou are the sunshine in my day. I love how you always smile..."
        },
        "romane": {
            songID: "450p7goxZqg", // John Legend
            image: "romane.jpg",
            letter: "My Dearest Romane,\n\nEvery moment with you is an adventure. Thank you for being my rock..."
        },
        "celine": {
            songID: "lp-EO5I60KA", // Ed Sheeran
            image: "celine.jpg",
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
        const rawName = nameInput.value;
        const name = rawName.toLowerCase().trim();

        if (!name || !profiles[name]) {
            alert("Name not found! Try: Maelle, Romane, or Celine");
            return;
        }

        const data = profiles[name];

        // Set Content
        document.getElementById('youtube-frame').src = `https://www.youtube.com/embed/${data.songID}`;
        document.getElementById('surprise-img').src = data.image;
        document.getElementById('letter-content').innerHTML = data.letter.replace(/\n/g, "<br>");
        document.getElementById('personal-greeting').innerText = `FOR ${rawName.toUpperCase()}`;

        // Animation
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

    nameInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") openGift();
    });
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

    // --- 3. Floating Emoji Hearts (UPDATED) ---
    function createHeart() {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        
        // Random Emoji Selection
        const emojis = ["❤️", "💖", "💝", "💕", "💗", "💌"];
        heart.innerText = emojis[Math.floor(Math.random() * emojis.length)];
        
        // Random Position & Speed
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