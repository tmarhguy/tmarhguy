---
title: 'Successful Video — FPGA + PMOD'
date: '2026-08-28'
description: 'PMOD 12-bit DVI soldered and flashed. Red, green, blue, gray bars on HDMI. Pixels on the glass.'
project: tomato
image: '/images/assembly/hdmi-test.webp'
imageAlt: 'HDMI test pattern — color bars from the Nexys A7 through the PMOD.'
---

**See also:** [The PMOD Pivot](/writing/2026-08-26-the-pmod-pivot/) · [Tomato works beautifully!](/writing/2026-08-29-tomato-works-beautifully/) · [One Press, One Key](/writing/2026-08-28-one-press-one-key/)

The PMOD 12-bit DVI V1.1b module finally arrived today, and I went straight to work soldering the pins. This interface from my research is designed to make VGA and HDMI output straightforward directly from the FPGA, bypassing those passive adapters that were giving me trouble earlier.

After soldering, I flashed a quick test pattern. Oh man, it immediately worked—throwing pure red, green, blue, and gray bars right up on the screen via HDMI!

<video src="/images/assembly/hdmi-test.mp4" poster="/images/assembly/hdmi-test.webp" controls muted playsInline preload="metadata"></video>

_Color bars on the glass. ([video](/images/assembly/hdmi-test.mp4))_

With the video peripheral working properly, I can finally resume full HDMI testing. Next up is getting it to display TomatoOS and a few of the other graphical features I've already built into the architecture. Seeing actual pixels on the glass makes all the abstract logic suddenly feel very real!
