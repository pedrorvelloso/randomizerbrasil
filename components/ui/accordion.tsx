"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"

function Accordion({
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}

function AccordionItem({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border/40 last:border-b-0", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group flex flex-1 items-center justify-between py-6 px-6 font-syne font-bold text-lg transition-all hover:text-brand-cyan hover:bg-brand-cyan/5 relative overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-brand-cyan/50 disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]]:text-brand-cyan [&[data-state=open]]:bg-brand-cyan/5 [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-cyan/0 via-brand-cyan/5 to-brand-cyan/0 opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100 transition-opacity pointer-events-none" />

        {/* Left border accent */}
        <div className="absolute left-0 top-0 bottom-0 w-0 bg-brand-cyan group-hover:w-1 group-data-[state=open]:w-1 transition-all duration-300" />

        <span className="relative uppercase tracking-wide text-left">{children}</span>

        <ChevronDownIcon className="relative h-5 w-5 shrink-0 transition-transform duration-300 text-brand-cyan/60 group-hover:text-brand-cyan group-data-[state=open]:text-brand-cyan" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content
      data-slot="accordion-content"
      className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden transition-all"
      {...props}
    >
      <div className={cn("px-6 pb-6 pt-4 font-dm-sans text-base text-foreground/80 leading-relaxed", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
