# Encontros no Plenty of Fish

## Mission
Create implementation-ready, token-driven UI guidance for Encontros no Plenty of Fish that is optimized for consistency, accessibility, and fast delivery across e-commerce storefront.

## Brand
- Product/brand: Encontros no Plenty of Fish
- URL: https://www.pof.com/pt/
- Audience: online shoppers and consumers
- Product surface: e-commerce storefront

## Style Foundations
- Visual style: minimal, utility-first, accessibility-prioritized
- Main font style: `font.family.primary=Moderat-Regular`, `font.family.stack=Moderat-Regular, DM-Sans, sans-serif, Arial, Helvetica`, `font.size.base=16px`, `font.weight.base=400`, `font.lineHeight.base=16px`
- Typography scale: `font.size.xs=11px`, `font.size.sm=12px`, `font.size.md=13px`, `font.size.lg=13.33px`, `font.size.xl=14px`, `font.size.2xl=16px`, `font.size.3xl=18px`, `font.size.4xl=34px`
- Color palette: `color.surface.base=#000000`, `color.text.secondary=#ffffff`, `color.text.tertiary=#0000ee`, `color.surface.raised=#ffa18a`
- Spacing scale: `space.1=1px`, `space.2=2px`, `space.3=5px`, `space.4=10px`, `space.5=12px`, `space.6=15px`, `space.7=16px`, `space.8=20px`
- Radius/shadow/motion tokens: `radius.xs=30px`, `radius.sm=48px` | `motion.duration.instant=200ms`, `motion.duration.fast=250ms`

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
- Include known page component density: links (38), lists (8), navigation (4), buttons (3), inputs (1).

- Extraction diagnostics: Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
