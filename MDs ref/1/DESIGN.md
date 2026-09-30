# Bumble

## Mission
Create implementation-ready, token-driven UI guidance for Bumble that is optimized for consistency, accessibility, and fast delivery across web app.

## Brand
- Product/brand: Bumble
- URL: https://bumble.com/pt/
- Audience: developers and technical teams
- Product surface: web app

## Style Foundations
- Visual style: clean, functional, implementation-oriented
- Main font style: `font.family.primary=BumbleSans`, `font.family.stack=BumbleSans, BumbleSansFallback, -apple-system, San Francisco, Helvetica Neue, Roboto, Segoe WP, Segoe UI, sans-serif`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=24px`
- Typography scale: `font.size.xs=15px`, `font.size.sm=16px`, `font.size.md=17px`, `font.size.lg=20px`, `font.size.xl=24px`, `font.size.2xl=32px`, `font.size.3xl=34px`, `font.size.4xl=40px`
- Color palette: `color.border.default=#202020`, `color.text.secondary=#ffffff`, `color.surface.base=#000000`, `color.text.inverse=#575656`, `color.surface.raised=#ffdb5b`
- Spacing scale: `space.1=10px`, `space.2=12px`, `space.3=14px`, `space.4=20px`, `space.5=22px`, `space.6=24px`, `space.7=32px`, `space.8=40px`
- Radius/shadow/motion tokens: `radius.xs=16px`, `radius.sm=24px`, `radius.md=25px`, `radius.lg=1000px` | `shadow.1=rgba(255, 255, 255, 0) 0px 0px 0px 0px`, `shadow.2=rgba(32, 32, 32, 0.12) 0px 1px 8px 0px` | `motion.duration.instant=200ms`, `motion.duration.fast=300ms`

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
- Include known page component density: links (94), cards (43), buttons (35), lists (7), navigation (3).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
