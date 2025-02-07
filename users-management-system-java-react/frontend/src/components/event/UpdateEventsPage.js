import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import UserService from '../service/UserService';
import EventService from "../service/EventService";

function UpdateEvent() {
    const navigate = useNavigate();
    const { eventId } = useParams();


    const [eventData, setEventData] = useState({
        name: '',
        location: '',
        description: '',
        dateTime: '',
        availableTickets: '',
        price: '',
        imageUrl: ''
    });

    useEffect(() => {
        fetchEventDataById(eventId); // Pass the userId to fetchUserDataById
    }, [eventId]); //wheen ever there is a chane in userId, run this

    const fetchEventDataById = async (eventId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await EventService.getEventById(eventId, token); // Pass userId to getUserById
            const { name, location, description, dateTime, availableTickets, price, imageUrl } = response.event;
            setEventData({ name, location, description, dateTime, availableTickets, price, imageUrl});
        } catch (error) {
            console.error('Error fetching event data:', error);
        }
    };


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevEventData) => ({
            ...prevEventData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const confirmUpdate = window.confirm('Are you sure you want to update this user?');
            if (confirmUpdate) {
                const token = localStorage.getItem('token');
                const res = await EventService.updateEvent(eventId, eventData, token);
                console.log(res)
                // Redirect to profile page or display a success message
                navigate("/admin/events")
            }

        } catch (error) {
            console.error('Error updating event profile:', error);
            alert(error)
        }
    };

    return (
        <div className="auth-container">
            <h2>Update User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={eventData.name} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Location:</label>
                    <input type="text" name="location" value={eventData.location} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <input type="text" name="description" value={eventData.description} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Date:</label>
                    <input type="datetime-local" name="dateTime" value={eventData.dateTime} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Tickets:</label>
                    <input type="number" name="availableTickets" value={eventData.availableTickets} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="number" name="price" value={eventData.price} onChange={handleInputChange} />
                </div>
                <div className="form-group">
                    <label>Imagine Url:</label>
                    <input type="text" name="imageUrl" value={eventData.imageUrl} onChange={handleInputChange} />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    );
}

export default UpdateEvent;
