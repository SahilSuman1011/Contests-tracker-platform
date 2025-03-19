
import { FC } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, Code2, Award, Clock, ArrowRight, CheckCircle, Terminal, Trophy, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui-custom/ThemeToggle";

const LandingPage: FC = () => {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header/Navigation */}
      <header className="w-full bg-white/90 dark:bg-tle-navy/90 backdrop-blur-md shadow-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <div className="bg-tle-blue rounded-lg p-1">
                <Terminal className="h-6 w-6 text-white" />
              </div>
              <span className="font-heading text-xl font-bold text-tle-navy dark:text-white">
                Contest Tracker
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Features
              </a>
              <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                How It Works
              </a>
              <a href="#faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                FAQ
              </a>
              <Link to="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Admin
              </Link>
            </nav>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <Link to="/contests">
                <Button className="bg-tle-blue hover:bg-tle-blue/90 font-medium rounded-full">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with code pattern background */}
      <section className="py-16 md:py-24 relative pattern-bg">
        <div className="absolute inset-0 bg-code-pattern opacity-5"></div>
        <div className="container px-4 sm:px-8 mx-auto relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                Master <span className="text-tle-blue">Competitive Coding</span> Competitions
              </h1>
              <p className="text-xl text-muted-foreground font-medium">
                Track contests across multiple platforms, bookmark your favorites, and find solutions - all in one place.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link to="/contests">
                  <Button size="lg" className="bg-tle-blue hover:bg-tle-blue/90 rounded-full font-medium">
                    Explore Contests <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/bookmarks">
                  <Button size="lg" variant="outline" className="rounded-full font-medium">
                    My Bookmarks
                  </Button>
                </Link>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-radial from-tle-blue/20 to-transparent blur-2xl opacity-40"></div>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 dark:border-white/5">
                <div className="absolute inset-0 bg-code-pattern opacity-10"></div>
                <img 
                  src="https://images.unsplash.com/photo-1605379399642-870262d3d051?auto=format&fit=crop&w=800&q=80" 
                  alt="Coding Competition" 
                  className="w-full rounded-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-lg rounded-xl p-4 border border-white/20">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-tle-blue rounded-full p-1">
                        <Trophy className="h-4 w-4 text-white" />
                      </div>
                      <p className="text-white font-medium text-sm">Upcoming Contest</p>
                    </div>
                    <h3 className="text-white font-bold text-lg mb-1">CodeForces Round #853</h3>
                    <div className="flex items-center text-white/80 text-sm gap-2">
                      <Clock className="h-3 w-3" />
                      <span>Starts in 2 days, 4 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-secondary/50 dark:bg-tle-navy/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-code-pattern opacity-5"></div>
        <div className="container px-4 sm:px-8 mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Powerful Features</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Everything you need to excel in competitive programming competitions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl shadow-lg p-6 dark:border border-border relative group hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tle-blue to-tle-lightblue rounded-t-xl"></div>
              <div className="h-12 w-12 bg-tle-blue/10 rounded-xl flex items-center justify-center mb-4 text-tle-blue">
                <Calendar className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Contest Calendar</h3>
              <p className="text-muted-foreground">
                Track upcoming contests from CodeForces, LeetCode, CodeChef and more all in one place.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl shadow-lg p-6 dark:border border-border relative group hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tle-blue to-tle-lightblue rounded-t-xl"></div>
              <div className="h-12 w-12 bg-tle-blue/10 rounded-xl flex items-center justify-center mb-4 text-tle-blue">
                <Clock className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Real-time Countdown</h3>
              <p className="text-muted-foreground">
                See precise countdown timers for each contest and never miss a deadline again.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl shadow-lg p-6 dark:border border-border relative group hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tle-blue to-tle-lightblue rounded-t-xl"></div>
              <div className="h-12 w-12 bg-tle-blue/10 rounded-xl flex items-center justify-center mb-4 text-tle-blue">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold mb-2">Video Solutions</h3>
              <p className="text-muted-foreground">
                Auto-fetch YouTube video solutions for each contest to improve your skills faster.
              </p>
            </motion.div>
          </div>

          <div className="mt-12 text-center">
            <Link to="/contests">
              <Button variant="outline" className="rounded-full">
                View All Features <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 container px-4 sm:px-8 mx-auto relative pattern-bg">
        <div className="absolute inset-0 bg-code-pattern opacity-5"></div>
        <div className="text-center mb-12 relative">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Simple steps to get the most out of Contest Tracker</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <div className="h-14 w-14 bg-tle-blue text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold relative">
              <span>1</span>
              <span className="absolute h-full w-full rounded-full border border-tle-blue/30 animate-ping"></span>
            </div>
            <h3 className="text-xl font-bold mb-2">Browse Contests</h3>
            <p className="text-muted-foreground">
              View all upcoming coding contests filtered by platform, date, or duration.
            </p>
          </motion.div>
          
          {/* Step 2 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <div className="h-14 w-14 bg-tle-blue text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold relative">
              <span>2</span>
              <span className="absolute h-full w-full rounded-full border border-tle-blue/30 animate-ping animation-delay-200"></span>
            </div>
            <h3 className="text-xl font-bold mb-2">Bookmark Favorites</h3>
            <p className="text-muted-foreground">
              Save contests you're interested in to your personal bookmarks page for quick access.
            </p>
          </motion.div>
          
          {/* Step 3 */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center"
          >
            <div className="h-14 w-14 bg-tle-blue text-white rounded-full flex items-center justify-center mb-4 text-xl font-bold relative">
              <span>3</span>
              <span className="absolute h-full w-full rounded-full border border-tle-blue/30 animate-ping animation-delay-400"></span>
            </div>
            <h3 className="text-xl font-bold mb-2">Learn From Solutions</h3>
            <p className="text-muted-foreground">
              After contests, access YouTube video solutions to understand different approaches.
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 bg-secondary/50 dark:bg-tle-navy/50 relative">
        <div className="absolute inset-0 bg-code-pattern opacity-5"></div>
        <div className="container px-4 sm:px-8 mx-auto relative">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
            <p className="text-muted-foreground mt-3 max-w-2xl mx-auto">Get answers to common questions about Contest Tracker</p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-md dark:border border-border"
            >
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-tle-blue"><CheckCircle className="h-5 w-5" /></span>
                Which platforms are supported?
              </h3>
              <p className="text-muted-foreground">
                We currently support CodeForces, LeetCode, CodeChef, AtCoder, HackerRank, and more popular competitive programming platforms.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-md dark:border border-border"
            >
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-tle-blue"><CheckCircle className="h-5 w-5" /></span>
                How are video solutions found?
              </h3>
              <p className="text-muted-foreground">
                We use an intelligent algorithm to search YouTube for high-quality video solutions after each contest ends, prioritizing reputable content creators.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 shadow-md dark:border border-border"
            >
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                <span className="text-tle-blue"><CheckCircle className="h-5 w-5" /></span>
                Is Contest Tracker free to use?
              </h3>
              <p className="text-muted-foreground">
                Yes, Contest Tracker is completely free. We're passionate about supporting the competitive programming community.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-background to-secondary/30 dark:from-background dark:to-tle-navy/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-code-pattern opacity-5"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-tle-blue/10 rounded-full blur-3xl"></div>
        <div className="absolute -top-10 -left-10 w-60 h-60 bg-tle-blue/10 rounded-full blur-3xl"></div>
        
        <div className="container px-4 sm:px-8 mx-auto text-center relative">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-6"
          >
            <div className="inline-block mb-4">
              <div className="bg-tle-blue/10 border border-tle-blue/20 text-tle-blue py-1 px-4 rounded-full text-sm font-medium">
                Ready to get started?
              </div>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold">Ready to Level Up Your Competitive Programming?</h2>
            <p className="text-xl text-muted-foreground">
              Join thousands of programmers who use Contest Tracker to stay ahead in coding competitions.
            </p>
            <div className="pt-4">
              <Link to="/contests">
                <Button size="lg" className="bg-tle-blue hover:bg-tle-blue/90 rounded-full font-medium">
                  Start Tracking Now <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 bg-white dark:bg-tle-navy relative">
        <div className="container px-4 sm:px-8 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-tle-blue rounded-lg p-1">
                  <Terminal className="h-5 w-5 text-white" />
                </div>
                <span className="font-heading text-lg font-bold">Contest Tracker</span>
              </div>
              <p className="text-muted-foreground max-w-xs">
                The ultimate platform for competitive programmers to track contests and improve their skills.
              </p>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Site Links</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a></li>
                <li><a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a></li>
                <li><a href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">App</h3>
              <ul className="space-y-2">
                <li><Link to="/contests" className="text-muted-foreground hover:text-foreground transition-colors">Contests</Link></li>
                <li><Link to="/bookmarks" className="text-muted-foreground hover:text-foreground transition-colors">Bookmarks</Link></li>
                <li><Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">Admin</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Contest Tracker. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                GitHub
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                Twitter
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
