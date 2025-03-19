
/**
 * Contest platforms
 */
export type Platform = 'codeforces' | 'codechef' | 'leetcode';

/**
 * Contest data structure
 */
export interface Contest {
  id: string;
  name: string;
  platform: Platform;
  url: string;
  startTime: string; // ISO format
  endTime: string; // ISO format
  duration: number; // in seconds
  solutionLink?: string;
}

/**
 * Filter state for platform selection
 */
export interface FilterState {
  codeforces: boolean;
  codechef: boolean;
  leetcode: boolean;
}

/**
 * Tab selection for contest view
 */
export type ContestTab = 'upcoming' | 'ongoing' | 'past';

/**
 * Theme mode
 */
export type Theme = 'light' | 'dark' | 'system';
