"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";

import { cn } from "@/lib/utils";
import { TeamSpace } from "@/types";
import { Check, ChevronsUpDown, PlusCircle, Rocket } from "lucide-react";
import { useTeamSpaceModal } from "@/hooks/use-teamspace-modal";

type PopoverTriggerProps = React.ComponentProps<typeof PopoverTrigger>;

interface Props extends PopoverTriggerProps {
  teamSpaces: TeamSpace[];
}

const TeamSwitcher = ({ className, teamSpaces = [] }: Props) => {
  const [open, setOpen] = useState(false);
  const teamSpaceModal = useTeamSpaceModal();
  const params = useParams();
  const router = useRouter();

  const currentTeamSpace = teamSpaces.find(
    (teamSpace) => teamSpace.id === params.teamSpaceId
  );

  const onTeamSpaceSelect = (teamSpace: TeamSpace) => {
    setOpen(false);
    router.push(`/teamspace/${teamSpace.id}/tickets`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a team space"
          className={cn("w-[200px] justify-between", className)}
        >
          <Rocket className="mr-2 h-4 w-4" />
          {currentTeamSpace?.name}
          <ChevronsUpDown className="ml-auto h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search team space" />
            <CommandEmpty>No team space found.</CommandEmpty>
            <CommandGroup heading="Team Spaces">
              {teamSpaces.map((teamSpace) => (
                <CommandItem
                  key={teamSpace.id}
                  onSelect={() => onTeamSpaceSelect(teamSpace)}
                  className="text-sm"
                >
                  <Rocket className="mr-2 h-4 w-4" />
                  {teamSpace.name}
                  {currentTeamSpace?.name === teamSpace.name && (
                    <Check className={cn("ml-auto h-4 w-4")} />
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  teamSpaceModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 h-4 w-4" />
                Create or join
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export { TeamSwitcher };
