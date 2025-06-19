/**
 * Hero Budget Website - Scroll Animation Fixes
 * 
 * Correcciones específicas para problemas de scroll infinito y animaciones
 * que se reinician constantemente. Incluye debouncing y optimizaciones.
 */

// Configuración global para prevenir loops infinitos
let isScrolling = false;
let scrollTimeout;
let animationsInitialized = false;

/**
 * Inicializar las correcciones de scroll de manera segura
 */
function initScrollFixes() {
    // Esperar a que el DOM esté completamente cargado
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollFixes);
        return;
    }

    // Prevenir múltiples inicializaciones
    if (animationsInitialized) {
        return;
    }
    
    console.log('Inicializando correcciones de scroll...');
    
    // Verificar disponibilidad de GSAP y ScrollTrigger
    if (typeof gsap === 'undefined') {
        console.warn('GSAP no disponible - usando fallbacks CSS');
        initCSSFallbacks();
        return;
    }

    if (typeof ScrollTrigger === 'undefined') {
        console.warn('ScrollTrigger no disponible - usando scroll nativo');
        initNativeScrollEffects();
        return;
    }

    // Registrar plugin de ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Configurar ScrollTrigger con opciones seguras
    ScrollTrigger.config({
        limitCallbacks: true,
        ignoreMobileResize: true,
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load"
    });

    // Inicializar efectos corregidos
    initSafeScrollAnimations();
    initSafeNavbarEffects();
    initSafeRevealAnimations();
    
    // Prevenir re-inicialización
    animationsInitialized = true;
    
    console.log('Correcciones de scroll inicializadas correctamente');
}

/**
 * Configurar animaciones de scroll seguras sin loops infinitos
 */
function initSafeScrollAnimations() {
    // Limpiar cualquier ScrollTrigger existente
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Animación segura para features
    const features = document.querySelectorAll('.feature');
    if (features.length > 0) {
        gsap.from(features, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.features',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none', // Solo reproducir una vez
                once: true // Ejecutar solo una vez
            }
        });
    }

    // Animación segura para contadores
    const counters = document.querySelectorAll('[data-counter]');
    counters.forEach(counter => {
        const finalValue = parseInt(counter.dataset.counter) || 0;
        const counterObj = { value: 0 };
        
        gsap.to(counterObj, {
            value: finalValue,
            duration: 2,
            ease: "power2.out",
            onUpdate: function() {
                counter.textContent = Math.round(counterObj.value);
            },
            scrollTrigger: {
                trigger: counter,
                start: 'top 80%',
                toggleActions: 'play none none none',
                once: true // Solo ejecutar una vez
            }
        });
    });

    // Elementos de revelado seguros
    const revealElements = document.querySelectorAll('[data-reveal]');
    revealElements.forEach(element => {
        const direction = element.dataset.reveal || 'up';
        let animProps = getRevealAnimation(direction);
        
        gsap.from(element, {
            ...animProps,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
                trigger: element,
                start: 'top 85%',
                toggleActions: 'play none none none',
                once: true // Solo ejecutar una vez
            }
        });
    });
}

/**
 * Obtener propiedades de animación según la dirección
 */
function getRevealAnimation(direction) {
    switch (direction) {
        case 'up':
            return { y: 50, opacity: 0 };
        case 'down':
            return { y: -50, opacity: 0 };
        case 'left':
            return { x: -50, opacity: 0 };
        case 'right':
            return { x: 50, opacity: 0 };
        case 'scale':
            return { scale: 0.8, opacity: 0 };
        default:
            return { y: 30, opacity: 0 };
    }
}

/**
 * Efectos seguros para la navbar
 */
function initSafeNavbarEffects() {
    const header = document.querySelector('header');
    if (!header) return;

    // Usar scroll nativo con throttling para mejor performance
    let ticking = false;

    function updateNavbar() {
        const scrollY = window.scrollY;
        
        if (scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        ticking = false;
    }

    function requestNavbarUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestNavbarUpdate, { passive: true });
}

/**
 * Animaciones de revelado seguras sin GSAP
 */
function initSafeRevealAnimations() {
    const revealElements = document.querySelectorAll('[data-reveal]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Dejar de observar después de revelar
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        element.classList.add('reveal-element');
        observer.observe(element);
    });
}

/**
 * Fallbacks CSS cuando GSAP no está disponible
 */
function initCSSFallbacks() {
    console.log('Inicializando fallbacks CSS...');
    
    // Añadir clase para activar animaciones CSS
    document.body.classList.add('css-animations');
    
    // Usar Intersection Observer para reveals
    initSafeRevealAnimations();
    
    // Efectos de navbar con CSS
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }, { passive: true });
    }
}

/**
 * Efectos de scroll nativos sin GSAP
 */
function initNativeScrollEffects() {
    console.log('Usando efectos de scroll nativos...');
    
    // Smooth scroll para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

/**
 * Limpiar y reinicializar animaciones si es necesario
 */
function resetAnimations() {
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
    
    animationsInitialized = false;
    initScrollFixes();
}

/**
 * Optimizaciones de performance
 */
function optimizePerformance() {
    // Reducir animaciones en dispositivos móviles
    if (window.innerWidth <= 768) {
        document.body.classList.add('reduce-motion');
    }
    
    // Pausar animaciones cuando la página no está visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            if (typeof gsap !== 'undefined') {
                gsap.globalTimeline.pause();
            }
        } else {
            if (typeof gsap !== 'undefined') {
                gsap.globalTimeline.resume();
            }
        }
    });
}

// Prevenir errores de JavaScript que rompan las animaciones
window.addEventListener('error', function(e) {
    console.warn('Error detectado, reiniciando animaciones:', e.message);
    // No reiniciar automáticamente para evitar loops
});

// Inicializar cuando el script se carga
initScrollFixes();
optimizePerformance();

// Exportar funciones para debugging
window.ScrollFixes = {
    init: initScrollFixes,
    reset: resetAnimations,
    optimize: optimizePerformance
};