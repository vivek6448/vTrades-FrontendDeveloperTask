# DE5 Frontend Assignment

## Tech Stack
//Frontend: React.js
//Styling: Tailwind CSS
//Routing: React Router DOM
//API: Mock API using Promise / setTimeout (simulating backend)
//Version Control: Git & GitHub

## How to Run
npm install
npm start

## Libraries
npm install Firebase   // Used this for JWT mock api 
npm install lucide-react  // Used for password hide/show functionality
npm install tailwindcss @tailwindcss/vite   // Used for CSS
npm i react-router-dom   // Used to directly navigate between pages

## Features

 Email & Password Login Form
 Google Sign-In Button (Mock API Integration)
 Form Validation (required fields, basic checks)
Responsive Layout 
Tailwind CSS Styling 
 React Router for Page Routing
Clean Component-Based Architecture

## How Authentication Works (Mock Flow)

User enters email and password or clicks on Google Sign-In.
A mock API request is triggered using async/await.
If credentials match the mocked response, user is considered authenticated.
User is redirected to the Home/Dashboard page.
Authentication state is managed on the client side.