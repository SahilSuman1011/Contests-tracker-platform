
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MainLayout } from "@/components/layouts/MainLayout";
import { PageTransition } from "@/components/ui-custom/PageTransition";
import { Contest } from "@/lib/types";
import { 
  fetchAllContests, 
  getSolutionLink, 
  updateSolutionLink,
  autoFetchSolutionLinks 
} from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import { AlertCircle, UploadCloud, CheckCircle2, RefreshCw } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  contestId: z.string({
    required_error: "Please select a contest",
  }),
  solutionUrl: z.string({
    required_error: "Please enter a YouTube URL",
  }).url("Please enter a valid URL").refine(
    (url) => url.includes("youtube.com") || url.includes("youtu.be"),
    { message: "URL must be from YouTube" }
  ),
});

const AdminPage = () => {
  const [contests, setContests] = useState<Contest[]>([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [autoFetchLoading, setAutoFetchLoading] = useState(false);
  const [autoFetchResult, setAutoFetchResult] = useState<{ updated: number, total: number } | null>(null);

  useEffect(() => {
    const loadContests = async () => {
      setLoading(true);
      try {
        const allContests = await fetchAllContests();
        const now = new Date();
        
        const pastContests = allContests.filter(contest => {
          const endTime = new Date(contest.endTime);
          return endTime < now;
        }).sort((a, b) => new Date(b.endTime).getTime() - new Date(a.endTime).getTime());
        
        setContests(pastContests);
      } catch (error) {
        console.error("Error loading contests:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load contests. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadContests();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contestId: "",
      solutionUrl: "",
    },
  });

  const watchContestId = form.watch("contestId");

  useEffect(() => {
    if (watchContestId) {
      const existingSolution = getSolutionLink(watchContestId);
      if (existingSolution) {
        form.setValue("solutionUrl", existingSolution);
      } else {
        form.setValue("solutionUrl", "");
      }
    }
  }, [watchContestId, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    try {
      updateSolutionLink(values.contestId, values.solutionUrl);
      
      setSuccessMessage(`Solution link added for ${
        contests.find(c => c.id === values.contestId)?.name || "the contest"
      }`);
      
      toast({
        title: "Success",
        description: "Solution link has been saved",
      });
      
      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      console.error("Error saving solution link:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save solution link. Please try again.",
      });
    }
  };

  const handleAutoFetch = async () => {
    setAutoFetchLoading(true);
    setAutoFetchResult(null);
    
    try {
      const result = await autoFetchSolutionLinks(contests);
      setAutoFetchResult(result);
      
      if (result.updated > 0) {
        toast({
          title: "Auto-Fetch Complete",
          description: `Found and added ${result.updated} solution links from YouTube.`,
        });
      } else {
        toast({
          title: "Auto-Fetch Complete",
          description: "No new solution links were found.",
        });
      }
      
      // Refresh the form if a contest is selected
      if (watchContestId) {
        const existingSolution = getSolutionLink(watchContestId);
        if (existingSolution) {
          form.setValue("solutionUrl", existingSolution);
        }
      }
    } catch (error) {
      console.error("Error in auto-fetch:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to auto-fetch solution links. Please try again.",
      });
    } finally {
      setAutoFetchLoading(false);
    }
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="max-w-2xl mx-auto">
          <div className="space-y-2 mb-6">
            <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
            <p className="text-muted-foreground">
              Add solution links for past contests
            </p>
          </div>
          
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Admin Access Only</AlertTitle>
            <AlertDescription>
              This page is for team members to add solution links to past contests.
            </AlertDescription>
          </Alert>
          
          {successMessage && (
            <Alert className="mb-6 bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                {successMessage}
              </AlertDescription>
            </Alert>
          )}
          
          {autoFetchResult && (
            <Alert className="mb-6 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Auto-Fetch Results</AlertTitle>
              <AlertDescription>
                Found and added {autoFetchResult.updated} solution links out of {autoFetchResult.total} past contests.
              </AlertDescription>
            </Alert>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <Button 
              onClick={handleAutoFetch} 
              variant="outline" 
              className="w-full sm:w-auto" 
              disabled={autoFetchLoading || loading}
            >
              <RefreshCw className={`mr-2 h-4 w-4 ${autoFetchLoading ? 'animate-spin' : ''}`} />
              {autoFetchLoading ? 'Fetching...' : 'Auto-Fetch Solutions from YouTube'}
            </Button>
          </div>
          
          <div className="p-6 border rounded-lg bg-card/50 backdrop-blur-sm">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="contestId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contest</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        disabled={loading}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a contest" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {contests.map(contest => (
                            <SelectItem 
                              key={contest.id} 
                              value={contest.id}
                              className="flex items-center"
                            >
                              <span className="capitalize">{contest.platform}: </span>
                              <span className="ml-1">{contest.name}</span>
                              {getSolutionLink(contest.id) && (
                                <span className="ml-2 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 px-2 py-0.5 rounded-full">
                                  Has solution
                                </span>
                              )}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select a past contest to add a solution link
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="solutionUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>YouTube Solution URL</FormLabel>
                      <FormControl>
                        <Input 
                          placeholder="https://www.youtube.com/watch?v=..." 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Enter the URL of the YouTube video containing the solution
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full sm:w-auto" disabled={loading}>
                  <UploadCloud className="mr-2 h-4 w-4" />
                  Save Solution Link
                </Button>
              </form>
            </Form>
          </div>
          
          <div className="mt-8 space-y-4">
            <h2 className="text-xl font-semibold">YouTube Playlists</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <a 
                href="https://www.youtube.com/playlist?list=PLcXpkI9A-RZI6FhydNz3JBt-pi25Cbr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <h3 className="font-medium">LeetCode PCDs</h3>
                <p className="text-sm text-muted-foreground mt-1">Solution videos for LeetCode contests</p>
              </a>
              
              <a 
                href="https://www.youtube.com/playlist?list=PLcXpkI9A-RZLUfBSNp-YQBCOezZKbDSgB" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <h3 className="font-medium">Codeforces PCDs</h3>
                <p className="text-sm text-muted-foreground mt-1">Solution videos for Codeforces contests</p>
              </a>
              
              <a 
                href="https://www.youtube.com/playlist?list=PLcXpkI9A-RZIZ6lsE0KCcLWeKNoG45fYr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-4 border rounded-lg hover:bg-secondary/50 transition-colors"
              >
                <h3 className="font-medium">CodeChef PCDs</h3>
                <p className="text-sm text-muted-foreground mt-1">Solution videos for CodeChef contests</p>
              </a>
            </div>
          </div>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default AdminPage;
