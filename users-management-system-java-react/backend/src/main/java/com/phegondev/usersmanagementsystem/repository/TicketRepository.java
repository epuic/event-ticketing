package com.phegondev.usersmanagementsystem.repository;

import com.phegondev.usersmanagementsystem.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {

}
