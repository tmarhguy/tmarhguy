# 2026-08-11 — System-Wide Call

> *A tool is useful when it offers the least friction for the most work done.*

**Mango**, in all my use cases, has delivered exactly as programmed: **rapid conversion and data manipulation**. It has undergone several changes, especially with the UI, to include features like:

* **Arrow-controlled UI:** Seamless terminal navigation.
* **Context-aware filtering:** Shows only existing files that match a selected operation (also arrow-controlled).
* **Clean exit:** A graceful way to terminate the process.

...and so much more! 

### The Friction Point

I noticed a massive bottleneck, however: I always have to call it from Mango's own working directory, forcing me to either move the target files there or constantly navigate back and forth. 

| The Old Way (High Friction) | The New Build (Zero Friction) |
| :--- | :--- |
| `cd ~/projects/mango` <br> `mv ~/target_dir/file.txt .` <br> `./mango` | `cd ~/target_dir` <br> `mango` |
| Locked to Mango's local working directory. | A universal, system-wide call from any path. |

In this build, I am making Mango a universal call. From any working directory, you can just type `mango`, and it will spin up the UI right where you are to convert whatever is needed.

### The Roadmap: CLI File Explorer

While this architecture is in development, I will also add support for extensive directory management. By wrapping native Linux commands under the hood and layering Mango on top, I can handle tasks like batch file renaming entirely within the terminal. 

It will act almost like a lightweight, CLI file explorer—focused on surfacing exactly the right files and giving you the power to interconvert and move them seamlessly.

Later, when this UI foundation is rock solid, heavier features like audio transcription and other data pipelines can be directly integrated into the build. 

**Exciting build ahead!**