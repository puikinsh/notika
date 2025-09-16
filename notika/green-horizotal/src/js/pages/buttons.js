import { NotikaApp } from '../main.js'
import { NotikaUI } from '../modules/ui.js'

class ButtonsPage extends NotikaApp {
    constructor() {
        super()
        this.initWaveEffects()
        console.log('Buttons page initialized')
    }

    initWaveEffects() {
        const buttons = document.querySelectorAll('.waves-effect')

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const ripple = document.createElement('span')
                ripple.className = 'ripple-effect'

                const rect = button.getBoundingClientRect()
                const size = Math.max(rect.width, rect.height)
                const x = e.clientX - rect.left - size / 2
                const y = e.clientY - rect.top - size / 2

                ripple.style.width = ripple.style.height = size + 'px'
                ripple.style.left = x + 'px'
                ripple.style.top = y + 'px'

                button.style.position = 'relative'
                button.style.overflow = 'hidden'
                button.appendChild(ripple)

                setTimeout(() => {
                    ripple.remove()
                }, 600)
            })
        })

        this.addRippleStyles()
    }

    addRippleStyles() {
        if (document.getElementById('ripple-styles')) return

        const style = document.createElement('style')
        style.id = 'ripple-styles'
        style.textContent = `
            .ripple-effect {
                position: absolute;
                border-radius: 50%;
                background-color: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            }

            @keyframes ripple-animation {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }

            .waves-circle {
                border-radius: 50% !important;
                width: 40px;
                height: 40px;
                line-height: 40px;
                text-align: center;
                padding: 0;
            }

            .btn-icon-notika {
                margin: 5px;
            }

            .btn-list {
                padding: 20px;
            }

            .btn-list .btn {
                margin: 5px;
            }

            .material-design-btn {
                padding: 20px;
            }

            .material-design-btn .btn {
                margin: 5px;
            }

            .button-icon-btn {
                padding: 20px;
            }

            .button-icon-btn .btn {
                margin: 5px;
            }

            .btn-toolbar {
                padding: 10px 20px;
            }

            .notika-group-btn,
            .notika-tl-btn {
                margin-right: 10px;
            }

            .notika-btn-cyan { background-color: #00bcd4 !important; color: #fff !important; }
            .notika-btn-teal { background-color: #009688 !important; color: #fff !important; }
            .notika-btn-amber { background-color: #ffc107 !important; color: #fff !important; }
            .notika-btn-orange { background-color: #ff9800 !important; color: #fff !important; }
            .notika-btn-deeporange { background-color: #ff5722 !important; color: #fff !important; }
            .notika-btn-red { background-color: #f44336 !important; color: #fff !important; }
            .notika-btn-pink { background-color: #e91e63 !important; color: #fff !important; }
            .notika-btn-lightblue { background-color: #03a9f4 !important; color: #fff !important; }
            .notika-btn-blue { background-color: #2196f3 !important; color: #fff !important; }
            .notika-btn-indigo { background-color: #3f51b5 !important; color: #fff !important; }
            .notika-btn-lime { background-color: #cddc39 !important; color: #333 !important; }
            .notika-btn-lightgreen { background-color: #8bc34a !important; color: #fff !important; }
            .notika-btn-green { background-color: #4caf50 !important; color: #fff !important; }
            .notika-btn-purple { background-color: #9c27b0 !important; color: #fff !important; }
            .notika-btn-deeppurple { background-color: #673ab7 !important; color: #fff !important; }
            .notika-btn-gray { background-color: #9e9e9e !important; color: #fff !important; }
            .notika-btn-bluegray { background-color: #607d8b !important; color: #fff !important; }
            .notika-btn-black { background-color: #000000 !important; color: #fff !important; }

            .btn-teal { background-color: #009688 !important; color: #fff !important; }
            .btn-orange { background-color: #ff9800 !important; color: #fff !important; }
            .btn-cyan { background-color: #00bcd4 !important; color: #fff !important; }
            .btn-lightgreen { background-color: #8bc34a !important; color: #fff !important; }
            .btn-lime { background-color: #cddc39 !important; color: #333 !important; }
            .btn-amber { background-color: #ffc107 !important; color: #fff !important; }
            .btn-gray { background-color: #9e9e9e !important; color: #fff !important; }
            .btn-lightblue { background-color: #03a9f4 !important; color: #fff !important; }
            .btn-deeporange { background-color: #ff5722 !important; color: #fff !important; }

            .primary-icon-notika { background-color: #337ab7 !important; border-color: #2e6da4 !important; }
            .info-icon-notika { background-color: #5bc0de !important; border-color: #46b8da !important; }
            .success-icon-notika { background-color: #5cb85c !important; border-color: #4cae4c !important; }
            .warning-icon-notika { background-color: #f0ad4e !important; border-color: #eea236 !important; }
            .danger-icon-notika { background-color: #d9534f !important; border-color: #d43f3a !important; }
            .teal-icon-notika { background-color: #009688 !important; border-color: #00897b !important; }
            .orange-icon-notika { background-color: #ff9800 !important; border-color: #fb8c00 !important; }
            .cyan-icon-notika { background-color: #00bcd4 !important; border-color: #00acc1 !important; }
            .lightgreen-icon-notika { background-color: #8bc34a !important; border-color: #7cb342 !important; }
            .lime-icon-notika { background-color: #cddc39 !important; border-color: #c0ca33 !important; }
            .amber-icon-notika { background-color: #ffc107 !important; border-color: #ffb300 !important; }
            .gray-icon-notika { background-color: #9e9e9e !important; border-color: #8e8e8e !important; }
            .lightblue-icon-notika { background-color: #03a9f4 !important; border-color: #039be5 !important; }
            .deeporange-icon-notika { background-color: #ff5722 !important; border-color: #f4511e !important; }
        `
        document.head.appendChild(style)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.buttonsPage = new ButtonsPage()
})