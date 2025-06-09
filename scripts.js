// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Language Toggle ---
    window.toggleLanguage = function() {
        const body = document.body;
        const currentLang = body.getAttribute('data-lang');
        const newLang = currentLang === 'zh' ? 'en' : 'zh';
        body.setAttribute('data-lang', newLang);
    };

    // --- Rain Toggle ---
    window.toggleRain = function() {
        document.getElementById('rainOverlay').classList.toggle('active');
    };

    // --- Scroll to Content ---
    window.scrollToContent = function() {
        document.querySelector('.content').scrollIntoView({
            behavior: 'smooth'
        });
    };

    // --- Floating Background Elements ---
    const floatingContainer = document.getElementById('floatingElements');
    const elements = ['🌱', '🟢', '💤', '💭'];
    if (floatingContainer) {
        for (let i = 0; i < 20; i++) {
            const el = document.createElement('div');
            el.classList.add('float-element');
            el.innerText = elements[i % elements.length];
            el.style.left = `${Math.random() * 100}vw`;
            el.style.animationDuration = `${15 + Math.random() * 15}s`;
            el.style.animationDelay = `${Math.random() * 10}s`;
            el.style.fontSize = `${1 + Math.random() * 1.5}rem`;
            floatingContainer.appendChild(el);
        }
    }


    // --- Quiz Logic ---
    const quizStart = document.getElementById('quizStart');
    const quizProgress = document.getElementById('quizProgress');
    const lazyResult = document.getElementById('lazyResult');
    const questionCards = document.querySelectorAll('.question-card');
    const totalQuestions = questionCards.length;

    // Quiz state
    let currentQuestionIndex = 0;
    let score = 0;
    const MAX_SCORE_PER_Q = 5;

    // UI Elements for quiz
    const progressFill = document.getElementById('progressFill');
    const currentQSpan = document.getElementById('currentQ');
    const currentQSpan2 = document.getElementById('currentQ2');


    window.startQuiz = function() {
        // Scroll to the quiz section if not already visible
        document.getElementById('generator').scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Reset state
        score = 0;
        currentQuestionIndex = 0;

        // Update UI
        quizStart.style.display = 'none';
        lazyResult.style.display = 'none';
        questionCards.forEach(card => card.classList.remove('active'));

        // Show first question and progress bar
        quizProgress.style.display = 'block';
        if(questionCards[0]) questionCards[0].classList.add('active');
        updateProgress();
    };

    window.selectAnswer = function(questionNum, points) {
        score += points;
        const currentCard = document.getElementById(`q${questionNum}`);
        
        if (currentCard) {
            currentCard.classList.remove('active');
        }

        currentQuestionIndex++;

        if (currentQuestionIndex < totalQuestions) {
            const nextCard = document.getElementById(`q${questionNum + 1}`);
            if(nextCard) nextCard.classList.add('active');
            updateProgress();
        } else {
            showResults();
        }
    };
    
    function updateProgress() {
        const progressPercent = ((currentQuestionIndex) / totalQuestions) * 100;
        progressFill.style.width = `${progressPercent}%`;
        if(currentQSpan) currentQSpan.textContent = currentQuestionIndex + 1;
        if(currentQSpan2) currentQSpan2.textContent = currentQuestionIndex + 1;
    }

    function showResults() {
        quizProgress.style.display = 'none';
        
        const totalMaxScore = totalQuestions * MAX_SCORE_PER_Q;
        const finalPercentage = Math.round((score / totalMaxScore) * 100);

        // Update result display
        document.getElementById('totalScore').textContent = `${finalPercentage}%`;
        
        const titleZh = lazyResult.querySelector('#lazyTitle .lang-zh');
        const titleEn = lazyResult.querySelector('#lazyTitle .lang-en');
        const messageZh = lazyResult.querySelector('#lazyMessage .lang-zh');
        const messageEn = lazyResult.querySelector('#lazyMessage .lang-en');

        if (finalPercentage >= 85) {
            titleZh.textContent = "認證沙發嫩芽王";
            titleEn.textContent = "Certified Couch Sprout King";
            messageZh.textContent = "你不是懶，你是在進行一場名為『靜止』的行為藝術。Seedcher 對你深感敬佩。";
            messageEn.textContent = "You're not lazy, you're performing performance art called 'stillness'. Seedcher deeply admires you.";
        } else if (finalPercentage >= 60) {
            titleZh.textContent = "資深賴床學家";
            titleEn.textContent = "Senior Bed-Dwelling Expert";
            messageZh.textContent = "你精通拖延的藝術，但偶爾也會被生產力短暫附身。";
            messageEn.textContent = "You've mastered the art of procrastination, but are occasionally possessed by productivity.";
        } else if (finalPercentage >= 30) {
            titleZh.textContent = "潛力發芽種子";
            titleEn.textContent = "Potential Sprouting Seed";
            messageZh.textContent = "你身上還殘留著『勤奮』的氣息，但別擔心，多跟 Seedcher 學習就能治好。";
            messageEn.textContent = "You still have a scent of 'diligence' on you. Don't worry, you can be cured by learning from Seedcher.";
        } else {
            titleZh.textContent = "過度活躍的嫩芽";
            titleEn.textContent = "Overly Active Sprout";
            messageZh.textContent = "你...是不是走錯棚了？你的能量等級讓 Seedcher 感到害怕。";
            messageEn.textContent = "Are... you in the wrong place? Your energy levels are scaring Seedcher.";
        }
        
        // Randomize breakdown scores for fun
        document.getElementById('sleepScore').textContent = `${Math.max(60, finalPercentage - Math.floor(Math.random() * 10))}%`;
        document.getElementById('couchScore').textContent = `${Math.max(55, finalPercentage - Math.floor(Math.random() * 15))}%`;
        document.getElementById('effortScore').textContent = `${100 - finalPercentage + Math.floor(Math.random() * 5)}%`; // Inverted
        document.getElementById('procrastScore').textContent = `${Math.min(99, finalPercentage + Math.floor(Math.random() * 10))}%`;


        lazyResult.style.display = 'block';
    }

    window.resetQuiz = function() {
        lazyResult.style.display = 'none';
        quizStart.style.display = 'block';
    };

    // Initial setup for quiz total questions display
    document.getElementById('totalQ').textContent = totalQuestions;
    document.getElementById('totalQ2').textContent = totalQuestions;
});
