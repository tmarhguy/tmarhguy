# Press archive

The live page is `/press/`; its source catalogue is `src/data/press.json`.

## Editorial and layout decisions

Keep worthwhile reporting, first-person interviews, academic recognition, engineering coverage, and positive social responses. Exclude unrelated name matches, incidental mentions, private records, personal disputes, and broken/parked pages. Social posts are coverage, not independent verification of engineering claims. Summaries describe an ALU accurately even when headlines call it a CPU or a complete computer.

Use publication dates rather than event dates. Exact dates come from publisher pages or explicit indexed publication metadata. The formatter supports year-only dates; use a note explaining uncertainty if an exact day cannot be verified. Related links inherit their story grouping, not its publication date. Related reports, syndicated copies, and clips have visible source-kind labels. Never infer dates from engagement counts or invent a publication day.

A large engineering video leads the page beside three equally spaced story previews; the timeline defaults to newest first (2026 down). Search spans publishers, titles, summaries, and related sources. Topic and format filters combine. Social filtering includes stories containing social links. Year jumps and compact expandable source groups make a large archive manageable. Counts, review dates, editorial slogans, outbound arrow glyphs, and the missing-story invitation are intentionally absent from the UI. Each title links to the original source. Publisher Open Graph images appear as small thumbnails, loaded lazily without referrers. Missing or failed previews use the ten-image fallback collection. The engineering lead uses a muted local ALU demonstration; no social embeds or login is required to read the archive itself. Run `node scripts/sync-press-previews.mjs` to fetch previews for new links, or add `--refresh` to update all cached metadata. Preview fetching is an explicit maintenance step, not a dependency of every build.

## Research completed, 1 October 2026

Checked the root README and Wikipedia bibliography; searched Tyrone Marhguy and spelling variants; inspected Google name results and publisher archives (Joy, Citi, YEN, Modern Ghana); followed original YouTube, Facebook, Instagram, and TikTok destinations. Expanded the first 52-link draft to 99 links across 55 timeline entries. Counts are computed from the catalogue, excluding the repeated featured links.

Notable additions include Rising Academies' first Alumni of the Year award, GSTEP's celebration, Dr. Banda Khalifa interviews, Kwadwo Sheldon commentary, Kobe Boujee, Voice of KNUST, The Ghana Insider, the SAT and WASSCE celebrations, and a UCC Law Journal commentary. The archive is intentionally growing: a web search cannot prove that every post has been found.

## Remaining research leads

- BBC Africa's 2024 feature: confirmed by Tyrone's public LinkedIn acknowledgement (`https://www.linkedin.com/feed/update/urn%3Ali%3Aactivity%3A7250747026051657728/`). Find the original BBC permalink before adding it as an independent BBC entry.
- Kofi TV's February 2026 full interview: GHnow verifies the interview and date. Add the original YouTube/Facebook full episode when its precise permalink is verified.
- The AfricaDream and Campus Chronicles LinkedIn ALU posts: confirm publication dates and editorial accuracy before adding separate timeline entries.
- Yale Model African Union invitation: locate the organizer's original dated announcement, rather than relying on a repost.
- Metro TV's 2021 interview and 3Xtra's full interview: find native publication metadata and group clips with full episodes.
- Global African Times scholarship article resolves to a parked domain; excluded until an authoritative archived copy is found.
- Additional news and social results remain discoverable under Tyron, Tyrone Iras, Marghuy, and Marhguy. Prioritize original interviews and distinct reporting over identical reposts.

## Maintenance sequence

1. Discover a candidate and record its original permalink (not a Google redirect).
2. Verify publisher, title, date, and relevance. Record evidence and review date.
3. Group duplicate reporting or clips under the existing story; add a separate entry for a distinct interview, recognition, or story.
4. Check title wrapping, source disclosure, search/filter intersections, and mobile navigation.
5. Run tests, type checking, lint, production build, and export verification before publication.

Do not silently remove unavailable historical reporting. Document a changed or broken source and look for an authoritative archive. No recurring automation or publication was requested or configured.

Featured coverage now leads with the computer-brain story, followed by the user-selected BBC article and DW. The BBC image uses the family selfie from the article body. Ten publisher images in `press-fallbacks.json` provide deterministic illustrative fallbacks, with an existing local photo if remote images fail. Sources for each fallback remain in that manifest. The archive retains all coverage and descending chronology.

The social research pass added seven timeline entries and eight related links, bringing the catalogue to 63 entries and 116 distinct source links. A 4 October 2026 pass restored the ALU announcement entry with seven related links, bringing the catalogue to 64 entries and 124 distinct source links. Original milestone announcements are grouped with their Facebook/X versions and relevant community responses. See [social research](social-research.md) for permalink provenance and engagement observations.
