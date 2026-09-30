---
name: design-system-true-love-app-oficial
description: Creates implementation-ready design-system guidance with tokens, component behavior, and accessibility standards. Use when creating or updating UI rules, component specifications, or design-system documentation.
---

<!-- TYPEUI_SH_MANAGED_START -->

# True Love APP Oficial

## Mission
Deliver implementation-ready design-system guidance for True Love APP Oficial that can be applied consistently across dashboard web app interfaces.

## Brand
- Product/brand: True Love APP Oficial
- URL: https://true-love-app-oficial.luisangelobsb.chatgpt.site/?v=modern-public
- Audience: authenticated users and operators
- Product surface: dashboard web app

## Style Foundations
- Visual style: structured, accessible, implementation-first
- Main font style: `font.family.primary=Inter`, `font.family.stack=Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif`, `font.size.base=17px`, `font.weight.base=400`, `font.lineHeight.base=27.2px`
- Typography scale: `font.size.xs=12px`, `font.size.sm=17px`, `font.size.md=40px`, `font.size.lg=44px`
- Color palette: `color.text.primary=#263330`, `color.surface.base=#000000`, `color.text.tertiary=#2f5147`, `color.text.inverse=#648276`, `color.surface.muted=#ffffff`, `color.surface.raised=#f7f8f5`, `color.surface.strong=#a84f65`, `color.border.muted=#dce3dd`
- Spacing scale: `space.1=6px`, `space.2=8px`, `space.3=9px`, `space.4=11px`, `space.5=12px`, `space.6=15px`, `space.7=17px`, `space.8=18px`
- Radius/shadow/motion tokens: `radius.xs=6px`, `radius.sm=7px`, `radius.md=8px` | `shadow.1=rgba(18, 63, 59, 0.12) 0px 5px 12px 0px`

## Accessibility
- Target: WCAG 2.2 AA
- Keyboard-first interactions required.
- Focus-visible rules required.
- Contrast constraints required.

## Writing Tone
concise, confident, implementation-focused

## Rules: Do
- Use semantic tokens, not raw hex values in component guidance.
- Every component must define required states: default, hover, focus-visible, active, disabled, loading, error.
- Responsive behavior and edge-case handling should be specified for every component family.
- Accessibility acceptance criteria must be testable in implementation.

## Rules: Don't
- Do not allow low-contrast text or hidden focus indicators.
- Do not introduce one-off spacing or typography exceptions.
- Do not use ambiguous labels or non-descriptive actions.

## Guideline Authoring Workflow
1. Restate design intent in one sentence.
2. Define foundations and tokens.
3. Define component anatomy, variants, and interactions.
4. Add accessibility acceptance criteria.
5. Add anti-patterns and migration notes.
6. End with QA checklist.

## Required Output Structure
- Context and goals
- Design tokens and foundations
- Component-level rules (anatomy, variants, states, responsive behavior)
- Accessibility requirements and testable acceptance criteria
- Content and tone standards with examples
- Anti-patterns and prohibited implementations
- QA checklist

## Component Rule Expectations
- Include keyboard, pointer, and touch behavior.
- Include spacing and typography token requirements.
- Include long-content, overflow, and empty-state handling.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Prefer system consistency over local visual exceptions.

<!-- TYPEUI_SH_MANAGED_END -->
