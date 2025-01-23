# Event Calendar

An 'Event Calendar' to view the calendar events saved to your Google Account. Made using Next.js and Supabase.

## Table of Contents

- [Live Link](#live-link)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Running the Project Locally](#running-the-project-locally)

## Live Link

You can check out Event Calendar [here]().

## Features

- Secure SSO login using Google
- View _upcoming_ (max. 20) and _past weeks's_ Google Calendar events
- _Filter_ events by date
- Client-Side Pagination

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Supabase](https://supabase.com/) for authentication
- [TailwindCSS](https://tailwindcss.com/)

## Running the Project Locally

These instructions will help you set up a copy of the project on your local machine.

### Prerequisites

Before getting started, make sure you have Node.js and npm (Node Package Manager) installed on your machine.

### Installing & Usage

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/Krishnanand2517/whitecarrot-assignment
   ```

1. Navigate to the project directory & install the project dependencies:

   ```bash
   npm install
   ```

1. Copy the environment variables to a new file `.env.local`:

   ```bash
   cp .env.sample .env.local
   ```

   Obtain the values and API keys for the variables from your Supabase project (create a new Supabase project, if you haven't done so already).

1. Once you have installed the project and its dependencies, you can run the development server:

   ```bash
   npm run dev
   ```

   This will start the development server on port 3000, and you can access the project in your web browser at http://localhost:3000/.

### Contribute

If you encounter any issues, have suggestions, or want to contribute, feel free to open an issue or submit a pull request. Happy coding!
