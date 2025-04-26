import React from "react"; // Changed import
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority"; // Removed 'type VariantProps'

import { cn } from "@/lib/utils"; // Assuming this path is correct

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);

const Label = React.forwardRef(
  (
    { className, ...props },
    ref // Removed type annotations
  ) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(labelVariants(), className)}
      {...props}
    />
  )
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
