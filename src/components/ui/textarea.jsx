import { cn } from '@/lib/utils';

function Textarea({ className, ...props }) {
  return <textarea data-slot="textarea" className={cn('field-control min-h-28 resize-y', className)} {...props} />;
}

export { Textarea };
