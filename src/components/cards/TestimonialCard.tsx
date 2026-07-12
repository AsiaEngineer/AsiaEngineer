import type { testimonials } from "@/db/schema";

type Testimonial = typeof testimonials.$inferSelect;

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full min-w-[300px] flex-col justify-between rounded-[24px] border border-line bg-white p-8 shadow-[0_20px_40px_rgba(17,17,17,0.04)] sm:min-w-[360px]">
      <div>
        <div className="flex items-center gap-1 text-accent" aria-label={`Rating ${testimonial.rating} dari 5`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} aria-hidden="true">
              {i < testimonial.rating ? "★" : "☆"}
            </span>
          ))}
        </div>
        <p className="mt-5 text-lg leading-relaxed text-ink">&ldquo;{testimonial.testimonial}&rdquo;</p>
      </div>
      <div className="mt-8 flex items-center gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-neutral font-heading text-sm font-bold text-muted">
          {testimonial.clientName.slice(0, 1)}
        </div>
        <div>
          <p className="font-semibold text-ink">{testimonial.clientName}</p>
          <p className="text-sm text-muted">{testimonial.company}</p>
        </div>
        {testimonial.isPlaceholder ? (
          <span className="placeholder-badge ml-auto">Contoh</span>
        ) : null}
      </div>
    </div>
  );
}
