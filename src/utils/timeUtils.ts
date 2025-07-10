export const timeUtils = {
  /**
   * Converts 24-hour time format to 12-hour AM/PM format
   * @param time Time in 24-hour format (HH:mm)
   * @returns Time in 12-hour format with AM/PM
   */
  convertTo12Hour(time: string): string {
    try {
      const [hours, minutes] = time.split(':').map(Number);
      
      if (isNaN(hours) || isNaN(minutes)) {
        throw new Error('Invalid time format');
      }

      const period = hours >= 12 ? 'PM' : 'AM';
      const displayHours = hours % 12 || 12; // Convert 0 to 12 for 12 AM
      const displayMinutes = minutes.toString().padStart(2, '0');

      return `${displayHours}:${displayMinutes} ${period}`;
    } catch (error) {
      console.error('Error converting time:', error);
      return time; // Return original time if conversion fails
    }
  },

  /**
   * Formats a time range in 12-hour AM/PM format
   * @param startTime Start time in 24-hour format
   * @param endTime End time in 24-hour format
   * @returns Formatted time range
   */
  formatTimeRange: (startTime: string, endTime: string): string => {
    if (!startTime || !endTime) return '';
    
    const formatTime = (time: string) => {
      const [hours, minutes] = time.split(':');
      const hour = parseInt(hours);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const formattedHour = hour % 12 || 12;
      return `${formattedHour}:${minutes} ${ampm}`;
    };

    return `${formatTime(startTime)} - ${formatTime(endTime)}`;
  },

  calculateDurationInMinutes: (startTime: string, endTime: string): number => {
    if (!startTime || !endTime) return 0;
    
    const [startHours, startMinutes] = startTime.split(':').map(Number);
    const [endHours, endMinutes] = endTime.split(':').map(Number);
    
    const startTotalMinutes = startHours * 60 + startMinutes;
    const endTotalMinutes = endHours * 60 + endMinutes;
    
    let duration = endTotalMinutes - startTotalMinutes;
    if (duration < 0) {
      duration += 24 * 60; // Add 24 hours if end time is on next day
    }
    
    return duration;
  }
}; 