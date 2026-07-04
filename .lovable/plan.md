
This is a large scope (marketing site + course catalog + admin dashboard + splash intro + Supabase backend). I'll break it into phases so we ship a great v1 quickly and layer on the heavier pieces after. Before I start, a few decisions below.

## Phase 1 — Foundation & Public Site (this iteration)

**Design system** (`src/styles.css`)
- Deep navy background `#0F1B33`, light surface variant, foreground white/near-white
- Gradient token: purple `#8B2FE0` → cyan `#00D4FF` for accents, buttons, dividers, icon backgrounds
- Radii: cards 16px, buttons 12px; container max 1280px; section padding 80–120 / 48–64
- Custom shadcn Button variants: `gradient`, `gradient-outline`, `hero`
- Semantic tokens only — no hardcoded colors in components
- Typography: bold modern sans display + clean body (loaded via `<link>` in `__root.tsx`)

**Routes** (TanStack file-based, one per section for SEO)
```
/                       Home
/programs               Course grid, category filter
/programs/$slug         Course detail template
/about                  Mission + Ram & Nageswar (initials-in-gradient avatars, first names only)
/success-stories        Placeholder layout
/community              Events/workshops placeholder
/blog                   List (structure only, wired to Supabase)
/blog/$slug             Detail template
/contact                Enquiry form
```
Each route ships its own `head()` with route-specific title/description/og.

**Shared components**
- Sticky transparent → solid navbar with mobile drawer, active indicator, "Book Free Consultation" CTA
- Footer with nav / programs / contact / social placeholders / legal
- Reusable: `SectionHeader`, `ProgramCard`, `TestimonialCard`, `StatPill`, `GradientButton`, `EnquiryForm`
- Framer Motion: fade-up, staggered reveal, hover lift; respects `prefers-reduced-motion`

**Home sections**
Hero (outcome headline + dual CTA + AI illustration + floating gradient shapes) → Why GeekX (4 differentiators) → Featured Programs (6 cards) → Learning Journey → Industry Tools → Trust strip (✔ items, not fake numbers) → Founders preview → Testimonials carousel (placeholder) → FAQ → Final CTA + enquiry form.

**Splash intro**
Deferred to Phase 2 until you send the logo animation file. I'll stub a lightweight text-only intro (logo mark + tagline fade) as a placeholder that can be swapped in one component.

## Phase 2 — Backend (Lovable Cloud)

Enable Lovable Cloud, then create tables + RLS:
- `courses` (title, slug, description, duration, level, category, featured, curriculum jsonb, tools, projects, faq jsonb)
- `enquiries` (name, email, phone, course_interest, message, source_page, created_at)
- `testimonials` (name, role, quote, avatar_seed, approved)
- `team` (first_name, role, bio, order)
- `events` (title, description, date, type, link)
- `blog_posts` (title, slug, excerpt, body, cover, published_at)
- `user_roles` (separate table + `has_role()` security-definer fn — never role-on-profile)

Public reads via narrow `TO anon` SELECT policies + server publishable client in loaders. Enquiry insert allowed to `anon` with rate-limit trigger.

## Phase 3 — Admin Dashboard

- Email/password + Google auth
- `/_authenticated/admin/*` gated by `has_role(auth.uid(), 'admin')`
- CRUD screens for all tables above, powered by `requireSupabaseAuth` server functions
- Enquiry inbox with status (new/contacted/closed)

## Phase 4 — Splash intro (needs your logo animation)

Once you upload the animation (Lottie `.lottie`/`.json` preferred, or `.mp4`/`.webm`):
- Session-scoped (sessionStorage flag), Skip Intro button, auto-skip on `prefers-reduced-motion`, <4s total, preloads home hero
- Navy backdrop → animation → tagline fade → cross-fade to hero

## Technical notes

- Stack stays default: TanStack Start + Tailwind v4 + shadcn + Framer Motion; SEO via per-route `head()` (react-helmet-async not needed here).
- Images: generate hero + program-category illustrations with imagegen, save as `.jpg` in `src/assets/`; lazy-load below-the-fold.
- Course URLs are slug-based (`/programs/generative-ai`) via `$slug` param.
- No real photos for founders — gradient-ring initials avatars.
- All placeholder content flagged with `{/* TODO(client): ... */}` comments.

## Decisions I need from you

1. **Start now or wait for the logo animation?** I recommend starting Phase 1 immediately with a stub intro; swap the real animation in once you upload it.
2. **Enable Lovable Cloud now?** Needed for enquiry form + admin dashboard + courses/testimonials tables. If yes, I enable it in Phase 2.
3. **Featured/flagship program list for v1** — pick any 6 (I can seed with sensible defaults: Generative AI, Python for AI, Machine Learning, Cloud & MLOps, Full-Stack Development, AI Career Accelerator).
4. **Fonts** — okay to use Space Grotesk (display) + Inter (body)? Or you have a preference?

Approve and I'll build Phase 1 in one pass, then move to Cloud + Admin.
