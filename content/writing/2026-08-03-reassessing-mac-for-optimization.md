---
title: 'Reassessing Mac for optimization'
date: '2026-08-03'
description: 'Returning to the MAC tapeout path after months on Tomato — planning LibreLane flow, cross-verification, and timing closure.'
project: mac
---

# Reassessing MAC for optimization

Over the last few months, I have read and worked on several other projects — the most important of them all being **tomato**: what if we replaced the conventional ALU in a computer with the topology adder — `mux(An, Bn, Cn), mux(An, Bn, Cn), carry_in select`? Tomato has been enormously enlightening and exciting to build!

It was one thing to learn architecture and another to build it from transistor level up, and writing your own ISA and hex to run a custom program!

**Back to the mac.** Current AI needs an optimized workload machine, and the mac is one of them. I will work to tape this out among other important work to make this as exciting as possible for myself and anyone who's reading this far :)

I will explore the fun LibreLane process for this MAC and cross-verify with rigor, so that when taped out it meets all timing requirements — and indeed MACs a number!
