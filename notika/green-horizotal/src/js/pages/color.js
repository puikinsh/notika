import { NotikaApp } from '../main.js'
import { NotikaUI } from '../modules/ui.js'

class ColorPage extends NotikaApp {
    constructor() {
        super()
        this.initColorInteractions()
        this.initTooltips()
        console.log('Color page initialized')
    }

    initColorInteractions() {
        const colorCards = document.querySelectorAll('.color-single')

        colorCards.forEach(card => {
            card.addEventListener('click', (e) => {
                const colorValue = card.querySelector('p').textContent
                const colorClass = card.querySelector('span').textContent

                // Copy color to clipboard if available
                if (navigator.clipboard) {
                    navigator.clipboard.writeText(colorValue).then(() => {
                        this.showColorNotification(`${colorValue} copied to clipboard!`)
                    }).catch(() => {
                        this.showColorNotification(`Color: ${colorValue} | Class: ${colorClass}`)
                    })
                } else {
                    this.showColorNotification(`Color: ${colorValue} | Class: ${colorClass}`)
                }

                // Add click animation
                card.style.transform = 'scale(0.95)'
                setTimeout(() => {
                    card.style.transform = 'scale(1)'
                }, 150)
            })

            // Hover effects
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-2px)'
                card.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
            })

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0)'
                card.style.boxShadow = ''
            })
        })
    }

    initTooltips() {
        const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        if (tooltipElements.length > 0 && window.bootstrap) {
            tooltipElements.forEach(element => {
                new bootstrap.Tooltip(element)
            })
        }
    }

    showColorNotification(message) {
        // Remove existing notification if present
        const existingNotification = document.querySelector('.color-notification')
        if (existingNotification) {
            existingNotification.remove()
        }

        // Create notification element
        const notification = document.createElement('div')
        notification.className = 'color-notification'
        notification.textContent = message
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #00c292;
            color: white;
            padding: 12px 20px;
            border-radius: 6px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 9999;
            font-size: 14px;
            font-weight: 500;
            animation: slideInRight 0.3s ease-out;
        `

        // Add animation styles
        if (!document.getElementById('color-notification-styles')) {
            const style = document.createElement('style')
            style.id = 'color-notification-styles'
            style.textContent = `
                @keyframes slideInRight {
                    from {
                        opacity: 0;
                        transform: translateX(100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }

                .color-single {
                    transition: all 0.2s ease;
                    cursor: pointer;
                    user-select: none;
                }

                .color-single:hover {
                    cursor: pointer;
                }
            `
            document.head.appendChild(style)
        }

        document.body.appendChild(notification)

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (notification && notification.parentNode) {
                notification.style.animation = 'slideInRight 0.3s ease-out reverse'
                setTimeout(() => {
                    notification.remove()
                }, 300)
            }
        }, 3000)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.colorPage = new ColorPage()
})