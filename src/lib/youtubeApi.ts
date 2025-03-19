
import { Platform } from './types';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;


// YouTube playlist IDs for each platform
const YOUTUBE_PLAYLISTS = {
  codeforces: 'PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB',
  leetcode: 'PLcXpkI9A-RZI6FhydNz3JBt-pi25Cbr',
  codechef: 'PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr'
};

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  url: string;
}

/**
 * Fetch videos from a YouTube playlist
 * @param playlistId The YouTube playlist ID
 * @returns Array of video details
 */
export const fetchPlaylistVideos = async (playlistId: string): Promise<YouTubeVideo[]> => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('YouTube API error:', data);
      throw new Error(data.error?.message || 'Failed to fetch YouTube videos');
    }
    
    return data.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
    }));
  } catch (error) {
    console.error('Error fetching YouTube playlist:', error);
    return [];
  }
};

/**
 * Match a contest name with YouTube video titles
 * @param contestName The name of the contest
 * @param contestPlatform The platform of the contest
 * @param videos Array of YouTube videos
 * @returns The matching video or undefined if no match found
 */
export const findMatchingVideo = (
  contestName: string, 
  contestPlatform: Platform, 
  videos: YouTubeVideo[]
): YouTubeVideo | undefined => {
  // For demo purposes, using simple substring matching
  // In production, you might want more sophisticated matching
  const platformName = contestPlatform.charAt(0).toUpperCase() + contestPlatform.slice(1);
  
  // Different platforms might have different naming conventions for their videos
  return videos.find(video => {
    // Check if video title contains both platform name and contest name
    const hasContestName = video.title.toLowerCase().includes(contestName.toLowerCase());
    const hasPlatformName = video.title.toLowerCase().includes(platformName.toLowerCase());
    
    return hasContestName && hasPlatformName;
  });
};

/**
 * Fetch videos from all platform playlists
 * @returns Object with platform keys and arrays of videos
 */
export const fetchAllPlatformVideos = async (): Promise<Record<Platform, YouTubeVideo[]>> => {
  try {
    const [codeforcesVideos, leetcodeVideos, codechefVideos] = await Promise.all([
      fetchPlaylistVideos(YOUTUBE_PLAYLISTS.codeforces),
      fetchPlaylistVideos(YOUTUBE_PLAYLISTS.leetcode),
      fetchPlaylistVideos(YOUTUBE_PLAYLISTS.codechef)
    ]);
    
    return {
      codeforces: codeforcesVideos,
      leetcode: leetcodeVideos,
      codechef: codechefVideos
    };
  } catch (error) {
    console.error('Error fetching videos from all platforms:', error);
    return { 
      codeforces: [],
      leetcode: [],
      codechef: []
    };
  }
};
