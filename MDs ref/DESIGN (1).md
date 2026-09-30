# True Love APP Oficial

## Mission
Create implementation-ready, token-driven UI guidance for True Love APP Oficial that is optimized for consistency, accessibility, and fast delivery across web app.

## Brand
- Product/brand: True Love APP Oficial
- URL: https://true-love-app-oficial.luisangelobsb.chatgpt.site/?v=modern-public
- Audience: developers and technical teams
- Product surface: web app

## Style Foundations
- Visual style: structured, tokenized, content-first
- Main font style: `font.family.primary=Inter`, `font.family.stack=Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif`, `font.size.base=17px`, `font.weight.base=400`, `font.lineHeight.base=27.2px`
- Typography scale: `font.size.xs=12px`, `font.size.sm=14px`, `font.size.md=17px`, `font.size.lg=25.5px`, `font.size.xl=44px`
- Color palette: `color.text.primary=#263330`, `color.text.secondary=#596861`, `color.surface.muted=#ffffff`, `color.text.inverse=#648276`, `color.surface.base=#000000`, `color.surface.raised=#f7f8f5`, `color.surface.strong=#345d53`, `color.border.strong=#dce3dd`
- Spacing scale: `space.1=5px`, `space.2=6px`, `space.3=7px`, `space.4=8px`, `space.5=9px`, `space.6=10px`, `space.7=12px`, `space.8=15px`
- Radius/shadow/motion tokens: `radius.xs=6px`, `radius.sm=8px` | `shadow.1=rgba(18, 63, 59, 0.12) 0px 5px 12px 0px`

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
- Include known page component density: buttons (12), navigation (2), links (1), cards (1).

- Extraction diagnostics: Low sample size: fewer than 30 visible elements were extracted. Audience and product surface inference confidence is low; verify generated brand context.

## Quality Gates
- Every non-negotiable rule must use "must".
- Every recommendation should use "should".
- Every accessibility rule must be testable in implementation.
- Teams should prefer system consistency over local visual exceptions.
