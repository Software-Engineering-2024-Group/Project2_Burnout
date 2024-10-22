import React, {useState, useEffect} from 'react';

/**
 * Display the schedule
 * @param {*} props 
 * @returns 
 */
const WorkoutDisplay = props => {
    console.log("Hello, I am here");
    return(
        <>{JSON.stringify(props.schedule)}</>
    );
}

export default WorkoutDisplay