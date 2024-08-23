import './App.css';
import React, { useState } from 'react';
import EventCard from './components/EventCard';
import EventPage from './components/EventPage';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="App">
      { 
        isOpen ? (
          <EventPage 
            emoji="🍵" 
            title="Chai Gathering" 
            subtitle="Connect over a cup of tea." 
            date="26th August, 2024" 
            time="16:00 - 17:00"
            location="Kennedy Town" 
          />
        ) : (
          <EventCard 
            emoji="🍵" 
            title="Chai Gathering" 
            subtitle="Connect over a cup of tea." 
            date="26th August, 2024" 
            location="Kennedy Town" 
            onOpen={() => setIsOpen(true)}
          /> 
        )
      }
    </div>
  );
}

export default App;
