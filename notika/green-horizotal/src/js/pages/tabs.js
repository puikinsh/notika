import { NotikaApp } from '../main.js'

class NotikaTabs extends NotikaApp {
    constructor() {
        super()
    }

    init() {
        super.init()
        this.removeAllScrollbarRules()
        this.initAnimatedTabs()
        this.initTabAccessibility()
        this.initTooltips()
        console.log('✅ Notika Tabs initialized')
    }

    initAnimatedTabs() {
        const animatedTabContainers = document.querySelectorAll('.animated-tabs')

        animatedTabContainers.forEach(container => {
            const animation = container.dataset.animation || 'fade'
            const tabPanes = container.querySelectorAll('.tab-pane')

            // Find the parent tabs
            const parentId = container.id.replace('Content', '')
            const tabButtons = document.querySelectorAll(`#${parentId} button[data-bs-toggle="tab"]`)

            tabButtons.forEach(button => {
                button.addEventListener('shown.bs.tab', (event) => {
                    const targetPane = document.querySelector(event.target.dataset.bsTarget)

                    if (targetPane && animation === 'slide') {
                        targetPane.style.animation = 'slideInLeft 0.3s ease-out'
                        setTimeout(() => {
                            targetPane.style.animation = ''
                        }, 300)
                    } else if (targetPane && animation === 'fade-scale') {
                        targetPane.style.animation = 'fadeInScale 0.3s ease-out'
                        setTimeout(() => {
                            targetPane.style.animation = ''
                        }, 300)
                    }
                })
            })
        })
    }

    initTabAccessibility() {
        // Add keyboard navigation to tabs
        const tabLists = document.querySelectorAll('[role="tablist"]')

        tabLists.forEach(tabList => {
            const tabs = tabList.querySelectorAll('[role="tab"]')

            tabs.forEach((tab, index) => {
                tab.addEventListener('keydown', (e) => {
                    let newIndex = index

                    switch(e.key) {
                        case 'ArrowLeft':
                            e.preventDefault()
                            newIndex = index === 0 ? tabs.length - 1 : index - 1
                            break
                        case 'ArrowRight':
                            e.preventDefault()
                            newIndex = index === tabs.length - 1 ? 0 : index + 1
                            break
                        case 'Home':
                            e.preventDefault()
                            newIndex = 0
                            break
                        case 'End':
                            e.preventDefault()
                            newIndex = tabs.length - 1
                            break
                        default:
                            return
                    }

                    tabs[newIndex].focus()
                    tabs[newIndex].click()
                })
            })
        })
    }

    initTooltips() {
        // Initialize Bootstrap tooltips
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new bootstrap.Tooltip(tooltipTriggerEl)
        })
    }

    removeAllScrollbarRules() {
        // Remove custom scrollbar styles to restore native scrollbars
        const styleSheets = document.styleSheets
        for (let i = 0; i < styleSheets.length; i++) {
            try {
                const rules = styleSheets[i].cssRules || styleSheets[i].rules
                if (!rules) continue

                for (let j = rules.length - 1; j >= 0; j--) {
                    const rule = rules[j]
                    if (rule.selectorText && (
                        rule.selectorText.includes('::-webkit-scrollbar') ||
                        rule.selectorText.includes('.mCustomScrollbar') ||
                        rule.selectorText.includes('.mCSB_') ||
                        rule.selectorText.includes('.nicescroll-rails')
                    )) {
                        styleSheets[i].deleteRule(j)
                    }
                }
            } catch (e) {
                // Some stylesheets may not be accessible due to CORS
                continue
            }
        }
    }
}

// Add custom animations via CSS
const style = document.createElement('style')
style.textContent = `
    @keyframes slideInLeft {
        from {
            opacity: 0;
            transform: translateX(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes fadeInScale {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }

    .tab-pane {
        will-change: opacity, transform;
    }

    .nav-tabs .nav-link {
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;
    }

    .nav-tabs .nav-link:hover {
        background-color: rgba(0, 194, 146, 0.05);
    }

    .nav-tabs .nav-link.active {
        color: #00c292;
        border-bottom: 2px solid #00c292;
    }

    .nav-tabs .nav-link:focus-visible {
        outline: 2px solid #00c292;
        outline-offset: -2px;
    }

    .tab-ctn {
        padding: 20px 0;
    }

    .tab-mg-b-0 {
        margin-bottom: 0 !important;
    }

    /* Custom tab styles */
    .nav-tabs {
        border-bottom: 1px solid #dee2e6;
        margin-bottom: 20px;
    }

    .nav-tabs .nav-item {
        margin-bottom: -1px;
    }

    .nav-tabs .nav-link {
        border: 1px solid transparent;
        border-top-left-radius: 0.25rem;
        border-top-right-radius: 0.25rem;
        padding: 0.5rem 1rem;
    }

    .nav-tabs .nav-link.active,
    .nav-tabs .nav-item.show .nav-link {
        color: #00c292;
        background-color: #fff;
        border-color: #dee2e6 #dee2e6 #fff;
    }

    /* Right aligned tabs */
    .nav-tabs.justify-content-end {
        border-bottom: 1px solid #dee2e6;
    }

    /* Center aligned tabs */
    .nav-tabs.justify-content-center {
        border-bottom: 1px solid #dee2e6;
    }

    /* Responsive adjustments */
    @media (max-width: 768px) {
        .nav-tabs .nav-link {
            padding: 0.5rem 0.75rem;
            font-size: 14px;
        }
    }
`
document.head.appendChild(style)

// Initialize the tabs page
const notikaTabs = new NotikaTabs()
notikaTabs.init()

export { NotikaTabs }