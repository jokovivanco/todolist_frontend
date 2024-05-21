import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  hiddenProps?: boolean;
  setHiddenProps?: React.Dispatch<React.SetStateAction<boolean>>;
}

const InputIconEye = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, hiddenProps, setHiddenProps, ...props }, ref) => {
    const [hidden, setHidden] = React.useState(true);

    const toggleHidden = () => {
      setHidden((state) => !state);
    };

    const toggleHiddenProps = () => {
      if (setHiddenProps !== undefined) {
        setHiddenProps((state) => !state);
      }
    };

    return (
      <div
        className={cn(
          `flex h-10 items-center rounded-md border border-input bg-white text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-2 pr-2`,
        )}
      >
        <input
          type={
            hiddenProps !== undefined && setHiddenProps !== undefined
              ? hiddenProps
                ? 'password'
                : 'text'
              : hidden
                ? 'password'
                : 'text'
          }
          className={cn(
            'w-full p-2 rounded-md placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50',
            className,
          )}
          ref={ref}
          {...props}
        />
        <button
          type="button"
          onClick={
            hiddenProps !== undefined && setHiddenProps !== undefined
              ? toggleHiddenProps
              : toggleHidden
          }
        >
          {hiddenProps !== undefined && setHiddenProps !== undefined ? (
            <img
              src={hiddenProps ? '/closed-eye.svg' : '/eye.svg'}
              alt="icon"
              width={32}
              height={32}
              className="select-none"
            />
          ) : (
            <img
              src={hidden ? '/closed-eye.svg' : '/eye.svg'}
              alt="icon"
              width={32}
              height={32}
              className="select-none"
            />
          )}
        </button>
      </div>
    );
  },
);
InputIconEye.displayName = 'InputIconEye';

export { InputIconEye };
