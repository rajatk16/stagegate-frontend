import clsx from 'clsx';

interface BadgeProps {
  label: string;
  className?: string;
}

export const Badge = (props: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap',
      props.className,
    )}
  >
    {props.label}
  </span>
);
