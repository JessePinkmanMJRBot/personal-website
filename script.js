document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const overlay = document.getElementById('intro-overlay');
  const enterBtn = document.getElementById('enter-site');
  const unlockBtn = document.getElementById('unlock-site');
  const bgMusic = document.getElementById('bg-music');

  const introScreen = document.getElementById('intro-screen');
  const quizScreen = document.getElementById('quiz-screen');
  const finalScreen = document.getElementById('final-screen');

  const quizStep = document.getElementById('quiz-step');
  const quizQuestion = document.getElementById('quiz-question');
  const quizOptions = document.getElementById('quiz-options');
  const quizFeedback = document.getElementById('quiz-feedback');
  const quizNext = document.getElementById('quiz-next');

  const feedbacks = [
    'Leitura fria. Bom instinto operacional.',
    'Resposta aceita. Perfil de execução detectado.',
    'Sem ruído. Você pensa em sistema, não em palco.',
    'Padrão confirmado. Prosseguindo...'
  ];

  const pool = [
    { q: 'Num projeto crítico, o que te derruba primeiro?', a: ['Escopo confuso', 'Falta de padrão', 'Equipe sem ritmo', 'Decisão lenta'] },
    { q: 'Qual ativo é mais valioso numa operação de alto risco?', a: ['Sigilo', 'Timing', 'Execução', 'Rede de confiança'] },
    { q: 'No universo BB/Ozark, o que separa amador de operador?', a: ['Coragem', 'Método', 'Sorte', 'Improviso'] },
    { q: 'Se o sistema treme, você...', a: ['Congela o tráfego', 'Observa logs em silêncio', 'Toma controle manual', 'Redesenha o fluxo'] },
    { q: 'Escolha um princípio de laboratório aplicado a software:', a: ['Pureza de processo', 'Repetibilidade', 'Controle de variação', 'Todas as anteriores'] },
    { q: 'Numa operação intensa, o maior inimigo é:', a: ['Ego', 'Latência de decisão', 'Falta de redundância', 'Ruído externo'] },
    { q: 'No fim do dia, reputação se constrói com:', a: ['Pitch', 'Métrica', 'Entrega', 'Narrativa'] }
  ];

  const selectedQuestions = pool.sort(() => Math.random() - 0.5).slice(0, 4);
  let idx = 0;
  let selected = null;

  function showScreen(target) {
    [introScreen, quizScreen, finalScreen].forEach(s => s.classList.remove('active'));
    target.classList.add('active');
  }

  function renderQuestion() {
    const current = selectedQuestions[idx];
    quizStep.textContent = `Pergunta ${idx + 1} de ${selectedQuestions.length}`;
    quizQuestion.textContent = current.q;
    quizOptions.innerHTML = '';
    quizFeedback.textContent = '';
    selected = null;
    quizNext.disabled = true;
    quizNext.classList.add('opacity-50', 'cursor-not-allowed');

    current.a.forEach((option) => {
      const btn = document.createElement('button');
      btn.className = 'quiz-option';
      btn.textContent = option;
      btn.addEventListener('click', () => {
        [...quizOptions.querySelectorAll('.quiz-option')].forEach(el => el.classList.remove('selected'));
        btn.classList.add('selected');
        selected = option;
        quizFeedback.textContent = feedbacks[Math.floor(Math.random() * feedbacks.length)];
        quizNext.disabled = false;
        quizNext.classList.remove('opacity-50', 'cursor-not-allowed');
      });
      quizOptions.appendChild(btn);
    });
  }

  enterBtn?.addEventListener('click', async () => {
    enterBtn.disabled = true;
    enterBtn.textContent = 'CARREGANDO CHECKPOINT...';
    try {
      bgMusic.volume = 0.35;
      await bgMusic.play();
    } catch (err) {
      console.warn('Falha ao iniciar música:', err);
    }
    showScreen(quizScreen);
    renderQuestion();
  });

  quizNext?.addEventListener('click', () => {
    if (!selected) return;
    idx += 1;
    if (idx >= selectedQuestions.length) {
      showScreen(finalScreen);
      return;
    }
    renderQuestion();
  });

  unlockBtn?.addEventListener('click', () => {
    body.classList.add('unlocked');
    body.classList.remove('site-locked');
    overlay.classList.add('hidden');
    setTimeout(() => { overlay.style.display = 'none'; }, 1100);
  });

  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  items.forEach((item) => observer.observe(item));

  const lines = [
    'Arquitetura e execução com foco em entrega.',
    'Automação inteligente + engenharia pragmática.',
    'Da ideia ao deploy, sem enrolação.'
  ];
  const subtitle = document.getElementById('rotating-line');
  let lineIdx = 0;
  setInterval(() => {
    lineIdx = (lineIdx + 1) % lines.length;
    subtitle.classList.add('opacity-0');
    setTimeout(() => {
      subtitle.textContent = lines[lineIdx];
      subtitle.classList.remove('opacity-0');
    }, 220);
  }, 3000);
});
