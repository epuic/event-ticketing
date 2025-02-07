import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EventService from '../service/EventService';
import axios from 'axios';
import './ButTicketPage.css'

function BuyTicketPage() {
    const { eventId } = useParams();
    const [event, setEvent] = useState(null);
    const [ticketsToBuy, setTicketsToBuy] = useState(1);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState('');

    useEffect(() => {
        fetchEventDetails();
        const role = localStorage.getItem('userRole');
        setUserRole(role || 'user');
    }, [eventId]);

    const fetchEventDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await EventService.getAllEvents(token);
            const selectedEvent = response.eventList.find(event => event.id === parseInt(eventId));
            setEvent(selectedEvent);
        } catch (error) {
            console.error('Error fetching event details:', error);
            setError('Failed to fetch event details');
        }
    };

    const handleTicketPurchase = async () => {
        try {
            const token = localStorage.getItem('token');
            let response;


            response = await EventService.userBuyTickets(event.id, ticketsToBuy, token);


            alert("Tickets purchased successfully!");
            navigate("/events");
        } catch (error) {
            console.error("Error purchasing tickets:", error);
            setError(error.response?.data || "An error occurred while purchasing tickets");
        }
    };

    if (!event) {
        return <p>Loading event details...</p>;
    }

    return (
        <div className="buy-ticket-container">
            <div className="event-image">
                <img
                    src={event.imageUrl || `${process.env.PUBLIC_URL}/images/event_resized.jpg`}
                    alt={event.name}
                    style={{ width: '100%' }}
                />
            </div>

            <div className="event-details-container">
                <h2>Buy Tickets for {event.name}</h2>
                <div className="event-details">
                    <p><strong>Description:</strong> {event.description}</p>
                    <p><strong>Location:</strong> {event.location}</p>
                    <p><strong>Date and Time:</strong> {event.dateTime}</p>
                    <p><strong>Available Tickets:</strong> {event.availableTickets}</p>
                </div>

                <div className="ticket-form">
                    <label>Number of Tickets:</label>
                    <input
                        type="number"
                        value={ticketsToBuy}
                        onChange={(e) => setTicketsToBuy(Number(e.target.value))}
                        min="1"
                        max={event.availableTickets}
                        required
                    />
                    <button onClick={handleTicketPurchase}>
                        {userRole === 'admin' ? 'Buy Tickets (Admin)' : 'Buy Tickets'}
                    </button>
                </div>

                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
}

export default BuyTicketPage;

