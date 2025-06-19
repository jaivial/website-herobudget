/**
 * Hero Budget Website - Feature Animations Module
 * 
 * Módulo especializado para animaciones de características y elementos interactivos
 * Incluye efectos para cards, botones, íconos y elementos de interfaz
 * con el estilo visual 'Liquid Glass'.
 */

/**
 * Inicializar animaciones para elementos de características
 * Configura efectos hover, click y transiciones visuales
 */
function initFeatureAnimations() {
    setupFeatureCardAnimations();
    setupButtonAnimations();
    setupIconAnimations();
    setupImageAnimations();
    setupTextAnimations();
}

/**
 * Configurar animaciones para cards de características
 * Efectos hover sofisticados con transformaciones 3D
 */
function setupFeatureCardAnimations() {
    const featureCards = document.querySelectorAll('.feature');
    
    featureCards.forEach((card, index) => {
        // Configurar perspectiva 3D para el card
        gsap.set(card, {
            transformStyle: 'preserve-3d',
            transformPerspective: 1000
        });

        // Timeline para entrada inicial escalonada
        gsap.from(card, {
            opacity: 0,
            y: 100,
            rotationX: -15,
            duration: 0.8,
            delay: index * 0.1,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            }
        });

        // Crear timeline para efectos hover complejos
        const hoverTl = gsap.timeline({ paused: true });
        
        hoverTl
            .to(card, {
                y: -15,
                rotationX: 5,
                rotationY: 2,
                scale: 1.05,
                duration: 0.4,
                ease: 'power3.out'
            })
            .to(card.querySelector('.feature-icon'), {
                scale: 1.2,
                rotation: 5,
                duration: 0.3,
                ease: 'back.out(1.7)'
            }, '-=0.4')
            .to(card, {
                boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
                backgroundColor: 'rgba(255,255,255,0.95)',
                duration: 0.3,
                ease: 'power2.out'
            }, '-=0.4');

        // Event listeners para hover
        card.addEventListener('mouseenter', () => {
            hoverTl.play();
        });

        card.addEventListener('mouseleave', () => {
            hoverTl.reverse();
        });

        // Efecto de click con feedback visual
        card.addEventListener('click', function() {
            gsap.to(card, {
                scale: 0.98,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });

        // Efecto de inclinación siguiendo el mouse
        card.addEventListener('mousemove', function(e) {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (e.clientX - centerX) / (rect.width / 2);
            const deltaY = (e.clientY - centerY) / (rect.height / 2);
            
            gsap.to(card, {
                rotationY: deltaX * 10,
                rotationX: -deltaY * 10,
                duration: 0.3,
                ease: 'power2.out'
            });
        });

        // Resetear inclinación al salir del hover
        card.addEventListener('mouseleave', function() {
            gsap.to(card, {
                rotationY: 0,
                rotationX: 0,
                duration: 0.5,
                ease: 'power2.out'
            });
        });
    });
}

/**
 * Configurar animaciones para botones
 * Efectos hover, click y estados activos
 */
function setupButtonAnimations() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Timeline para efecto hover
        const hoverTl = gsap.timeline({ paused: true });
        
        hoverTl
            .to(button, {
                y: -3,
                scale: 1.05,
                duration: 0.3,
                ease: 'power2.out'
            })
            .to(button, {
                boxShadow: '0 15px 30px rgba(0,0,0,0.2)',
                duration: 0.2,
                ease: 'power2.out'
            }, '-=0.3');

        // Event listeners para hover
        button.addEventListener('mouseenter', () => {
            hoverTl.play();
        });

        button.addEventListener('mouseleave', () => {
            hoverTl.reverse();
        });

        // Efecto de click con animación de ripple
        button.addEventListener('click', function(e) {
            // Efecto de escala del botón
            gsap.to(button, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });

            // Crear efecto ripple
            createRippleEffect(button, e);
        });

        // Animación de carga inicial para botones CTA
        if (button.classList.contains('btn-primary')) {
            gsap.from(button, {
                scale: 0,
                rotation: 180,
                duration: 0.8,
                delay: 1.5,
                ease: 'back.out(1.7)'
            });
        }
    });
}

/**
 * Crear efecto ripple en botones
 * Efecto visual de ondas al hacer click
 */
function createRippleEffect(button, event) {
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const ripple = document.createElement('span');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Estilos CSS para el ripple
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.backgroundColor = 'rgba(255,255,255,0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.pointerEvents = 'none';
    
    button.style.position = 'relative';
    button.style.overflow = 'hidden';
    button.appendChild(ripple);
    
    // Animar el ripple
    gsap.to(ripple, {
        scale: 4,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        onComplete: () => {
            ripple.remove();
        }
    });
}

/**
 * Configurar animaciones para íconos
 * Efectos de rotación, escalado y color
 */
function setupIconAnimations() {
    const featureIcons = document.querySelectorAll('.feature-icon');
    
    featureIcons.forEach(icon => {
        // Animación de entrada con rotación
        gsap.from(icon, {
            scale: 0,
            rotation: -180,
            duration: 0.8,
            ease: 'back.out(1.7)',
            scrollTrigger: {
                trigger: icon,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        });

        // Animación continua sutil de rotación
        gsap.to(icon, {
            rotation: 360,
            duration: 20,
            repeat: -1,
            ease: 'none'
        });

        // Efecto hover para íconos
        icon.addEventListener('mouseenter', function() {
            gsap.to(icon, {
                scale: 1.3,
                rotation: '+=15',
                duration: 0.3,
                ease: 'back.out(1.7)'
            });
        });

        icon.addEventListener('mouseleave', function() {
            gsap.to(icon, {
                scale: 1,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

/**
 * Configurar animaciones para imágenes
 * Efectos de parallax y hover para imágenes de dispositivos
 */
function setupImageAnimations() {
    const heroImage = document.querySelector('.hero-image');
    const deviceImages = document.querySelectorAll('.device-image');
    
    // Animación para imagen principal del hero
    if (heroImage) {
        const appIcon = heroImage.querySelector('img, .app-icon');
        
        if (appIcon) {
            // Efecto de flotación continua
            gsap.to(appIcon, {
                y: -20,
                duration: 4,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });

            // Efecto de rotación sutil
            gsap.to(appIcon, {
                rotation: 5,
                duration: 6,
                ease: 'sine.inOut',
                repeat: -1,
                yoyo: true
            });
        }
    }

    // Animaciones para imágenes de dispositivos
    deviceImages.forEach((image, index) => {
        // Entrada escalonada
        gsap.from(image, {
            opacity: 0,
            scale: 0.8,
            y: 50,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: image,
                start: 'top 80%',
                toggleActions: 'play none none none'
            }
        });

        // Efecto hover para imágenes de dispositivos
        image.addEventListener('mouseenter', function() {
            gsap.to(image, {
                scale: 1.05,
                y: -10,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        image.addEventListener('mouseleave', function() {
            gsap.to(image, {
                scale: 1,
                y: 0,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
}

/**
 * Configurar animaciones para texto
 * Efectos de escritura y revelado de contenido
 */
function setupTextAnimations() {
    const animatedTexts = document.querySelectorAll('[data-text-animation]');
    
    animatedTexts.forEach(text => {
        const animationType = text.dataset.textAnimation;
        
        switch (animationType) {
            case 'typewriter':
                createTypewriterEffect(text);
                break;
            case 'fade-up':
                createFadeUpEffect(text);
                break;
            case 'split-reveal':
                createSplitRevealEffect(text);
                break;
        }
    });
}

/**
 * Crear efecto de máquina de escribir
 * Texto que aparece letra por letra
 */
function createTypewriterEffect(element) {
    const text = element.textContent;
    element.textContent = '';
    
    gsap.from(element, {
        width: 0,
        duration: text.length * 0.05,
        ease: 'none',
        scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            toggleActions: 'play none none none'
        }
    });
    
    // Animar cada letra
    for (let i = 0; i < text.length; i++) {
        setTimeout(() => {
            element.textContent += text[i];
        }, i * 50);
    }
}

/**
 * Crear efecto de fade-up para texto
 * Texto que aparece desde abajo con desvanecimiento
 */
function createFadeUpEffect(element) {
    gsap.from(element, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
}

/**
 * Crear efecto de revelado dividido
 * Texto que se revela con efectos de división
 */
function createSplitRevealEffect(element) {
    const words = element.textContent.split(' ');
    element.innerHTML = words.map(word => `<span class="word">${word}</span>`).join(' ');
    
    const wordSpans = element.querySelectorAll('.word');
    
    gsap.from(wordSpans, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            toggleActions: 'play none none none'
        }
    });
}