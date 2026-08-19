---
title: 'First Phase of Assembly'
date: '2026-08-18'
description: 'DigiKey overnight, then flux and tweezers. All 74ACT151s and the adders on one board, seven LEDs down — copper lining up with the pins, beside the Digital sim.'
project: tomato
image: '/images/assembly/beside_sim.webp'
imageAlt: 'Half-soldered 07_alu board in hand, Digital simulation on the monitor behind it.'
---

**See also:** [PCBs Arrive!](/writing/2026-08-15-pcbs-arrive/) · [Solder Station Arrives](/writing/2026-08-13-solder-station-arrives/) · [Ordered Tomato](/writing/2026-08-07-ordered-tomato/)

Today is perhaps one of the most important ones of this project. I got the parts from DigiKey. There was an initial delay, but they replaced it when I called. After weeks of staring at digital schematics and KiCad renders, having physical silicon show up at the door is a huge milestone.

![DigiKey overnight box — logo on the side, held over cobblestones.](/images/orders/digikey_order_box.webp)

_The overnight box from DigiKey. Silicon, finally in hand._

With the components finally here, I cleared off my desk, set up the flux and tweezers, and laid out my tools to prepare for the assembly process. The footprint on these SMD chips is completely different when you're actually holding them rather than just placing them on a grid.

![Bench for Tomato assembly — iron, meter, tweezers, 07_alu on the monitor.](/images/assembly/work_setup.webp)

_Iron, meter, tweezers. The schematic stays up while the board comes off the screen._

All parts have arrived, and I have soldered all 74ACT151s on one of the boards. I have also soldered each adder (74ACT283). Working with the 74ACT logic series requires a steady hand, and laying down that much logic takes a lot of time and patience.

<video src="/images/assembly/placing_and_soldering.mp4" poster="/images/assembly/placing_and_soldering.webp" controls muted playsInline preload="metadata"></video>

_Placing and soldering the 74ACT logic chips. ([video](/images/assembly/placing_and_soldering.mp4))_

The LEDs are so small, but I have soldered about 7 of them. Trying to align them correctly without bridging the pads is honestly a test of endurance, but seeing those tiny indicators in place makes it worth it.

<video src="/images/assembly/soldering_led.mp4" poster="/images/assembly/soldering_led.webp" controls muted playsInline preload="metadata"></video>

_Soldering the indicator LEDs — 0805, one pad at a time. ([video](/images/assembly/soldering_led.mp4))_

It's quite exciting seeing these components for the first time and each of them fitting perfectly. I put the half-soldered board right next to the simulation on my monitor to see them side by side. It's surreal to look back and forth between the digital truth table running on the screen and the physical gates sitting on the mat.

![Half-soldered 07_alu board in hand, Digital simulation on the monitor behind it.](/images/assembly/beside_sim.webp)

_The physical board taking shape right next to the Digital simulation._

Each one of them fit so nicely, and it made me realize how much of work was done to keep this running all this while. Designing the routing and doing the DRC checks in KiCad is one thing, but actually seeing the copper paths line up perfectly with the pins is immensely rewarding. This board is finally coming to life.
