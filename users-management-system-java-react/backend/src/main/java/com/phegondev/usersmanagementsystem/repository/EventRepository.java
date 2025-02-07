package com.phegondev.usersmanagementsystem.repository;

import com.phegondev.usersmanagementsystem.entity.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {

}
