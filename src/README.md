# Our Timing

A web application where users can sign in to view and manage notes for different countries based on time and temperature data. Users can add notes to any country's page, view notes from others, and edit or delete only their own notes. 

## Features

- **Sign Up & Sign In**: Users can sign up or log in to access the app.
- **View Country Notes**: Users can browse notes for different countries and see the current time and temperature for each.
- **Add, Edit, or Delete Notes**: Users can add, edit, and delete their own notes associated with a specific country.
- **Profile Section**: Users can update their profile picture and name. The profile also displays the number of notes they've added and their "Member Since" information.
- **User Permissions**: Users can only modify their own notes.

## Tech Stack

- **Frontend**: Vite, TypeScript
- **Backend**: Supabase (for user authentication and database interactions)
- **Weather API**: OpenWeatherMap (for fetching country-specific time and temperature data)

## Environment Variables

Create a `.env` file in the root directory and define the following environment variables:

```env
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
VITE_SUPABASE_URL=your-supabase-url
VITE_WEATHER_API_KEY=your-openweathermap-api-key
```

### Explanation of Environment Variables:
- **VITE_SUPABASE_ANON_KEY**: Public API key used for authentication with Supabase.
- **VITE_SUPABASE_URL**: URL endpoint for your Supabase project.
- **VITE_WEATHER_API_KEY**: API key for fetching weather data from OpenWeatherMap.

## Setup

1. Clone the repository.
    ```bash
    git clone https://github.com/GauravTheBeginner/our-timing--.git
    ```
    
3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a `.env` file in the root directory and add your keys as specified above.

5. Start the development server:

    ```bash
    npm run dev
    ```

6. Visit the app at `http://localhost:5173`.

## Contribute

1. **Raise Issues**: If you face any issues or find bugs, feel free to open an issue in this repository.
2. **Work on Issues**: Once an issue is raised, you can work on fixing it or adding new features by forking the repository and submitting a pull request.

## Future Enhancements

- Add more countries and dynamic data fetching.
- Implement features like note categories or the ability to share notes.

---

This should give a good overview of how contributors can get involved, along with the required setup for the environment variables. Let me know if you need any further changes!