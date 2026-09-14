---
title: 'Pixels on the Glass'
date: '2026-08-28'
description: 'The PMOD 12-bit DVI V1.1b module finally arrived, and I went straight to work soldering the pins. This interface is designed to make VGA and HDMI output straightforward directly...'
project: tomato
image: '/images/assembly/fpga-board-pmod.webp'
imageAlt: 'Nexys A7 with iCEBreaker 12-bit DVI PMOD on JC and JD'
---

The PMOD 12-bit DVI V1.1b module finally arrived, and I went straight to work soldering the pins. This interface is designed to make VGA and HDMI output straightforward directly from the FPGA — bypassing those passive adapters that were giving me trouble earlier.

After soldering, I flashed a quick test pattern. It immediately worked: pure red, green, blue, and gray bars right up on the screen via HDMI.

<video src="/images/assembly/hdmi-test.mp4" poster="/images/assembly/hdmi-test.webp" controls playsinline style="display: block; margin: 0 auto; width: 70%;"></video>

![Nexys A7 with iCEBreaker 12-bit DVI PMOD on JC and JD](/images/assembly/fpga-board-pmod.webp)

Video peripheral is working again, so I can get back to HDMI testing. Next step is TomatoOS and the other GUI stuff already in the architecture. Color bars on a monitor beat staring at waveforms.

Earlier: [the PMOD pivot](/writing/2026-08-26-the-pmod-pivot/) when VGA adapters failed. Same day on the bench: [Successful Video / FPGA + PMOD](/writing/2026-08-28-successful-video-fpga-pmod/). Paper: [pixels-on-glass](https://tomato.tmarhguy.com/journal/pixels-on-glass.html).
