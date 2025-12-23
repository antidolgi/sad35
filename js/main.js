document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.style.visibility = 'hidden';
            document.body.style.overflow = 'auto';
        }, 1500);
    }

    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Фиксированное меню при скролле
    const header = document.querySelector('.site-header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Анимация появления элементов при скролле
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.classList.add('visible');
            }
        });
        
        // Кнопка "Наверх"
        const backToTop = document.getElementById('back-to-top');
        if (backToTop) {
            if (scrollTop > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        }
        
        lastScrollTop = scrollTop;
    });

    // Мобильное меню
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
    
    if (menuToggle && menu) {
        menuToggle.addEventListener('click', function() {
            menu.classList.toggle('active');
            menuToggle.querySelector('span:nth-child(1)').style.transform = 
                menu.classList.contains('active') ? 'rotate(45deg) translate(5px, 5px)' : 'rotate(0)';
            menuToggle.querySelector('span:nth-child(2)').style.opacity = 
                menu.classList.contains('active') ? '0' : '1';
            menuToggle.querySelector('span:nth-child(3)').style.transform = 
                menu.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : 'rotate(0)';
        });
        
        // Закрытие меню при клике на ссылку
        document.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', function() {
                menu.classList.remove('active');
                menuToggle.querySelector('span:nth-child(1)').style.transform = 'rotate(0)';
                menuToggle.querySelector('span:nth-child(2)').style.opacity = '1';
                menuToggle.querySelector('span:nth-child(3)').style.transform = 'rotate(0)';
            });
        });
    }

    // Кнопка "Наверх"
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Эффект параллакса для hero-секции
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    }

    // Анимация цифр (достижения)
    const achievementNumbers = document.querySelectorAll('.achievement-number');
    if (achievementNumbers.length > 0) {
        const animateNumbers = () => {
            achievementNumbers.forEach(number => {
                const target = parseInt(number.getAttribute('data-target'));
                const duration = 2000; // ms
                const start = 0;
                const increment = target / (duration / 16); // 60fps
                
                let current = start;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    number.textContent = Math.floor(current);
                }, 16);
            });
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateNumbers();
                    observer.disconnect();
                }
            });
        }, { threshold: 0.1 });
        
        observer.observe(document.querySelector('.achievements-section'));
    }

    // Форма подписки
    const ctaForm = document.querySelector('.cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email && email.includes('@')) {
                alert('Спасибо за подписку! Календарь сезонных работ отправлен на ваш email.');
                this.reset();
            } else {
                alert('Пожалуйста, введите корректный email адрес.');
            }
        });
    }

    // Динамическое обновление года в футере
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('[data-year]');
    yearElements.forEach(element => {
        element.textContent = currentYear;
    });

    // Анимация загрузки страницы
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Эффект при наведении на карточки
    const cards = document.querySelectorAll('.card, .season-card, .testimonial');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // Создание частиц для hero-секции
    createHeroParticles();

    console.log('Сайт САД35 успешно загружен!');
    console.log('🚀 Версия: 1.0.0');
    console.log('🌿 Сделано с любовью к садам');
});

// Функция создания частиц для hero-секции
function createHeroParticles() {
    const heroSection = document.querySelector('.hero-section');
    if (!heroSection) return;
    
    const particleCount = 20;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.width = `${Math.random() * 10 + 5}px`;
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(255,255,255,${Math.random() * 0.3 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.position = 'absolute';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animation = `float ${Math.random() * 10 + 5}s infinite linear`;
        heroSection.appendChild(particle);
        particles.push(particle);
    }
    
    // Анимация частиц
    particles.forEach((particle, index) => {
        setTimeout(() => {
            particle.style.opacity = '0.3';
            particle.style.transform = 'scale(1.5)';
        }, index * 100);
    });
}

// Добавление CSS анимаций через JavaScript
function addCSSAnimations() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); }
            25% { transform: translate(10px, -15px) rotate(90deg); }
            50% { transform: translate(20px, 0) rotate(180deg); }
            75% { transform: translate(10px, 15px) rotate(270deg); }
            100% { transform: translate(0, 0) rotate(360deg); }
        }
        
        body.loaded * {
            animation-duration: 0.3s !important;
            transition-duration: 0.3s !important;
        }
    `;
    document.head.appendChild(style);
}

addCSSAnimations();
