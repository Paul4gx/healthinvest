"use client";

import { useState } from "react";
import type { TeamMember } from "@/types";
import { TeamCard } from "@/components/sections/team-card";
import { TeamBioModal } from "@/components/sections/team-bio-modal";
import { Stagger, StaggerItem } from "@/components/ui/reveal";

export function TeamGrid({ members }: { members: TeamMember[] }) {
  const [active, setActive] = useState<TeamMember | null>(null);

  return (
    <>
      <Stagger className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
        {members.map((member) => (
          <StaggerItem key={member.name}>
            <TeamCard member={member} onViewBio={() => setActive(member)} />
          </StaggerItem>
        ))}
      </Stagger>
      <TeamBioModal member={active} onClose={() => setActive(null)} />
    </>
  );
}
