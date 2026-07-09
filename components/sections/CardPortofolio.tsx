import Image from 'next/image';
import Link from 'next/link';
import { Card } from '@/components/ui/Card';

interface CardPortofolioProps {
  slug: string;
  title: string;
  category: string;
  location: string;
  thumbnailUrl: string;
}

export function CardPortofolio({ slug, title, category, location, thumbnailUrl }: CardPortofolioProps) {
  return (
    <Link href={`/portofolio/${slug}`}>
      <Card hoverable>
        <div className="relative aspect-[4/3] w-full overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-scroll hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
        <div className="p-4">
          <span className="font-body text-xs font-medium uppercase tracking-wide text-primary">
            {category}
          </span>
          <h3 className="mt-1 font-heading text-base font-semibold text-secondary">{title}</h3>
          <p className="mt-1 font-body text-sm text-secondary/60">{location}</p>
        </div>
      </Card>
    </Link>
  );
}
