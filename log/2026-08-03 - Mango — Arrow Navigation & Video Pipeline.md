The Mango shell UI was up and running, but it still felt like a form with numbers tacked on — not a real terminal app. I wanted to implement the video pipeline so I can convert video to audio, and I wasn't sure if there was a way to "select" with arrow keys too. That turned into a broader pass: from the start page and all, Mango should allow for arrow entry, so that the "Enter choice" prompt can be deleted completely.

## The Problem

  Typing `1`–`6` (or memorizing tool names) works, but it breaks the illusion Mango is going for. The menus looked polished, yet every screen still dumped you into a line prompt: *Enter choice*. Worse, several tools in the registry — including **Video → GIF** and **Extract Audio** — showed as "coming soon" because the underlying `bin/` scripts did not exist yet. The UI promised a toolkit; the filesystem had not caught up.

### Video & Audio pipeline

Rather than stubbing forever, I wired the first real ffmpeg-backed scripts into the registry:
- **`bin/to_gif`**: Video → GIF via ffmpeg's palette method (defaults: 480px wide, 15 fps).
- **`bin/extract-audio`**: Pull the audio track from a video as MP3 (WAV optional).

Mango only marks a tool **● ready** when the script exists and is executable — so creating these binaries immediately unlocked the Video & Audio category for real conversions.

### Arrow-key navigation everywhere
Instead of enter a number, Mango now uses the arrow keys and Enter to trigger menu actions — on the home screen, category browsers, Quick Convert, and file picking.

- **`ui_menu_select`**: Unified interactive menu with a `❯` cursor, ↑↓ to move, Enter to select.
- **`ui_arrow_select_file`**: When matching files exist in the current directory, pick from a live list (↑↓ · Enter · **P** to type a path · **Q** to cancel).
- **Removed**: `_mango_read_menu_choice` and the numbered "Enter choice" prompt entirely.

Menus redraw in place; the brand panel stays visible on Home. Submenus show the familiar `● ready ○ coming soon` legend without asking you to type anything.

## Bash 3.2 realities
macOS still ships Bash 3.2. Two gotchas surfaced immediately while building the key loop:
- **`local -n` namerefs** — not available; refactored to stdout-returning helpers.
- **`read -t 0.05`** — fractional timeouts are rejected; escape sequences are now read one character at a time with integer `-t 1`. 

*Mango should feel like navigating an app, not filling out a survey. Arrows first; typing only when you actually need a path.*