export const dayUtils = {
  /**
   * Standardizes a day string to capitalized full name (e.g., 'mon' or 'monday' -> 'Monday')
   */
  standardizeDay(day: string): string {
    // Map of all possible variations to standardized names
    const dayMappings: { [key: string]: string } = {
      // Full names (lowercase)
      'monday': 'Monday',
      'tuesday': 'Tuesday',
      'wednesday': 'Wednesday',
      'thursday': 'Thursday',
      'friday': 'Friday',
      'saturday': 'Saturday',
      'sunday': 'Sunday',
      
      // Three letter abbreviations
      'mon': 'Monday',
      'tue': 'Tuesday',
      'wed': 'Wednesday',
      'thu': 'Thursday',
      'fri': 'Friday',
      'sat': 'Saturday',
      'sun': 'Sunday',
      
      // Alternative abbreviations
      'tues': 'Tuesday',
      'thur': 'Thursday',
      'thurs': 'Thursday',
      
      // Handle capitalized variations
      'Mon': 'Monday',
      'Tue': 'Tuesday',
      'Wed': 'Wednesday',
      'Thu': 'Thursday',
      'Fri': 'Friday',
      'Sat': 'Saturday',
      'Sun': 'Sunday',
      
      // Handle period abbreviations
      'm': 'Monday',
      't': 'Tuesday',
      'w': 'Wednesday',
      'th': 'Thursday',
      'f': 'Friday',
      's': 'Saturday',
      'su': 'Sunday'
    };

    // Clean the input string
    const normalizedDay = day.toLowerCase().trim();
    return dayMappings[normalizedDay] || 
           dayMappings[normalizedDay.substring(0, 3)] || // Try first 3 letters if full match fails
           day; // Return original if no match found
  },

  /**
   * Formats an array of days to a standardized comma-separated string
   */
  formatDays(days: string[]): string {
    if (!days?.length) return '';

    // Handle arrays that might contain comma-separated strings
    const expandedDays = days.reduce((acc: string[], day) => {
      if (day.includes(',')) {
        // Split by comma and clean up each part
        return [...acc, ...day.split(',').map(d => d.trim())];
      }
      return [...acc, day];
    }, []);

    return expandedDays
      .map(day => this.standardizeDay(day))
      .filter(day => day) // Remove any empty strings
      .join(', ');
  }
}; 