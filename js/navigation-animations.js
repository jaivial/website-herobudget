/**
 * Hero Budget Website - Navigation Animations Module
 * 
 * Módulo especializado para animaciones de navegación y menús
 * Incluye efectos para sidebar móvil, transiciones de página
 * y micro-interacciones en elementos de navegación.
 */

/**
 * Inicializar animaciones para elementos de navegación
 * Configura efectos para desktop y mobile navigation
 */
function initNavigationAnimations() {
    setupMobileMenuAnimations();
    setupDesktopNavAnimations();
    setupPageTransitions();
    setupLanguageSelectorAnimations();
}

/**
 * Configurar animaciones para el menú móvil
 * Incluye efectos de apertura, cierre y transiciones
 */
function setupMobileMenuAnimations() {
    const mobileToggle = document.getElementById('navbar-toggle');
    const mobileSidebar = document.getElementById('mobile-sidebar');
    const mobileBackdrop = document.getElementById('mobile-backdrop');
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const sidebarClose = document.getElementById('sidebar-close');

    if (!mobileToggle || !mobileSidebar) return;

    // Timeline para animación de apertura del sidebar
    const openSidebarTl = gsap.timeline({ paused: true });
    
    // Configurar estado inicial del sidebar
    gsap.set(mobileSidebar, { x: '100%' });
    gsap.set(sidebarLinks, { x: 50, opacity: 0 });

    // Animación de apertura del sidebar
    openSidebarTl
        .to(mobileBackdrop, {
            opacity: 1,
            visibility: 'visible',
            duration: 0.3,
            ease: 'power2.out'
        })
        .to(mobileSidebar, {
            x: '0%',
            duration: 0.4,
            ease: 'power3.out'
        }, '-=0.1')
        .to(sidebarLinks, {
            x: 0,
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out'
        }, '-=0.2');

    // Timeline para animación de cierre del sidebar
    const closeSidebarTl = gsap.timeline({ paused: true });
    
    closeSidebarTl
        .to(sidebarLinks, {
            x: 50,
            opacity: 0,
            duration: 0.2,
            stagger: 0.03,
            ease: 'power2.in'
        })
        .to(mobileSidebar, {
            x: '100%',
            duration: 0.3,
            ease: 'power2.in'
        }, '-=0.1')
        .to(mobileBackdrop, {
            opacity: 0,
            visibility: 'hidden',
            duration: 0.2,
            ease: 'power2.in'
        }, '-=0.2');

    // Animación del ícono hamburguesa
    const hamburgerLines = document.querySelectorAll('.hamburger-line');
    const hamburgerTl = gsap.timeline({ paused: true });
    
    if (hamburgerLines.length >= 3) {
        hamburgerTl
            .to(hamburgerLines[0], {
                rotation: 45,
                y: 7,
                duration: 0.3,
                ease: 'power2.out'
            })
            .to(hamburgerLines[1], {
                opacity: 0,
                duration: 0.2,
                ease: 'power2.out'
            }, '-=0.3')
            .to(hamburgerLines[2], {
                rotation: -45,
                y: -7,
                duration: 0.3,
                ease: 'power2.out'
            }, '-=0.3');
    }

    // Event listeners para apertura y cierre
    mobileToggle.addEventListener('click', function() {
        if (mobileSidebar.classList.contains('active')) {
            closeSidebar();
        } else {
            openSidebar();
        }
    });

    function openSidebar() {
        mobileSidebar.classList.add('active');
        mobileBackdrop.classList.add('active');
        document.body.classList.add('sidebar-open');
        openSidebarTl.restart();
        hamburgerTl.play();
    }

    function closeSidebar() {
        mobileSidebar.classList.remove('active');
        mobileBackdrop.classList.remove('active');
        document.body.classList.remove('sidebar-open');
        closeSidebarTl.restart();
        hamburgerTl.reverse();
    }

    // Event listeners para cerrar sidebar
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }
    
    if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', closeSidebar);
    }

    // Cerrar sidebar al hacer click en links
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });

    // Cerrar sidebar con tecla Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && mobileSidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
}

/**
 * Configurar animaciones para navegación desktop
 * Efectos hover y transiciones suaves para elementos del menú
 */
function setupDesktopNavAnimations() {
    const navLinks = document.querySelectorAll('.navbar-nav a');
    
    navLinks.forEach(link => {
        // Crear timeline para efectos hover
        const hoverTl = gsap.timeline({ paused: true });
        
        hoverTl.to(link, {
            y: -2,
            duration: 0.2,
            ease: 'power2.out'
        });

        // Event listeners para hover
        link.addEventListener('mouseenter', () => {
            hoverTl.play();
        });

        link.addEventListener('mouseleave', () => {
            hoverTl.reverse();
        });

        // Efecto de click con feedback visual
        link.addEventListener('click', function() {
            gsap.to(link, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1,
                ease: 'power2.inOut'
            });
        });
    });
}

/**
 * Configurar transiciones entre páginas
 * Efectos suaves para cambios de contenido
 */
function setupPageTransitions() {
    // Configurar fade-in para carga inicial de página
    gsap.from('main', {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
        delay: 0.2
    });

    // Configurar transiciones para enlaces internos
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Animación de scroll suave con GSAP
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: targetElement,
                        offsetY: 80
                    },
                    ease: 'power2.inOut'
                });
            }
        });
    });
}

/**
 * Configurar animaciones para selector de idioma
 * Efectos para modal y dropdown de idiomas
 */
function setupLanguageSelectorAnimations() {
    const languageModal = document.getElementById('language-modal');
    const languageOptions = document.querySelectorAll('.language-option');
    const languageSelectors = document.querySelectorAll('.language-selector select');

    if (!languageModal) return;

    // Timeline para modal de idioma
    const modalTl = gsap.timeline({ paused: true });
    
    // Configurar estado inicial del modal
    gsap.set(languageModal, { display: 'none' });
    gsap.set('.language-modal-content', { scale: 0.8, opacity: 0 });

    // Animación de apertura del modal
    modalTl
        .set(languageModal, { display: 'flex' })
        .to(languageModal, {
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            duration: 0.3,
            ease: 'power2.out'
        })
        .to('.language-modal-content', {
            scale: 1,
            opacity: 1,
            duration: 0.4,
            ease: 'back.out(1.7)'
        }, '-=0.2')
        .from(languageOptions, {
            y: 20,
            opacity: 0,
            duration: 0.3,
            stagger: 0.1,
            ease: 'power2.out'
        }, '-=0.2');

    // Animaciones para opciones de idioma
    languageOptions.forEach(option => {
        const hoverTl = gsap.timeline({ paused: true });
        
        hoverTl.to(option, {
            y: -3,
            scale: 1.05,
            duration: 0.2,
            ease: 'power2.out'
        });

        option.addEventListener('mouseenter', () => hoverTl.play());
        option.addEventListener('mouseleave', () => hoverTl.reverse());
    });

    // Animaciones para selectores de idioma en navigation
    languageSelectors.forEach(selector => {
        selector.addEventListener('focus', function() {
            gsap.to(selector, {
                scale: 1.05,
                duration: 0.2,
                ease: 'power2.out'
            });
        });

        selector.addEventListener('blur', function() {
            gsap.to(selector, {
                scale: 1,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
}