/**
 * Modern Notika Template - Vite 7.1.5 Entry Point
 * PROPER ES6 modules with bundling - NO MORE LINE BY LINE INCLUDES!
 */

// Import ALL styles through Vite bundling
import 'bootstrap/dist/css/bootstrap.min.css'
import 'aos/dist/aos.css'
import 'leaflet/dist/leaflet.css'

// Note: Notika template CSS files are loaded via <link> tags in HTML head for better compatibility

// Font Awesome 7.2 - Tree-shakable approach (only icons we use)
import { library, dom } from '@fortawesome/fontawesome-svg-core'
import {
  faHouse,
  faMagnifyingGlass,
  faEnvelope,
  faBell,
  faMessage,
  faBars,
  faPenToSquare,
  faChartColumn,
  faTable,
  faFileLines,
  faCube,
  faHeadset,
  faGear,
  faBolt,
  faArrowRotateRight,
  faPalette,
  faChartLine,
  faFontAwesome,
  faUsers,
  faGlobe,
  faListCheck,
  faArchive,
  faClock,
  faPlus,
  faTrashCan,
  faComments,
  faPaperPlane,
  faMicrochip,
  faMemory,
  faHdd,
  faWifi,
  faMousePointer,
  faArrowTrendUp,
  faArrowTrendDown,
  faShieldHalved,
  faChevronDown,
  faArrowRight,
  faCircleCheck,
  faArrowLeft,
  faCalendar,
  faCheck,
  faXmark,
  faCloud,
  faCreditCard,
  faDollarSign,
  faCircle,
  faFilePen,
  faEye,
  faFile,
  faChartPie,
  faFlag,
  faLocationDot,
  faChevronLeft,
  faMap,
  faMinus,
  faEllipsis,
  faChevronRight,
  faAnglesRight,
  faPaperclip,
  faPhone,
  faImage,
  faPrint,
  faTag,
  faArrowsRotate,
  faShareNodes,
  faStar,
  faFileInvoiceDollar,
  faPlane,
  faChevronUp,
  faTableColumns,
  faAngleLeft,
  faAngleRight,
  faAnglesLeft,
  faSort,
  faSortUp,
  faSortDown,
  faFolderOpen,
  faIdCard,
  faCircleInfo,
  faHeading,
  faTriangleExclamation,
  faCodeBranch,
  faThumbsUp,
  faBan,
  faKeyboard,
  faHandPeace,
  faUser,
  faLink,
  faArrowRightFromBracket,
  faArrowRightToBracket,
  faBoxArchive,
  faCropSimple,
  faMagnifyingGlassPlus,
  faMagnifyingGlassMinus,
  faRotateLeft,
  faRotateRight,
  faLeftRight,
  faUpDown,
  faArrowRotateLeft,
  faExpand,
  faSquare,
  faCloudArrowUp,
  faDownload,
  faDisplay,
  faLock,
  faEyeSlash,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons'
// Brand icons removed - none currently used in HTML
// Import individual brand icons here when needed:
// import { faGithub } from '@fortawesome/free-brands-svg-icons'

// Add all icons to the library
library.add(
  faHouse, faMagnifyingGlass, faEnvelope, faBell, faMessage, faBars,
  faPenToSquare, faChartColumn, faTable, faFileLines, faCube, faHeadset,
  faGear, faBolt, faArrowRotateRight, faPalette, faChartLine, faFontAwesome,
  faUsers, faGlobe, faListCheck, faArchive, faClock, faPlus, faTrashCan,
  faComments, faPaperPlane, faMicrochip, faMemory, faHdd, faWifi,
  faMousePointer, faArrowTrendUp, faArrowTrendDown, faShieldHalved,
  faChevronDown, faArrowRight, faCircleCheck, faArrowLeft, faCalendar,
  faCheck, faXmark, faCloud, faCreditCard, faDollarSign, faCircle,
  faFilePen, faEye, faFile, faChartPie, faFlag, faLocationDot,
  faChevronLeft, faMap, faMinus, faEllipsis, faChevronRight, faAnglesRight,
  faPaperclip, faPhone, faImage, faPrint, faTag, faArrowsRotate,
  faShareNodes, faStar, faFileInvoiceDollar, faPlane, faChevronUp,
  faTableColumns, faAngleLeft, faAngleRight, faAnglesLeft, faSort,
  faSortUp, faSortDown, faFolderOpen, faIdCard,
  faCircleInfo, faHeading, faTriangleExclamation, faCodeBranch,
  faThumbsUp, faBan, faKeyboard, faHandPeace,
  faUser, faLink, faArrowRightFromBracket, faArrowRightToBracket, faBoxArchive,
  faCropSimple, faMagnifyingGlassPlus, faMagnifyingGlassMinus,
  faRotateLeft, faRotateRight, faLeftRight, faUpDown, faArrowRotateLeft,
  faExpand, faSquare, faCloudArrowUp, faDownload, faDisplay, faLock, faEyeSlash, faUserPlus
)

// Replace any <i> tags with SVG automatically
dom.watch()

// Import ALL original Notika CSS files through Vite (in order from HTML)
import '../../css/swiper.min.css'
import '../css/dashboard-widgets.css'
import '../../css/wave/waves.min.css'
import '../../style.css'
import '../../css/responsive.css'
import '../../css/header-modern-clean.css'
import '../../css/navbar-stable.css'
import '../../css/widgets-consistent.css'
import '../../css/email-widget-fix.css'
import '../../css/mobile-menu.css'

// Import Google Fonts and Font Awesome via CDN (already in HTML)
// Import custom modern SCSS
import '../css/modern.scss'

// Import ALL JavaScript through Vite bundling
import { Chart, registerables } from 'chart.js'
import * as bootstrap from 'bootstrap'
import AOS from 'aos'
import L from 'leaflet'

// Register Chart.js components
Chart.register(...registerables)

// Make Bootstrap globally available
window.bootstrap = bootstrap

/**
 * Modern Notika Application Class - Pure Vite 7.1.5 Architecture
 */
class NotikaApp {
  constructor() {
    this.isViteBundled = true
    this.version = '2.0.0'
    this.buildTool = 'Vite 7.1.5'
    
    console.log('🚀 Initializing Notika with Vite 7.1.5 bundling...')
    this.init()
  }
  
  async init() {
    try {
      // Show we're using PROPER Vite bundling
      console.log('✅ All dependencies bundled by Vite 7.1.5')
      console.log('✅ Bootstrap 5.3.8 imported as module')
      console.log('✅ Chart.js 4.5.0 imported as module')
      console.log('✅ All CSS processed by Vite')

      // Initialize modern libraries properly
      this.initializeCharts()
      this.initializeUI()
      this.initializeAnimations()
      this.setupModernFeatures()
      this.preventMobileMenuOnDesktop()

      // Update bundle status in demo
      const bundleStatus = document.getElementById('bundle-status')
      if (bundleStatus) {
        bundleStatus.textContent = '✅ Properly bundled by Vite 7.1.5'
        bundleStatus.style.color = '#00c292'
      }

      console.log('🎉 Notika Template fully modernized with Font Awesome 7.2 (tree-shaken) + Vite bundling!')

    } catch (error) {
      console.error('❌ Initialization error:', error)
    }
  }
  
  initializeCharts() {
    // Initialize main sales chart (curved-line-chart)
    const curvedChart = document.getElementById('curved-line-chart')
    if (curvedChart) {
      const canvas = document.createElement('canvas')
      canvas.style.width = '100%'
      canvas.style.height = '300px'
      curvedChart.appendChild(canvas)
      
      const ctx = canvas.getContext('2d')
      const gradient = ctx.createLinearGradient(0, 0, 0, 300)
      gradient.addColorStop(0, 'rgba(0, 194, 146, 0.8)')
      gradient.addColorStop(1, 'rgba(0, 194, 146, 0.1)')
      
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          datasets: [{
            label: 'Sales Statistics',
            data: [30000, 35000, 28000, 45000, 42000, 55000, 48000, 52000, 60000, 58000, 65000, 70000],
            borderColor: '#00c292',
            backgroundColor: gradient,
            borderWidth: 3,
            fill: true,
            tension: 0.4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `Sales: $${context.parsed.y.toLocaleString()}`
              }
            }
          },
          scales: {
            y: {
              ticks: {
                callback: (value) => `$${(value / 1000)}K`
              }
            }
          }
        }
      })
    }

    // Initialize recent items chart
    const recentItemsChart = document.getElementById('recent-items-chart')
    if (recentItemsChart) {
      const canvas = document.createElement('canvas')
      canvas.style.width = '100%'
      canvas.style.height = '100px'
      recentItemsChart.appendChild(canvas)
      
      const ctx = canvas.getContext('2d')
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Galaxy', 'Huawei', 'HTC', 'Samsung', 'LG'],
          datasets: [{
            data: [921, 240, 400, 870, 790],
            backgroundColor: ['#00c292', '#03a9f3', '#ffc107', '#e91e63', '#9c27b0'],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: { 
            x: { display: false }, 
            y: { display: false } 
          }
        }
      })
    }
    
    // Initialize sparkline charts from original data
    this.initializeSparklines()
    
    // Initialize knob charts
    this.initializeKnobs()
  }

  initializeSparklines() {
    // Map sparkline classes to their data from original
    const sparklineData = {
      'sparkline-bar-stats1': [9,4,8,6,5,6,4,8,3,5,9,5],
      'sparkline-bar-stats2': [1,4,8,3,5,6,4,8,3,3,9,5],
      'sparkline-bar-stats3': [4,2,8,2,5,6,3,8,3,5,9,5],
      'sparkline-bar-stats4': [2,4,8,4,5,7,4,7,3,5,7,5],
      'stats-bar': [3,5,2,8,4,6,3,7],
      'stats-line': [2,4,3,7,5,8,6,9],
      'stats-bar-2': [4,3,6,2,7,5,8,4]
    }

    Object.keys(sparklineData).forEach(className => {
      const elements = document.querySelectorAll(`.${className}`)
      elements.forEach(element => {
        const canvas = document.createElement('canvas')
        canvas.style.width = '100%'
        canvas.style.height = '30px'
        element.appendChild(canvas)
        
        const ctx = canvas.getContext('2d')
        new Chart(ctx, {
          type: className.includes('line') ? 'line' : 'bar',
          data: {
            labels: sparklineData[className].map((_, i) => i),
            datasets: [{
              data: sparklineData[className],
              borderColor: '#00c292',
              backgroundColor: className.includes('line') ? 'transparent' : 'rgba(0, 194, 146, 0.7)',
              borderWidth: 2,
              fill: false,
              tension: 0.4,
              pointRadius: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } }
          }
        })
      })
    })
  }

  initializeKnobs() {
    const knobs = document.querySelectorAll('.knob')
    knobs.forEach(knob => {
      const value = knob.dataset.rel
      const width = knob.dataset.width || '90'
      const fgColor = knob.dataset.fgcolor || '#00c292'
      const bgColor = knob.dataset.bgcolor || '#E4E4E4'
      
      // Create a simple circular progress indicator
      const canvas = document.createElement('canvas')
      canvas.width = parseInt(width)
      canvas.height = parseInt(width)
      canvas.style.width = width + 'px'
      canvas.style.height = width + 'px'
      
      const ctx = canvas.getContext('2d')
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const radius = (canvas.width / 2) - 10
      
      // Background circle
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      ctx.strokeStyle = bgColor
      ctx.lineWidth = 8
      ctx.stroke()
      
      // Progress arc
      const progress = (value / 100) * 2 * Math.PI
      ctx.beginPath()
      ctx.arc(centerX, centerY, radius, -Math.PI / 2, -Math.PI / 2 + progress)
      ctx.strokeStyle = fgColor
      ctx.lineWidth = 8
      ctx.stroke()
      
      // Add percentage text
      ctx.fillStyle = fgColor
      ctx.font = `${width / 6}px Arial`
      ctx.textAlign = 'center'
      ctx.fillText(`${value}%`, centerX, centerY + 5)
      
      knob.parentNode.insertBefore(canvas, knob)
      knob.style.display = 'none'
    })
  }
  
  initializeUI() {
    // Initialize Bootstrap 5.3.8 components (Vite bundled)
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    tooltipTriggerList.forEach(tooltipTriggerEl => {
      new bootstrap.Tooltip(tooltipTriggerEl)
    })
    
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    popoverTriggerList.forEach(popoverTriggerEl => {
      new bootstrap.Popover(popoverTriggerEl)
    })
    
    // Initialize counter animations
    this.initializeCounters()
    
    // Initialize Todo functionality
    this.initializeTodo()
    
    // Initialize Chat functionality
    this.initializeChat()
    
    // Initialize World Map
    this.initializeWorldMap()
    
    // Initialize Server Statistics
    this.initializeServerStats()
    
    // Initialize User Activity Chart
    this.initializeUserActivity()
    
    console.log('✅ Bootstrap 5.3.8 components initialized via Vite bundling')
  }

  initializeTodo() {
    const todoList = document.getElementById('todo-list')
    const todoInput = document.getElementById('todo-input-text')
    const todoSubmit = document.getElementById('todo-btn-submit')
    const todoRemaining = document.getElementById('todo-remaining')
    const todoTotal = document.getElementById('todo-total')
    const archiveBtn = document.getElementById('btn-archive')

    if (!todoList || !todoInput || !todoSubmit) return

    let todos = []
    let todoId = 1

    const updateTodoCount = () => {
      const activeTodos = todos.filter(todo => !todo.completed).length
      const totalTodos = todos.length
      const completedTodos = totalTodos - activeTodos
      const progressPercentage = totalTodos > 0 ? (completedTodos / totalTodos) * 100 : 0
      
      if (todoRemaining) todoRemaining.textContent = activeTodos
      if (todoTotal) todoTotal.textContent = totalTodos
      
      // Update progress bar
      const progressBar = document.getElementById('todo-progress')
      if (progressBar) {
        progressBar.style.width = `${progressPercentage}%`
        progressBar.setAttribute('aria-valuenow', progressPercentage)
      }
    }

    const renderTodos = () => {
      todoList.innerHTML = ''
      todos.forEach(todo => {
        const li = document.createElement('li')
        li.className = `list-group-item d-flex align-items-center border-0 px-0 py-2 ${todo.completed ? 'text-muted' : ''}`
        li.innerHTML = `
          <div class="form-check me-2">
            <input class="form-check-input" type="checkbox" ${todo.completed ? 'checked' : ''} data-id="${todo.id}" id="todo-${todo.id}">
          </div>
          <span class="flex-grow-1 small ${todo.completed ? 'text-decoration-line-through' : ''}">${todo.text}</span>
          <button class="btn btn-sm btn-outline-danger border-0 todo-delete" data-id="${todo.id}" title="Delete todo">
            <i class="fa-solid fa-trash-can"></i>
          </button>
        `
        todoList.appendChild(li)
      })
      updateTodoCount()
    }

    const addTodo = (text) => {
      todos.push({ id: todoId++, text: text.trim(), completed: false })
      renderTodos()
    }

    todoSubmit.addEventListener('click', () => {
      const text = todoInput.value.trim()
      if (text) {
        addTodo(text)
        todoInput.value = ''
      }
    })

    todoInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        todoSubmit.click()
      }
    })

    todoList.addEventListener('change', (e) => {
      if (e.target.type === 'checkbox') {
        const id = parseInt(e.target.dataset.id)
        const todo = todos.find(t => t.id === id)
        if (todo) {
          todo.completed = e.target.checked
          renderTodos()
        }
      }
    })

    todoList.addEventListener('click', (e) => {
      if (e.target.classList.contains('todo-delete')) {
        const id = parseInt(e.target.dataset.id)
        todos = todos.filter(t => t.id !== id)
        renderTodos()
      }
    })

    if (archiveBtn) {
      archiveBtn.addEventListener('click', (e) => {
        e.preventDefault()
        todos = todos.filter(t => !t.completed)
        renderTodos()
      })
    }

    // Add some default todos to populate the widget
    addTodo('Review quarterly reports')
    addTodo('Update user documentation')
    addTodo('Test new features')
    addTodo('Deploy system updates')
    addTodo('Analyze performance metrics')
    addTodo('Schedule team meeting')
    addTodo('Backup database')
    addTodo('Review security logs')
  }

  initializeChat() {
    const chatInput = document.querySelector('.chat-input')
    const chatSendBtn = document.querySelector('.notika-chat-btn')
    const conversationList = document.querySelector('.conversation-list')

    if (!chatInput || !chatSendBtn || !conversationList) return

    const addMessage = (message, isUser = true) => {
      const li = document.createElement('div')
      li.className = `d-flex mb-3 ${isUser ? 'justify-content-end' : ''}`
      
      const now = new Date()
      const timeStr = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`
      
      if (isUser) {
        li.innerHTML = `
          <div class="me-2 text-end">
            <div class="d-flex align-items-baseline justify-content-end mb-1">
              <span class="text-muted small me-2">${timeStr}</span>
              <span class="fw-medium small">You</span>
            </div>
            <div class="bg-primary text-white p-2 rounded">
              <p class="mb-0 small">${message}</p>
            </div>
          </div>
          <img src="/post/2.jpg" alt="You" class="rounded-circle" style="width: 35px; height: 35px; object-fit: cover;">
        `
      } else {
        li.innerHTML = `
          <img src="/post/1.jpg" alt="Assistant" class="rounded-circle me-2" style="width: 35px; height: 35px; object-fit: cover;">
          <div class="flex-grow-1">
            <div class="d-flex align-items-baseline mb-1">
              <span class="fw-medium small me-2">Assistant</span>
              <span class="text-muted small">${timeStr}</span>
            </div>
            <div class="bg-light p-2 rounded">
              <p class="mb-0 small">${message}</p>
            </div>
          </div>
        `
      }
      
      conversationList.appendChild(li)
      
      // Scroll to bottom
      const scrollContainer = document.getElementById('chat-messages')
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight
      }
    }

    const sendMessage = () => {
      const message = chatInput.value.trim()
      if (message) {
        addMessage(message, true)
        chatInput.value = ''
        
        // Simulate response
        setTimeout(() => {
          const responses = [
            'Thanks for your message!',
            'I understand what you mean.',
            'That sounds great!',
            'Let me help you with that.',
            'Interesting point of view.'
          ]
          const randomResponse = responses[Math.floor(Math.random() * responses.length)]
          addMessage(randomResponse, false)
        }, 1000)
      }
    }

    chatSendBtn.addEventListener('click', sendMessage)
    chatInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage()
      }
    })
    
    console.log('✅ Chat widget initialized with interactive functionality')
  }

  initializeWorldMap() {
    const worldMap = document.getElementById('world-map')
    if (!worldMap) return

    // Clear any existing content
    worldMap.innerHTML = ''
    
    // Initialize Leaflet map
    const map = L.map(worldMap, {
      center: [20, 0], // Center of world
      zoom: 2,
      zoomControl: false, // Disable zoom controls for dashboard
      scrollWheelZoom: false, // Disable scroll zoom for better UX
      doubleClickZoom: false,
      dragging: true, // Allow dragging
      attributionControl: false // Remove attribution for cleaner look
    })

    // Add tile layer - using free OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: false // Remove attribution for dashboard
    }).addTo(map)

    // Visitor data for major regions/cities
    const visitorData = [
      { name: 'New York, USA', coords: [40.7128, -74.0060], visitors: 125420, country: 'US' },
      { name: 'London, UK', coords: [51.5074, -0.1278], visitors: 89340, country: 'GB' },
      { name: 'Tokyo, Japan', coords: [35.6762, 139.6503], visitors: 87230, country: 'JP' },
      { name: 'Beijing, China', coords: [39.9042, 116.4074], visitors: 234560, country: 'CN' },
      { name: 'Mumbai, India', coords: [19.0760, 72.8777], visitors: 198760, country: 'IN' },
      { name: 'Berlin, Germany', coords: [52.5200, 13.4050], visitors: 76540, country: 'DE' },
      { name: 'São Paulo, Brazil', coords: [-23.5558, -46.6396], visitors: 67890, country: 'BR' },
      { name: 'Toronto, Canada', coords: [43.6532, -79.3832], visitors: 45230, country: 'CA' },
      { name: 'Sydney, Australia', coords: [-33.8688, 151.2093], visitors: 43210, country: 'AU' },
      { name: 'Moscow, Russia', coords: [55.7558, 37.6176], visitors: 56780, country: 'RU' },
      { name: 'Paris, France', coords: [48.8566, 2.3522], visitors: 92150, country: 'FR' },
      { name: 'Dubai, UAE', coords: [25.2048, 55.2708], visitors: 78900, country: 'AE' }
    ]

    // Create custom icon for visitor markers
    const visitorIcon = L.divIcon({
      className: 'visitor-marker',
      html: '<div class="visitor-dot"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    })

    // Add CSS for custom markers
    const mapStyles = `
      .visitor-marker {
        background: none;
        border: none;
      }
      .visitor-dot {
        width: 12px;
        height: 12px;
        background: #00c292;
        border-radius: 50%;
        border: 2px solid rgba(255,255,255,0.8);
        animation: pulse-marker 2s infinite;
        box-shadow: 0 0 0 0 rgba(0, 194, 146, 0.7);
      }
      @keyframes pulse-marker {
        0% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(0, 194, 146, 0.7);
        }
        70% {
          transform: scale(1.1);
          box-shadow: 0 0 0 10px rgba(0, 194, 146, 0);
        }
        100% {
          transform: scale(1);
          box-shadow: 0 0 0 0 rgba(0, 194, 146, 0);
        }
      }
      .leaflet-popup-content-wrapper {
        background: rgba(0, 0, 0, 0.85);
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      }
      .leaflet-popup-content {
        margin: 12px 16px;
        font-size: 13px;
        line-height: 1.4;
      }
      .leaflet-popup-tip {
        background: rgba(0, 0, 0, 0.85);
      }
      #world-map .leaflet-container {
        border-radius: 8px;
      }
    `

    // Add styles to document
    if (!document.querySelector('#map-styles')) {
      const styleSheet = document.createElement('style')
      styleSheet.id = 'map-styles'
      styleSheet.textContent = mapStyles
      document.head.appendChild(styleSheet)
    }

    // Add visitor markers to map
    visitorData.forEach(location => {
      const marker = L.marker(location.coords, { 
        icon: visitorIcon 
      }).addTo(map)

      // Create popup with visitor data
      const popupContent = `
        <div style="text-align: center;">
          <strong style="color: #00c292; font-size: 14px;">${location.name}</strong><br>
          <div style="margin: 8px 0;">
            <i class="fa-solid fa-users" style="color: #4ecdc4;"></i>
            <strong>${location.visitors.toLocaleString()}</strong> visitors
          </div>
          <small style="color: #ccc;">Real-time data</small>
        </div>
      `

      marker.bindPopup(popupContent, {
        closeButton: false,
        offset: [0, -10]
      })

      // Add hover effects
      marker.on('mouseover', function() {
        this.openPopup()
      })
      
      marker.on('mouseout', function() {
        this.closePopup()
      })
    })

    // Add a subtle animation for new visitors
    const simulateNewVisitors = () => {
      const randomLocation = visitorData[Math.floor(Math.random() * visitorData.length)]
      
      // Create temporary pulsing effect
      const tempMarker = L.circleMarker(randomLocation.coords, {
        radius: 8,
        fillColor: '#00ff88',
        color: '#00ff88',
        weight: 2,
        opacity: 0.8,
        fillOpacity: 0.4
      }).addTo(map)

      // Animate the temporary marker
      let scale = 1
      const animateMarker = () => {
        scale += 0.1
        if (scale <= 3) {
          tempMarker.setRadius(8 * scale)
          tempMarker.setStyle({ 
            opacity: 0.8 - (scale * 0.25),
            fillOpacity: 0.4 - (scale * 0.12)
          })
          setTimeout(animateMarker, 100)
        } else {
          map.removeLayer(tempMarker)
        }
      }
      
      setTimeout(animateMarker, 100)
    }

    // Simulate new visitors every 3 seconds
    setInterval(simulateNewVisitors, 3000)

    // Fit map to show all markers with padding
    if (visitorData.length > 0) {
      const group = new L.featureGroup(map._layers)
      if (Object.keys(group._layers).length > 0) {
        setTimeout(() => {
          map.fitBounds(group.getBounds().pad(0.1))
        }, 500)
      }
    }

    console.log('✅ Real Leaflet world map initialized with', visitorData.length, 'visitor locations')
  }

  initializeServerStats() {
    // Initialize server performance charts
    const serverStatsData = {
      'stats-cpu-line': { type: 'line', data: [65, 70, 68, 78, 75, 82, 78, 80], color: '#ff6b6b' },
      'stats-memory-bar': { type: 'bar', data: [30, 35, 40, 45, 42, 48, 45, 47], color: '#4ecdc4' },
      'stats-bandwidth-area': { type: 'area', data: [1.8, 2.1, 2.4, 2.2, 2.6, 2.3, 2.4, 2.5], color: '#45b7d1' }
    }

    Object.keys(serverStatsData).forEach(className => {
      const elements = document.querySelectorAll(`.${className}`)
      elements.forEach(element => {
        const canvas = document.createElement('canvas')
        canvas.style.width = '100%'
        canvas.style.height = '40px'
        element.appendChild(canvas)
        
        const ctx = canvas.getContext('2d')
        const config = serverStatsData[className]
        
        new Chart(ctx, {
          type: config.type === 'area' ? 'line' : config.type,
          data: {
            labels: config.data.map((_, i) => i),
            datasets: [{
              data: config.data,
              borderColor: config.color,
              backgroundColor: config.type === 'area' ? `${config.color}40` : config.color,
              borderWidth: 2,
              fill: config.type === 'area',
              tension: 0.4,
              pointRadius: 0
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } }
          }
        })
      })
    })

    console.log('✅ Server performance charts initialized')
  }

  initializeUserActivity() {
    const userActivityChart = document.getElementById('user-activity-chart')
    if (!userActivityChart) return

    const canvas = document.createElement('canvas')
    canvas.style.width = '100%'
    canvas.style.height = '250px'
    userActivityChart.appendChild(canvas)
    
    const ctx = canvas.getContext('2d')
    
    // Create a more logical activity timeline chart showing user activity over the last 7 days
    const last7Days = []
    const today = new Date()
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      last7Days.push(date.toLocaleDateString('en-US', { weekday: 'short' }))
    }
    
    const gradient1 = ctx.createLinearGradient(0, 0, 0, 200)
    gradient1.addColorStop(0, 'rgba(0, 194, 146, 0.8)')
    gradient1.addColorStop(1, 'rgba(0, 194, 146, 0.1)')
    
    const gradient2 = ctx.createLinearGradient(0, 0, 0, 200)
    gradient2.addColorStop(0, 'rgba(3, 169, 243, 0.8)')
    gradient2.addColorStop(1, 'rgba(3, 169, 243, 0.1)')
    
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: last7Days,
        datasets: [
          {
            label: 'Active Users',
            data: [8420, 9340, 11230, 12450, 10890, 13120, 12450],
            borderColor: '#00c292',
            backgroundColor: gradient1,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#00c292',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5
          },
          {
            label: 'Page Views',
            data: [6200, 7100, 8760, 9200, 8340, 9850, 8760],
            borderColor: '#03a9f3',
            backgroundColor: gradient2,
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#03a9f3',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 5
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          intersect: false,
          mode: 'index'
        },
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              usePointStyle: true,
              padding: 15,
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(0,0,0,0.8)',
            titleColor: '#fff',
            bodyColor: '#fff',
            borderColor: '#00c292',
            borderWidth: 1,
            callbacks: {
              label: (context) => {
                const label = context.dataset.label
                const value = context.parsed.y.toLocaleString()
                return ` ${label}: ${value}`
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            border: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0,0,0,0.05)'
            },
            border: {
              display: false
            },
            ticks: {
              callback: (value) => {
                if (value >= 1000) {
                  return (value / 1000).toFixed(1) + 'K'
                }
                return value
              }
            }
          }
        }
      }
    })

    console.log('✅ User activity timeline chart initialized (7-day trend)')
  }
  
  initializeAnimations() {
    // Initialize AOS (bundled by Vite)
    AOS.init({
      duration: 800,
      easing: 'ease-in-out-cubic',
      once: true,
      offset: 100
    })
    
    console.log('✅ AOS animations initialized via Vite bundling')
  }
  
  initializeCounters() {
    const counters = document.querySelectorAll('.counter')
    
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target)
            observer.unobserve(entry.target)
          }
        })
      }, { threshold: 0.5 })
      
      counters.forEach(counter => observer.observe(counter))
    }
  }
  
  animateCounter(element) {
    const target = parseInt(element.dataset.count || element.textContent.replace(/,/g, ''))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0
    
    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        element.textContent = target.toLocaleString()
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current).toLocaleString()
      }
    }, 16)
  }
  
  setupModernFeatures() {
    // Search dropdown auto-focus
    const searchInput = document.querySelector('.search-dropdown input')
    if (searchInput) {
      const searchTrigger = searchInput.closest('.dropdown')?.querySelector('[data-bs-toggle="dropdown"]')
      if (searchTrigger) {
        searchTrigger.addEventListener('shown.bs.dropdown', () => {
          setTimeout(() => searchInput.focus(), 100)
        })
      }
    }

    // Navbar dropdown click feedback
    document.querySelectorAll('.notika-navbar .dropdown-toggle').forEach(toggle => {
      toggle.addEventListener('click', function (e) {
        e.preventDefault()
        this.style.transform = 'scale(0.98)'
        setTimeout(() => { this.style.transform = '' }, 100)
      })
    })

    // Remove webkit scrollbar CSS rules to restore native scrollbars
    this.removeAllScrollbarRules()
  }

  
  removeAllScrollbarRules() {
    // Remove all ::-webkit-scrollbar related CSS rules from all stylesheets
    const stylesheets = document.styleSheets
    
    for (let i = 0; i < stylesheets.length; i++) {
      const stylesheet = stylesheets[i]
      try {
        const rules = stylesheet.cssRules || stylesheet.rules
        if (rules) {
          // Go backwards to avoid index issues when deleting
          for (let j = rules.length - 1; j >= 0; j--) {
            const rule = rules[j]
            if (rule.selectorText && (
              rule.selectorText.includes('::-webkit-scrollbar') ||
              rule.selectorText.includes('scrollbar') && rule.style && rule.style.display === 'none'
            )) {
              try {
                stylesheet.deleteRule(j)
              } catch (e) {
                // Ignore CORS errors for external stylesheets
              }
            }
          }
        }
      } catch (e) {
        // Ignore CORS errors for external stylesheets
        console.log('Skipped external stylesheet (CORS)')
      }
    }
    
    // Force redraw of scrollable elements
    const scrollableElements = document.querySelectorAll('[style*="overflow"], .chat-messages, #todo-list, .recent-post-items')
    scrollableElements.forEach(el => {
      const originalOverflow = el.style.overflow
      el.style.overflow = 'hidden'
      el.offsetHeight // Force reflow
      el.style.overflow = originalOverflow || 'auto'
    })
    
    console.log('✅ All webkit scrollbar CSS rules removed - native scrollbars restored')
  }
  
  preventMobileMenuOnDesktop() {
    // Prevent mobile offcanvas menu from opening on desktop
    const offcanvasElement = document.getElementById('mobileNavOffcanvas')
    if (!offcanvasElement) return

    // Check if we're on desktop (Bootstrap's large breakpoint is 992px)
    const isDesktop = () => window.innerWidth >= 992

    // Get the offcanvas Bootstrap instance
    const offcanvas = bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement)

    // Prevent opening on desktop
    offcanvasElement.addEventListener('show.bs.offcanvas', (e) => {
      if (isDesktop()) {
        e.preventDefault()
        e.stopPropagation()
        return false
      }
    })

    // Close offcanvas when resizing from mobile to desktop
    const handleResize = () => {
      if (isDesktop() && offcanvasElement.classList.contains('show')) {
        offcanvas.hide()
      }
    }

    window.addEventListener('resize', handleResize)

    // Fix collapse animation flash issue
    this.fixMobileMenuCollapseFlash()
  }

  fixMobileMenuCollapseFlash() {
    // Simple fade animation without height resizing
    const offcanvasElement = document.getElementById('mobileNavOffcanvas')
    if (!offcanvasElement) return

    // Get all collapse elements in the mobile menu
    const collapseElements = offcanvasElement.querySelectorAll('.collapse')

    collapseElements.forEach(element => {
      // Disable Bootstrap's default height animation
      element.style.transition = 'none'

      // Use simple show/hide with fade
      element.addEventListener('show.bs.collapse', function(e) {
        e.preventDefault()
        this.style.display = 'block'
        this.classList.add('show')

        // Force reflow to trigger CSS animation
        void this.offsetWidth
      })

      element.addEventListener('hide.bs.collapse', function(e) {
        e.preventDefault()
        this.classList.remove('show')

        // Hide after fade completes
        setTimeout(() => {
          if (!this.classList.contains('show')) {
            this.style.display = 'none'
          }
        }, 150)
      })
    })
  }
}

// Initialize when DOM is ready - ONLY if no page-specific module will handle initialization
// Check if we're being used directly (via script tag) or imported by a page module
if (!document.documentElement.hasAttribute('data-page-module')) {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      window.Notika = new NotikaApp()
    })
  } else {
    window.Notika = new NotikaApp()
  }
}

// Log that we're properly using Vite bundling
console.log('🔥 VITE 7.1.5 BUNDLING ACTIVE - All modules imported properly!')

// Export for module use
export { NotikaApp }