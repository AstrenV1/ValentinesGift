document.addEventListener('DOMContentLoaded', () => {
    
    // --- DATABASE ---
    const profiles = {
        "maelle": {
            songID: "LjhCEhWiKXk", // Bruno Mars - Just the Way You Are
            image: "maelle.jpg",
            letter: "Dear Maelle,\n\nYou are the sunshine in my day. I love how you always smile..."
        },
        "romane": {
            songID: "450p7goxZqg", // John Legend - All of Me
            image: "romane.jpg",
            letter: "My Dearest Romane,\n\nEvery moment with you is an adventure. Thank you for being my rock..."
        },
        "celine": {
            songID: "lp-EO5I60KA", // Ed Sheeran - Thinking Out Loud
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
        // ERROR CHECK 1: Is the HTML input missing?
        if (!nameInput) {
            alert("Error: The 'name-input' box is missing from your HTML file.");
            return;
        }

        const rawName = nameInput.value;
        const name = rawName.toLowerCase().trim(); // Converts "Maelle " to "maelle"

        // ERROR CHECK 2: Is the name valid?
        if (!name || !profiles[name]) {
            alert("Name not recognized! Please try: Maelle, Romane, or Celine");
            return;
        }

        const data = profiles[name];

        // ERROR CHECK 3: Do we have the HTML elements to put the data in?
        const iframe = document.getElementById('youtube-frame');
        const surpriseImg = document.getElementById('surprise-img');
        const letterP = document.getElementById('letter-content');
        const greetingH2 = document.getElementById('personal-greeting');

        if (!iframe || !surpriseImg || !letterP || !greetingH2) {
            alert("Error: Your HTML is missing IDs (youtube-frame, surprise-img, letter-content, or personal-greeting). Please update index.html");
            return;
        }

        // --- LOAD DATA ---
        iframe.src = `https://www.youtube.com/embed/${data.songID}`;
        surpriseImg.src = data.image;
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

    // --- 3. Floating Emoji Hearts ---
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
