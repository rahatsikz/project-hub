import * as React from "react";
import { cn } from "@/lib/utils";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Control } from "react-hook-form";

interface TextareaProps extends React.ComponentProps<"textarea"> {
  formControl: Control<any>;
  label?: string;
  name: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, formControl, label, name, ...props }, ref) => {
    return (
      <FormField
        control={formControl}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <textarea
                className={cn(
                  "flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                  className
                )}
                {...field}
                {...props}
                ref={ref}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
