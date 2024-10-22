import React, { useState } from "react";
import { DAYSOFWEEK } from "../constants/DaysOfWeek";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Select,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
} from "@mui/material";

const WorkoutForm = (props) => {
  // Initial state for the workouts = [{{daysofweek: {id, workoutTitle, duration, startTime, description(exercises : [] ), link }}}]
  // TODO: don't do it Initial state for exercises = [{exerciseTitle: "", startTime: "", link: "", reps: "", set: ""}]
  const [workoutData, setWorkoutData] = useState({
    selectedDay: "",
    workoutTitle: "",
    description: "",
    duration: "",
    link: "",
  });

  const [errors, setErrors] = useState({});

  console.log("workoutData: ", workoutData);

  // Handle input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setWorkoutData({ ...workoutData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Clear error when user starts typing
  };

  // const handleTaskChange = (day, index) => (event) => {
  //   const { value, name } = event.target;
  //   const updatedTasks = [...workouts[day].tasks];
  //   if (!updatedTasks[index]) {
  //     updatedTasks[index] = {};
  //   }
  //   updatedTasks[index] = { ...updatedTasks[index], [name]: value };
  //   setWorkouts((prev) => ({
  //     ...prev,
  //     [day]: { ...prev[day], tasks: updatedTasks },
  //   }));
  // };

  // Handle form submission

  const isValidURL = (url) => {
    const urlPattern = /^(https?:\/\/)?([a-z0-9-]+\.)+[a-z]{2,6}(\/[^\s]*)?$/i;
    return urlPattern.test(url);
  };

  // Handle submit clicks
  const handleSubmit = (event) => {
    event.preventDefault();

    const newErrors = {};

    // Validation
    if (!workoutData.selectedDay) {
      newErrors.selectedDay = "Please select a day.";
    }
    if (!workoutData.workoutTitle) {
      newErrors.workoutTitle = "Workout title is required.";
    }
    if (!workoutData.duration || workoutData.duration <= 0) {
      newErrors.duration = "Please enter a valid duration in minutes.";
    }
    if (workoutData.link && !isValidURL(workoutData.link)) {
      newErrors.link = "Please enter a valid URL.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Handle successful form submission logic here, e.g., send data to an API
      console.log("Submitted Workouts:", workoutData);
      handleClose(); // Close the modal after submission
    }
  };

  const handleClose = () => {
    props.setAddMode(false);
  };

  // Reusable text field function
  const renderTextField = (
    name,
    label,
    type = "text",
    multiline = false,
    rows = 1
  ) => (
    <TextField
      fullWidth
      label={label}
      name={name}
      type={type}
      value={workoutData[name]}
      onChange={handleInputChange}
      sx={{ marginTop: "20px" }}
      multiline={multiline}
      rows={rows}
      error={!!errors[name]}
      helperText={errors[name]}
    />
  );

  return (
    <Dialog open={props.addMode} onClose={handleClose} fullWidth maxWidth="md">
      <DialogTitle>New Workout Form</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="day-in-week-label">Select Day</InputLabel>
          <Select
            labelId="day-in-week-label"
            id="day-in-week-select"
            value={workoutData.selectedDay}
            onChange={handleInputChange}
            label="Select Day"
            name="selectedDay"
          >
            {DAYSOFWEEK.map((day) => (
              <MenuItem key={day.value} value={day.value}>
                {day.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {errors.selectedDay && (
          <span style={{ color: "red" }}>{errors.selectedDay}</span>
        )}
        {renderTextField("workoutTitle", "Workout Title")}
        {renderTextField("duration", "Duration (minutes)", "number")}
        {renderTextField("link", "Video Link")}
        {renderTextField("description", "Description", "text", true, 4)}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default WorkoutForm;
