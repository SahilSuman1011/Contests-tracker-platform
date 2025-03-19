
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines multiple class names into a single className string
 * @param inputs The class names to combine
 * @returns A string containing all class names, with duplicates removed
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a date to a human-readable string
 * @param date The date to format
 * @returns A human-readable date string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

/**
 * Calculates time remaining until a future date
 * @param futureDate The future date
 * @returns An object containing days, hours, minutes, and seconds remaining
 */
export function getTimeRemaining(futureDate: Date | string) {
  const now = new Date();
  const future = typeof futureDate === 'string' ? new Date(futureDate) : futureDate;
  
  const totalSeconds = Math.floor((future.getTime() - now.getTime()) / 1000);
  
  if (totalSeconds <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }
  
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  
  return { days, hours, minutes, seconds, total: totalSeconds };
}

/**
 * Get platform color class for styling
 * @param platform The contest platform
 * @returns Tailwind color class for the platform
 */
export function getPlatformColorClass(platform: string): string {
  switch (platform.toLowerCase()) {
    case 'codeforces':
      return 'text-platforms-codeforces';
    case 'codechef':
      return 'text-platforms-codechef';
    case 'leetcode':
      return 'text-platforms-leetcode';
    default:
      return 'text-gray-500';
  }
}

/**
 * Get platform background color class for styling
 * @param platform The contest platform
 * @returns Tailwind background color class for the platform
 */
export function getPlatformBgClass(platform: string): string {
  switch (platform.toLowerCase()) {
    case 'codeforces':
      return 'bg-platforms-codeforces';
    case 'codechef':
      return 'bg-platforms-codechef';
    case 'leetcode':
      return 'bg-platforms-leetcode';
    default:
      return 'bg-gray-500';
  }
}

/**
 * Get platform border color class for styling
 * @param platform The contest platform
 * @returns Tailwind border color class for the platform
 */
export function getPlatformBorderClass(platform: string): string {
  switch (platform.toLowerCase()) {
    case 'codeforces':
      return 'border-platforms-codeforces';
    case 'codechef':
      return 'border-platforms-codechef';
    case 'leetcode':
      return 'border-platforms-leetcode';
    default:
      return 'border-gray-500';
  }
}

/**
 * Format duration in seconds to a human-readable string
 * @param durationInSeconds Duration in seconds
 * @returns A human-readable duration string
 */
export function formatDuration(durationInSeconds: number): string {
  const hours = Math.floor(durationInSeconds / 3600);
  const minutes = Math.floor((durationInSeconds % 3600) / 60);
  
  if (hours === 0) {
    return `${minutes} min`;
  }
  
  return `${hours} hr${hours > 1 ? 's' : ''} ${minutes > 0 ? `${minutes} min` : ''}`;
}

/**
 * Truncate text if it exceeds maximum length
 * @param text Text to truncate
 * @param maxLength Maximum length before truncation
 * @returns Truncated text with ellipsis if needed
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
}
