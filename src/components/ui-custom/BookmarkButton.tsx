
import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Contest } from "@/lib/types";
import { bookmarkContest, removeBookmark, isContestBookmarked } from "@/lib/api";

interface BookmarkButtonProps {
  contest: Contest;
  className?: string;
  onToggle?: (isBookmarked: boolean) => void;
}

export function BookmarkButton({ contest, className = "", onToggle }: BookmarkButtonProps) {
  const [isBookmarked, setIsBookmarked] = useState(isContestBookmarked(contest.id));

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(contest.id);
      setIsBookmarked(false);
      toast({
        title: "Bookmark removed",
        description: `Removed "${contest.name}" from your bookmarks`,
      });
    } else {
      bookmarkContest(contest);
      setIsBookmarked(true);
      toast({
        title: "Bookmarked",
        description: `Added "${contest.name}" to your bookmarks`,
      });
    }
    
    if (onToggle) {
      onToggle(!isBookmarked);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleBookmark}
      className={`group transition-all duration-300 hover:bg-secondary/80 ${className}`}
      aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {isBookmarked ? (
        <BookmarkCheck className="h-5 w-5 text-primary" />
      ) : (
        <Bookmark className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
      )}
    </Button>
  );
}
