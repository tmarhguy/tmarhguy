import { WIKIPEDIA_URL } from './contact';

export const aboutMarkdown = `# Growing up in Ghana

### A bus by the road

I grew up between Kumasi and Accra with my sisters, Nikita and Amrita. We are triplets. Engineering, for me, started before a laboratory and before a line of code. It started with a question my father put in me, and with a problem the family had to live with: we had no electricity.

After my father’s illness, we spent about two or three years in a bus parked by the road, moving between Accra Central and Kokrobite. My sisters and I were out of school for part of that time. We learned to get by, and we watched him struggle with his health.

### Copper and magnets

My father had worked with wind generators in Germany, then came home to be with us. I used to watch him wind copper and set neodymium magnets. I was fascinated by the parts and I rarely understood what he was trying to make them do. Copper and magnets make electricity? I asked until he got tired of the questions and, around thirteen, taught me to build a wind generator myself.

### Two hours a day

There was no power on the bus. I found that scrap phone batteries lying around could run LEDs, and I started trying to keep them charged from the machine. When the wind would not turn it, I put a piece of wood in the shaft and cranked it by hand, sometimes for two hours a day. For much of the time we lived there, that was the routine, and it gave us a little light when we needed it.

It did not feel like an achievement. It was a problem that needed solving.

<figure>
  <video src="/images/about/wind-generator.mp4" poster="/images/about/wind-generator.webp"></video>
  <figcaption>Archival footage of early generator work with my father: copper windings and a multimeter.</figcaption>
</figure>

### The library, and a hot nail

I spent a lot of those years at the Accra Central Library, where I could read for free, trying to understand how a generator worked and how to waste less of what it made. When a book mentioned Zener diodes, rectifiers, or a linear regulator, I saved what little I had and bought the part so I could try it. I also watched artisans work metal. I learned to solder with a red-hot nail and a heated carbon rod.

I did not know yet whether I wanted to be an electrical engineer or a mechanical one. I knew that I loved finding out how a thing worked, and that the better I understood it, the more I could improve it. That has not left me.

### Aggregate six

When my father’s health improved and we found a place to live, I went back to school in Kumasi and at Rising Academy in Ablekuma. I had missed years. I finished junior high as overall best student and head boy, with an aggregate of six.

What I wanted next was General Science at Achimota, and a place in the National Science and Maths Quiz.

# Attending Achimota

### Kept out

In March 2021, Achimota School denied me admission because I wear dreadlocks as an expression of my Rastafarian faith. The dispute was followed across the country. It became a long fight for the right to go to school and to keep my faith. My family challenged the decision alongside the family of Oheneba Kwaku Nkrabea.

On 31 May 2021, [Ghana’s High Court ruled in our favor](https://www.bbc.com/pidgin/world-57306291) and ordered the school to admit us. I enrolled shortly afterward and completed my secondary education there. [Deutsche Welle](https://www.dw.com/en/ghana-rastafarians-start-school-after-court-victory/video-57864466) covered our return to school.

### A chance to develop it

What I took from it is that talent does not count for much if you are never allowed to develop it.

# School and academic awards

### Half an hour late

I arrived at Achimota much later than my classmates. Over the weekend I bought textbooks and saw how far behind I was. On the day I got there, the class was already [half an hour into the first-semester exams](https://www.myjoyonline.com/tyrone-marhguy-sits-for-exams-hours-after-being-enrolled-at-achimota-school/). I was meeting ideas I had never studied. I was determined to understand them anyway.

- **2021:** I [topped my class in Science and Elective Mathematics](https://www.adomonline.com/tyrone-marghuy-tops-class-in-science-elective-maths-despite-admission-woes/).
- **2023:** I earned [eight A1 grades in the WASSCE](https://www.myjoyonline.com/rastafarian-achimota-student-tyrone-marhguy-scores-8-as-in-wassce/) at Achimota.
- **2023:** Through the Ghana Olympiad Academy I received a [gold medal and the national top-scorer award in the American Mathematics Olympiad, and a silver medal in the Vanda Science International Olympiad](https://www.myjoyonline.com/tyrone-marhguy-wins-american-math-olympiad-awards/). I placed seventh in the country in Vanda.
- **2024:** A 1500 on the SAT and a [full scholarship](https://www.myjoyonline.com/achimota-schools-tyrone-marhguy-gets-full-scholarship-at-university-of-pennsylvania/) brought me to the [University of Pennsylvania](https://www.upenn.edu) to study Computer Engineering.

### A new country

I was the first in my family to go to college. I had lived my whole life in Ghana, so the first months were a new school, a new culture, and a new way of living. They were also the chance to go back to questions I had been asking since that generator, this time with more means to pursue them.

# What I’m building now

I’m working toward a B.S.E. in Computer Engineering, expected in 2028.

### Taking a machine apart

[Tomato](https://tomato.tmarhguy.com) began as an [arithmetic unit](https://alu.tmarhguy.com) I built from logic, in my dorm room, with no lab and no research group telling me what to do. I did not want a processor that was already finished. I wanted to see how transistors become gates, how those gates do arithmetic, and how that becomes a computer.

It felt like taking an airplane apart down to the smallest piece and then asking: if I understand every part, how sure could I be of putting it back together, and maybe putting it back better?

I put more than 300 hours into a design of [about 3,500 transistors](https://alu.tmarhguy.com). Most of the work was drawing it, testing it, finding the mistake, and starting again. The next summer I went back to improve it. The more I looked at what it could not do, the larger the project got. What had been an arithmetic unit became a 32-bit computer. And it ran.

### A computer, and the software that speaks to it

I designed Tomato’s architecture, a custom instruction set, and an arithmetic core of two lookup tables feeding an adder. The operations are not a fixed list, the way they are in a conventional ALU. Hardware was only half of it. How does a computer understand what we write? How does that writing become the electrical work inside the processor? To use the machine I had to build the software around it, including an assembler that turns those instructions into machine code.

It runs on an FPGA. That is not a finished silicon chip. It is how I test the architecture in real hardware before a more permanent build. The discrete boards are in progress.

### Past one processor

The project grew into a wider question of hardware and software together. [Pineapple](https://tmarhguy.github.io/gpu/) is a programmable GPU I have been designing alongside Tomato. I also build systems software: [SeaLion](https://tmarhguy.github.io/sealion/), a search engine; [Lobster](https://tmarhguy.github.io/lobster/), a compiler; and [FigDB](https://tmarhguy.github.io/figDB/), a database.

I contribute fixes to [LibreLane](https://github.com/librelane/librelane), [OpenROAD](https://github.com/The-OpenROAD-Project/OpenROAD), [Verilator](https://github.com/verilator/verilator), and [OpenFPGA](https://github.com/lnis-uofu/OpenFPGA). Open-source tools are a large part of how I could learn this at all. Sending a fix back is one way to leave that path open for someone else. My engineering work has included production software at Aragorn AI and battery-management hardware at Vero Electric. I’ve also taught STEM, computer science, and AR/VR.

### The same questions

The deeper reason has always been home. I grew up with power that failed, dusty roads to school, and flooding, and with how hard a problem gets when the people who understand it are far away. Using a system designed somewhere else is not the same as being able to design one. Computing, semiconductors, energy: the question is not only how to acquire the machines, but how to design them for the power, the area, and the parts we actually have. Can we train engineers who will propose another way, rather than only follow the usual one?

I do not think the computers I have built have answered that. They are how I am learning the depth the questions need. I want the rest of my time here to make designing and improving a machine feel ordinary. I want to go back to Ghana able to take a hard problem and make something that works in the place it has to work: efficient, and fit for the conditions, not only impressive somewhere else.

The child turning that generator by hand, and the work I do now, are not two ambitions. Both are asking the same thing. How does this work? Why does it work this way? And how can I make it work better?

My [projects](/projects/), [resume](/resume/), and [engineering log](/writing/) go into the technical work. The [press archive](/press/) collects the reporting and interviews; [Wikipedia](${WIKIPEDIA_URL}) provides a public biography.

# Away from the desk

I enjoy the beach, dogs, Sudoku, and biking.
`;
