GroupBook
Live Demo

GroupBook is a web-based app designed for yoga studios to streamline their class scheduling and booking process. Built with React on the frontend and Supabase on the backend, this app enables studios to manage their class offerings and allows clients to easily book sessions.

Features
Fast Studio Setup: Yoga studios can sign up and create their profile in under 90 seconds.
Class Management: Studios can add and manage their classes, including setting the available spots for each class.
Client Access: Clients can use a unique code provided by the studio to log in and view all available classes.
Real-time Booking Updates: When a client books a class, the available spots for that class are updated in real time.
Technologies Used
Frontend: React, styled-components for styling.
Backend: Supabase (PostgreSQL database, authentication).
Hosting: Netlify.
How It Works
A yoga studio creates a new account and adds their studio details.
The studio can then quickly add classes, specifying the number of available spaces.
The studio shares a unique login code with their clients.
Clients use this code to view the studio’s class schedule and book their desired sessions.
When a booking is made, the number of available spots is updated instantly.
Getting Started
To run the project locally:

Clone the repository:

bash
Copy code
git clone https://github.com/your-username/groupbook.git
cd groupbook
Install the dependencies:

bash
Copy code
npm install
Create a .env file with your Supabase keys:

bash
Copy code
REACT_APP_SUPABASE_URL=your_supabase_url
REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
Run the app:

bash
Copy code
npm start
Future Enhancements
Add more customization options for studios (e.g., class durations, pricing).
Implement payment integration for class bookings.
Introduce notifications (e.g., email or SMS reminders for booked classes).
Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

