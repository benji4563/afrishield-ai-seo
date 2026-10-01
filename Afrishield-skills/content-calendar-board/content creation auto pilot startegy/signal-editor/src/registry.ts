import type React from "react";
import { Hook, Headline, BurstCaption } from "./components/Text";
import { ProofFlash, Screenshot, BrowserFrame, AIChat, SearchResult } from "./components/Proof";
import { Dashboard, MetricCounter, BeforeAfter, Comparison } from "./components/Data";
import { SignalPath, ProcessFlow } from "./components/Signal";
import { Arrow, CircleHighlight, Callout } from "./components/Annotation";
import { Warning, Success, CTA } from "./components/Status";
import { StoryCard, HumorCard, QuoteCard, NewsCard } from "./components/Cards";

// The 24 Signal Style components addressable from an edit spec.
export const REGISTRY = {
  Hook,
  BurstCaption,
  Headline,
  ProofFlash,
  Screenshot,
  BrowserFrame,
  Dashboard,
  MetricCounter,
  BeforeAfter,
  SignalPath,
  AIChat,
  SearchResult,
  Comparison,
  ProcessFlow,
  Callout,
  Arrow,
  CircleHighlight,
  Warning,
  Success,
  CTA,
  StoryCard,
  HumorCard,
  QuoteCard,
  NewsCard,
} satisfies Record<string, React.FC<never>>;

export type ComponentName = keyof typeof REGISTRY;

// Components that take over the frame (rendered beneath other overlays).
export const FULLSCREEN = new Set<ComponentName>(["Screenshot", "BrowserFrame", "AIChat", "SearchResult", "Dashboard", "SignalPath", "BeforeAfter", "Comparison"]);
