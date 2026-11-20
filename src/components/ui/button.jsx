import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'button inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-semibold transition-[background-color,color,border-color,transform] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'button-primary',
        secondary: 'button-secondary',
        outline: 'button-outline',
        ghost: 'button-ghost',
        link: 'button-link'
      },
      size: {
        default: 'button-md',
        sm: 'button-sm',
        lg: 'button-lg',
        icon: 'button-icon'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Component = asChild ? Slot : 'button';
  return <Component className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };
