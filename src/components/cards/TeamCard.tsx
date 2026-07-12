import Image from "next/image";
import type { team } from "@/db/schema";

type Team = typeof team.$inferSelect;

export default function TeamCard({ member }: { member: Team }) {
  return (
    <div className="group relative overflow-hidden rounded-[24px] bg-neutral">
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name}
            fill
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-ink/90">
            <span className="font-heading text-4xl font-bold text-white/80">
              {member.name.slice(0, 1)}
            </span>
          </div>
        )}
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-6 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <p className="text-sm text-white/80">{member.biography}</p>
        </div>
      </div>
      <div className="p-5">
        <p className="font-heading text-lg font-bold text-ink">{member.name}</p>
        <p className="text-sm text-muted">{member.position}</p>
      </div>
    </div>
  );
}
