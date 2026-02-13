/**
 * Tabs Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'

class NotikaTabs extends NotikaApp {
    constructor() {
        super()
    }

    init() {
        super.init()
        this.removeAllScrollbarRules()
        this.initAnimatedTabs()
        this.initColorTabs()
        this.initTabAccessibility()
        this.initTooltips()
        console.log('✅ Notika Tabs initialized')
    }

    initAnimatedTabs() {
        const animatedTabContainers = document.querySelectorAll('.animated-tabs')

        animatedTabContainers.forEach(container => {
            const animation = container.dataset.animation || 'fade'
            const parentId = container.id.replace('Content', '')
            const tabButtons = document.querySelectorAll(`#${parentId} button[data-bs-toggle="tab"]`)

            tabButtons.forEach(button => {
                button.addEventListener('shown.bs.tab', (event) => {
                    const targetPane = document.querySelector(event.target.dataset.bsTarget)
                    if (!targetPane) return

                    if (animation === 'slide') {
                        targetPane.style.animation = 'nk-slideInLeft 0.3s ease-out'
                    } else if (animation === 'fade-scale') {
                        targetPane.style.animation = 'nk-fadeInScale 0.3s ease-out'
                    }

                    setTimeout(() => {
                        targetPane.style.animation = ''
                    }, 300)
                })
            })
        })
    }

    initColorTabs() {
        const colorMap = {
            'nk-green': '#00c292',
            'nk-blue': '#03a9f3',
            'nk-amber': '#ff9800',
            'nk-pink': '#e91e63'
        }

        document.querySelectorAll('[data-tab-color]').forEach(nav => {
            const color = colorMap[nav.dataset.tabColor]
            if (!color) return

            const applyColor = () => {
                nav.querySelectorAll('.nav-link').forEach(link => {
                    if (link.classList.contains('active')) {
                        link.style.color = color
                        link.style.borderBottomColor = color
                    } else {
                        link.style.color = ''
                        link.style.borderBottomColor = ''
                    }
                })
            }

            applyColor()

            nav.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('shown.bs.tab', applyColor)
                link.addEventListener('mouseenter', function () {
                    if (!this.classList.contains('active')) {
                        this.style.backgroundColor = color + '0D'
                    }
                })
                link.addEventListener('mouseleave', function () {
                    if (!this.classList.contains('active')) {
                        this.style.backgroundColor = ''
                    }
                })
            })
        })
    }

    initTabAccessibility() {
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
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        tooltipTriggerList.forEach(tooltipTriggerEl => {
            new bootstrap.Tooltip(tooltipTriggerEl)
        })
    }

    removeAllScrollbarRules() {
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
                continue
            }
        }
    }
}

// Minimal CSS for animations and tab theming
const style = document.createElement('style')
style.textContent = `
    @keyframes nk-slideInLeft {
        from { opacity: 0; transform: translateX(-20px); }
        to { opacity: 1; transform: translateX(0); }
    }
    @keyframes nk-fadeInScale {
        from { opacity: 0; transform: scale(0.95); }
        to { opacity: 1; transform: scale(1); }
    }
    .tab-pane { will-change: opacity, transform; }
    .nav-tabs .nav-link.active { color: #00c292; border-bottom-color: #00c292; }
    .nav-tabs .nav-link:hover { background-color: rgba(0, 194, 146, 0.05); }
    .nav-tabs .nav-link:focus-visible { outline: 2px solid #00c292; outline-offset: -2px; }
    .nav-pills .nav-link.active { background-color: #00c292; }
    .nav-pills .nav-link:hover:not(.active) { background-color: rgba(0, 194, 146, 0.08); }
    .nav-pills .nav-link:focus-visible { outline: 2px solid #00c292; outline-offset: -2px; }
`
document.head.appendChild(style)

// Initialize the tabs page
const notikaTabs = new NotikaTabs()
notikaTabs.init()

export { NotikaTabs }
