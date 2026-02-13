/**
 * Data Table Page - Modern Vite Implementation
 */

import { NotikaApp } from '../main.js'
import { NotikaUI } from '../modules/ui.js'

class DataTablePage extends NotikaApp {
  constructor() {
    super()
    this.pageType = 'DATA_TABLE'
    this.ui = new NotikaUI()

    // Data table state
    this.data = []
    this.filteredData = []
    this.currentPage = 1
    this.entriesPerPage = 10
    this.sortColumn = null
    this.sortOrder = 'asc'

    console.log('🚀 Data Table page initializing...')
  }

  async init() {
    await super.init()
    await this.ui.init()

    // Ensure native scrollbars are restored
    this.removeAllScrollbarRules()

    this.loadSampleData()
    this.initializeControls()
    this.initializeSorting()
    this.renderTable()

    console.log('✅ Data Table functionality ready')
  }

  loadSampleData() {
    // Sample employee data
    this.data = [
      { name: 'Tiger Nixon', position: 'System Architect', office: 'Edinburgh', age: 61, date: '2011/04/25', salary: '$320,800' },
      { name: 'Garrett Winters', position: 'Accountant', office: 'Tokyo', age: 63, date: '2011/07/25', salary: '$170,750' },
      { name: 'Ashton Cox', position: 'Junior Technical Author', office: 'San Francisco', age: 66, date: '2009/01/12', salary: '$86,000' },
      { name: 'Cedric Kelly', position: 'Senior Javascript Developer', office: 'Edinburgh', age: 22, date: '2012/03/29', salary: '$433,060' },
      { name: 'Airi Satou', position: 'Accountant', office: 'Tokyo', age: 33, date: '2008/11/28', salary: '$162,700' },
      { name: 'Brielle Williamson', position: 'Integration Specialist', office: 'New York', age: 61, date: '2012/12/02', salary: '$372,000' },
      { name: 'Herrod Chandler', position: 'Sales Assistant', office: 'San Francisco', age: 59, date: '2012/08/06', salary: '$137,500' },
      { name: 'Rhona Davidson', position: 'Integration Specialist', office: 'Tokyo', age: 55, date: '2010/10/14', salary: '$327,900' },
      { name: 'Colleen Hurst', position: 'Javascript Developer', office: 'San Francisco', age: 39, date: '2009/09/15', salary: '$205,500' },
      { name: 'Sonya Frost', position: 'Software Engineer', office: 'Edinburgh', age: 23, date: '2008/12/13', salary: '$103,600' },
      { name: 'Jena Gaines', position: 'Office Manager', office: 'London', age: 30, date: '2008/12/19', salary: '$90,560' },
      { name: 'Quinn Flynn', position: 'Support Lead', office: 'Edinburgh', age: 22, date: '2013/03/03', salary: '$342,000' },
      { name: 'Charde Marshall', position: 'Regional Director', office: 'San Francisco', age: 36, date: '2008/10/16', salary: '$470,600' },
      { name: 'Haley Kennedy', position: 'Senior Marketing Designer', office: 'London', age: 43, date: '2012/12/18', salary: '$313,500' },
      { name: 'Tatyana Fitzpatrick', position: 'Regional Director', office: 'London', age: 19, date: '2010/03/17', salary: '$385,750' },
      { name: 'Michael Silva', position: 'Marketing Designer', office: 'London', age: 66, date: '2012/11/27', salary: '$198,500' },
      { name: 'Paul Byrd', position: 'Chief Financial Officer', office: 'New York', age: 64, date: '2010/06/09', salary: '$725,000' },
      { name: 'Gloria Little', position: 'Systems Administrator', office: 'New York', age: 59, date: '2009/04/10', salary: '$237,500' },
      { name: 'Bradley Greer', position: 'Software Engineer', office: 'London', age: 41, date: '2012/10/13', salary: '$132,000' },
      { name: 'Dai Rios', position: 'Personnel Lead', office: 'Edinburgh', age: 35, date: '2012/09/26', salary: '$217,500' },
      { name: 'Jenette Caldwell', position: 'Development Lead', office: 'New York', age: 30, date: '2011/09/03', salary: '$345,000' },
      { name: 'Yuri Berry', position: 'Chief Marketing Officer', office: 'New York', age: 40, date: '2009/06/25', salary: '$675,000' },
      { name: 'Caesar Vance', position: 'Pre-Sales Support', office: 'New York', age: 21, date: '2011/12/12', salary: '$106,450' },
      { name: 'Doris Wilder', position: 'Sales Assistant', office: 'Sidney', age: 23, date: '2010/09/20', salary: '$85,600' },
      { name: 'Angelica Ramos', position: 'Chief Executive Officer', office: 'London', age: 47, date: '2009/10/09', salary: '$1,200,000' },
      { name: 'Gavin Joyce', position: 'Developer', office: 'Edinburgh', age: 42, date: '2010/12/22', salary: '$92,575' },
      { name: 'Jennifer Chang', position: 'Regional Director', office: 'Singapore', age: 28, date: '2010/11/14', salary: '$357,650' },
      { name: 'Brenden Wagner', position: 'Software Engineer', office: 'San Francisco', age: 28, date: '2011/06/07', salary: '$206,850' },
      { name: 'Fiona Green', position: 'Chief Operating Officer', office: 'San Francisco', age: 48, date: '2010/03/11', salary: '$850,000' },
      { name: 'Shou Itou', position: 'Regional Marketing', office: 'Tokyo', age: 20, date: '2011/08/14', salary: '$163,000' },
      { name: 'Michelle House', position: 'Integration Specialist', office: 'Sidney', age: 37, date: '2011/06/02', salary: '$95,400' },
      { name: 'Suki Burks', position: 'Developer', office: 'London', age: 53, date: '2009/10/22', salary: '$114,500' },
      { name: 'Prescott Bartlett', position: 'Technical Author', office: 'London', age: 27, date: '2011/05/07', salary: '$145,000' },
      { name: 'Gavin Cortez', position: 'Team Leader', office: 'San Francisco', age: 22, date: '2008/10/26', salary: '$235,500' },
      { name: 'Martena Mccray', position: 'Post-Sales support', office: 'Edinburgh', age: 46, date: '2011/03/09', salary: '$324,050' },
      { name: 'Unity Butler', position: 'Marketing Designer', office: 'San Francisco', age: 47, date: '2009/12/09', salary: '$85,675' },
      { name: 'Howard Hatfield', position: 'Office Manager', office: 'San Francisco', age: 51, date: '2008/12/16', salary: '$164,500' },
      { name: 'Hope Fuentes', position: 'Secretary', office: 'San Francisco', age: 41, date: '2010/02/12', salary: '$109,850' },
      { name: 'Vivian Harrell', position: 'Financial Controller', office: 'San Francisco', age: 62, date: '2009/02/14', salary: '$452,500' },
      { name: 'Timothy Mooney', position: 'Office Manager', office: 'London', age: 37, date: '2008/12/11', salary: '$136,200' },
      { name: 'Jackson Bradshaw', position: 'Director', office: 'New York', age: 65, date: '2008/09/26', salary: '$645,750' },
      { name: 'Olivia Liang', position: 'Support Engineer', office: 'Singapore', age: 64, date: '2011/02/03', salary: '$234,500' },
      { name: 'Bruno Nash', position: 'Software Engineer', office: 'London', age: 38, date: '2011/05/03', salary: '$163,500' },
      { name: 'Sakura Yamamoto', position: 'Support Engineer', office: 'Tokyo', age: 37, date: '2009/08/19', salary: '$139,575' },
      { name: 'Thor Walton', position: 'Developer', office: 'New York', age: 61, date: '2013/08/11', salary: '$98,540' },
      { name: 'Finn Camacho', position: 'Support Engineer', office: 'San Francisco', age: 47, date: '2009/07/07', salary: '$87,500' },
      { name: 'Serge Baldwin', position: 'Data Coordinator', office: 'Singapore', age: 64, date: '2012/04/09', salary: '$138,575' },
      { name: 'Zenaida Frank', position: 'Software Engineer', office: 'New York', age: 63, date: '2010/01/04', salary: '$125,250' },
      { name: 'Zorita Serrano', position: 'Software Engineer', office: 'San Francisco', age: 56, date: '2012/06/01', salary: '$115,000' },
      { name: 'Jennifer Acosta', position: 'Junior Javascript Developer', office: 'Edinburgh', age: 43, date: '2013/02/01', salary: '$75,650' },
      { name: 'Cara Stevens', position: 'Sales Assistant', office: 'New York', age: 46, date: '2011/12/06', salary: '$145,600' },
      { name: 'Hermione Butler', position: 'Regional Director', office: 'London', age: 47, date: '2011/03/21', salary: '$356,250' },
      { name: 'Lael Greer', position: 'Systems Administrator', office: 'London', age: 21, date: '2009/02/27', salary: '$103,500' },
      { name: 'Jonas Alexander', position: 'Developer', office: 'San Francisco', age: 30, date: '2010/07/14', salary: '$86,500' },
      { name: 'Shad Decker', position: 'Regional Director', office: 'Edinburgh', age: 51, date: '2008/11/13', salary: '$183,000' },
      { name: 'Michael Bruce', position: 'Javascript Developer', office: 'Singapore', age: 29, date: '2011/06/27', salary: '$183,000' },
      { name: 'Donna Snider', position: 'Customer Support', office: 'New York', age: 27, date: '2011/01/25', salary: '$112,000' }
    ]

    this.filteredData = [...this.data]
    console.log(`✅ Loaded ${this.data.length} employee records`)
  }

  initializeControls() {
    // Entries per page control
    const entriesSelect = document.getElementById('entriesPerPage')
    if (entriesSelect) {
      entriesSelect.addEventListener('change', (e) => {
        this.entriesPerPage = parseInt(e.target.value)
        this.currentPage = 1
        this.renderTable()
      })
    }

    // Search control
    const searchInput = document.getElementById('searchInput')
    if (searchInput) {
      let searchTimeout
      searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout)
        searchTimeout = setTimeout(() => {
          this.filterData(e.target.value)
        }, 300)
      })
    }

    console.log('✅ Table controls initialized')
  }

  initializeSorting() {
    const sortableHeaders = document.querySelectorAll('.sortable')
    sortableHeaders.forEach(header => {
      header.addEventListener('click', () => {
        const column = header.getAttribute('data-column')
        this.sortData(column)
      })
    })

    console.log('✅ Sorting functionality initialized')
  }

  filterData(searchTerm) {
    if (!searchTerm) {
      this.filteredData = [...this.data]
    } else {
      const term = searchTerm.toLowerCase()
      this.filteredData = this.data.filter(row => {
        return Object.values(row).some(value =>
          value.toString().toLowerCase().includes(term)
        )
      })
    }
    this.currentPage = 1
    this.renderTable()
  }

  sortData(column) {
    // Update sort icons
    document.querySelectorAll('.sortable i').forEach(icon => {
      icon.className = 'fa-solid fa-sort text-muted'
    })

    if (this.sortColumn === column) {
      this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      this.sortColumn = column
      this.sortOrder = 'asc'
    }

    // Update the icon for the current column
    const currentHeader = document.querySelector(`[data-column="${column}"] i`)
    if (currentHeader) {
      currentHeader.className = this.sortOrder === 'asc' ? 'fa-solid fa-sort-up text-primary' : 'fa-solid fa-sort-down text-primary'
    }

    // Sort the data
    this.filteredData.sort((a, b) => {
      let aValue = a[column]
      let bValue = b[column]

      // Handle numeric values
      if (column === 'age') {
        aValue = parseInt(aValue)
        bValue = parseInt(bValue)
      } else if (column === 'salary') {
        aValue = parseInt(aValue.replace(/[\$,]/g, ''))
        bValue = parseInt(bValue.replace(/[\$,]/g, ''))
      } else if (column === 'date') {
        aValue = new Date(aValue)
        bValue = new Date(bValue)
      }

      if (this.sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0
      }
    })

    this.renderTable()
  }

  renderTable() {
    const tbody = document.getElementById('tableBody')
    if (!tbody) return

    // Calculate pagination
    const startIndex = (this.currentPage - 1) * this.entriesPerPage
    const endIndex = Math.min(startIndex + this.entriesPerPage, this.filteredData.length)
    const pageData = this.filteredData.slice(startIndex, endIndex)

    // Clear existing rows
    tbody.innerHTML = ''

    // Add data rows
    if (pageData.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="6" class="text-center py-4 text-muted">
            <i class="fa-solid fa-magnifying-glass mb-2 d-block" style="font-size: 2rem;"></i>
            No matching records found
          </td>
        </tr>
      `
    } else {
      pageData.forEach((row, index) => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
          <td>${row.name}</td>
          <td>${row.position}</td>
          <td>${row.office}</td>
          <td>${row.age}</td>
          <td>${row.date}</td>
          <td>${row.salary}</td>
        `

        // Add row hover effect
        tr.addEventListener('mouseenter', function() {
          this.style.transform = 'translateX(2px)'
          this.style.transition = 'transform 0.2s ease'
        })

        tr.addEventListener('mouseleave', function() {
          this.style.transform = ''
        })

        tbody.appendChild(tr)
      })
    }

    // Update pagination info
    this.updatePaginationInfo(startIndex + 1, endIndex, this.filteredData.length)
    this.renderPagination()
  }

  updatePaginationInfo(start, end, total) {
    const startEntry = document.getElementById('startEntry')
    const endEntry = document.getElementById('endEntry')
    const totalEntries = document.getElementById('totalEntries')

    if (startEntry) startEntry.textContent = total > 0 ? start : 0
    if (endEntry) endEntry.textContent = end
    if (totalEntries) totalEntries.textContent = total
  }

  renderPagination() {
    const container = document.getElementById('paginationContainer')
    if (!container) return

    const totalPages = Math.ceil(this.filteredData.length / this.entriesPerPage)
    container.innerHTML = ''

    if (totalPages <= 1) return

    // Previous button
    const prevLi = document.createElement('li')
    prevLi.className = `page-item ${this.currentPage === 1 ? 'disabled' : ''}`
    prevLi.innerHTML = `<a class="page-link" href="#" tabindex="-1">Previous</a>`
    if (this.currentPage > 1) {
      prevLi.addEventListener('click', (e) => {
        e.preventDefault()
        this.currentPage--
        this.renderTable()
      })
    }
    container.appendChild(prevLi)

    // Page numbers
    const maxButtons = 5
    let startPage = Math.max(1, this.currentPage - Math.floor(maxButtons / 2))
    let endPage = Math.min(totalPages, startPage + maxButtons - 1)

    if (endPage - startPage < maxButtons - 1) {
      startPage = Math.max(1, endPage - maxButtons + 1)
    }

    // Add ellipsis if needed
    if (startPage > 1) {
      const firstLi = document.createElement('li')
      firstLi.className = 'page-item'
      firstLi.innerHTML = `<a class="page-link" href="#">1</a>`
      firstLi.addEventListener('click', (e) => {
        e.preventDefault()
        this.currentPage = 1
        this.renderTable()
      })
      container.appendChild(firstLi)

      if (startPage > 2) {
        const ellipsisLi = document.createElement('li')
        ellipsisLi.className = 'page-item disabled'
        ellipsisLi.innerHTML = `<span class="page-link">...</span>`
        container.appendChild(ellipsisLi)
      }
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
      const li = document.createElement('li')
      li.className = `page-item ${i === this.currentPage ? 'active' : ''}`
      li.innerHTML = `<a class="page-link" href="#">${i}</a>`

      if (i !== this.currentPage) {
        li.addEventListener('click', (e) => {
          e.preventDefault()
          this.currentPage = i
          this.renderTable()
        })
      }

      container.appendChild(li)
    }

    // Add ellipsis if needed
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        const ellipsisLi = document.createElement('li')
        ellipsisLi.className = 'page-item disabled'
        ellipsisLi.innerHTML = `<span class="page-link">...</span>`
        container.appendChild(ellipsisLi)
      }

      const lastLi = document.createElement('li')
      lastLi.className = 'page-item'
      lastLi.innerHTML = `<a class="page-link" href="#">${totalPages}</a>`
      lastLi.addEventListener('click', (e) => {
        e.preventDefault()
        this.currentPage = totalPages
        this.renderTable()
      })
      container.appendChild(lastLi)
    }

    // Next button
    const nextLi = document.createElement('li')
    nextLi.className = `page-item ${this.currentPage === totalPages ? 'disabled' : ''}`
    nextLi.innerHTML = `<a class="page-link" href="#">Next</a>`
    if (this.currentPage < totalPages) {
      nextLi.addEventListener('click', (e) => {
        e.preventDefault()
        this.currentPage++
        this.renderTable()
      })
    }
    container.appendChild(nextLi)
  }

  // Export functionality (can be extended)
  exportData(format) {
    switch(format) {
      case 'csv':
        this.exportCSV()
        break
      case 'json':
        this.exportJSON()
        break
      case 'pdf':
        console.log('PDF export would be implemented here')
        break
    }
  }

  exportCSV() {
    const headers = ['Name', 'Position', 'Office', 'Age', 'Start Date', 'Salary']
    const csvContent = [
      headers.join(','),
      ...this.filteredData.map(row =>
        [row.name, row.position, row.office, row.age, row.date, row.salary].join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'employees_data.csv'
    a.click()
    URL.revokeObjectURL(url)

    // Show notification
    if (window.NotikaNotification && window.NotikaNotification.showNotification) {
      window.NotikaNotification.showNotification({
        title: 'Export Successful',
        message: 'Data exported to CSV file',
        type: 'success',
        position: 'top-right'
      })
    }
  }

  exportJSON() {
    const jsonContent = JSON.stringify(this.filteredData, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'employees_data.json'
    a.click()
    URL.revokeObjectURL(url)
  }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.NotikaDataTable = new DataTablePage()
  })
} else {
  window.NotikaDataTable = new DataTablePage()
}

export { DataTablePage }