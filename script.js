document.addEventListener('DOMContentLoaded', () => {
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
  let idx = 0;

  setInterval(() => {
    idx = (idx + 1) % lines.length;
    subtitle.classList.add('opacity-0');
    setTimeout(() => {
      subtitle.textContent = lines[idx];
      subtitle.classList.remove('opacity-0');
    }, 220);
  }, 3000);
});
