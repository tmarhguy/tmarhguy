---
title: 'Automating Vivado + OpenLane PPA Extraction'
date: '2026-08-08'
description: 'Why manual Vivado and OpenLane report scraping does not scale — and building a FastAPI + PostgreSQL pipeline to ingest PPA metrics automatically.'
project: metrics-api
---

**Date:** 2026-08-08

**See also:** [First clean Vivado bitstream](/writing/2026-08-02-successful-synthesis-implementation-bitstream/) · [Hardware Metrics API](/projects/#hardware-metrics-api) · [repo](https://github.com/tmarhguy/metrics-api)

This summer has been a massive exploration across multiple domains: analog layouts, ASIC MAC units, and building entire computers from scratch with discrete transistors (see [Tomato](/projects/#tomato)). Perhaps the most exciting leap of them all was finally buying an FPGA — a Nexys A7 that cost an arm and a leg — and diving headfirst into Vivado for the very first time.

---

## The Bottleneck

Fast forward a few weeks, and a new, highly tedious bottleneck appeared. Every RTL iteration generates Power, Performance, and Area (PPA) metrics. For a while, my workflow consisted of digging through Vivado and OpenLane synthesis reports, manually copying the numbers, and pasting them into a formatted structure I liked.

As an engineer I spoke to once said: **Sanity is the fourth metric.**

I couldn't keep doing this for every single iteration. Manually scraping logs kills the momentum of hardware design.

---

## API to Resolve the Impatience

To fix this, I decided to build a [Hardware Metrics API](/projects/#hardware-metrics-api). If I'm going to iterate fast, I need the data structured and handed to me automatically.

This project uses a FastAPI REST service backed by PostgreSQL to ingest, store, and query these PPA metrics. It is fully containerized via Docker. Instead of me digging for numbers, an automated pipeline now parses the Vivado and OpenLane synthesis reports directly, writing structured records into a database schema designed specifically for multi-project, multi-iteration benchmarking with indexed time-series queries. I also wrapped it in a Pytest integration suite to ensure the API endpoints and data integrity are bulletproof.

- **API — FastAPI.** Ingest uploads; list and filter runs.
- **Store — PostgreSQL.** Indexed PPA columns plus `raw_metrics` JSON.
- **Deploy — Docker Compose.** Postgres and API, Alembic on boot.
- **Verify — pytest.** Parsers, discovery, ingest, and HTTP — no Vivado required.

Entry points today: `metrics ingest` CLI, `POST /ingest/vivado`, `POST /ingest/openlane`, `GET /runs`.

---

## The Tooling Philosophy

There's a recurring theme in my workflow: when a process introduces friction, I like to write a tool to kill it (the Linux `kill` kind, not `top`). It is exactly why I built **[Mango Tools](/projects/#mango-tools)** — a purely offline terminal UI so I never have to upload PDFs or videos to random conversion websites again. It's the same reason I built **[QueuePaste](/projects/#queuepaste)** for macOS to automate pasting thousands of rows a day for my campus job.

I like to say that a well-structured computer engineering program like [Penn's](https://cmpe.engineering.upenn.edu/) means you have the flexibility to pull from both software and hardware toolkits to solve the problem in front of you.

The [Metrics API](/projects/#hardware-metrics-api) was always going to come into the picture because I want to optimize the journey of figuring out how things work. Now, while I focus on learning taping out my custom chips and iterating on the Nexys A7, I can rest assured the PPA metrics will be brought directly to me like a waiter at a bar.

Exciting builds and learning ahead :)
