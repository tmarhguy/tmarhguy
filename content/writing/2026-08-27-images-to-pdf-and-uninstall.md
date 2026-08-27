---
title: 'Images to PDF and Uninstall'
date: '2026-08-27'
description: 'Multi-select images → one PDF, dated default names, and a full uninstall path so installs stay honest.'
project: mango
image: '/images/mango/test_images_to_pdf_select.png'
imageAlt: 'Pick images — Space toggles which ones go into the PDF'
---

**See also:** [System-Wide Call](/writing/2026-08-11-system-wide-call/) · [Mango — Arrow Navigation & Video Pipeline](/writing/2026-08-03-mango-arrow-navigation-video-pipeline/) · [Shell UI — Mango](/writing/2026-08-01-shell-ui-mango/)

I've added a new feature, images to PDF. Originally, the image to PDF feature only converted a single image to PDF, but this helps convert from select images which you toggle select with the spacebar.

![Pick images — Space toggles which ones go into the PDF](/images/mango/test_images_to_pdf_select.png)

_Space to select. Build the set, then merge._

I have added the feature to enter a desired final name or keep a default `merged_FILETYPE_DATE` for each file that is created from files. Reason is using a default naming like `images.pdf`, linux `mv` will always delete the old copy and replace with this "new" version when those two files are almost certainly unrelated. The default named with date also solves the same problem assuming I don't have a special naming to give.

![Name this PDF — dated default, or type your own](/images/mango/enter_filename_img_to_pdf_test.png)

_Dated default — or type a name that means something._

I have added an uninstall feature as I remember my quiet frustration whenever I cannot uninstall something completely from my computer, making me feel the builder wants to force me to use it (lol).

Here, I plan to system use it as say `mango uninstall` or something but that should allow full system wipe. If a UI is needed to ask if to keep user files or any additional metrics, I will add them.

Granted, I need it myself to equally test production version so I remove it fully and install a fresh copy from GitHub to ensure it works.
