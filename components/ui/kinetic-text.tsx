import React from "react"

import { cn } from "@/lib/utils"

type As = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span"

type KineticTextProps = React.HTMLAttributes<HTMLElement> & {
  text: string
  as?: As
}

export function KineticText({
  text,
  as: Tag = "h1",
  className = "",
  style,
  ...rest
}: KineticTextProps) {
  const mergedStyle = {
    "--hover-scale": "1.06",
    "--text-stroke-width": "calc(1em * 125 / 6000)",
    ...(style as React.CSSProperties | undefined),
  } as React.CSSProperties

  return (
    <Tag
      {...rest}
      className={cn("flex flex-wrap font-[300] [contain:layout_paint]", className)}
      style={mergedStyle}
    >
      {text.split("").map((letter, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="inline-block [transform-origin:center] [will-change:transform,-webkit-text-stroke-color,-webkit-text-stroke-width] [-webkit-text-stroke-color:transparent] [-webkit-text-stroke-width:var(--text-stroke-width)] [transition:transform_0.4s,_-webkit-text-stroke-color_0.4s,_-webkit-text-stroke-width_0.4s] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] hover:[transform:scale(var(--hover-scale))] hover:[-webkit-text-stroke-color:currentcolor] hover:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*2)] has-[+span+span:hover]:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*1.4)] has-[+span:hover]:[transform:scale(1.03)] has-[+span:hover]:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*1.7)] [:hover+&]:[transform:scale(1.03)] [:hover+&]:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*1.7)] [:hover+span+&]:[-webkit-text-stroke-width:calc(var(--text-stroke-width)*1.4)]"
        >
          {letter === " " ? "\u00A0" : letter}
        </span>
      ))}
      <span className="sr-only">{text}</span>
    </Tag>
  )
}