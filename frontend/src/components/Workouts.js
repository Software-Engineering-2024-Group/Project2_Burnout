import React, { useState, useEffect } from "react";
import axios from "axios";
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
import WorkoutDisplay from "./WorkoutDisplay";
import WorkoutForm from "./WorkoutForm";
import { DAYSOFWEEK } from "../constants/DaysOfWeek";

const commonContainerStyles = {
  width: "100%",
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

const Workouts = (props) => {
  const [day, setDay] = useState("Monday");
  const [editMode, setEditMode] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [schedules, setSchedules] = useState([]);

  const handleCreateSchedule = (wk) => {
    axios({
      method: "post",
      url: "/createSchedule",
      headers: {
        Authorization: "Bearer " + props.state.token,
      },
      data: {
        weekSchedule: wk,
      },
    })
      .then((response) => {
        const res = response.data;
        console.log(res);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  // handleCreateSchedule(WS);
  console.log("checking schedule", schedules);
  useEffect(() => {
    axios
      .get("/mySchedule", {
        headers: {
          Authorization: "Bearer " + props.state.token, // Ensure the token is valid
        },
      })
      .then((response) => {
        console.log(response.data.data);
        setSchedules(response.data.data);
      })
      .catch((error) => {
        console.error(
          "Error fetching schedule:",
          error.response || error.message
        );
      });
  }, []);

  return (
    <Container maxWidth={false} sx={{ width: "90%" }}>
      <WorkOutHeader />
      <Container>
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
        {/* TODO: this is for pop out the new components */}
        {addMode && <WorkoutForm addMode={addMode} setAddMode={setAddMode} />}
      </Container>
      <Container
        sx={{
          ...commonContainerStyles,
        }}
        disableGutters
        maxWidth={false}
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
              width: "100%",
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
            {DAYSOFWEEK.map((day) => (
              <Tab key={day.value} label={day.label} value={day.value} />
            ))}
          </Tabs>
          <Divider sx={{ width: "100%", margin: "8px 0" }} />
          <WorkoutDisplay schedule={schedules[day]} />
        </Box>
      </Container>
      <Footer />
    </Container>
  );
};

const WS = {
  Monday: {
    date: "2024-10-10",
    workouts: [
      {
        id: 1,
        title: "Strength Workout 1",
        CreateDate: "2024-10-10T10:00:00Z",
        description: "Focus on compound movements.",
        duration: 60,
        tasks: [
          {
            exerciseTitle: "Bench Press",
            videoLink: "http://example.com/strength-workout1-video",
            exercises: [
              {
                reps: 10,
                sets: 3,
              },
            ],
          },
          {
            exerciseTitle: "Deadlift",
            videoLink: "http://example.com/strength-workout1-video",
            exercises: [
              {
                reps: 8,
                sets: 3,
              },
            ],
          },
        ],
      },
    ],
  },
  Tuesday: {
    date: "2024-10-10",
    workouts: [
      {
        id: 2,
        title: "Cardio Workout",
        CreateDate: "2024-10-10T11:00:00Z",
        description: "Aim for a steady pace during cardio.",
        duration: 60,
        tasks: [
          {
            exerciseTitle: "Running",
            videoLink: "http://example.com/cardio-workout-video",
            exercises: [
              {
                durationInMinutes: 30,
                intensity: "Moderate",
              },
            ],
          },
          {
            exerciseTitle: "Cycling",
            videoLink: "http://example.com/cardio-workout-video",
            exercises: [
              {
                durationInMinutes: 30,
                intensity: "High",
              },
            ],
          },
        ],
      },
    ],
  },
  Wednesday: {
    date: "2024-10-10",
    workouts: [
      {
        id: 3,
        title: "Rest Day",
        CreateDate: "2024-10-10T12:00:00Z",
        description: "Take a day off for recovery.",
        duration: 0,
        tasks: [],
      },
    ],
  },
  Thursday: {
    date: "2024-10-10",
    workouts: [
      {
        id: 4,
        title: "Strength Workout 2",
        CreateDate: "2024-10-10T13:00:00Z",
        description: "Incorporate free weights for better strength.",
        duration: 60,
        tasks: [
          {
            exerciseTitle: "Squats",
            videoLink: "http://example.com/strength-workout2-video",
            exercises: [
              {
                reps: 12,
                sets: 4,
              },
            ],
          },
          {
            exerciseTitle: "Pull-ups",
            videoLink: "http://example.com/strength-workout2-video",
            exercises: [
              {
                reps: 8,
                sets: 3,
              },
            ],
          },
        ],
      },
    ],
  },
  Friday: {
    date: "2024-10-10",
    workouts: [
      {
        id: 5,
        title: "Flexibility and Core",
        CreateDate: "2024-10-10T14:00:00Z",
        description: "Focus on flexibility and core stability.",
        duration: 40,
        tasks: [
          {
            exerciseTitle: "Yoga",
            videoLink: "http://example.com/flexibility-core-video",
            exercises: [
              {
                durationInMinutes: 30,
              },
            ],
          },
          {
            exerciseTitle: "Plank",
            videoLink: "http://example.com/flexibility-core-video",
            exercises: [
              {
                durationInMinutes: 10,
              },
            ],
          },
        ],
      },
    ],
  },
  Saturday: {
    date: "2024-10-10",
    workouts: [
      {
        id: 6,
        title: "Outdoor Activity",
        CreateDate: "2024-10-10T15:00:00Z",
        description: "Enjoy the outdoors and stay active.",
        duration: 120,
        tasks: [
          {
            exerciseTitle: "Hiking",
            videoLink: null,
            exercises: [
              {
                durationInMinutes: 120,
              },
            ],
          },
        ],
      },
    ],
  },
  Sunday: {
    date: "2024-10-10",
    workouts: [
      {
        id: 7,
        title: "Active Recovery",
        CreateDate: "2024-10-10T16:00:00Z",
        description: "Engage in light activity to aid recovery.",
        duration: 30,
        tasks: [
          {
            exerciseTitle: "Walking",
            videoLink: null,
            exercises: [
              {
                durationInMinutes: 30,
              },
            ],
          },
        ],
      },
    ],
  },
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

export default Workouts;
