# Melhor Site & App de Encontros Grátis

## Mission
Create implementation-ready, token-driven UI guidance for Melhor Site & App de Encontros Grátis that is optimized for consistency, accessibility, and fast delivery across content site.

## Brand
- Product/brand: Melhor Site & App de Encontros Grátis
- URL: https://badoo.com/pt/
- Audience: readers and knowledge seekers
- Product surface: content site

## Style Foundations
- Visual style: structured, tokenized, content-first
- Main font style: `font.family.primary=SF Pro Text`, `font.family.stack=SF Pro Text, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, Liberation Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=24px`
- Typography scale: `font.size.xs=8px`, `font.size.sm=12px`, `font.size.md=16px`, `font.size.lg=18px`, `font.size.xl=18.72px`, `font.size.2xl=19px`, `font.size.3xl=24px`, `font.size.4xl=38px`
- Color palette: `color.text.primary=#121212`, `color.text.secondary=#f9f6f2`, `color.text.tertiary=#c8001a`, `color.text.inverse=#29131d`, `color.surface.base=#000000`, `color.surface.muted=#600436`, `color.surface.raised=#f3eaff`, `color.surface.strong=#ffffff`
- Spacing scale: `space.1=4px`, `space.2=5px`, `space.3=6.4px`, `space.4=8px`, `space.5=10px`, `space.6=12px`, `space.7=16px`, `space.8=18px`
- Radius/shadow/motion tokens: `radius.xs=16px`, `radius.sm=22px`, `radius.md=26px`, `radius.lg=60px` | `motion.duration.instant=200ms`

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
- Include known page component density: links (81), buttons (34), cards (32), lists (6), navigation (3).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
