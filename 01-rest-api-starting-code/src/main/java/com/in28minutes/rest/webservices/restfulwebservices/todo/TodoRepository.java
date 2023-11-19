package com.in28minutes.rest.webservices.restfulwebservices.todo;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository extends JpaRepository<Todo,Integer> {
    List<Todo> findByUsername(String username);
}
