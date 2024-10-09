import React from 'react';

function DaySelection(props) {

    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    return (
        <div className="section">
          <h2>Select Days</h2>
          <div className="days-selection">
            {daysOfWeek.map((day, index) => (
              <div key={index} className="day-checkbox">
                <input type="checkbox" id={day} />
                <label htmlFor={day}>{day}</label>
              </div>
            ))}
          </div>
        </div>
    );
}

export default DaySelection;