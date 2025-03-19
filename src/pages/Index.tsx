
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { MainLayout } from "@/components/layouts/MainLayout";
import { ContestCard } from "@/components/ui-custom/ContestCard";
import { ContestFilter } from "@/components/ui-custom/ContestFilter";
import { PageTransition } from "@/components/ui-custom/PageTransition";
import { Contest, FilterState, ContestTab } from "@/lib/types";
import { fetchAllContests } from "@/lib/api";
import { BookmarkCheck, Search } from "lucide-react";

const Index = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    codeforces: true,
    codechef: true,
    leetcode: true,
  });
  const [activeTab, setActiveTab] = useState<ContestTab>("upcoming");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch contests on mount
  useEffect(() => {
    const loadContests = async () => {
      setLoading(true);
      try {
        const allContests = await fetchAllContests();
        setContests(allContests);
      } catch (error) {
        console.error("Error loading contests:", error);
      } finally {
        setLoading(false);
      }
    };

    loadContests();
    
    // Refresh contests every 15 minutes
    const intervalId = setInterval(loadContests, 15 * 60 * 1000);
    return () => clearInterval(intervalId);
  }, []);

  // Filter and categorize contests
  const now = new Date();
  
  const filteredContests = contests.filter(contest => {
    const matchesPlatform = filters[contest.platform as keyof FilterState];
    const matchesSearch = contest.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesPlatform && matchesSearch;
  });
  
  const upcomingContests = filteredContests.filter(contest => {
    const startTime = new Date(contest.startTime);
    return startTime > now;
  }).sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());
  
  const ongoingContests = filteredContests.filter(contest => {
    const startTime = new Date(contest.startTime);
    const endTime = new Date(contest.endTime);
    return startTime <= now && endTime >= now;
  });
  
  const pastContests = filteredContests.filter(contest => {
    const endTime = new Date(contest.endTime);
    return endTime < now;
  }).sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime());

  return (
    <MainLayout>
      <PageTransition>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Contests</h1>
              <p className="text-muted-foreground">
                Track upcoming programming contests from various platforms
              </p>
            </div>
            
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative w-full sm:w-auto min-w-[200px]">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search contests..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
              <ContestFilter 
                filters={filters} 
                onFilterChange={setFilters} 
              />
            </div>
          </div>
          
          <Tabs defaultValue="upcoming" value={activeTab} onValueChange={(value) => setActiveTab(value as ContestTab)}>
            <TabsList className="grid w-full grid-cols-3 md:w-auto">
              <TabsTrigger value="upcoming" className="relative">
                Upcoming
                {upcomingContests.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="ongoing" className="relative">
                Ongoing
                {ongoingContests.length > 0 && (
                  <span className="absolute top-1 right-1 flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-6 space-y-6">
              {loading ? (
                <ContestSkeleton count={6} />
              ) : upcomingContests.length === 0 ? (
                <EmptyState message="No upcoming contests matching your filters" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingContests.map(contest => (
                    <ContestCard 
                      key={contest.id} 
                      contest={contest} 
                      type="upcoming" 
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="ongoing" className="mt-6 space-y-6">
              {loading ? (
                <ContestSkeleton count={3} />
              ) : ongoingContests.length === 0 ? (
                <EmptyState message="No ongoing contests at the moment" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {ongoingContests.map(contest => (
                    <ContestCard 
                      key={contest.id} 
                      contest={contest} 
                      type="ongoing" 
                    />
                  ))}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past" className="mt-6 space-y-6">
              {loading ? (
                <ContestSkeleton count={6} />
              ) : pastContests.length === 0 ? (
                <EmptyState message="No past contests matching your filters" />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastContests.slice(0, 30).map(contest => (
                    <ContestCard 
                      key={contest.id} 
                      contest={contest} 
                      type="past" 
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

// Loading skeleton for contests
const ContestSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="border rounded-lg p-4 space-y-3">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex justify-between pt-2">
            <Skeleton className="h-8 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      ))}
    </div>
  );
};

// Empty state component
const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <BookmarkCheck className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-medium">{message}</h3>
      <p className="text-muted-foreground max-w-md mt-2">
        Try changing your filters or check back later for new contests
      </p>
    </div>
  );
};

export default Index;
