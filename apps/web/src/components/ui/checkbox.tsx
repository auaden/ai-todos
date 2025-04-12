import * as React from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";

export interface CheckboxProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="relative flex items-center">
        <input
          type="checkbox"
          className="peer h-4 w-4 cursor-pointer opacity-0 absolute"
          ref={ref}
          {...props}
        />
        <div
          className={cn(
            "h-4 w-4 rounded border border-primary shadow flex items-center justify-center",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2",
            "peer-checked:bg-primary peer-checked:text-primary-foreground",
            "peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
            className
          )}
        >
          <Check className="h-3 w-3 peer-checked:opacity-100 opacity-0" />
        </div>
      </div>
    );
  }
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
