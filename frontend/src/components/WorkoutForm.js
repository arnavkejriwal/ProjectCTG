import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import {
  Button,
  Grid,
  TextField,
  Typography,
  TextareaAutosize,
} from "@mui/material";

const WorkoutForm = () => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [emoji, setEmoji] = useState("🧠");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [eventId, setEventId] = useState(1);
  const [time, setTime] = useState("");
  const [points, setPoints] = useState(0);
  const [bannerImg, setBannerImg] = useState("");
  const [description, setDescription] = useState("");
  const [organiser, setOrganiser] = useState("");
  const [organiserImg, setOrganiserImg] = useState("");
  const [participantVacancies, setParticipantVacancies] = useState(30);
  const [volunteerVacancies, setVolunteerVacancies] = useState(15);

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setError("You must be logged in");
      return;
    }

    const eventDetails = {
      emoji,
      title,
      subtitle,
      image,
      date,
      location,
      event_id: eventId,
      banner_img: bannerImg,
      description,
      organiser,
      organiser_img: organiserImg,
      participant_vacancies: participantVacancies,
      volunteer_vacancies: volunteerVacancies,
    };

    const response = await fetch("/api/workouts/", {
      method: "POST",
      body: JSON.stringify(eventDetails),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }

    if (response.ok) {
      // Clear all fields after successful submission
      setEmoji("🧠");
      setTitle("");
      setSubtitle("");
      setImage("");
      setDate("");
      setLocation("");
      setEventId(1);
      setBannerImg("");
      setDescription("");
      setOrganiser("");
      setOrganiserImg("");
      setParticipantVacancies(30);
      setVolunteerVacancies(15);
      setError(null);
      setTime("");
      setPoints(0);
      setEmptyFields([]);

      // Dispatch the newly created event
      dispatch({ type: "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        Add a New Event
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Emoji"
            fullWidth
            variant="outlined"
            value={emoji}
            onChange={(e) => setEmoji(e.target.value)}
            error={emptyFields.includes("emoji")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Event Title"
            fullWidth
            variant="outlined"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={emptyFields.includes("title")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Subtitle"
            fullWidth
            variant="outlined"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            error={emptyFields.includes("subtitle")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Image URL"
            fullWidth
            variant="outlined"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            error={emptyFields.includes("image")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Date"
            fullWidth
            variant="outlined"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            error={emptyFields.includes("date")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Time"
            fullWidth
            variant="outlined"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            error={emptyFields.includes("time")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Points"
            fullWidth
            variant="outlined"
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            error={emptyFields.includes("points")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Location"
            fullWidth
            variant="outlined"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            error={emptyFields.includes("location")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Event ID"
            fullWidth
            variant="outlined"
            type="number"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            error={emptyFields.includes("eventId")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Banner Image URL"
            fullWidth
            variant="outlined"
            value={bannerImg}
            onChange={(e) => setBannerImg(e.target.value)}
            error={emptyFields.includes("bannerImg")}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Description"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            error={emptyFields.includes("description")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Organiser"
            fullWidth
            variant="outlined"
            value={organiser}
            onChange={(e) => setOrganiser(e.target.value)}
            error={emptyFields.includes("organiser")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Organiser Image URL"
            fullWidth
            variant="outlined"
            value={organiserImg}
            onChange={(e) => setOrganiserImg(e.target.value)}
            error={emptyFields.includes("organiserImg")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Participant Vacancies"
            fullWidth
            variant="outlined"
            type="number"
            value={participantVacancies}
            onChange={(e) => setParticipantVacancies(e.target.value)}
            error={emptyFields.includes("participantVacancies")}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label="Volunteer Vacancies"
            fullWidth
            variant="outlined"
            type="number"
            value={volunteerVacancies}
            onChange={(e) => setVolunteerVacancies(e.target.value)}
            error={emptyFields.includes("volunteerVacancies")}
          />
        </Grid>

        <Grid item xs={12}>
          <Button variant="contained" color="primary" type="submit">
            Add Event
          </Button>
        </Grid>

        {error && (
          <Grid item xs={12}>
            <Typography color="error">{error}</Typography>
          </Grid>
        )}
      </Grid>
    </form>
  );
};

export default WorkoutForm;
