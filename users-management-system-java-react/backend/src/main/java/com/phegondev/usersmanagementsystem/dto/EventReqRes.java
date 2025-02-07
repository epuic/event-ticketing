package com.phegondev.usersmanagementsystem.dto;


import com.fasterxml.jackson.annotation.JsonInclude;
import com.phegondev.usersmanagementsystem.entity.Event;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class EventReqRes {
    private int statusCode;
    private String message;
    private String error;
    private String name;
    private String location;
    private String description;
    private LocalDateTime dateTime;
    private String imageUrl;
    private double price;
    private int availableTickets;
    private Event event;
    private List<Event> eventList;
}
