# 2026-08-18 - First Phase of Assembly

Today is perhaps one of the most important ones of this project. I got the parts from DigiKey. There was an initial delay, but they replaced it when I called. After weeks of staring at digital schematics and KiCad renders, having physical silicon show up at the door is a huge milestone.

<p align="center">
  <img src="../../media/orders/digikey_order_box.webp" alt="DigiKey overnight box — logo on the side, held over cobblestones." width="70%" />
</p>
<p align="center"><em>The overnight box from DigiKey. Silicon, finally in hand.</em></p>

With the components finally here, I cleared off my desk, set up the flux and tweezers, and laid out my tools to prepare for the assembly process. The footprint on these SMD chips is completely different when you're actually holding them rather than just placing them on a grid.

<p align="center">
  <img src="../../media/assembly/work_setup.webp" alt="Bench for Tomato assembly — iron, meter, tweezers, 07_alu on the monitor." width="70%" />
</p>
<p align="center"><em>Iron, meter, tweezers. The schematic stays up while the board comes off the screen.</em></p>

All parts have arrived, and I have soldered all 74ACT151s on one of the boards. I have also soldered each adder (74ACT283). Working with the 74ACT logic series requires a steady hand, and laying down that much logic takes a lot of time and patience.

<p align="center">
  <video src="../../media/assembly/placing_and_soldering.mp4" poster="../../media/assembly/placing_and_soldering.webp" controls muted width="70%"></video>
</p>
<p align="center"><em>Placing and soldering the 74ACT logic chips onto the board.</em></p>

The LEDs are so small, but I have soldered about 7 of them. Trying to align them correctly without bridging the pads is honestly a test of endurance, but seeing those tiny indicators in place makes it worth it.

<p align="center">
  <video src="../../media/assembly/soldering_led.mp4" poster="../../media/assembly/soldering_led.webp" controls muted width="70%"></video>
</p>
<p align="center"><em>Soldering the indicator LEDs — 0805, one pad at a time.</em></p>

It's quite exciting seeing these components for the first time and each of them fitting perfectly. I put the half-soldered board right next to the simulation on my monitor to see them side by side. It's surreal to look back and forth between the digital truth table running on the screen and the physical gates sitting on the mat.

<p align="center">
  <img src="../../media/assembly/beside_sim.webp" alt="Half-soldered 07_alu board in hand, Digital simulation on the monitor behind it." width="70%" />
</p>
<p align="center"><em>The physical board taking shape right next to the Digital simulation.</em></p>

Each one of them fit so nicely, and it made me realize how much of work was done to keep this running all this while. Designing the routing and doing the DRC checks in KiCad is one thing, but actually seeing the copper paths line up perfectly with the pins is immensely rewarding. This board is finally coming to life.
