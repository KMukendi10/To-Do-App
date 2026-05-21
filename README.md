# To-Do-App

## Overview
This is a simple to-do application built using HTML, CSS, and vanilla JavaScript. It demonstrates DOM manipulation, event handling, and data persistence using localStorage.

## Features
- Add new tasks
- Mark tasks as completed
- Delete tasks
- Filter tasks (All / Active / Completed)
- Persistent storage using localStorage

## Technologies Used
- HTML5
- CSS3
- JavaScript (ES6)
- DOM Manipulation
- localStorage API

## How It Works
Tasks are stored in an array of objects. Each task has:
- id
- text
- completed status

Whenever a task is added, deleted, or updated, the array is saved to localStorage using JSON.stringify(). On page load, data is retrieved using JSON.parse() and rendered dynamically.

## Key JavaScript Concepts Used
- querySelector() for selecting DOM elements
- addEventListener() for handling user input
- createElement() for dynamic task creation
- classList for styling completed tasks
- filter() and map() for state management
- localStorage for persistence

## What I Learned
I learned how to manipulate the DOM dynamically without frameworks, manage application state using arrays, and persist data in the browser using localStorage. I also improved my understanding of event-driven programming in JavaScript.

## Live Demo
(Add your GitHub Pages link here)