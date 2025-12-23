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

    // Фильтрация галереи
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (filterButtons.length > 0 && galleryItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Убираем активный класс со всех кнопок
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем активный класс текущей кнопке
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Вкладки в календаре (есезонные советы)
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Убираем активный класс со всех кнопок
                tabButtons.forEach(btn => btn.classList.remove('active'));
                // Добавляем активный класс текущей кнопке
                this.classList.add('active');
                
                const tabId = this.getAttribute('data-tab');
                
                // Скрываем все вкладки
                tabContents.forEach(content => {
                    content.classList.remove('active');
                });
                
                // Показываем нужную вкладку
                document.getElementById(tabId).classList.add('active');
            });
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

    // Динамический календарь
    createDynamicCalendar();

    // Форма подписки в CTA
    const ctaForms = document.querySelectorAll('.cta-form');
    ctaForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email && email.includes('@')) {
                alert('Спасибо за подписку! Календарь сезонных работ отправлен на ваш email.');
                this.reset();
            } else {
                alert('Пожалуйста, введите корректный email адрес.');
            }
        });
    });

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
    const cards = document.querySelectorAll('.card, .season-card, .testimonial, .blog-article, .type-card, .category-card, .tip-card');
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

// Функция создания динамического календаря
function createDynamicCalendar() {
    const calendarContainer = document.createElement('div');
    calendarContainer.className = 'dynamic-calendar';
    calendarContainer.innerHTML = `
        <div class="calendar-header">
            <button class="calendar-prev">&lt;</button>
            <h2 class="calendar-month-year">Декабрь 2025</h2>
            <button class="calendar-next">&gt;</button>
        </div>
        <div class="calendar-grid">
            <div class="calendar-day-header">Пн</div>
            <div class="calendar-day-header">Вт</div>
            <div class="calendar-day-header">Ср</div>
            <div class="calendar-day-header">Чт</div>
            <div class="calendar-day-header">Пт</div>
            <div class="calendar-day-header">Сб</div>
            <div class="calendar-day-header">Вс</div>
            <!-- Дни будут добавлены динамически -->
        </div>
        <div class="calendar-legend">
            <div class="legend-item"><span class="legend-color" style="background: #4CAF50;"></span> Посадка</div>
            <div class="legend-item"><span class="legend-color" style="background: #2196F3;"></span> Подкормка</div>
            <div class="legend-item"><span class="legend-color" style="background: #F44336;"></span> Обрезка</div>
            <div class="legend-item"><span class="legend-color" style="background: #FF9800;"></span> Защита</div>
        </div>
    `;
    
    // Добавляем календарь на страницу календаря
    const calendarSection = document.querySelector('#calendar .calendar-container');
    if (calendarSection) {
        calendarSection.innerHTML = '';
        calendarSection.appendChild(calendarContainer);
        
        // Заполняем календарь
        renderCalendar(2025, 11); // Декабрь 2025 (месяцы начинаются с 0)
        
        // Добавляем обработчики событий для кнопок
        document.querySelector('.calendar-prev').addEventListener('click', function() {
            const currentMonth = parseInt(calendarContainer.dataset.month) || 11;
            const currentYear = parseInt(calendarContainer.dataset.year) || 2025;
            const newMonth = currentMonth === 0 ? 11 : currentMonth - 1;
            const newYear = currentMonth === 0 ? currentYear - 1 : currentYear;
            renderCalendar(newYear, newMonth);
        });
        
        document.querySelector('.calendar-next').addEventListener('click', function() {
            const currentMonth = parseInt(calendarContainer.dataset.month) || 11;
            const currentYear = parseInt(calendarContainer.dataset.year) || 2025;
            const newMonth = currentMonth === 11 ? 0 : currentMonth + 1;
            const newYear = currentMonth === 11 ? currentYear + 1 : currentYear;
            renderCalendar(newYear, newMonth);
        });
    }
}

// Функция отрисовки календаря
function renderCalendar(year, month) {
    const calendarGrid = document.querySelector('.calendar-grid');
    const monthYearElement = document.querySelector('.calendar-month-year');
    const calendarContainer = document.querySelector('.dynamic-calendar');
    
    // Сохраняем текущий месяц и год для навигации
    calendarContainer.dataset.month = month;
    calendarContainer.dataset.year = year;
    
    // Обновляем заголовок
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    monthYearElement.textContent = `${monthNames[month]} ${year}`;
    
    // Очищаем сетку, оставляя заголовки дней
    const headerCells = calendarGrid.querySelectorAll('.calendar-day-header');
    calendarGrid.innerHTML = '';
    headerCells.forEach(header => calendarGrid.appendChild(header));
    
    // Создаем дату для первого дня месяца
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startDayOfWeek = firstDay.getDay() || 7; // Воскресенье = 7
    
    // Заполняем пустые дни в начале месяца
    for (let i = 1; i < startDayOfWeek; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Заполняем дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-events">
                <span class="event" style="background: ${getEventColor(day, month, year)};"></span>
            </div>
        `;
        
        // Добавляем события при наведении
        dayCell.addEventListener('mouseenter', function() {
            showDayTooltip(day, month, year, this);
        });
        
        dayCell.addEventListener('mouseleave', function() {
            hideDayTooltip();
        });
        
        calendarGrid.appendChild(dayCell);
    }
    
    // Добавляем пустые дни в конце месяца, если нужно
    const totalDays = startDayOfWeek - 1 + daysInMonth;
    const remainingCells = 42 - totalDays; // 6 строк по 7 дней
    
    for (let i = 0; i < remainingCells; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day empty';
        calendarGrid.appendChild(emptyCell);
    }
}

// Функция получения цвета для события
function getEventColor(day, month, year) {
    // Для демо-версии используем алгоритмический подход
    const dateValue = day * 31 + month * 12 + year;
    
    // Определяем тип события в зависимости от дня
    if (dateValue % 7 === 0) return '#4CAF50'; // Посадка
    if (dateValue % 7 === 1) return '#2196F3'; // Подкормка
    if (dateValue % 7 === 2) return '#F44336'; // Обрезка
    if (dateValue % 7 === 3) return '#FF9800'; // Защита
    return '#9E9E9E'; // Нет событий
}

// Функция показа подсказки для дня
function showDayTooltip(day, month, year, element) {
    // Создаем контейнер для подсказки
    let tooltip = document.getElementById('calendar-tooltip');
    
    if (!tooltip) {
        tooltip = document.createElement('div');
        tooltip.id = 'calendar-tooltip';
        tooltip.className = 'calendar-tooltip';
        document.body.appendChild(tooltip);
    }
    
    // Определяем события для этого дня
    const events = getDayEvents(day, month, year);
    
    // Формируем содержимое подсказки
    let tooltipContent = `<h3>${day} ${getMonthName(month)} ${year}</h3>`;
    
    if (events.length > 0) {
        tooltipContent += '<ul class="tooltip-events">';
        events.forEach(event => {
            tooltipContent += `<li><span class="event-color" style="background: ${event.color};"></span> ${event.name}</li>`;
        });
        tooltipContent += '</ul>';
    } else {
        tooltipContent += '<p>Нет запланированных работ</p>';
    }
    
    tooltip.innerHTML = tooltipContent;
    
    // Позиционируем подсказку
    const rect = element.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
    tooltip.style.display = 'block';
}

// Функция скрытия подсказки
function hideDayTooltip() {
    const tooltip = document.getElementById('calendar-tooltip');
    if (tooltip) {
        tooltip.style.display = 'none';
    }
}

// Функция получения событий для дня
function getDayEvents(day, month, year) {
    // Для демо-версии используем алгоритмический подход
    const dateValue = day * 31 + month * 12 + year;
    const events = [];
    
    if (dateValue % 7 === 0) events.push({name: 'Посадка новых растений', color: '#4CAF50'});
    if (dateValue % 7 === 1) events.push({name: 'Подкормка минеральными удобрениями', color: '#2196F3'});
    if (dateValue % 7 === 2) events.push({name: 'Санитарная обрезка кустарников', color: '#F44336'});
    if (dateValue % 7 === 3) events.push({name: 'Обработка от вредителей', color: '#FF9800'});
    if (dateValue % 7 === 4) events.push({name: 'Мульчирование почвы', color: '#9C27B0'});
    if (dateValue % 7 === 5) events.push({name: 'Сбор урожая', color: '#FFC107'});
    
    return events;
}

// Функция получения названия месяца
function getMonthName(month) {
    const monthNames = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return monthNames[month];
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
        
        .dynamic-calendar {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            padding: 20px;
        }
        
        .calendar-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 15px;
        }
        
        .calendar-prev, .calendar-next {
            background: #27ad32;
            color: white;
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
        }
        
        .calendar-prev:hover, .calendar-next:hover {
            background: #1B5E20;
            transform: scale(1.1);
        }
        
        .calendar-month-year {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            color: #232323;
            margin: 0;
        }
        
        .calendar-grid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 5px;
        }
        
        .calendar-day-header {
            text-align: center;
            font-weight: bold;
            padding: 8px 0;
            background: #f8f9fa;
            border-radius: 4px;
            font-size: 0.9rem;
        }
        
        .calendar-day {
            height: 80px;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            padding: 5px;
            position: relative;
            transition: all 0.3s ease;
            background: white;
        }
        
        .calendar-day:hover {
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
            transform: translateY(-2px);
            z-index: 10;
        }
        
        .calendar-day.empty {
            background: transparent;
            border: none;
        }
        
        .day-number {
            font-weight: bold;
            font-size: 0.9rem;
            color: #232323;
        }
        
        .day-events {
            display: flex;
            flex-wrap: wrap;
            gap: 2px;
            margin-top: 3px;
        }
        
        .event {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }
        
        .calendar-legend {
            display: flex;
            justify-content: center;
            gap: 15px;
            margin-top: 15px;
            flex-wrap: wrap;
        }
        
        .legend-item {
            display: flex;
            align-items: center;
            font-size: 0.8rem;
        }
        
        .legend-color {
            display: inline-block;
            width: 12px;
            height: 12px;
            border-radius: 2px;
            margin-right: 5px;
        }
        
        .calendar-tooltip {
            position: absolute;
            background: white;
            border: 1px solid #ddd;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            min-width: 250px;
        }
        
        .tooltip-events {
            list-style: none;
            padding: 0;
            margin: 10px 0 0 0;
        }
        
        .tooltip-events li {
            display: flex;
            align-items: center;
            margin-bottom: 5px;
            font-size: 0.9rem;
        }
        
        .event-color {
            display: inline-block;
            width: 10px;
            height: 10px;
            border-radius: 2px;
            margin-right: 8px;
        }
        
        @media (max-width: 768px) {
            .calendar-day {
                height: 60px;
            }
            
            .calendar-tooltip {
                position: fixed;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 90%;
                max-width: 350px;
            }
        }
    `;
    document.head.appendChild(style);
}

addCSSAnimations();
