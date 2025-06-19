/**
 * Hero Budget Website - Liquid Glass Effects Module
 * 
 * Módulo JavaScript para controlar efectos dinámicos del sistema Liquid Glass
 * Incluye animaciones interactivas, efectos de mouse tracking,
 * y generación dinámica de elementos visuales líquidos.
 */

/**
 * Inicializar todos los efectos de vidrio líquido
 * Se ejecuta cuando el DOM está completamente cargado
 */
function initLiquidGlassAnimations() {
    setupLiquidGlassElements();
    setupMouseTrackingEffects();
    setupDynamicBubbles();
    setupLiquidMorphing();
    setupGlassReflections();
    setupScrollBasedEffects();
}

/**
 * Configurar elementos básicos con efectos de vidrio líquido
 * Aplica clases y efectos iniciales a elementos específicos
 */
function setupLiquidGlassElements() {
    // Aplicar efecto liquid glass al header
    const header = document.querySelector('header');
    if (header) {
        header.classList.add('liquid-glass-header');
        
        // Efecto de cambio en scroll
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Aplicar efectos a las cards de características
    const featureCards = document.querySelectorAll('.feature');
    featureCards.forEach(card => {
        card.classList.add('liquid-glass-card');
        
        // Añadir efecto de ondas en hover
        card.addEventListener('mouseenter', function() {
            createLiquidWaveEffect(this);
        });
    });

    // Aplicar efectos a botones principales
    const primaryButtons = document.querySelectorAll('.btn-primary');
    primaryButtons.forEach(button => {
        button.classList.add('liquid-glass-button');
    });

    // Aplicar efectos al sidebar móvil
    const mobileSidebar = document.getElementById('mobile-sidebar');
    if (mobileSidebar) {
        mobileSidebar.classList.add('liquid-glass-sidebar');
    }

    // Aplicar efectos al modal de idioma
    const languageModal = document.querySelector('.language-modal-content');
    if (languageModal) {
        languageModal.classList.add('liquid-glass-modal');
    }
}

/**
 * Configurar efectos de seguimiento del mouse
 * Crea elementos visuales que siguen el movimiento del cursor
 */
function setupMouseTrackingEffects() {
    let mouseTracker = null;
    
    // Crear elemento seguidor del mouse
    function createMouseTracker() {
        mouseTracker = document.createElement('div');
        mouseTracker.className = 'liquid-mouse-tracker';
        mouseTracker.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, rgba(233, 30, 99, 0.3) 0%, transparent 70%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transition: transform 0.1s ease;
            transform: translate(-50%, -50%);
        `;
        document.body.appendChild(mouseTracker);
    }

    // Actualizar posición del seguidor
    function updateMouseTracker(e) {
        if (mouseTracker) {
            gsap.to(mouseTracker, {
                left: e.clientX,
                top: e.clientY,
                duration: 0.1,
                ease: 'power2.out'
            });
        }
    }

    // Crear seguidor al mover el mouse
    document.addEventListener('mousemove', function(e) {
        if (!mouseTracker) {
            createMouseTracker();
        }
        updateMouseTracker(e);
    });

    // Efectos especiales en elementos interactivos
    const interactiveElements = document.querySelectorAll('.liquid-glass-card, .liquid-glass-button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            if (mouseTracker) {
                gsap.to(mouseTracker, {
                    scale: 2,
                    opacity: 0.8,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });

        element.addEventListener('mouseleave', function() {
            if (mouseTracker) {
                gsap.to(mouseTracker, {
                    scale: 1,
                    opacity: 0.3,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

/**
 * Configurar sistema de burbujas dinámicas
 * Genera burbujas líquidas que flotan por la pantalla
 */
function setupDynamicBubbles() {
    const bubbleContainer = document.createElement('div');
    bubbleContainer.className = 'liquid-bubbles-container';
    bubbleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        overflow: hidden;
    `;
    document.body.appendChild(bubbleContainer);

    // Función para crear una burbuja individual
    function createBubble() {
        const bubble = document.createElement('div');
        const size = Math.random() * 60 + 20;
        const startX = Math.random() * window.innerWidth;
        const duration = Math.random() * 10 + 8;
        
        bubble.className = 'liquid-bubble';
        bubble.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${startX}px;
            bottom: -${size}px;
            background: radial-gradient(circle, 
                rgba(233, 30, 99, 0.1) 0%, 
                rgba(248, 187, 217, 0.05) 70%, 
                transparent 100%);
            border-radius: 50%;
            opacity: ${Math.random() * 0.5 + 0.2};
        `;
        
        bubbleContainer.appendChild(bubble);

        // Animar la burbuja hacia arriba
        gsap.to(bubble, {
            y: -(window.innerHeight + size),
            x: Math.random() * 100 - 50,
            rotation: Math.random() * 360,
            scale: Math.random() * 0.5 + 0.5,
            duration: duration,
            ease: 'none',
            onComplete: () => {
                bubble.remove();
            }
        });

        // Efecto de flotación lateral
        gsap.to(bubble, {
            x: Math.random() * 200 - 100,
            duration: duration / 2,
            repeat: 1,
            yoyo: true,
            ease: 'sine.inOut'
        });
    }

    // Crear burbujas periódicamente
    function startBubbleGeneration() {
        createBubble();
        setTimeout(startBubbleGeneration, Math.random() * 3000 + 2000);
    }

    // Iniciar generación de burbujas
    setTimeout(startBubbleGeneration, 1000);
}

/**
 * Configurar efectos de morfismo líquido
 * Elementos que cambian de forma de manera fluida
 */
function setupLiquidMorphing() {
    const morphElements = document.querySelectorAll('[data-liquid-morph]');
    
    morphElements.forEach(element => {
        const intensity = element.dataset.liquidMorph || 'medium';
        let morphTimeline;

        switch (intensity) {
            case 'subtle':
                morphTimeline = createSubtleMorph(element);
                break;
            case 'strong':
                morphTimeline = createStrongMorph(element);
                break;
            default:
                morphTimeline = createMediumMorph(element);
        }

        // Pausar morfismo en hover para mejor usabilidad
        element.addEventListener('mouseenter', () => {
            if (morphTimeline) morphTimeline.pause();
        });

        element.addEventListener('mouseleave', () => {
            if (morphTimeline) morphTimeline.play();
        });
    });
}

/**
 * Crear morfismo sutil para elementos
 */
function createSubtleMorph(element) {
    return gsap.timeline({ repeat: -1, yoyo: true })
        .to(element, {
            borderRadius: '60% 40% 40% 60% / 50% 60% 40% 50%',
            duration: 4,
            ease: 'sine.inOut'
        })
        .to(element, {
            borderRadius: '40% 60% 60% 40% / 60% 40% 50% 60%',
            duration: 4,
            ease: 'sine.inOut'
        });
}

/**
 * Crear morfismo medio para elementos
 */
function createMediumMorph(element) {
    return gsap.timeline({ repeat: -1, yoyo: true })
        .to(element, {
            borderRadius: '70% 30% 30% 70% / 60% 40% 60% 40%',
            duration: 6,
            ease: 'power1.inOut'
        })
        .to(element, {
            borderRadius: '30% 70% 70% 30% / 40% 60% 40% 60%',
            duration: 6,
            ease: 'power1.inOut'
        });
}

/**
 * Crear morfismo fuerte para elementos
 */
function createStrongMorph(element) {
    return gsap.timeline({ repeat: -1, yoyo: true })
        .to(element, {
            borderRadius: '80% 20% 20% 80% / 70% 30% 70% 30%',
            scale: 1.05,
            duration: 8,
            ease: 'power2.inOut'
        })
        .to(element, {
            borderRadius: '20% 80% 80% 20% / 30% 70% 30% 70%',
            scale: 0.95,
            duration: 8,
            ease: 'power2.inOut'
        });
}

/**
 * Configurar efectos de reflexión de vidrio
 * Simula reflexiones de luz en superficies de vidrio
 */
function setupGlassReflections() {
    const glassElements = document.querySelectorAll('.liquid-glass-card, .liquid-glass-button');
    
    glassElements.forEach(element => {
        // Crear elemento de reflexión
        const reflection = document.createElement('div');
        reflection.className = 'glass-reflection';
        reflection.style.cssText = `
            position: absolute;
            top: 0;
            left: -100%;
            width: 50%;
            height: 100%;
            background: linear-gradient(90deg, 
                transparent, 
                rgba(255, 255, 255, 0.3), 
                transparent);
            transform: skewX(-20deg);
            transition: left 0.6s ease;
            pointer-events: none;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(reflection);

        // Activar reflexión en hover
        element.addEventListener('mouseenter', () => {
            gsap.to(reflection, {
                left: '100%',
                duration: 0.6,
                ease: 'power2.out'
            });
        });

        // Resetear reflexión
        element.addEventListener('mouseleave', () => {
            gsap.set(reflection, { left: '-100%' });
        });
    });
}

/**
 * Configurar efectos basados en scroll
 * Efectos que cambian según la posición del scroll
 */
function setupScrollBasedEffects() {
    // Efecto de parallax en elementos de vidrio
    const parallaxGlassElements = document.querySelectorAll('[data-glass-parallax]');
    
    parallaxGlassElements.forEach(element => {
        const speed = parseFloat(element.dataset.glassParallax) || 0.5;
        
        gsap.to(element, {
            y: (index, target) => -speed * window.innerHeight,
            ease: 'none',
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });

    // Efecto de intensidad de vidrio basado en scroll
    const intensityElements = document.querySelectorAll('[data-glass-intensity]');
    
    intensityElements.forEach(element => {
        ScrollTrigger.create({
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            onUpdate: self => {
                const intensity = self.progress;
                const blur = 10 + (intensity * 20);
                const opacity = 0.1 + (intensity * 0.2);
                
                element.style.backdropFilter = `blur(${blur}px)`;
                element.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`;
            }
        });
    });
}

/**
 * Crear efecto de onda líquida en un elemento
 * Se activa cuando el usuario hace hover
 */
function createLiquidWaveEffect(element) {
    const wave = document.createElement('div');
    wave.className = 'liquid-wave-effect';
    wave.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0;
        height: 0;
        background: radial-gradient(circle, rgba(233, 30, 99, 0.2) 0%, transparent 70%);
        border-radius: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 0;
    `;
    
    element.style.position = 'relative';
    element.appendChild(wave);

    // Animar la onda
    gsap.to(wave, {
        width: 200,
        height: 200,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        onComplete: () => {
            wave.remove();
        }
    });
}

/**
 * Función de utilidad para crear efectos personalizados
 * Permite a otros módulos crear efectos liquid glass dinámicos
 */
function createCustomLiquidEffect(element, options = {}) {
    const defaultOptions = {
        intensity: 'medium',
        color: 'rgba(233, 30, 99, 0.1)',
        duration: 1,
        ease: 'power2.out'
    };
    
    const settings = { ...defaultOptions, ...options };
    
    const effect = document.createElement('div');
    effect.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${settings.color};
        border-radius: inherit;
        opacity: 0;
        pointer-events: none;
        z-index: -1;
    `;
    
    element.style.position = 'relative';
    element.appendChild(effect);
    
    return gsap.to(effect, {
        opacity: 1,
        duration: settings.duration,
        ease: settings.ease,
        yoyo: true,
        repeat: 1
    });
}

// Exportar funciones para uso en otros módulos
window.LiquidGlassEffects = {
    init: initLiquidGlassAnimations,
    createCustomEffect: createCustomLiquidEffect,
    createWaveEffect: createLiquidWaveEffect
};