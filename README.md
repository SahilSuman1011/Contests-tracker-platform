
# CodeContest Tracker

A comprehensive platform for tracking competitive programming contests across multiple platforms including Codeforces, CodeChef, and LeetCode.

## Project Overview

CodeContest Tracker is a web application designed to help competitive programmers keep track of upcoming, ongoing, and past coding contests from popular platforms. The application provides a centralized interface to view contest details, bookmark favorite contests, and access solutions for past contests.

## Key Features

### Contest Tracking
- **Multi-platform Integration**: Fetches contest data from Codeforces, CodeChef, and LeetCode
- **Real-time Updates**: Displays upcoming, ongoing, and past contests with accurate timing information
- **Time Countdown**: Shows remaining time before upcoming contests start
- **Duration Information**: Shows contest duration in a user-friendly format

### User Experience
- **Platform Filtering**: Filter contests by one or more platforms (Codeforces, CodeChef, LeetCode)
- **Contest Bookmarking**: Save contests to a personal bookmarks list for easy access
- **Search Functionality**: Search for specific contests across all platforms
- **Responsive Design**: Fully mobile and tablet responsive UI
- **Theme Support**: Toggle between light and dark modes for comfortable viewing

### Contest Solutions
- **Solution Links**: Access YouTube solution links for past contests
- **Admin Panel**: Dedicated admin page for manually adding solution links to past contests
- **Platform-specific Solutions**: Solution videos are organized by platform
- **Auto-Fetch Solutions**: Automatically fetch and link YouTube solution videos from platform-specific playlists
- **YouTube API Integration**: Matches contest names with video titles to find relevant solutions

## Technical Implementation

### Frontend
- **React**: Uses React with TypeScript for component-based UI development
- **Vite**: Fast build tooling for modern web development
- **React Router**: Client-side routing to navigate between different views
- **Tailwind CSS**: Utility-first CSS framework for styling components
- **Shadcn UI**: Component library for consistent UI design
- **Framer Motion**: Animations for enhanced user experience
- **Tanstack Query**: Data fetching and state management

### API Integration
- **Codeforces API**: Direct integration with Codeforces API
- **Kontests API**: Used for CodeChef and LeetCode contest data
- **YouTube Data API**: Integration for automatic solution video fetching
- **Local Storage**: Persistent storage for bookmarks and user preferences

### State Management
- **React Hooks**: useState, useEffect for component-level state
- **Custom Hooks**: Abstracted logic for reusable functionality
- **Query Management**: Efficient data fetching with caching

## Project Structure

The application is organized into several key pages:

1. **Home Page**: 
   - Main contest listing with platform filters
   - Tab navigation between upcoming, ongoing, and past contests
   - Search functionality for finding specific contests

2. **Bookmarks Page**: 
   - Saved contests organized by status (upcoming, ongoing, past)
   - Quick access to bookmarked contests
   - Search within bookmarked contests

3. **Admin Page**: 
   - Interface for manually adding solution links to past contests
   - Selection of platform and contest
   - Form for adding YouTube solution links
   - Auto-fetch functionality to automatically find and link solution videos

## Data Flow

1. Contest data is fetched from multiple APIs
2. Data is normalized into a common format
3. User can filter, search, and interact with the contest listings
4. Bookmarking saves contests to local storage
5. Admin can add solution links manually or trigger auto-fetch to automatically find solutions
6. Solution links are stored in local storage for user access

## YouTube Solution Integration

The platform integrates with YouTube to provide solution videos for past contests:

### Manual Solution Linking
1. Admins can navigate to the Admin page
2. Select a platform and a specific past contest
3. Add the YouTube video URL manually
4. Submit to make the solution available to users

### Automatic Solution Linking
1. Admins can click the "Auto-Fetch Solutions" button on the Admin page
2. The system will:
   - Fetch videos from platform-specific YouTube playlists
   - Match video titles with contest names
   - Automatically link matching videos to contests
   - Display a summary of the update process

### YouTube Playlists
The system is pre-configured with the following playlists:
- Codeforces: `PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB`
- LeetCode: `PLcXpkI9A-RZI6FhydNz3JBt-pi25Cbr`
- CodeChef: `PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr`

## Usage Instructions

### For Users
1. **Viewing Contests**:
   - Visit the main page to see all contests
   - Use the platform filter buttons to select specific platforms
   - Switch tabs to view upcoming, ongoing, or past contests
   - Use the search bar to find specific contests

2. **Bookmarking Contests**:
   - Click the bookmark icon on any contest card to save it
   - Visit the Bookmarks page to view all saved contests
   - Remove bookmarks by clicking the bookmark icon again

3. **Accessing Solutions**:
   - Navigate to the Past contests tab
   - For contests with available solutions, a "View Solution" button will be displayed
   - Click the button to open the YouTube solution video

4. **Theme Switching**:
   - Use the theme toggle in the navigation bar to switch between light and dark modes

### For Admins
1. **Manual Solution Management**:
   - Navigate to the Admin page
   - Select the platform and specific contest from the dropdowns
   - Enter the YouTube solution link in the provided field
   - Click "Add Solution" to save the link

2. **Automatic Solution Fetching**:
   - On the Admin page, click the "Auto-Fetch Solutions" button
   - Wait for the process to complete
   - Review the summary showing how many solutions were updated
   - Note: Requires a valid YouTube API key to be set in the configuration

## Configuration

### YouTube API Key
To use the automatic solution fetching feature, you need to:

1. Obtain a YouTube Data API key from the Google Cloud Console
2. Update the `YOUTUBE_API_KEY` constant in the `src/lib/youtubeApi.ts` file
3. Replace the placeholder value with your actual API key

```javascript
const YOUTUBE_API_KEY = 'YOUR_YOUTUBE_API_KEY';
```

## Development Setup

If you want to work locally using your own IDE, you can clone this repo and push changes:

```sh
# Step 1: Clone the repository
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies
npm i

# Step 4: Start the development server
npm run dev
```

## Technologies Used

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- React Router
- Framer Motion
- Tanstack Query
- YouTube Data API v3
