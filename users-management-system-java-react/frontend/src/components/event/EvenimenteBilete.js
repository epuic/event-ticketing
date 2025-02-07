import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EventService from '../service/EventService';
import './EvenimenteBilete.css';


function EventsPage() {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const token = localStorage.getItem('token'); // Retrieve the token from localStorage
            const response = await EventService.getAllEventsUser(token);
            setEvents(response.eventList || []); // Handle cases where the list might be empty or undefined
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const handleBuyTicket = (eventId) => {
        navigate(`/buy-ticket/${eventId}`);
    };

    return (
        <div className="events-container">
            <h2>Upcoming Events</h2>
            <div className="events-grid">
                {events.map((event) => (
                    <div className="event-card" key={event.id}>
                        <img
                            src={event.imageUrl}
                            alt={event.name}
                            className="event-image"
                        />
                        <h3>{event.name}</h3>
                        <p><strong>Location:</strong> {event.location}</p>
                        <p><strong>Description:</strong> {event.description}</p>
                        <p><strong>Date:</strong> {new Date(event.dateTime).toLocaleString()}</p>
                        <p><strong>Tickets Available:</strong> {event.availableTickets}</p>
                        <p><strong>Price:</strong> {event.price} lei</p>

                        <button
                            className="buy-ticket-button"
                            onClick={() => handleBuyTicket(event.id)}
                        >
                            Buy Ticket
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventsPage;
