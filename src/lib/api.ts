import { Contest, Platform } from './types';
import { fetchAllPlatformVideos, findMatchingVideo } from './youtubeApi';

/**
 * Fetches contests from Codeforces API
 * @returns Array of Contest objects from Codeforces
 */
const fetchCodeforcesContests = async (): Promise<Contest[]> => {
  try {
    const response = await fetch('https://codeforces.com/api/contest.list');
    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error('Failed to fetch Codeforces contests');
    }
    
    return data.result.map((contest: any) => ({
      id: `cf-${contest.id}`,
      name: contest.name,
      platform: 'codeforces' as Platform,
      url: `https://codeforces.com/contest/${contest.id}`,
      startTime: new Date((contest.startTimeSeconds) * 1000).toISOString(),
      endTime: new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000).toISOString(),
      duration: contest.durationSeconds,
    }));
  } catch (error) {
    console.error('Error fetching Codeforces contests:', error);
    return [];
  }
};

/**
 * Fetches contests from CodeChef API
 * Note: This is a mock implementation as CodeChef doesn't have a public API
 * In a real application, you might need to use web scraping or a different approach
 * @returns Array of Contest objects from CodeChef
 */
const fetchCodechefContests = async (): Promise<Contest[]> => {
  // In a real implementation, you would fetch actual data
  // This is just placeholder data for demonstration
  try {
    const response = await fetch('https://kontests.net/api/v1/code_chef');
    const data = await response.json();
    
    return data.map((contest: any) => ({
      id: `cc-${contest.name.replace(/\s+/g, '-').toLowerCase()}`,
      name: contest.name,
      platform: 'codechef' as Platform,
      url: contest.url,
      startTime: new Date(contest.start_time).toISOString(),
      endTime: new Date(contest.end_time).toISOString(),
      duration: (new Date(contest.end_time).getTime() - new Date(contest.start_time).getTime()) / 1000,
    }));
  } catch (error) {
    console.error('Error fetching CodeChef contests:', error);
    return [];
  }
};

/**
 * Fetches contests from LeetCode API
 * Note: This is a mock implementation as LeetCode doesn't have a public API for contests
 * In a real application, you might need to use web scraping or a different approach
 * @returns Array of Contest objects from LeetCode
 */
const fetchLeetcodeContests = async (): Promise<Contest[]> => {
  try {
    const response = await fetch('https://kontests.net/api/v1/leet_code');
    const data = await response.json();
    
    return data.map((contest: any) => ({
      id: `lc-${contest.name.replace(/\s+/g, '-').toLowerCase()}`,
      name: contest.name,
      platform: 'leetcode' as Platform,
      url: contest.url,
      startTime: new Date(contest.start_time).toISOString(),
      endTime: new Date(contest.end_time).toISOString(),
      duration: (new Date(contest.end_time).getTime() - new Date(contest.start_time).getTime()) / 1000,
    }));
  } catch (error) {
    console.error('Error fetching LeetCode contests:', error);
    return [];
  }
};

/**
 * Fetches all contests from all platforms
 * @returns Array of Contest objects from all platforms
 */
export const fetchAllContests = async (): Promise<Contest[]> => {
  try {
    const [codeforces, codechef, leetcode] = await Promise.all([
      fetchCodeforcesContests(),
      fetchCodechefContests(),
      fetchLeetcodeContests(),
    ]);
    
    return [...codeforces, ...codechef, ...leetcode];
  } catch (error) {
    console.error('Error fetching all contests:', error);
    return [];
  }
};

/**
 * Saves a contest to bookmarks in localStorage
 * @param contest Contest to bookmark
 */
export const bookmarkContest = (contest: Contest): void => {
  const bookmarks = getBookmarkedContests();
  if (!bookmarks.some(b => b.id === contest.id)) {
    bookmarks.push(contest);
    localStorage.setItem('bookmarkedContests', JSON.stringify(bookmarks));
  }
};

/**
 * Removes a contest from bookmarks in localStorage
 * @param contestId ID of contest to remove from bookmarks
 */
export const removeBookmark = (contestId: string): void => {
  const bookmarks = getBookmarkedContests();
  const updatedBookmarks = bookmarks.filter(contest => contest.id !== contestId);
  localStorage.setItem('bookmarkedContests', JSON.stringify(updatedBookmarks));
};

/**
 * Gets all bookmarked contests from localStorage
 * @returns Array of bookmarked Contest objects
 */
export const getBookmarkedContests = (): Contest[] => {
  const bookmarksJson = localStorage.getItem('bookmarkedContests');
  return bookmarksJson ? JSON.parse(bookmarksJson) : [];
};

/**
 * Checks if a contest is bookmarked
 * @param contestId ID of contest to check
 * @returns True if contest is bookmarked, false otherwise
 */
export const isContestBookmarked = (contestId: string): boolean => {
  const bookmarks = getBookmarkedContests();
  return bookmarks.some(contest => contest.id === contestId);
};

/**
 * Updates a contest solution link
 * @param contestId ID of contest to update
 * @param solutionLink URL of solution video
 */
export const updateSolutionLink = (contestId: string, solutionLink: string): void => {
  // In a real application, you would update this in a database
  // For this demo, we'll use localStorage
  const solutionsJson = localStorage.getItem('contestSolutions') || '{}';
  const solutions = JSON.parse(solutionsJson);
  solutions[contestId] = solutionLink;
  localStorage.setItem('contestSolutions', JSON.stringify(solutions));
};

/**
 * Gets solution link for a contest
 * @param contestId ID of contest to get solution for
 * @returns Solution link or undefined if not found
 */
export const getSolutionLink = (contestId: string): string | undefined => {
  const solutionsJson = localStorage.getItem('contestSolutions') || '{}';
  const solutions = JSON.parse(solutionsJson);
  return solutions[contestId];
};

/**
 * Automatically fetch and update solution links from YouTube for past contests
 * @returns Object with counts of updated and total contests
 */
export const autoFetchSolutionLinks = async (pastContests: Contest[]): Promise<{ updated: number, total: number }> => {
  try {
    // Fetch all videos from platform playlists
    const platformVideos = await fetchAllPlatformVideos();
    
    let updatedCount = 0;
    
    // For each past contest, try to find a matching video
    for (const contest of pastContests) {
      // Skip if contest already has a solution link
      if (getSolutionLink(contest.id)) {
        continue;
      }
      
      // Get videos for this contest's platform
      const platformVideoList = platformVideos[contest.platform];
      
      // Find matching video for this contest
      const matchingVideo = findMatchingVideo(contest.name, contest.platform, platformVideoList);
      
      // If match found, update solution link
      if (matchingVideo) {
        updateSolutionLink(contest.id, matchingVideo.url);
        updatedCount++;
      }
    }
    
    return {
      updated: updatedCount,
      total: pastContests.length
    };
  } catch (error) {
    console.error('Error auto-fetching solution links:', error);
    return { updated: 0, total: 0 };
  }
};
