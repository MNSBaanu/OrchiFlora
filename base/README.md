# Orchi-Flora Temperature Analysis System

## Project Scenario

Orchi-flora planters are exporting orchids to European countries. They have established a new orchid farm to accelerate their production due to high demand. To produce beautiful, long-lasting blooms, orchids must produce energy during the day when the temperature is high, and store that energy at night when the temperature drops.

### Scientific Background

This temperature fluctuation is necessary for orchids to bloom. Without a day-night fluctuation of 10-15 degrees Fahrenheit (°F), the plants will grow plenty of healthy foliage (leaves) but may refuse to flower.

**Optimal Growing Conditions:**
- **Night Temperature:** 60-62°F is ideal for optimum growth (temperatures as low as 55°F will not harm the plant)
- **Daytime Temperature:** 70-80°F
- **Temperature Fluctuation:** 10-15°F between day and night

These facts prove the importance of temperature variation for flowering. Therefore, Orchi-flora planters need to analyze temperature variation over several months to find out the best duration for optimum growth of orchids.

## About This Project

This project provides **two implementations** of the temperature analysis system:

1. **C++ Console Application** (`Orchi Flora.cpp`) - Academic/Assignment version with structured programming
2. **Web Application** (HTML/CSS/JS) - Production-ready system for real-world use

The web application serves as the modern, production-ready solution that Orchi-flora planters can actually deploy and use in their operations, while the C++ version demonstrates structured programming techniques.

## Web Application Features

### Core Functionality
- ✅ Store both daytime and nighttime temperatures daily for up to 30 days
- ✅ Calculate daily temperature fluctuation
- ✅ Calculate average temperature fluctuation for the month
- ✅ Find average daytime and nighttime temperatures
- ✅ Calculate maximum and minimum temperatures (day and night)
- ✅ Temperature converter (Celsius ↔ Fahrenheit)
- ✅ Analyze suitability according to optimum orchid requirements
- ✅ Data persistence with localStorage
- ✅ Export data to CSV for backup and analysis

### User Interface
- Modern, professional orchid-themed design
- Tabbed navigation for easy access to features
- Responsive layout for desktop and mobile devices
- Real-time temperature conversion during data entry
- Comprehensive analysis reports with visual indicators

### Data Management
- Automatic data saving to browser storage
- Export functionality for external analysis
- Clear all data option with confirmation
- Error handling and input validation

## System Requirements

### Web Application
- Modern web browser (Chrome, Firefox, Safari, Edge)
- JavaScript enabled
- No installation required

### C++ Application
- C++ compiler (GCC, Visual Studio, etc.)
- Standard C++ libraries

## Getting Started

### Web Application
1. Open `index.html` in your web browser
2. Start entering temperature data in the "Data Entry" tab
3. View your data in the "View Data" tab
4. Generate analysis reports in the "Analysis" tab
5. Use the "Converter" tab for quick temperature conversions
6. Export your data using the "Export to CSV" button

### C++ Application
1. Compile `Orchi Flora.cpp` using your C++ compiler
2. Run the executable
3. Follow the menu-driven interface

## Usage Guide

### Data Entry Tab
- Enter daytime temperature in Celsius
- Enter nighttime temperature in Celsius
- See real-time Fahrenheit conversions
- Data is automatically saved
- Maximum 30 days of data storage

### View Data Tab
- See all recorded temperatures in table format
- View both Celsius and Fahrenheit values
- See daily temperature fluctuations

### Analysis Tab
- Click "Generate Report" to see comprehensive analysis
- Statistical summary includes:
  - Average temperature fluctuation
  - Average day and night temperatures
  - Maximum and minimum temperatures
- Suitability assessment shows which conditions meet optimal requirements

### Converter Tab
- Convert between Celsius and Fahrenheit
- Bidirectional conversion
- Instant results

## Temperature Analysis Criteria

The system evaluates your data against these optimal orchid growing conditions:

| Parameter | Ideal Range | Acceptable Range |
|-----------|-------------|------------------|
| Day Temperature | 70-80°F (21-27°C) | - |
| Night Temperature | 60-62°F (16-17°C) | 55-62°F (13-17°C) |
| Temperature Fluctuation | 10-15°F (5.5-8.3°C) | - |

## Technologies Used

### Web Application
- **HTML5** - Structure and content
- **CSS3** - Styling with custom properties, Grid, Flexbox
- **Vanilla JavaScript** - Logic and interactivity
- **localStorage API** - Data persistence
- **Inter Font** - Professional typography

### C++ Application
- **Standard C++ Libraries**
- **Structured Programming Techniques**
- **File I/O** for data storage
- **Arrays** for data management

## Project Structure

```
Orchi-Flora-Temperature-Analysis-System/
├── index.html          # Web app main page
├── style.css           # Orchid-themed styling
├── script.js           # Application logic
├── Orchi Flora.cpp     # C++ console application
└── README.md           # This file
```

## Features Comparison

| Feature | C++ Version | Web Version |
|---------|-------------|-------------|
| Data Entry | ✅ Console input | ✅ Form-based |
| Temperature Storage | ✅ Arrays/Files | ✅ localStorage |
| Calculations | ✅ All required | ✅ All required |
| Converter | ✅ Menu option | ✅ Dedicated tab |
| Analysis | ✅ Text report | ✅ Visual report |
| Data Export | ✅ File output | ✅ CSV export |
| User Interface | Console menu | Modern web UI |
| Accessibility | Local only | Web-based |
| Data Persistence | File-based | Browser storage |

## Future Enhancements

- Visual charts and graphs for temperature trends
- Multiple farm/greenhouse tracking
- Date-based tracking with calendar
- Mobile app version
- Cloud synchronization
- Email reports
- Alert notifications for suboptimal conditions

## Development Notes

This system was developed to meet the requirements of Orchi-flora planters for analyzing temperature variations to optimize orchid growth and flowering. The dual implementation approach provides both an academic demonstration of structured programming (C++) and a practical, production-ready solution (Web) that can be immediately deployed in real-world orchid cultivation operations.

## License

Open source - developed for Orchi-flora planters and orchid cultivation optimization.

## Support

For issues or questions about:
- **Web Application**: Check browser console for errors, ensure JavaScript is enabled
- **C++ Application**: Ensure proper compilation with C++ standard libraries

---

**Developed for Orchi-flora Planters** - Optimizing orchid cultivation through temperature analysis
