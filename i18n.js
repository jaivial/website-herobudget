// Internationalization (i18n) for Hero Budget Website
// Language management and translations

// Supported languages
const LANGUAGES = {
    es: 'Español',
    en: 'English'
};

// Language translations
const translations = {
    es: {
        // Navigation
        'nav.home': 'Inicio',
        'nav.features': 'Características',
        'nav.support': 'Soporte',
        'nav.privacy': 'Privacidad',

        // Hero Section
        'hero.title': 'Toma Control de tus Finanzas',
        'hero.description': 'Hero Budget es la app que necesitas para gestionar tus gastos, crear presupuestos inteligentes y alcanzar tus metas de ahorro.',
        'hero.download': 'Descargar en App Store',
        'hero.learn-more': 'Conocer más',

        // Features Section
        'features.title': '¿Por qué elegir Hero Budget?',
        'features.expense-tracking.title': 'Seguimiento de Gastos',
        'features.expense-tracking.desc': 'Registra y categoriza tus gastos de forma automática para entender mejor tus hábitos financieros.',
        'features.savings-goals.title': 'Metas de Ahorro',
        'features.savings-goals.desc': 'Establece objetivos de ahorro realistas y recibe notificaciones para mantener tu progreso.',
        'features.smart-budgets.title': 'Presupuestos Inteligentes',
        'features.smart-budgets.desc': 'Crea presupuestos mensuales personalizados que se adapten a tu estilo de vida.',
        'features.secure-data.title': 'Datos Seguros',
        'features.secure-data.desc': 'Tu información financiera está protegida con encriptación de nivel bancario.',
        'features.intuitive-ui.title': 'Interfaz Intuitiva',
        'features.intuitive-ui.desc': 'Diseño simple y elegante que hace que gestionar dinero sea fácil y agradable.',
        'features.visual-reports.title': 'Reportes Visuales',
        'features.visual-reports.desc': 'Gráficos claros que muestran tu progreso financiero de un vistazo.',

        // CTA Section
        'cta.title': '¿Listo para ser el héroe de tus finanzas?',
        'cta.description': 'Únete a miles de usuarios que ya transformaron su relación con el dinero.',
        'cta.download': 'Descargar Hero Budget',

        // Footer
        'footer.tagline': 'Tu compañero para la libertad financiera.',
        'footer.links': 'Enlaces',
        'footer.contact': 'Contacto',
        'footer.rights': 'Todos los derechos reservados.',

        // Language Modal
        'modal.title': 'Selecciona tu idioma',
        'modal.subtitle': 'Choose your language',
        'modal.continue': 'Continuar',

        // Language Selector
        'lang.selector.label': 'Idioma',

        // Support Page
        'support.title': 'Centro de Soporte',
        'support.intro': '¿Necesitas ayuda con Hero Budget? Aquí encontrarás respuestas a las preguntas más frecuentes y formas de contactar con nuestro equipo.',
        'support.faq.title': 'Preguntas Frecuentes',
        'support.faq.q1': '¿Cómo empiezo a usar Hero Budget?',
        'support.faq.a1': 'Descarga la app desde App Store, crea tu cuenta y sigue el tutorial inicial. Podrás agregar tu primera transacción y configurar tus categorías de gasto en minutos.',
        'support.faq.q2': '¿Es segura mi información financiera?',
        'support.faq.a2': 'Absolutamente. Utilizamos encriptación de nivel bancario y tus datos se almacenan principalmente en tu dispositivo. Nunca vendemos o compartimos tu información personal.',
        'support.faq.q3': '¿Puedo sincronizar entre dispositivos?',
        'support.faq.a3': 'Sí, si creas una cuenta, tus datos se sincronizarán automáticamente entre todos tus dispositivos iOS de forma segura.',
        'support.faq.q4': '¿Cómo creo un presupuesto?',
        'support.faq.a4': 'Ve a la sección "Presupuestos" en la app, toca "Nuevo Presupuesto", selecciona las categorías y establece los límites mensuales que desees.',
        'support.faq.q5': '¿Puedo exportar mis datos?',
        'support.faq.a5': 'Sí, Hero Budget permite exportar tus transacciones y reportes en formato CSV desde la sección "Configuración" > "Exportar Datos".',
        'support.faq.q6': '¿La app funciona sin conexión?',
        'support.faq.a6': 'Sí, puedes usar Hero Budget completamente sin conexión. Los datos se sincronizarán cuando tengas conexión a internet.',
        'support.faq.q7': '¿Cómo elimino mi cuenta?',
        'support.faq.a7': 'Ve a "Configuración" > "Cuenta" > "Eliminar Cuenta". Ten en cuenta que esta acción es irreversible y eliminará todos tus datos.',
        'support.faq.q8': '¿Hero Budget es gratuita?',
        'support.faq.a8': 'Sí, Hero Budget es completamente gratuita. Todas las funciones principales están disponibles sin costo alguno.',
        'support.contact.title': '¿No encuentras lo que buscas?',
        'support.contact.desc': 'Nuestro equipo de soporte está aquí para ayudarte. Responderemos tu consulta en un máximo de 24 horas.',
        'support.contact.email': 'Email',
        'support.contact.email.time': 'Respuesta en menos de 24 horas',
        'support.contact.app': 'Desde la App',
        'support.contact.app.desc': 'Ve a "Configuración" > "Ayuda y Soporte"',
        'support.contact.app.feedback': 'Envía feedback directamente desde la app',

        // Privacy Page  
        'privacy.title': 'Política de Privacidad',
        'privacy.updated': 'Última actualización: 9 de enero de 2025'
    },
    en: {
        // Navigation
        'nav.home': 'Home',
        'nav.features': 'Features',
        'nav.support': 'Support',
        'nav.privacy': 'Privacy',

        // Hero Section
        'hero.title': 'Take Control of Your Finances',
        'hero.description': 'Hero Budget is the app you need to manage your expenses, create smart budgets, and achieve your savings goals.',
        'hero.download': 'Download on App Store',
        'hero.learn-more': 'Learn more',

        // Features Section
        'features.title': 'Why choose Hero Budget?',
        'features.expense-tracking.title': 'Expense Tracking',
        'features.expense-tracking.desc': 'Record and categorize your expenses automatically to better understand your financial habits.',
        'features.savings-goals.title': 'Savings Goals',
        'features.savings-goals.desc': 'Set realistic savings targets and receive notifications to maintain your progress.',
        'features.smart-budgets.title': 'Smart Budgets',
        'features.smart-budgets.desc': 'Create personalized monthly budgets that adapt to your lifestyle.',
        'features.secure-data.title': 'Secure Data',
        'features.secure-data.desc': 'Your financial information is protected with bank-level encryption.',
        'features.intuitive-ui.title': 'Intuitive Interface',
        'features.intuitive-ui.desc': 'Simple and elegant design that makes managing money easy and enjoyable.',
        'features.visual-reports.title': 'Visual Reports',
        'features.visual-reports.desc': 'Clear charts that show your financial progress at a glance.',

        // CTA Section
        'cta.title': 'Ready to be the hero of your finances?',
        'cta.description': 'Join thousands of users who have already transformed their relationship with money.',
        'cta.download': 'Download Hero Budget',

        // Footer
        'footer.tagline': 'Your companion for financial freedom.',
        'footer.links': 'Links',
        'footer.contact': 'Contact',
        'footer.rights': 'All rights reserved.',

        // Language Modal
        'modal.title': 'Select your language',
        'modal.subtitle': 'Selecciona tu idioma',
        'modal.continue': 'Continue',

        // Language Selector
        'lang.selector.label': 'Language',

        // Support Page
        'support.title': 'Support Center',
        'support.intro': 'Need help with Hero Budget? Here you\'ll find answers to the most frequently asked questions and ways to contact our team.',
        'support.faq.title': 'Frequently Asked Questions',
        'support.faq.q1': 'How do I start using Hero Budget?',
        'support.faq.a1': 'Download the app from the App Store, create your account, and follow the initial tutorial. You can add your first transaction and set up your expense categories in minutes.',
        'support.faq.q2': 'Is my financial information secure?',
        'support.faq.a2': 'Absolutely. We use bank-level encryption and your data is stored primarily on your device. We never sell or share your personal information.',
        'support.faq.q3': 'Can I sync between devices?',
        'support.faq.a3': 'Yes, if you create an account, your data will automatically sync between all your iOS devices securely.',
        'support.faq.q4': 'How do I create a budget?',
        'support.faq.a4': 'Go to the "Budgets" section in the app, tap "New Budget", select the categories and set the monthly limits you want.',
        'support.faq.q5': 'Can I export my data?',
        'support.faq.a5': 'Yes, Hero Budget allows you to export your transactions and reports in CSV format from the "Settings" > "Export Data" section.',
        'support.faq.q6': 'Does the app work offline?',
        'support.faq.a6': 'Yes, you can use Hero Budget completely offline. Data will sync when you have an internet connection.',
        'support.faq.q7': 'How do I delete my account?',
        'support.faq.a7': 'Go to "Settings" > "Account" > "Delete Account". Note that this action is irreversible and will delete all your data.',
        'support.faq.q8': 'Is Hero Budget free?',
        'support.faq.a8': 'Yes, Hero Budget is completely free. All main features are available at no cost.',
        'support.contact.title': 'Can\'t find what you\'re looking for?',
        'support.contact.desc': 'Our support team is here to help you. We will respond to your inquiry within 24 hours.',
        'support.contact.email': 'Email',
        'support.contact.email.time': 'Response in less than 24 hours',
        'support.contact.app': 'From the App',
        'support.contact.app.desc': 'Go to "Settings" > "Help and Support"',
        'support.contact.app.feedback': 'Send feedback directly from the app',

        // Privacy Page
        'privacy.title': 'Privacy Policy',
        'privacy.updated': 'Last updated: January 9, 2025'
    }
};

// Language management functions
class LanguageManager {
    constructor() {
        this.currentLanguage = this.getLanguageFromURL() || this.getStoredLanguage() || 'es';
        this.init();
    }

    init() {
        // If language came from URL, save it and don't show modal
        const urlLang = this.getLanguageFromURL();
        if (urlLang) {
            this.setStoredLanguage(urlLang);
            this.applyLanguage(urlLang);
            this.setupLanguageSelectors();
        } else {
            this.checkAndShowLanguageModal();
            this.applyLanguage(this.currentLanguage);
            this.setupLanguageSelectors();
        }
    }

    getLanguageFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        return langParam && translations[langParam] ? langParam : null;
    }

    getStoredLanguage() {
        return localStorage.getItem('herobudget-language');
    }

    setStoredLanguage(lang) {
        localStorage.setItem('herobudget-language', lang);
    }

    checkAndShowLanguageModal() {
        if (!this.getStoredLanguage()) {
            this.showLanguageModal();
        }
    }

    showLanguageModal() {
        const modal = document.getElementById('language-modal');
        if (modal) {
            modal.style.display = 'flex';
            document.body.classList.add('modal-open');
        }
    }

    hideLanguageModal() {
        const modal = document.getElementById('language-modal');
        if (modal) {
            modal.style.display = 'none';
            document.body.classList.remove('modal-open');
        }
    }

    setLanguage(lang) {
        if (translations[lang]) {
            this.currentLanguage = lang;
            this.setStoredLanguage(lang);
            this.applyLanguage(lang);
            this.updateLanguageSelectors();
            this.hideLanguageModal();

            // Update HTML lang attribute
            document.documentElement.lang = lang;

            // Update URL parameter if not already present
            this.updateURLParameter(lang);
        }
    }

    updateURLParameter(lang) {
        const url = new URL(window.location);
        const currentLangParam = url.searchParams.get('lang');

        if (currentLangParam !== lang) {
            url.searchParams.set('lang', lang);
            // Update URL without reloading the page
            window.history.replaceState({}, '', url);
        }
    }

    applyLanguage(lang) {
        const elements = document.querySelectorAll('[data-i18n]');
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = this.getTranslation(key, lang);
            if (translation) {
                element.textContent = translation;
            }
        });
    }

    getTranslation(key, lang = this.currentLanguage) {
        return translations[lang] && translations[lang][key] || key;
    }

    setupLanguageSelectors() {
        const selectors = document.querySelectorAll('.language-selector select');
        selectors.forEach(selector => {
            selector.value = this.currentLanguage;
            selector.addEventListener('change', (e) => {
                this.setLanguage(e.target.value);
            });
        });

        // Setup modal language buttons
        const modalButtons = document.querySelectorAll('.language-option');
        modalButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const lang = e.target.getAttribute('data-lang');
                this.setLanguage(lang);
            });
        });
    }

    updateLanguageSelectors() {
        const selectors = document.querySelectorAll('.language-selector select');
        selectors.forEach(selector => {
            selector.value = this.currentLanguage;
        });
    }
}

// Initialize language manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.languageManager = new LanguageManager();
}); 