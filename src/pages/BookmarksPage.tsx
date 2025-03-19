
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { MainLayout } from "@/components/layouts/MainLayout";
import { ContestCard } from "@/components/ui-custom/ContestCard";
import { PageTransition } from "@/components/ui-custom/PageTransition";
import { Contest, ContestTab } from "@/lib/types";
import { getBookmarkedContests } from "@/lib/api";
import { Bookmark, Search } from "lucide-react";

const BookmarksPage = () => {
  const [bookmarks, setBookmarks] = useState<Contest[]>([]);
  const [activeTab, setActiveTab] = useState<ContestTab>("upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  // Load bookmarks from localStorage
  useEffect(() => {
    const loadBookmarks = () => {
      const savedBookmarks = getBookmarkedContests();
      setBookmarks(savedBookmarks);
    };

    loadBookmarks();
    
    // Set up event listener for storage changes
    const handleStorageChange = () => {
      loadBookmarks();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Filter and categorize bookmarks
  const now = new Date();
  
  const filteredBookmarks = bookmarks.filter(bookmark => 
    bookmark.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const upcomingBookmarks = filteredBookmarks.filter(bookmark => {
    const startTime = new Date(bookmark.startTime);
    return startTime > now;
  }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  
  const ongoingBookmarks = filteredBookmarks.filter(bookmark => {
    const startTime = new Date(bookmark.startTime);
    const endTime = new Date(bookmark.endTime);
    return startTime <= now && endTime >= now;
  });
  
  const pastBookmarks = filteredBookmarks.filter(bookmark => {
    const endTime = new Date(bookmark.endTime);
    return endTime < now;
  }).sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime());

  // Handle bookmark removal
  const handleBookmarkToggle = () => {
    // Refresh bookmarks list
    setBookmarks(getBookmarkedContests());
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Bookmarks</h1>
              <p className="text-muted-foreground">
                Your saved contests from various platforms
              </p>
            </div>
            
            <div className="relative w-full sm:w-auto min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search bookmarks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={(value) => setActiveTab(value as ContestTab)}>
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="upcoming" className="relative">
                Upcoming
                {upcomingBookmarks.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="ongoing" className="relative">
                Ongoing
                {ongoingBookmarks.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-6 space-y-6">
              {upcomingBookmarks.length === 0 ? (
                <EmptyState message="No upcoming bookmarked contests" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingBookmarks.map(bookmark => (
                    <ContestCard 
                      key={bookmark.id} 
                      contest={bookmark} 
                      type="upcoming" 
                      onBookmarkToggle={handleBookmarkToggle}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="ongoing" className="mt-6 space-y-6">
              {ongoingBookmarks.length === 0 ? (
                <EmptyState message="No ongoing bookmarked contests" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ongoingBookmarks.map(bookmark => (
                    <ContestCard 
                      key={bookmark.id} 
                      contest={bookmark} 
                      type="ongoing" 
                      onBookmarkToggle={handleBookmarkToggle}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="mt-6 space-y-6">
              {pastBookmarks.length === 0 ? (
                <EmptyState message="No past bookmarked contests" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastBookmarks.map(bookmark => (
                    <ContestCard 
                      key={bookmark.id} 
                      contest={bookmark} 
                      type="past" 
                      onBookmarkToggle={handleBookmarkToggle}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

// Empty state component
const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">{message}</h3>
      <p className="text-muted-foreground max-w-md mt-2">
        Bookmark contests from the main page to see them here
      </p>
    </div>
  );
};

export default BookmarksPage;
