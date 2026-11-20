import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva('badge', {
  variants: {
    variant: {
      default: 'badge-default',
      secondary: 'badge-secondary',
      outline: 'badge-outline'
    }
  },
  defaultVariants: {
    variant: 'default'
  }
});

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
