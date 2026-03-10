#include <iostream>
#include <string>
using namespace std;

// Convert Celsius to Fahrenheit
	float ConvertToFahrenheit(float Celsius) 
{
    return (Celsius * 9 / 5) + 32;
}

// Calculate and display temperature fluctuations and averages
void CalculateFluctuationAndAverage(float DayTimeTemperature[], float NightTimeTemperature[], int DayCount) 
{
    float TotalFluctuation = 0;  
    float TotalDayTemp = 0;      
    float TotalNightTemp = 0;   
    
    // Initialize max and min temperatures
    float MaxDayTemp = DayTimeTemperature[0]; 
    float MinDayTemp = DayTimeTemperature[0]; 
    float MaxNightTemp = NightTimeTemperature[0]; 
    float MinNightTemp = NightTimeTemperature[0]; 
    
    
    // Calculate total fluctuations and temperatures
    for (int i = 0; i < DayCount; i++) 
	{
        float DailyFluctuation = DayTimeTemperature[i] - NightTimeTemperature[i];
        TotalFluctuation += DailyFluctuation;
        TotalDayTemp += DayTimeTemperature[i];
        TotalNightTemp += NightTimeTemperature[i];

        // Update maximum and minimum temperatures
        if (DayTimeTemperature[i] > MaxDayTemp) MaxDayTemp = DayTimeTemperature[i];
        if (DayTimeTemperature[i] < MinDayTemp) MinDayTemp = DayTimeTemperature[i];

        if (NightTimeTemperature[i] > MaxNightTemp) MaxNightTemp = NightTimeTemperature[i];
        if (NightTimeTemperature[i] < MinNightTemp) MinNightTemp = NightTimeTemperature[i];
    }

    // Calculate daily and monthly averages
    float AverageFluctuation = TotalFluctuation / DayCount; 
    float AverageDayTemp = TotalDayTemp / DayCount; 
    float AverageNightTemp = TotalNightTemp / DayCount; 




    // Display the analysis for the current day
    cout << "\nDay " << DayCount << " Analysis:\n\n";
    cout << "Average Temperature Fluctuation      : " << AverageFluctuation << " Fahrenheit\n";
    cout << "Average Day Time Temperature         : " << AverageDayTemp << " Fahrenheit\n";
    cout << "Average Night Time Temperature       : " << AverageNightTemp << " Fahrenheit\n";
    cout << "Maximum Day Time Temperature         : " << MaxDayTemp << " Fahrenheit\n";
    cout << "Minimum Day Time Temperature         : " << MinDayTemp << " Fahrenheit\n";
    cout << "Maximum Night Time Temperature       : " << MaxNightTemp << " Fahrenheit\n";
    cout << "Minimum Night Time Temperature       : " << MinNightTemp << " Fahrenheit\n";

    // Provide suitability comments based on temperature ranges
    cout << "\n";
    if (AverageFluctuation >= 10 && AverageFluctuation <= 15) {
        cout << "Temperature Fluctuation is within the ideal range.\n";
    } else {
        cout << "Temperature Fluctuation is not within the ideal range.\n";
    }

    if (AverageNightTemp >= 55 && AverageNightTemp <= 62) {
        cout << "Average Night Time Temperature is suitable.\n";
    } else {
        cout << "Average Night Time Temperature is not suitable.\n";
    }

    if (AverageDayTemp >= 70 && AverageDayTemp <= 80) {
        cout << "Average Day Time Temperature is suitable.\n";
    } else {
        cout << "Average Day Time Temperature is not suitable.\n";
    }

    if (MaxNightTemp <= 62) {
        cout << "Maximum Night Time Temperature is suitable.\n";
    } else {
        cout << "Maximum Night Time Temperature is not suitable.\n";
    }

    if (MinNightTemp >= 55) {
        cout << "Minimum Night Time Temperature is suitable.\n";
    } else {
        cout << "Minimum Night Time Temperature is not suitable.\n";
    }

    if (MaxDayTemp <= 80) {
        cout << "Maximum Day Time Temperature is suitable.\n";
    } else {
        cout << "Maximum Day Time Temperature is not suitable.\n";
    }

    if (MinDayTemp >= 70) {
        cout << "Minimum Day Time Temperature is suitable.\n";
    } else {
        cout << "Minimum Day Time Temperature is not suitable.\n";
    }

    cout << "\n---------------------------------------------" << endl;
}

int main() {
    const int SIZE = 30; // Define the number of days in a month
    float DayTimeTemperature[SIZE], NightTimeTemperature[SIZE];
    int DayCount = 0;

    // Heading
    cout << "Orchi-flora Planters Temperature Analysis\n\n";

    // Loop to enter temperatures for each day and perform analysis
    while (DayCount < SIZE) {
        float TempInCelsius;
        float TempInFahrenheit;


        // Input and conversion for daytime temperature
        cout << "Enter daytime temperature for Day " << (DayCount + 1) << " in Celsius  : ";
        cin >> TempInCelsius;
        TempInFahrenheit = ConvertToFahrenheit(TempInCelsius);
        cout << "Daytime temperature in Fahrenheit : " << TempInFahrenheit << " Fahrenheit" << endl;

        DayTimeTemperature[DayCount] = TempInFahrenheit;
        
        

        // Input and conversion for nighttime temperature
        cout << "Enter nighttime temperature for Day " << (DayCount + 1) << " in Celsius : ";
        cin >> TempInCelsius;
        TempInFahrenheit = ConvertToFahrenheit(TempInCelsius);
        cout << "Nighttime temperature in Fahrenheit : " << TempInFahrenheit << " Fahrenheit" << endl;

        NightTimeTemperature[DayCount] = TempInFahrenheit;

        DayCount++;

        // Calculate and display analysis for the current day
        CalculateFluctuationAndAverage(DayTimeTemperature, NightTimeTemperature, DayCount);
    }


    cout << "\nAll Calculation DONE for the month." << endl;

    return 0;
}

