# Echoes

## Overview

Echoes is a personal memories app built using the MERN stack (MongoDB, Express.js, React, Node.js). It allows users to capture, organize, and reflect on their thoughts, tasks, and significant life experiences. Echoes aims to create a vibrant platform for users to document their journey and revisit cherished memories.

## Features

1. Dashboard/Overview
   Get a snapshot of your latest notes, upcoming reminders, and analytics on your note-taking habits.
2. Notes Section
   Categorized Notes: Organize your notes into categories such as work, personal, and travel.
   Tagging System: Easily search and sort your notes with tags.
   Rich Text Editor: Format notes with bullet points, code snippets, and media embeds.
3. Journal Section
   Write daily journals and capture your thoughts.
   Mood Tracker: Log your mood with emojis or color gradients.
   Calendar View: Visualize your journal entries by date.
4. Tasks & To-Do Lists
   Create and manage to-do lists with checkboxes.
   Set reminders and prioritize tasks with labels (high, medium, low).
5. Memory Timeline
   Create a visual timeline of significant life events, complete with photos and notes.
6. Goals & Milestones
   Set and track personal goals, with progress visualization to keep you motivated.
7. Photo Albums
   Create and organize photo albums with descriptions and collage-making features.
8. Reminders & Calendar
   Set reminders for tasks and integrate with Google Calendar to stay on top of your schedule.
9. Audio & Voice Notes
   Record and store audio notes, with optional transcription to text.
10. Collaborative Notes
    Share and collaborate on notes with others, including comments and revision history.
11. Inspiration & Prompts
    Access daily or weekly writing prompts and inspiring quotes to encourage reflection.
12. Bookmarks & Resources
    Save and categorize important articles and links for easy access later.
13. Private vs. Public Notes
    Choose the visibility of your notes: private, shareable, or publishable.
14. Search & Filtering
    Use advanced search and filtering options to quickly find notes, tasks, or journals.
15. Customization & Themes
    Personalize the app's appearance with themes, fonts, and layouts.
16. Notifications & Alerts
    Receive notifications for reminders and weekly activity summaries.
17. Mobile App Sync
    Sync your notes across devices and enable offline access for uninterrupted usage.
18. Integrations
    Sync with popular third-party apps and share content directly on social media.
19. Analytics & Reports
    Gain insights into your productivity and emotional patterns with visual graphs.
20. Backup & Export
    Backup your notes to cloud storage and export them in various formats (PDF, markdown, Word).

## Technologies Used

- Frontend: React, Redux, CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Media Storage: Supabase
- Authentication: JWT (JSON Web Tokens)

## Getting Started

1. Clone the Repository:

   ```bash
   git clone https://github.com/Kr-Upendra/keep-memories
   ```

2. Install Dependencies: Navigate to the root directory and install dependencies for both the frontend and backend.

   ```bash
   cd echoes-app

   # install dependencies for frontend
   cd frontend
   yarn

   # install dependencies for backend
   cd backend
   yarn
   ```

3. Set Up Environment Variables: Create .env files at both client side and server side. Setup enviroments variables from given sample files.

4. Run the Application: Start the backend server and the frontend client.

   ```bash
   # In the backend directory

   yarn dev

   # In a new terminal, in the client directory

   yarn dev
   ```

5. Access the App:

- Open your browser and navigate to http://localhost:5173 to start using Echoes.

## Contributing

We welcome contributions! Please refer to our [contribute.md](./contribute.md) for guidelines on how to get involved.
