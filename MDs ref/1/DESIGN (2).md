# Ops!

## Mission
Create implementation-ready, token-driven UI guidance for Ops! that is optimized for consistency, accessibility, and fast delivery across content site.

## Brand
- Product/brand: Ops!
- URL: https://tinder.com/
- Audience: readers and knowledge seekers
- Product surface: content site

## Style Foundations
- Visual style: structured, tokenized, content-first
- Main font style: `font.family.primary=Regola`, `font.family.stack=Regola, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif, Helvetica, Arial, Segoe UI Emoji, Segoe UI Symbol, Apple Color Emoji, Twemoji Mozilla, Noto Color Emoji, EmojiOne Color, Android Emoji`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=21px`
- Typography scale: `font.size.xs=12px`, `font.size.sm=14px`, `font.size.md=15px`, `font.size.lg=16px`, `font.size.xl=17px`, `font.size.2xl=20px`, `font.size.3xl=34px`, `font.size.4xl=42px`
- Color palette: `color.text.primary=#fbfbfb`, `color.text.secondary=#fbd4d4`, `color.text.tertiary=#1b1817`, `color.text.inverse=#514b4a`, `color.surface.base=#000000`, `color.surface.muted=#ffffff`, `color.surface.raised=#5a000f`, `color.surface.strong=#2a1d28`
- Spacing scale: `space.1=4px`, `space.2=5px`, `space.3=8px`, `space.4=10.5px`, `space.5=12px`, `space.6=13px`, `space.7=16px`, `space.8=24px`
- Radius/shadow/motion tokens: `radius.xs=24px`, `radius.sm=52px` | `motion.duration.instant=1ms`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
Concise, confident, implementation-focused.

## Rules: Do
- Use semantic tokens, not raw hex values, in component guidance.
- Every component must define states for default, hover, focus-visible, active, disabled, loading, and error.
- Component behavior should specify responsive and edge-case handling.
- Interactive components must document keyboard, pointer, and touch behavior.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.
- Do not ship component guidance without explicit state rules.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and semantic tokens.
3. Define component anatomy, variants, interactions, and state behavior.
4. Add accessibility acceptance criteria with pass/fail checks.
5. Add anti-patterns, migration notes, and edge-case handling.
6. End with a QA checklist.

## Required Output Structure
- Context and goals.
- Design tokens and foundations.
- Component-level rules (anatomy, variants, states, responsive behavior).
- Accessibility requirements and testable acceptance criteria.
- Content and tone standards with examples.
- Anti-patterns and prohibited implementations.
- QA checklist.

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.
- Include known page component density: links (44), cards (25), buttons (10), navigation (6), lists (6).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
