
import { useState } from "react";
import { FilterIcon, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { FilterState } from "@/lib/types";
import { cn } from "@/lib/utils";

interface ContestFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}

export function ContestFilter({ filters, onFilterChange }: ContestFilterProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  const togglePlatform = (platform: keyof FilterState) => {
    const newFilters = {
      ...filters,
      [platform]: !filters[platform]
    };
    onFilterChange(newFilters);
  };
  
  const selectAll = () => {
    onFilterChange({
      codeforces: true,
      codechef: true,
      leetcode: true
    });
  };
  
  // Count active filters
  const activeCount = Object.values(filters).filter(Boolean).length;
  const totalCount = Object.keys(filters).length;
  
  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          className="border-dashed gap-2 font-normal"
          aria-label="Filter contests by platform"
        >
          <FilterIcon className="h-4 w-4" />
          <span>Filter</span>
          {activeCount < totalCount && activeCount > 0 && (
            <Badge 
              variant="secondary" 
              className="ml-1 px-1 font-normal pointer-events-none"
            >
              {activeCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel>Filter by Platform</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="flex items-center justify-between cursor-pointer"
          onClick={selectAll}
        >
          Select All
          {activeCount === totalCount && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => togglePlatform('codeforces')}
        >
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-3 h-3 rounded-full bg-platforms-codeforces",
              !filters.codeforces && "opacity-50"
            )} />
            <span className={!filters.codeforces ? "opacity-70" : ""}>Codeforces</span>
          </div>
          {filters.codeforces && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => togglePlatform('codechef')}
        >
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-3 h-3 rounded-full bg-platforms-codechef",
              !filters.codechef && "opacity-50"
            )} />
            <span className={!filters.codechef ? "opacity-70" : ""}>CodeChef</span>
          </div>
          {filters.codechef && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
        
        <DropdownMenuItem 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => togglePlatform('leetcode')}
        >
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-3 h-3 rounded-full bg-platforms-leetcode",
              !filters.leetcode && "opacity-50"
            )} />
            <span className={!filters.leetcode ? "opacity-70" : ""}>LeetCode</span>
          </div>
          {filters.leetcode && <Check className="h-4 w-4" />}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
