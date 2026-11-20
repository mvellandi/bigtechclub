import { cn } from '@/lib/utils';

function Input({ className, type = 'text', ...props }) {
  return <input type={type} data-slot="input" className={cn('field-control', className)} {...props} />;
}

export { Input };
