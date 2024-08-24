import { useState } from "react";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";
import { useAuthContext } from "../hooks/useAuthContext";

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
  const [time,setTime] = useState("");
  const [points,setPoints] = useState(0);
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

    // Create the JSON object based on the entered fields
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
      volunteer_vacancies: volunteerVacancies
    };

    // API call to submit the event details
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
      setEmptyFields(json.emptyFields);
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
    <form className="create" onSubmit={handleSubmit}>
      <h3>Add a New Event</h3>

      <label>Emoji:</label>
      <input
        type="text"
        onChange={(e) => setEmoji(e.target.value)}
        value={emoji}
        className={emptyFields.includes("emoji") ? "error" : ""}
      />

      <label>Event Title:</label>
      <input
        type="text"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
        className={emptyFields.includes("title") ? "error" : ""}
      />

      <label>Subtitle:</label>
      <input
        type="text"
        onChange={(e) => setSubtitle(e.target.value)}
        value={subtitle}
        className={emptyFields.includes("subtitle") ? "error" : ""}
      />

      <label>Image URL:</label>
      <input
        type="text"
        onChange={(e) => setImage(e.target.value)}
        value={image}
        className={emptyFields.includes("image") ? "error" : ""}
      />

      <label>Date:</label>
      <input
        type="text"
        onChange={(e) => setDate(e.target.value)}
        value={date}
        className={emptyFields.includes("date") ? "error" : ""}
      />
      <label>Time:</label>
      <input
        type="text"
        onChange={(e) => setTime(e.target.value)}
        value={date}
        className={emptyFields.includes("time") ? "error" : ""}
      />
      <label>Points:</label>
      <input
        type="number"
        onChange={(e) => setPoints(e.target.value)}
        value={points}
        className={emptyFields.includes("points") ? "error" : ""}
      />
      <label>Location:</label>
      <input
        type="text"
        onChange={(e) => setLocation(e.target.value)}
        value={location}
        className={emptyFields.includes("location") ? "error" : ""}
      />

      <label>Event ID:</label>
      <input
        type="number"
        onChange={(e) => setEventId(e.target.value)}
        value={eventId}
        className={emptyFields.includes("eventId") ? "error" : ""}
      />

      <label>Banner Image URL:</label>
      <input
        type="text"
        onChange={(e) => setBannerImg(e.target.value)}
        value={bannerImg}
        className={emptyFields.includes("bannerImg") ? "error" : ""}
      />

      <label>Description:</label>
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        value={description}
        className={emptyFields.includes("description") ? "error" : ""}
      />

      <label>Organiser:</label>
      <input
        type="text"
        onChange={(e) => setOrganiser(e.target.value)}
        value={organiser}
        className={emptyFields.includes("organiser") ? "error" : ""}
      />

      <label>Organiser Image URL:</label>
      <input
        type="text"
        onChange={(e) => setOrganiserImg(e.target.value)}
        value={organiserImg}
        className={emptyFields.includes("organiserImg") ? "error" : ""}
      />

      <label>Participant Vacancies:</label>
      <input
        type="number"
        onChange={(e) => setParticipantVacancies(e.target.value)}
        value={participantVacancies}
        className={emptyFields.includes("participantVacancies") ? "error" : ""}
      />

      <label>Volunteer Vacancies:</label>
      <input
        type="number"
        onChange={(e) => setVolunteerVacancies(e.target.value)}
        value={volunteerVacancies}
        className={emptyFields.includes("volunteerVacancies") ? "error" : ""}
      />

      <button>Add Event</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default WorkoutForm;