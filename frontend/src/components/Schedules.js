import React from "react";
import {
  Container,
  Typography,
  Button,
  Divider,
  Box,
  Tab,
  Tabs,
} from "@mui/material";
import Footer from "./Footer";
import NewSchedule from "./Task";

const commonContainerStyles = {
  display: "flex",

  justifyContent: "center", // Center horizontally
  alignItems: "center", // Center vertically
};

const commonBoxStyles = {
  border: "1px solid gray",
  borderRadius: "4px",
  boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
  padding: "16px",
  margin: "16px",
  width: "100%",
};

const daysOfWeek = [
  { label: "Monday", value: "Monday" },
  { label: "Tuesday", value: "Tuesday" },
  { label: "Wednesday", value: "Wednesday" },
  { label: "Thursday", value: "Thursday" },
  { label: "Friday", value: "Friday" },
  { label: "Saturday", value: "Saturday" },
  { label: "Sunday", value: "Sunday" },
];

const DummyData = {
  user_id: "123abc",
  week_starting: "2024-10-07",
  schedule: {
    Monday: {
      date: "2024-10-07",
      workout_type: "Strength Training",
      exercises: [
        {
          exercise_name: "Squats",
          sets: 3,
          reps: 10,
          duration: "15 mins",
          notes: "Focus on form and depth",
          link: "https://example.com/squats-tutorial",
        },
        {
          exercise_name: "Push-ups",
          sets: 3,
          reps: 12,
          duration: "10 mins",
          notes: "Keep your body straight",
          link: null,
        },
        {
          exercise_name: "Plank",
          sets: 3,
          reps: "Hold for 1 min",
          duration: "5 mins",
          notes: null,
          link: null,
        },
      ],
      total_duration: "30 mins",
      rest_day: false,
    },
    Tuesday: {
      date: "2024-10-08",
      workout_type: "Cardio",
      exercises: [
        {
          exercise_name: "Running",
          sets: null,
          reps: null,
          duration: "30 mins",
          notes: "Run at a moderate pace",
          link: null,
        },
        {
          exercise_name: "Jump Rope",
          sets: 3,
          reps: 100,
          duration: "15 mins",
          notes: "Keep your feet low to the ground",
          link: "https://example.com/jump-rope-tutorial",
        },
      ],
      total_duration: "45 mins",
      rest_day: false,
    },
    Wednesday: {
      date: "2024-10-09",
      workout_type: "Yoga",
      exercises: [
        {
          exercise_name: "Downward Dog",
          sets: 1,
          reps: "Hold for 2 mins",
          duration: "2 mins",
          notes: "Focus on stretching your spine",
          link: "https://example.com/downward-dog",
        },
        {
          exercise_name: "Tree Pose",
          sets: 1,
          reps: "Hold for 1 min",
          duration: "1 min",
          notes: "Balance is key",
          link: null,
        },
        {
          exercise_name: "Child's Pose",
          sets: 1,
          reps: "Hold for 3 mins",
          duration: "3 mins",
          notes: "Relax your shoulders",
          link: "https://example.com/childs-pose",
        },
      ],
      total_duration: "15 mins",
      rest_day: false,
    },
    Thursday: {
      date: "2024-10-10",
      workout_type: null,
      exercises: [],
      total_duration: "0 mins",
      rest_day: true,
    },
    Friday: {
      date: "2024-10-11",
      workout_type: "Strength Training",
      exercises: [
        {
          exercise_name: "Deadlifts",
          sets: 3,
          reps: 8,
          duration: "15 mins",
          notes: "Lift with your legs, not your back",
          link: "https://example.com/deadlifts",
        },
        {
          exercise_name: "Bench Press",
          sets: 3,
          reps: 10,
          duration: "15 mins",
          notes: "Steady breathing during the lift",
          link: null,
        },
      ],
      total_duration: "30 mins",
      rest_day: false,
    },
    Saturday: {
      date: "2024-10-12",
      workout_type: "HIIT",
      exercises: [
        {
          exercise_name: "Burpees",
          sets: 4,
          reps: 12,
          duration: "10 mins",
          notes: "Explosive movement on the jump",
          link: null,
        },
        {
          exercise_name: "Mountain Climbers",
          sets: 4,
          reps: 20,
          duration: "10 mins",
          notes: "Keep your core engaged",
          link: "https://example.com/mountain-climbers",
        },
        {
          exercise_name: "Jump Squats",
          sets: 4,
          reps: 15,
          duration: "10 mins",
          notes: "Land softly to reduce knee strain",
          link: null,
        },
      ],
      total_duration: "30 mins",
      rest_day: false,
    },
    Sunday: {
      date: "2024-10-13",
      workout_type: "Rest and Recovery",
      exercises: [
        {
          exercise_name: "Foam Rolling",
          sets: null,
          reps: "5 mins per muscle group",
          duration: "20 mins",
          notes: "Roll slowly for better release",
          link: "https://example.com/foam-rolling",
        },
      ],
      total_duration: "20 mins",
      rest_day: true,
    },
  },
};

const Plans = (props) => {
  const [day, setDay] = React.useState("Monday");
  const [editMode, setEditMode] = React.useState(false);
  const [addMode, setAddMode] = React.useState(false);

  console.log("plans token: ", props.state);

  console.log("checking", editMode, addMode, day);
  return (
    <>
      <WorkOutHeader />
      <Container maxWidth="sm">
        <Box
          sx={{
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={() => {
              setAddMode(!addMode);
            }}
            style={{ backgroundColor: "orange", color: "white" }}
          >
            Add
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            onClick={() => {
              setEditMode(!editMode);
            }}
            style={{ backgroundColor: "orange", color: "white" }}
          >
            Edit
          </Button>
        </Box>
      </Container>
      <Container>
        {addMode && <NewSchedule addMode={addMode} setAddMode={setAddMode} />}
      </Container>
      <Container
        sx={{
          ...commonContainerStyles,
        }}
      >
        <Box sx={{ ...commonBoxStyles }}>
          <Tabs
            value={day}
            onChange={(e, newValue) => {
              setDay(newValue);
            }}
            TabIndicatorProps={{
              sx: { backgroundColor: "#FFA000" },
            }}
            sx={{
              "& .MuiTab-root": {
                color: "black",
                "&.Mui-selected": {
                  color: "#FFA000",
                },
              },
            }}
            centered
            variant="fullWidth"
          >
            {daysOfWeek.map((day) => (
              <Tab key={day.value} label={day.label} value={day.value} />
            ))}
          </Tabs>
          <Divider sx={{ width: "100%", margin: "8px 0" }} />
          <Schedules schedule={DummyData.schedule[day]} />
        </Box>
      </Container>
      <Footer />
    </>
  );
};

const WorkOutHeader = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: "center", marginTop: "60px" }}>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        My Workout Week
      </Typography>
    </Container>
  );
};

const Schedules = (schedule) => {
  return (
    <Container>
      <Box>{JSON.stringify(schedule)}</Box>
    </Container>
  );
};

export default Plans;
