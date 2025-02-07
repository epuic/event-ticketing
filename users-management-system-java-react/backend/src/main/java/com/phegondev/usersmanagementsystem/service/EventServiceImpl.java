package com.phegondev.usersmanagementsystem.service;

import com.phegondev.usersmanagementsystem.dto.EventReqRes;
import com.phegondev.usersmanagementsystem.dto.ReqRes;
import com.phegondev.usersmanagementsystem.entity.Event;
import com.phegondev.usersmanagementsystem.entity.OurUsers;
import com.phegondev.usersmanagementsystem.repository.EventRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImpl{

    @Autowired
    private EventRepository eventRepository;

    public EventReqRes addEvent(Event event) {
        EventReqRes response = new EventReqRes();
        try {
            Event savedEvent = eventRepository.save(event);
            response.setStatusCode(200);
            response.setMessage("Event added successfully");
            response.setEvent(savedEvent);
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
        }
        return response;
    }

    public EventReqRes getAllEvents() {
        EventReqRes response = new EventReqRes();
        try {
            List<Event> events = eventRepository.findAll();
            if (!events.isEmpty()) {
                response.setEventList(events);
                response.setStatusCode(200);
                response.setMessage("Events retrieved successfully");
            } else {
                response.setStatusCode(404);
                response.setMessage("No events found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
        }
        return response;
    }

    public EventReqRes deleteEvent(Long eventId) {
        EventReqRes response = new EventReqRes();
        try {
            Optional<Event> event = eventRepository.findById(eventId);
            if (event.isPresent()) {
                eventRepository.deleteById(eventId);
                response.setStatusCode(200);
                response.setMessage("Event deleted successfully");
            } else {
                response.setStatusCode(404);
                response.setMessage("Event not found");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage("Error occurred: " + e.getMessage());
        }
        return response;
    }

    public EventReqRes getEventById(Long id) {
        EventReqRes eventReqRes = new EventReqRes();
        try {
            Event eventById = eventRepository.findById(id).orElseThrow(() -> new RuntimeException("User Not found"));
            eventReqRes.setEvent(eventById);
            eventReqRes.setStatusCode(200);
            eventReqRes.setMessage("Event with id '" + id + "' found successfully");
        } catch (Exception e) {
            eventReqRes.setStatusCode(500);
            eventReqRes.setMessage("Error occurred: " + e.getMessage());
        }
        return eventReqRes;
    }

    public EventReqRes updateEvent(Long eventId, Event updatedEvent) {
        EventReqRes eventReqRes = new EventReqRes();
        try {
            Optional<Event> eventOptional = eventRepository.findById(eventId);
            if (eventOptional.isPresent()) {
                Event existingEvent = eventOptional.get();
                existingEvent.setDescription(updatedEvent.getDescription());
                existingEvent.setName(updatedEvent.getName());
                existingEvent.setLocation(updatedEvent.getLocation());
                existingEvent.setDateTime(updatedEvent.getDateTime());
                existingEvent.setAvailableTickets(updatedEvent.getAvailableTickets());
                existingEvent.setPrice(updatedEvent.getPrice());
                existingEvent.setImageUrl(updatedEvent.getImageUrl());

                // Check if password is present in the request

                Event savedEvent = eventRepository.save(existingEvent);
                eventReqRes.setEvent(savedEvent);
                eventReqRes.setStatusCode(200);
                eventReqRes.setMessage("Event updated successfully");
            } else {
                eventReqRes.setStatusCode(404);
                eventReqRes.setMessage("Event not found for update");
            }
        } catch (Exception e) {
            eventReqRes.setStatusCode(500);
            eventReqRes.setMessage("Error occurred while updating event: " + e.getMessage());
        }
        return eventReqRes;
    }

    public void buyTicket(Long eventId, int numberOfTickets) {
        // Caută evenimentul după ID
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        // Verifică dacă sunt suficiente bilete disponibile
        if (event.getAvailableTickets() < numberOfTickets) {
            throw new IllegalArgumentException("Not enough tickets available");
        }

        // Actualizează numărul de bilete disponibile
        event.setAvailableTickets(event.getAvailableTickets() - numberOfTickets);

        // Salvează modificările în baza de date
        eventRepository.save(event);
    }

}
