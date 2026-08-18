---
title: 'Shell UI - Mango'
date: '2026-08-01'
description: 'As the toolkit expands, remembering individual script paths, names, and arguments becomes cumbersome. To solve this, I am introducing Mango—a centralized, interactive shell inte...'
project: mango
image: '/images/mango/title_screen_mango.png'
imageAlt: 'Mango title screen'
---

**See also:** [Tools](/writing/2026-08-01-tools/) · [Mango — Arrow Navigation & Video Pipeline](/writing/2026-08-03-mango-arrow-navigation-video-pipeline/) · [System-Wide Call](/writing/2026-08-11-system-wide-call/)

As the toolkit expands, remembering individual script paths, names, and arguments becomes cumbersome. To solve this, I am introducing **Mango**—a centralized, interactive shell interface.

## Why "Mango"?

- **Cool Factor**: It's short, memorable, and fun.(PS: I don't even like mangoes, but apple is taken :)
- **Convenience**: Instead of calling various `tools/...` scripts with long paths, you simply type `mango` anywhere in your terminal.

## Core Features & Goals

- **Highly Interactive**: The UI should feel like a polished application, not a standard text dump. It will prompt for inputs step-by-step.
- **Zero Friction**: Accessible immediately from the terminal without worrying about long URLs, data paths, or flags.
- **Longevity**: Designed to be the permanent front-end for all future PDF, image, and video workflows.

## Execution Plan

1. **Build `bin/mango`**: A pure bash script (for maximum portability) featuring a stylized menu.
2. **Global Access**: Ensure the script is in the `$PATH` so it can be invoked globally.
3. **Seamless Tool Integration**: Dynamically map user choices to the underlying scripts in the `tools/` directory.

## Screenshots

![Title screen](/images/mango/title_screen_mango.png)

![Main menu](/images/mango/main_menu.png)

![Folder browser](/images/mango/dir_navig.png)

![Compress image flow](/images/mango/img_comp_window.png)
