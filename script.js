// Data storage
let temperatureData = [];
const MAX_DAYS = 30;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    updateDayNumber();
    updateStats();
    
    // Real-time conversion for data entry
    document.getElementById('dayTemp').addEventListener('input', function() {
        const celsius = parseFloat(this.value);
        if (!isNaN(celsius)) {
            const fahrenheit = convertToFahrenheit(celsius);
            document.getElementById('dayTempF').textContent = `= ${fahrenheit.toFixed(2)}°F`;
        } else {
            document.getElementById('dayTempF').textContent = '';
        }
    });
    
    document.getElementById('nightTemp').addEventListener('input', function() {
        const celsius = parseFloat(this.value);
        if (!isNaN(celsius)) {
            const fahrenheit = convertToFahrenheit(celsius);
            document.getElementById('nightTempF').textContent = `= ${fahrenheit.toFixed(2)}°F`;
        } else {
            document.getElementById('nightTempF').textContent = '';
        }
    });
});

// Temperature conversion functions
function convertToFahrenheit(celsius) {
    return (celsius * 9 / 5) + 32;
}

function convertToCelsius(fahrenheit) {
    return (fahrenheit - 32) * 5 / 9;
}

// Tab switching
function showTab(tabName) {
    // Hide all tabs
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // Remove active from all buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    // Update view if needed
    if (tabName === 'view') {
        displayDataTable();
    }
}

// Add temperature data
function addTemperature(event) {
    event.preventDefault();
    
    if (temperatureData.length >= MAX_DAYS) {
        alert('Maximum 30 days reached!');
        return;
    }
    
    const dayTemp = parseFloat(document.getElementById('dayTemp').value);
    const nightTemp = parseFloat(document.getElementById('nightTemp').value);
    
    const data = {
        day: temperatureData.length + 1,
        dayTempC: dayTemp,
        nightTempC: nightTemp,
        dayTempF: convertToFahrenheit(dayTemp),
        nightTempF: convertToFahrenheit(nightTemp)
    };
    
    temperatureData.push(data);
    
    // Reset form
    document.getElementById('tempForm').reset();
    updateDayNumber();
    updateStats();
    
    alert(`Day ${data.day} data added successfully!`);
}

// Update day number
function updateDayNumber() {
    document.getElementById('dayNumber').value = temperatureData.length + 1;
}

// Update statistics
function updateStats() {
    document.getElementById('dayCount').textContent = temperatureData.length;
}

// Display data table
function displayDataTable() {
    const container = document.getElementById('dataTable');
    
    if (temperatureData.length === 0) {
        container.innerHTML = '<div class="empty-state">No data available. Please add temperature data first.</div>';
        return;
    }
    
    let html = `
        <table>
            <thead>
                <tr>
                    <th>Day</th>
                    <th>Day Temp (°C)</th>
                    <th>Day Temp (°F)</th>
                    <th>Night Temp (°C)</th>
                    <th>Night Temp (°F)</th>
                    <th>Fluctuation (°F)</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    temperatureData.forEach(data => {
        const fluctuation = data.dayTempF - data.nightTempF;
        html += `
            <tr>
                <td>${data.day}</td>
                <td>${data.dayTempC.toFixed(2)}</td>
                <td>${data.dayTempF.toFixed(2)}</td>
                <td>${data.nightTempC.toFixed(2)}</td>
                <td>${data.nightTempF.toFixed(2)}</td>
                <td>${fluctuation.toFixed(2)}</td>
            </tr>
        `;
    });
    
    html += '</tbody></table>';
    container.innerHTML = html;
}

// Generate analysis report
function generateAnalysis() {
    const container = document.getElementById('analysisReport');
    
    if (temperatureData.length === 0) {
        container.innerHTML = '<div class="empty-state">No data available. Please add temperature data first.</div>';
        return;
    }
    
    // Calculate statistics
    let totalFluctuation = 0;
    let totalDayTemp = 0;
    let totalNightTemp = 0;
    let maxDayTemp = temperatureData[0].dayTempF;
    let minDayTemp = temperatureData[0].dayTempF;
    let maxNightTemp = temperatureData[0].nightTempF;
    let minNightTemp = temperatureData[0].nightTempF;
    
    temperatureData.forEach(data => {
        const fluctuation = data.dayTempF - data.nightTempF;
        totalFluctuation += fluctuation;
        totalDayTemp += data.dayTempF;
        totalNightTemp += data.nightTempF;
        
        if (data.dayTempF > maxDayTemp) maxDayTemp = data.dayTempF;
        if (data.dayTempF < minDayTemp) minDayTemp = data.dayTempF;
        if (data.nightTempF > maxNightTemp) maxNightTemp = data.nightTempF;
        if (data.nightTempF < minNightTemp) minNightTemp = data.nightTempF;
    });
    
    const avgFluctuation = totalFluctuation / temperatureData.length;
    const avgDayTemp = totalDayTemp / temperatureData.length;
    const avgNightTemp = totalNightTemp / temperatureData.length;
    
    // Generate HTML report
    let html = `
        <div class="analysis-section">
            <h3>📊 Statistical Summary</h3>
            <div class="analysis-item">
                <span>Days Analyzed:</span>
                <strong>${temperatureData.length}</strong>
            </div>
            <div class="analysis-item">
                <span>Average Temperature Fluctuation:</span>
                <strong>${avgFluctuation.toFixed(2)}°F</strong>
            </div>
            <div class="analysis-item">
                <span>Average Day Temperature:</span>
                <strong>${avgDayTemp.toFixed(2)}°F</strong>
            </div>
            <div class="analysis-item">
                <span>Average Night Temperature:</span>
                <strong>${avgNightTemp.toFixed(2)}°F</strong>
            </div>
            <div class="analysis-item">
                <span>Maximum Day Temperature:</span>
                <strong>${maxDayTemp.toFixed(2)}°F</strong>
            </div>
            <div class="analysis-item">
                <span>Minimum Day Temperature:</span>
                <strong>${minDayTemp.toFixed(2)}°F</strong>
            </div>
            <div class="analysis-item">
                <span>Maximum Night Temperature:</span>
                <strong>${maxNightTemp.toFixed(2)}°F</strong>
            </div>
            <div class="analysis-item">
                <span>Minimum Night Temperature:</span>
                <strong>${minNightTemp.toFixed(2)}°F</strong>
            </div>
        </div>
        
        <div class="analysis-section">
            <h3>✅ Suitability Assessment</h3>
            <div class="suitability">
    `;
    
    // Suitability checks
    const checks = [
        {
            condition: avgFluctuation >= 10 && avgFluctuation <= 15,
            text: 'Temperature Fluctuation (10-15°F ideal)',
            value: avgFluctuation.toFixed(2) + '°F'
        },
        {
            condition: avgNightTemp >= 55 && avgNightTemp <= 62,
            text: 'Average Night Temperature (55-62°F ideal)',
            value: avgNightTemp.toFixed(2) + '°F'
        },
        {
            condition: avgDayTemp >= 70 && avgDayTemp <= 80,
            text: 'Average Day Temperature (70-80°F ideal)',
            value: avgDayTemp.toFixed(2) + '°F'
        },
        {
            condition: maxNightTemp <= 62,
            text: 'Maximum Night Temperature (≤62°F)',
            value: maxNightTemp.toFixed(2) + '°F'
        },
        {
            condition: minNightTemp >= 55,
            text: 'Minimum Night Temperature (≥55°F)',
            value: minNightTemp.toFixed(2) + '°F'
        },
        {
            condition: maxDayTemp <= 80,
            text: 'Maximum Day Temperature (≤80°F)',
            value: maxDayTemp.toFixed(2) + '°F'
        },
        {
            condition: minDayTemp >= 70,
            text: 'Minimum Day Temperature (≥70°F)',
            value: minDayTemp.toFixed(2) + '°F'
        }
    ];
    
    checks.forEach(check => {
        const className = check.condition ? 'ok' : 'fail';
        const icon = check.condition ? '✓' : '✗';
        html += `
            <div class="suitability-item ${className}">
                <span class="status-icon">${icon}</span>
                <span>${check.text}: <strong>${check.value}</strong></span>
            </div>
        `;
    });
    
    html += '</div></div>';
    container.innerHTML = html;
}

// Temperature converter
function convertFromCelsius() {
    const celsius = parseFloat(document.getElementById('celsiusInput').value);
    if (!isNaN(celsius)) {
        const fahrenheit = convertToFahrenheit(celsius);
        document.getElementById('fahrenheitInput').value = fahrenheit.toFixed(2);
    }
}

function convertFromFahrenheit() {
    const fahrenheit = parseFloat(document.getElementById('fahrenheitInput').value);
    if (!isNaN(fahrenheit)) {
        const celsius = convertToCelsius(fahrenheit);
        document.getElementById('celsiusInput').value = celsius.toFixed(2);
    }
}

// Clear all data
function clearAllData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
        temperatureData = [];
        updateDayNumber();
        updateStats();
        document.getElementById('tempForm').reset();
        document.getElementById('dayTempF').textContent = '';
        document.getElementById('nightTempF').textContent = '';
        alert('All data cleared!');
    }
}
