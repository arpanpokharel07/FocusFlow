# FocusFlow

FocusFlow is a mobile-friendly web application designed to boost your productivity. It centralizes the management of long-term goals, daily habits, and to-do lists—providing you with a personalized companion to plan and track your progress.

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [File Structure](#file-structure)
- [Usage](#usage)
- [Team](#team)
- [License](#license)
- [Acknowledgements](#acknowledgements)

## Overview

FocusFlow delivers an intuitive interface built with HTML, jQuery Mobile, and Bootstrap. The application is optimized for mobile devices, ensuring you can stay on track whether you're at home or on the go.

## Features

- **Home Page:**  
  A welcoming dashboard that directs users to the various sections of the app.

- **Long Term Goal:**  
  Set up countdown timers for your long-term objectives. Easily add new timers and view real-time updates to keep you motivated.

- **Habit List:**  
  Create and manage habits by scheduling start and end times, helping you build routines and enhance efficiency.

- **To-Do List:**  
  A flexible task manager where you can quickly add or remove tasks, ensuring daily activities are effectively tracked and managed.

- **Contact Us:**  
  Provides contact details for the team members behind FocusFlow, offering an avenue for feedback or support.

## Technologies Used

- **HTML5:** For the overall structure of the application.
- **jQuery (v2.1.4):** For DOM manipulation and event handling.
- **jQuery Mobile (v1.4.5):** For creating a mobile-friendly UI.
- **Bootstrap (v4.5.2):** For responsive design elements.
- **Google Fonts:** Utilizing the Poppins font for a modern look.
- **Custom Scripts & Styles:** Additional functionality and styles are included via JavaScript and CSS files in the `_lib` directory.


## File Structure

```plaintext
.
├── index.html               # Main HTML file containing the app's structure
├── _lib
│   ├── js
│   │   ├── lib
│   │   │   ├── jquery-2.1.4.js
│   │   │   ├── jquery.mobile-1.4.5.js
│   │   │   └── script.js
│   │   ├── TaskManager.js   # Manages tasks and timers
│   │   └── todostyles.js    # Additional JavaScript for To-Do list styling
│   └── css
│       ├── lib
│       │   ├── jquery.mobile-1.4.5.css
│       │   └── styles.css   # Custom styles for the app
├── image
│   ├── FocusFlow.png        # Logo used on the Home page
│   ├── notebook.png         # Image for the To-Do List page
│   └── plus.png             # Icon used in various interactive elements
└── README.md                # This file

# FocusFlow

## Usage

### Download or Clone the Repository
```bash
git clone https://github.com/yourusername/focusflow.git
```

### Open the Application
- Open `index.html` in your preferred web browser.
- Alternatively, host the project on a web server for remote access.

### Navigate the Application
- Use the bottom navigation bar to switch between the Home, Goals, Habit, To-Do, and Contact pages.
- Interact with features such as adding timers, scheduling habits, and managing to-do items.

## Team

- **Siddharth Kumar**  
  Student #: 8846896  
  Email: skumar6896@conestogac.on.ca  


- **Rohit Rohit**  
  Student #: 8847123  
  Email: rohit7123@conestogac.on.ca  

- **Arpan Pokharel**  
  Student #: 8708611  
  Email: arpanpokharel07@gmail.com  

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgements

- jQuery and jQuery Mobile for the mobile-friendly interactions.
- Bootstrap for responsive design support.
- Google Fonts for the Poppins typeface.
