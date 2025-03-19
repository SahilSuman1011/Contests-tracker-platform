
import { ExternalLink, Timer, Trophy } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { BookmarkButton } from "./BookmarkButton";
import { TimeRemaining } from "./TimeRemaining";
import { Contest } from "@/lib/types";
import { formatDate, formatDuration, getPlatformColorClass, truncateText } from "@/lib/utils";
import { getSolutionLink } from "@/lib/api";

interface ContestCardProps {
  contest: Contest;
  type: 'upcoming' | 'ongoing' | 'past';
  onBookmarkToggle?: () => void;
}

export function ContestCard({ contest, type, onBookmarkToggle }: ContestCardProps) {
  const now = new Date();
  const startDate = new Date(contest.startTime);
  const endDate = new Date(contest.endTime);
  
  const solutionLink = getSolutionLink(contest.id) || contest.solutionLink;
  
  // Determine if contest is in the past, ongoing, or upcoming
  const isPast = endDate < now;
  const isOngoing = startDate <= now && endDate >= now;
  
  // Get platform-specific styling
  const platformClass = getPlatformColorClass(contest.platform);
  
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-md border border-border/40 bg-card/80 backdrop-blur-sm">
      <CardContent className="p-4 pb-2">
        <div className="flex justify-between items-start gap-4">
          <div>
            <Badge 
              variant="outline" 
              className={`${platformClass} mb-2 capitalize`}
            >
              {contest.platform}
            </Badge>
            <h3 className="font-medium text-lg mb-1">{truncateText(contest.name, 60)}</h3>
            
            <div className="space-y-1 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="flex items-center">
                  <Timer className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                  {formatDate(startDate)}
                </span>
              </div>
              <div className="flex items-center">
                <span className="text-xs">Duration: {formatDuration(contest.duration)}</span>
              </div>
            </div>
          </div>
          
          <BookmarkButton 
            contest={contest} 
            onToggle={() => {
              if (onBookmarkToggle) onBookmarkToggle();
            }} 
          />
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2 flex justify-between items-center">
        <div>
          {type === 'upcoming' && (
            <TimeRemaining startTime={contest.startTime} />
          )}
          {type === 'ongoing' && (
            <span className="text-green-500 font-medium flex items-center">
              <Trophy className="h-4 w-4 mr-1" />
              Live now
            </span>
          )}
          {type === 'past' && solutionLink && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-primary underline-offset-4 text-sm"
                    onClick={() => window.open(solutionLink, '_blank')}
                  >
                    View Solution
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Watch the solution on YouTube</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="text-xs gap-1.5 h-8"
          onClick={() => window.open(contest.url, '_blank')}
        >
          <span>Open</span>
          <ExternalLink className="h-3.5 w-3.5" />
        </Button>
      </CardFooter>
    </Card>
  );
}
