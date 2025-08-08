// Автоматический слайдер для секции ИИ возможностей
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.slide');
  const indicators = document.querySelectorAll('.indicator');
  const progressBar = document.querySelector('.progress-bar');
  
  let currentSlide = 0;
  const slideInterval = 5000; // 5 секунд

  function showSlide(index) {
    // Скрыть все слайды
    slides.forEach((slide, i) => {
      slide.classList.remove('active', 'prev');
      if (i < index) {
        slide.classList.add('prev');
      }
    });
    
    // Показать текущий слайд
    slides[index].classList.add('active');
    
    // Обновить индикаторы
    indicators.forEach((indicator, i) => {
      indicator.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Автоматическое переключение слайдов
  let autoSlide = setInterval(nextSlide, slideInterval);

  // Клик по индикаторам
  indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      
      // Перезапустить автопереключение
      clearInterval(autoSlide);
      autoSlide = setInterval(nextSlide, slideInterval);
    });
  });

  // Пауза при наведении на слайдер
  const sliderContainer = document.querySelector('.ai-slider-container');
  
  sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(autoSlide);
    progressBar.style.animationPlayState = 'paused';
  });
  
  sliderContainer.addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, slideInterval);
    progressBar.style.animationPlayState = 'running';
  });

  // Инициализация
  showSlide(0);
});
