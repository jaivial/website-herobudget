/**
 * Hero Budget Website - GSAP Animations Module
 * 
 * Módulo principal para gestionar todas las animaciones avanzadas del sitio web
 * utilizando GSAP (GreenSock Animation Platform) para crear experiencias visuales
 * fluidas y atractivas con el estilo 'Liquid Glass'.
 */

// Configuración principal de GSAP y verificación de carga
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si GSAP está cargado correctamente
    if (typeof gsap === 'undefined') {
        console.warn('GSAP no está cargado. Las animaciones no funcionarán correctamente.');
        return;
    }

    // Inicializar configuración global de GSAP
    initializeGSAP();
    
    // Ejecutar todas las animaciones después de cargar el DOM
    initHeroAnimations();
    initScrollAnimations();
    initNavigationAnimations();
    initFeatureAnimations();
    initLiquidGlassAnimations();
});

/**
 * Configuración inicial de GSAP con parámetros optimizados
 * para el rendimiento y la experiencia de usuario
 */
function initializeGSAP() {
    // Configurar defaults globales para mejor rendimiento
    gsap.defaults({
        duration: 0.8,
        ease: "power2.out"
    });

    // Configurar ScrollTrigger si está disponible
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        // Configurar ScrollTrigger para mejor rendimiento en móviles
        ScrollTrigger.config({
            limitCallbacks: true,
            ignoreMobileResize: true
        });
    }

    // Configurar MotionPath si está disponible
    if (typeof MotionPathPlugin !== 'undefined') {
        gsap.registerPlugin(MotionPathPlugin);
    }
}

/**
 * Animaciones de la sección hero principal
 * Incluye efectos de entrada, flotación y parallax
 */
function initHeroAnimations() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');

    if (!heroContent || !heroImage) return;

    // Timeline principal para la entrada del hero
    const heroTl = gsap.timeline();

    // Animación de entrada del contenido con efecto de desvanecimiento
    heroTl.from(heroContent.children, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "back.out(1.7)"
    });

    // Animación de entrada de la imagen del hero con rotación sutil
    heroTl.from(heroImage, {
        scale: 0.8,
        opacity: 0,
        rotation: -10,
        duration: 1.5,
        ease: "elastic.out(1, 0.5)"
    }, "-=0.8");

    // Animación especial para los botones CTA con efecto bounce
    if (ctaButtons.length > 0) {
        heroTl.from(ctaButtons, {
            y: 30,
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            stagger: 0.1,
            ease: "bounce.out"
        }, "-=0.5");
    }

    // Animación continua de flotación para el ícono principal
    const appIcon = document.querySelector('.hero-image img, .hero-image .app-icon');
    if (appIcon) {
        gsap.to(appIcon, {
            y: -15,
            duration: 3,
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true
        });
    }
}