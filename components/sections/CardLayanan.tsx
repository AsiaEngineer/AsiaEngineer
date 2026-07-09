import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface CardLayananProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function CardLayanan({ icon: Icon, title, description }: CardLayananProps) {
  return (
    <Card hoverable className="p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-button bg-primary-light text-primary">
        <Icon size={24} />
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-secondary">{title}</h3>
      <p className="mt-2 font-body text-sm text-secondary/70">{description}</p>
    </Card>
  );
}
