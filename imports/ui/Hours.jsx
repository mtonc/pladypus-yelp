import React from 'react'

class Hours extends React.Component {
    constructor(props) {
        super(props);
        this.days = props.hours
        this.displayHours = this.displayHours.bind(this);
    }

    displayHours(day) {
        if (day === undefined || day === null) {
            return 'Closed';
        }
        let startHours = Math.floor(day.start/100);
        let startPM = (startHours > 12);
        startHours = (startPM) ? startHours - 12 : startHours;
        let startMinutes = day.start % 100;
        startMinutes = (startMinutes < 10) ? '0' + String(startMinutes) : startMinutes;
    
        let endHours = Math.floor(day.end/100);
        let endPM = (endHours > 12) ? endHours - 12 : endHours;
        endHours = (endPM) ? endHours - 12: endHours;
        let endMinutes = day.end % 100;
        endMinutes = (endMinutes < 10) ? '0' + String(endMinutes) : endMinutes

        return `${startHours}:${startMinutes} ${startPM ? 'PM' : 'AM'} - ${endHours}:${endMinutes} ${endPM ? 'PM' : 'AM'}`;
    }

    render() {
        return (
            <div className="hours">
                <label>
                    Hours: 
                </label>
                <span className="day">Mon: <span className="time">{this.displayHours(this.days[0])}</span></span>
                <span className="day">Tue: <span className="time">{this.displayHours(this.days[1])}</span></span>
                <span className="day">Wed: <span className="time">{this.displayHours(this.days[2])}</span></span>
                <span className="day">Thu: <span className="time">{this.displayHours(this.days[3])}</span></span>
                <span className="day">Fri: <span className="time">{this.displayHours(this.days[4])}</span></span>
                <span className="day">Sat: <span className="time">{this.displayHours(this.days[5])}</span></span>
                <span className="day">Sun: <span className="time">{this.displayHours(this.days[6])}</span></span>
            </div>
        )
    }
}

export default Hours;