/**
 * Hero Budget Website - Scroll Animations Module
 * 
 * Módulo especializado para gestionar animaciones activadas por scroll
 * utilizando GSAP ScrollTrigger para crear efectos visuales dinámicos
 * mientras el usuario navega por el sitio web.
 */

/**
 * Inicializar todas las animaciones basadas en scroll
 * Configura triggers para diferentes secciones del sitio
 */
function initScrollAnimations() {
    // Verificar disponibilidad de ScrollTrigger
    if (typeof ScrollTrigger === 'undefined') {
        console.warn('ScrollTrigger no está disponible. Animaciones de scroll deshabilitadas.');
        return;
    }

    // Configurar animaciones para secciones principales
    setupFeaturesScrollAnimation();
    setupNavbarScrollAnimation();
    setupParallaxEffects();
    setupRevealAnimations();
    setupCounterAnimations();
}

/**
 * Configurar animación de scroll para la sección de características
 * Cada feature aparece con un efecto de deslizamiento desde abajo
 */
function setupFeaturesScrollAnimation() {
    const features = document.querySelectorAll('.feature');
    
    if (features.length === 0) return;

    // Crear timeline para features con efectos escalonados
    const featuresTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: '.features',
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse'
        }
    });

    // Animación del título de la sección
    featuresTimeline.from('.features h2', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });

    // Animación de cada feature individual con efecto cascada
    featuresTimeline.from(features, {
        y: 80,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: 'back.out(1.2)'
    }, '-=0.5');

    // Efecto hover mejorado para features
    features.forEach(feature => {
        const hoverTl = gsap.timeline({ paused: true });
        
        hoverTl.to(feature, {
            y: -10,
            scale: 1.05,
            boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
            duration: 0.3,
            ease: 'power2.out'
        });

        feature.addEventListener('mouseenter', () => hoverTl.play());
        feature.addEventListener('mouseleave', () => hoverTl.reverse());
    });
}

/**
 * Configurar cambios en la navbar según el scroll
 * Incluye efectos de transparencia y tamaño
 */
function setupNavbarScrollAnimation() {
    const navbar = document.querySelector('header');
    
    if (!navbar) return;

    // Timeline para efectos de navbar en scroll
    gsap.to(navbar, {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        scrollTrigger: {
            trigger: 'body',
            start: 'top -50px',
            end: 'top -51px',
            toggleActions: 'play none none reverse'
        }
    });

    // Efecto de reducción de tamaño del logo en scroll
    const logo = document.querySelector('.navbar-brand h1');
    if (logo) {
        gsap.to(logo, {
            fontSize: '1.5rem',
            scrollTrigger: {
                trigger: 'body',
                start: 'top -100px',
                end: 'top -101px',
                toggleActions: 'play none none reverse'
            }
        });
    }
}

/**
 * Configurar efectos parallax para elementos de fondo
 * Crea profundidad visual mediante movimiento diferencial
 */
function setupParallaxEffects() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(element => {
        const speed = element.dataset.parallax || 0.5;
        
        gsap.to(element, {
            yPercent: -50 * speed,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

/**
 * Configurar animaciones de revelado para elementos
 * Elementos aparecen cuando entran en el viewport
 */
function setupRevealAnimations() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    revealElements.forEach(element => {
        const direction = element.dataset.reveal || 'up';
        let animationProps = {};

        // Configurar dirección de la animación según el atributo
        switch (direction) {
            case 'up':
                animationProps = { y: 80, opacity: 0 };
                break;
            case 'down':
                animationProps = { y: -80, opacity: 0 };
                break;
            case 'left':
                animationProps = { x: -80, opacity: 0 };
                break;
            case 'right':
                animationProps = { x: 80, opacity: 0 };
                break;
            case 'scale':
                animationProps = { scale: 0.8, opacity: 0 };
                break;
        }

        // Aplicar animación con ScrollTrigger
        gsap.from(element, {
            ...animationProps,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });
    });
}

/**
 * Configurar animaciones de contador para estadísticas
 * Números animados que cuentan hasta su valor final
 */
function setupCounterAnimations() {
    const counters = document.querySelectorAll('[data-counter]');
    
    counters.forEach(counter => {
        const finalValue = parseInt(counter.dataset.counter) || 0;
        const duration = parseFloat(counter.dataset.duration) || 2;
        
        // Crear objeto para el contador
        const counterObject = { value: 0 };
        
        gsap.to(counterObject, {
            value: finalValue,
            duration: duration,
            ease: 'power2.out',
            onUpdate: function() {
                counter.textContent = Math.round(counterObject.value);
            },
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });
    });
}