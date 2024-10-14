import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
} from "@mui/material";

const daysOfWeek = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

const NewSchedule = (props) => {
  console.log("checking props", props);
  const [day, setDay] = React.useState("");
  const [exercise, setExercise] = React.useState("");
  const [duration, setDuration] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [link, setLink] = React.useState("");

  const handleSubmit = () => {
    const workoutData = {
      day,
      exercise,
      duration: `${duration} mins`,
      notes,
      link,
    };
    console.log(workoutData); // Handle form submission logic here
  };

  const submit = () => {
    props.setAddMode(false);
  };

  return props.addMode ? (
    <Dialog
      open={props.addMode}
      onClose={() => props.setAddMode(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
    >
      <DialogTitle id="alert-dialog-title">{"Add New Task"}</DialogTitle>
      <DialogContent>
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="day-lable">Day Of Week</InputLabel>
          <Select
            labelId="dayofweek-select-label"
            id="dayofweek-select"
            value={day}
            label="Day Of Week"
            onChange={(e) => {
              setDay(e.target.value);
            }}
          >
            {daysOfWeek.map((day) => (
              <MenuItem key={day.value} value={day.value}>
                {day.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ marginTop: "10px" }}>
          <InputLabel id="exercise-select-label">Exercise</InputLabel>
          <Select
            labelId="dexercise-select-label"
            id="exercise-select"
            value={exercise}
            label="Exercise"
            onChange={(e) => {
              setExercise(e.target.value);
            }}
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button>Cancel</Button>
        <Button autoFocus>Submit</Button>
      </DialogActions>
    </Dialog>
  ) : (
    <h1>Fasle</h1>
  );
};

export default NewSchedule;
