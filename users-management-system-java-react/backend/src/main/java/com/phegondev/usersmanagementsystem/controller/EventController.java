//package com.phegondev.usersmanagementsystem.controller;
//
//import com.phegondev.usersmanagementsystem.entity.Event;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//
//import java.util.List;
//
//@RestController
//@RequiredArgsConstructor
//@RequestMapping("/user/events")
//public class EventController {
//
//    private final EventService eventService;
//
//    @GetMapping
//    public ResponseEntity<List<Event>> getAllEvents() {
//        List<Event> events = eventService.getAllEvents();
//        return ResponseEntity.ok(events);
//    }
//}
