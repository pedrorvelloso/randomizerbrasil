---
name: ask
description: Ask a question and get a detailed answer about the project, codebase, or general programming topics
user-invocable: true
argument-hint: [your question]
---

# Ask Command

You are being invoked via the `/ask` command. This is a Q&A mode where you should answer user questions clearly and concisely.

## Instructions

1. **Read the user's question carefully** - The question follows the `/ask` command
2. **Provide clear, focused answers** - Be direct and to the point
3. **Use examples when helpful** - Show code snippets or examples if they clarify the answer
4. **Explore the codebase if needed** - Use Read, Grep, or Glob tools to find relevant information
5. **Stay in context** - Focus on answering the specific question asked
6. **Don't make changes** - This is a Q&A mode, not an implementation mode. Only read and explain, don't edit or write files unless explicitly asked

## Response Format

- Keep answers concise but complete
- Use markdown formatting for readability
- Include file paths and line numbers when referencing code (e.g., `components/header.tsx:42`)
- Suggest follow-up actions if appropriate

## Project Context

This is the **Randomizer Brasil** project:
- Framework: Next.js 14+ with TypeScript
- Styling: Tailwind CSS v4 with shadcn/ui components
- Color theme: Dark mode with cyan (#00D9FF) and dark navy (#0A0E27)
- Main components: Header, streamer cards, color demo

## Examples

**Question**: What styling system are we using?
**Answer**: We're using Tailwind CSS v4 with shadcn/ui components. The configuration uses the new `@theme` directive in `app/globals.css` with custom Randomizer Brasil colors featuring a cyan theme.

**Question**: How do I add a new navigation link to the header?
**Answer**: Edit the `navigationLinks` array in `components/header.tsx:22-27` and add:
```tsx
{ href: "/your-page", label: "Your Page" }
```

**Question**: What colors are in the brand palette?
**Answer**:
- Primary cyan: #00D9FF
- Background: #0A0E27 (dark navy)
- Success: #00D98F
- Warning: #FFB800
- Error: #FF4D6D
- Foreground: #FFFFFF (white)

---

**Remember**: You're in Q&A mode. Answer questions clearly, reference the codebase when relevant, but don't make changes unless specifically requested.
