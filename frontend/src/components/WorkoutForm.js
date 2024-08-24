import { useEffect, useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { Button, Grid, TextField, Typography } from "@mui/material";

const WorkoutForm = ({ selectedWorkout, setSelectedWorkout }) => {
  const { dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();

  const [emoji, setEmoji] = useState("🧠");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [image, setImage] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [eventId, setEventId] = useState(0);
  const [time, setTime] = useState("");
  const [points, setPoints] = useState(0);
  const [bannerImg, setBannerImg] = useState("");
  const [description, setDescription] = useState("");
  const [organiser, setOrganiser] = useState("");
  const [organiserImg, setOrganiserImg] = useState("");
  const [participantVacancies, setParticipantVacancies] = useState(0);
  const [volunteerVacancies, setVolunteerVacancies] = useState(0);

  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  useEffect(() => {
    if (selectedWorkout) {
      setEmoji(selectedWorkout.emoji || "🧠");
      setTitle(selectedWorkout.title || "");
      setSubtitle(selectedWorkout.subtitle || "");
      setImage(selectedWorkout.image || "");
      setDate(selectedWorkout.date || "");
      setLocation(selectedWorkout.location || "");
      setEventId(selectedWorkout.event_id || 0);
      setTime(selectedWorkout.time || "");
      setPoints(selectedWorkout.points || 0);
      setBannerImg(selectedWorkout.banner_img || "");
      setDescription(selectedWorkout.description || "");
      setOrganiser(selectedWorkout.organiser || "");
      setOrganiserImg(selectedWorkout.organiser_img || "");
      setParticipantVacancies(selectedWorkout.participant_vacancies || 0);
      setVolunteerVacancies(selectedWorkout.volunteer_vacancies || 0);
      setIsUpdateMode(true);
    } else {
      resetForm();
      setIsUpdateMode(false);
    }
  }, [selectedWorkout]);

  const resetForm = () => {
    setEmoji("🧠");
    setTitle("");
    setSubtitle("");
    setImage("");
    setDate("");
    setLocation("");
    setEventId(0);
    setTime("");
    setPoints(0);
    setBannerImg("");
    setDescription("");
    setOrganiser("");
    setOrganiserImg("");
    setParticipantVacancies(0);
    setVolunteerVacancies(0);
    setError(null);
    setEmptyFields([]);
  };

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

    const response = await fetch(
      isUpdateMode ? `/api/workouts/${selectedWorkout._id}` : "/api/workouts/",
      {
        method: isUpdateMode ? "PATCH" : "POST",
        body: JSON.stringify(eventDetails),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields || []);
    }

    if (response.ok) {
      resetForm();
      setSelectedWorkout(null);
      setIsUpdateMode(false);
      dispatch({ type: isUpdateMode ? "UPDATE_WORKOUT" : "CREATE_WORKOUT", payload: json });
    }
  };

  return (
    <form fullWidth onSubmit={handleSubmit}>
      <Typography variant="h4" gutterBottom>
        {isUpdateMode ? "Update Event" : "Add a New Event"}
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
        
        <Grid item xs={12} sm={6}>
          <Button variant="contained" color="primary" type="submit">
            {isUpdateMode ? "Update Event" : "Add Event"}
          </Button>
        </Grid>

        {isUpdateMode? (
          <Grid item xs={12} sm={6}>
            <Button onClick={() => setSelectedWorkout(null)} variant="contained" color="primary" type="submit">
              Clear Form
            </Button>
          </Grid>
        ):null}

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
