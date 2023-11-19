package com.in28minutes.rest.webservices.restfulwebservices.todo;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TodoResource {

    private TodoService todoService;

    private TodoRepository todoRepository;

    public TodoResource(TodoService todoService, TodoRepository todoRepository){
        this.todoService=todoService;
        this.todoRepository=todoRepository;
    }

    @GetMapping("/users/{username}/todos")
    public List<Todo> getTodos(@PathVariable("username") String username){
        return todoRepository.findByUsername(username);
    }

    @GetMapping("/users/{username}/todos/{id}")
    public Todo getTodo(@PathVariable("username") String username,@PathVariable int id){
        return todoRepository.findById(id).get();
    }

    @DeleteMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable("username") String username, @PathVariable int id){
        todoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/users/{username}/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable("username") String username, @PathVariable int id, @RequestBody Todo todo){
        todoRepository.save(todo);
        return new ResponseEntity<>(todo, HttpStatus.ACCEPTED);
    }

    @PostMapping("/users/{username}/todos")
    public ResponseEntity<Todo> createTodo(@PathVariable("username") String username, @RequestBody Todo todo){
        todo.setId(null);
        return new ResponseEntity<>(todoRepository.save(todo), HttpStatus.CREATED);
    }
}
