import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { TimelineItem } from '../components/ui/Timeline';
import { FadeIn } from '../components/ui/FadeIn';
import { ImageWithFallback } from '../components/ui/ImageWithFallback';
import { setCanonical, setDocumentTitle, setJsonLd, setMeta, setMetaProperty } from '../utils/seo';

/*
 * Press coverage data organized by tier.
 * All URLs sourced from README_LINKS.md.
 */
const internationalPress = [
  { outlet: 'BBC Africa', headline: 'Rastafarian student returns to school', link: 'https://www.bbc.com/pidgin/sport-57307283' },
  { outlet: 'BBC Pidgin', headline: 'World News Segment', link: 'https://www.bbc.com/pidgin/world-57306291' },
  { outlet: 'Associated Press', headline: '"Ghana Rastafarians start school after court victory"', link: 'https://apnews.com/article/africa-religion-education-ghana-186c67bd473f892c054e5d1f9368b555' },
  { outlet: 'Voice of America', headline: '"Rastafarian teen fights to keep dreadlocks"', link: 'https://www.voanews.com/a/rastafarian-teen-fights-to-keep-dreadlocks/6276979.html' },
  { outlet: 'Deutsche Welle', headline: '"Ghana Rastafarians start school after court victory"', link: 'https://www.dw.com/en/ghana-rastafarians-start-school-after-court-victory/video-57864466' },
  { outlet: 'DW — The 77 Percent', headline: '"Does your hairstyle decide what school you can go to?"', link: 'https://www.dw.com/en/the-77-percent-does-your-hairstyle-decide-what-school-you-can-go-to/av-57061879' },
  { outlet: 'Cambridge Political Affairs', headline: 'Contemporary Contestations', link: 'https://www.cambridgepoliticalaffairs.co.uk/wp-content/uploads/2025/08/CJPA_10th_Edition.pdf#page=102' },
  { outlet: 'Toronto Star', headline: '"In Ghana, Rastafarian high schooler fights to keep his hair"', link: 'https://www.thestar.com/news/world/2021/10/19/in-ghana-rastafarian-high-schooler-fights-to-keep-his-hair.html' },
  { outlet: 'Indianapolis Recorder', headline: 'International News — Print Edition', link: 'https://indianapolisrecorder.com/wp-content/uploads/2021/10/Oct-22-2021.pdf' },
  { outlet: 'Daily Herald', headline: '"In Ghana, Rastafarian high schooler fights to keep his hair"', link: 'https://www.dailyherald.com/20211019/news/in-ghana-rastafarian-high-schooler-fights-to-keep-his-hair/' },
];

const regionalPress = [
  { outlet: 'Joy News', headline: 'Tyrone Marhguy wins American Math Olympiad awards', link: 'https://www.myjoyonline.com/tyrone-marhguy-wins-american-math-olympiad-awards/' },
  { outlet: '3News', headline: 'From Eric\'s Diary: Tyrone Marhguy shocks fans', link: 'https://3news.com/featured/from-erics-diary-tyrone-marhguy-shock-fans' },
  { outlet: 'Citi News', headline: '"I wasn\'t discouraged by Achimota School\'s rejection"', link: 'https://citinewsroom.com/2023/12/i-wasnt-discouraged-by-achimota-schools-rejection-tyrone-marhguy/' },
  { outlet: 'GhanaWeb', headline: 'The Tales from Achimota School: The story of the Rastafarian student', link: 'https://www.ghanaweb.com/GhanaHomePage/NewsArchive/The-Tales-from-Achimota-School-The-story-of-the-Rastafarian-student-Tyrone-Marhguy-1948104' },
  { outlet: 'Daily Graphic', headline: 'Video: How Tyrone Marhguy celebrated his WASSCE 8As', link: 'https://www.graphic.com.gh/news/general-news/video-watch-how-achimota-rastafarian-student-tyrone-marhguy-celebrated-his-wassce-8as-with-his-friends.html' },
  { outlet: 'YEN.COM.GH', headline: 'Achimota graduate wins full scholarship to Penn', link: 'https://yen.com.gh/education/265404-tyrone-marhguy-achimota-graduate-full-scholarship-study-penn/' },
  { outlet: 'Pulse Ghana', headline: 'Tyrone Marhguy awarded full scholarship to UPenn', link: 'https://www.pulse.com.gh/articles/entertainment/celebrities/tyrone-marhguy-awarded-full-scholarship-to-study-at-university-of-pennsylvania-2024092708493225450' },
  { outlet: 'Face2Face Africa', headline: 'Ghana student initially denied admission scores straight As', link: 'https://face2faceafrica.com/article/ghana-student-initially-denied-admission-by-school-due-to-dreadlocks-scores-straight-as-in-final-exams' },
  { outlet: 'GH Headlines', headline: 'Tyrone Marhguy scores A1 in all subjects in WASSCE', link: 'https://ghheadlines.com/agency/pulse/20231219/163942876/tyrone-marhguy-popular-rastafarian-student-scores-a1-in-all-subjects-in-wassce' },
  { outlet: 'Global African Times', headline: 'Rastafarian Achimota School Alumnus gets Full Scholarship', link: 'https://globalafricantimes.com/tyrone-marhguy-rastafarian-achimota-school-alumnus-gets-full-scholarship-to-study-at-the-university-of-pennsylvania-usa/' },
  { outlet: 'Daily Guide', headline: 'Achimota Rastafarian fight not over', link: 'https://dailyguidenetwork.com/achimota-rastafarian-fight-not-over' },
];

const academicLegal = [
  { outlet: 'Wikipedia', headline: 'Tyrone Marhguy', link: 'https://en.wikipedia.org/wiki/Tyrone_Marhguy' },
  { outlet: 'Judy Legal', headline: 'Case Law: Tyrone Marghuy v. Achimota School', link: 'https://lite.judy.legal/amp/case/tyrone-marghuy-v-achimota-school' },
  { outlet: 'ResearchGate', headline: 'Tyrone Iras Marhguy at Pennsylvania University', link: 'https://www.researchgate.net/figure/Tyrone-Iras-Marhguy-at-Pennsylvania-University-as-an-Engineering-Student-Photo-Credit_fig1_389320456' },
  { outlet: 'West African Journal', headline: 'Academic Article on the Case', link: 'https://journals.jozacpublishers.com/index.php/wajesp/article/view/870' },
  { outlet: 'CDD Ghana', headline: 'Democracy Watch Report', link: 'https://cddgh.org/wp-content/uploads/2022/03/Democracy-Watch-40_ons_2022.pdf' },
  { outlet: 'GSTEP', headline: 'Youth Ambassador Profile', link: 'https://www.gstep.org.gh/youth-ambassador/tyrone-marhguy/' },
];

function PressGrid({ items, label }: { items: typeof internationalPress; label: string }) {
  return (
    <div className="mb-10">
      <div className="font-mono text-[0.62rem] text-gold-champagne tracking-[0.2em] uppercase mb-4">{label}</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col no-underline transition-all duration-200"
            style={{
              padding: '1rem 1.2rem',
              background: '#111110',
              border: '1px solid #1e1e1a',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#c9a84c'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#1e1e1a'; }}
          >
            <div className="font-mono text-[0.6rem] tracking-[0.12em] text-gold-dim uppercase mb-1">{item.outlet}</div>
            <div className="text-[0.82rem] text-cream-dim italic leading-snug group-hover:text-cream transition-colors">{item.headline}</div>
          </a>
        ))}
      </div>
    </div>
  );
}

export const About = () => {
  useEffect(() => {
    setDocumentTitle('About Tyrone Marhguy — From Ghana to Penn Engineering | RTL & ASIC Designer');
    setMeta(
      'description',
      'Tyrone Iras Marhguy is a Ghanaian Computer Engineering student at Penn on a full scholarship. At 17, he won a landmark Ghana High Court case on religious freedom in education. Now he builds CPUs from scratch. Gold medalist, American Mathematics Olympiad. 8 A1s WASSCE. Featured in BBC, AP, VOA, Deutsche Welle, Wikipedia.'
    );
    setMeta(
      'keywords',
      'Tyrone Marhguy biography, Tyrone Iras Marhguy, Ghanaian engineer, Ghana High Court dreadlocks, Achimota School court case, Rastafarian student Ghana, Penn Engineering Ghana scholarship, Ghana math olympiad gold, WASSCE 8 A1s, University of Pennsylvania full scholarship Ghana, hardware engineer from Ghana, Ghanaian computer engineer'
    );
    setCanonical('https://tmarhguy.com/about');

    setMetaProperty(
      'og:title',
      'Tyrone Iras Marhguy — Hardware Engineer, Rights Advocate, Penn Student'
    );
    setMetaProperty(
      'og:description',
      'Grew up in Ghana. Lived on a bus. Won a constitutional court case at 17. Now building CPUs at Penn. Gold medalist. Full scholarship. Featured in BBC, AP, VOA.'
    );
    setMetaProperty('og:image', 'https://tmarhguy.com/images/tyrone.jpg');
    setMetaProperty('og:url', 'https://tmarhguy.com/about');

    setMeta(
      'twitter:title',
      'Tyrone Iras Marhguy — Hardware Engineer, Rights Advocate, Penn Student'
    );
    setMeta(
      'twitter:description',
      'Grew up in Ghana. Lived on a bus. Won a constitutional court case at 17. Now building CPUs at Penn.'
    );
    setMeta('twitter:image', 'https://tmarhguy.com/images/tyrone.jpg');

    setJsonLd('about-faq-schema', {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Who is Tyrone Marhguy?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tyrone Iras Marhguy is a Ghanaian Computer Engineering student at the University of Pennsylvania on a full scholarship. He is known for winning a landmark 2021 Ghana High Court case affirming his right to wear dreadlocks as a Rastafarian, and for building hardware from first principles including a discrete transistor ALU, ASIC tapeout on Sky130, and a 64-bit RISC-V processor.',
          },
        },
        {
          '@type': 'Question',
          name: 'What did Tyrone Marhguy build?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tyrone Marhguy built an 8-bit discrete transistor ALU from 3,488 CMOS MOSFETs (with 1.24M test vector verification), a BFloat16 MAC unit taped out on the Skywater 130nm process via OpenLane, and a 64-bit RISC-V CPU running at 100MHz on an Artix-7 FPGA with 96% ISA compliance.',
          },
        },
        {
          '@type': 'Question',
          name: 'What was the Achimota School dreadlocks court case?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "In March 2021, Achimota School in Ghana denied Tyrone Marhguy admission because of his dreadlocks, which he wears as part of his Rastafarian faith. His father filed suit at the Human Rights Division of the Accra High Court. On May 31, 2021, Justice Gifty Agyei Addo ruled in Tyrone's favor, finding the denial unconstitutional and ordering his immediate admission. The case set a legal precedent for religious expression in Ghanaian education.",
          },
        },
        {
          '@type': 'Question',
          name: 'Where does Tyrone Marhguy go to school?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tyrone Marhguy is a Computer Engineering student at the University of Pennsylvania (Penn) School of Engineering and Applied Science, Class of 2028, on a full scholarship.',
          },
        },
        {
          '@type': 'Question',
          name: 'What awards has Tyrone Marhguy won?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Tyrone Marhguy won a Gold Medal as national champion in the American Mathematics Olympiad (2023, 150,000+ participants), a Silver Medal in the Vanda Science International Olympiad (38,000+ participants), scored 8 A1s in the 2023 WASSCE, scored in the 99th percentile globally on the SAT, and received over $1.4M in scholarship offers, selecting a full scholarship to the University of Pennsylvania.',
          },
        },
      ],
    });

    setJsonLd('press-itemlist-schema', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Press Coverage — Tyrone Iras Marhguy',
      description:
        'Media coverage of Tyrone Marhguy across the Achimota School court case and hardware engineering projects.',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          item: {
            '@type': 'NewsArticle',
            headline: 'In Ghana, Rastafarian high schooler fights to keep his hair',
            url: 'https://apnews.com/article/africa-religion-education-ghana-186c67bd473f892c054e5d1f9368b555',
            publisher: { '@type': 'Organization', name: 'Associated Press' },
            datePublished: '2021-10-19',
            about: { '@type': 'Person', name: 'Tyrone Iras Marhguy' },
          },
        },
        {
          '@type': 'ListItem',
          position: 2,
          item: {
            '@type': 'NewsArticle',
            headline: 'Teen Fights to Keep Dreadlocks',
            url: 'https://www.voanews.com/a/rastafarian-teen-fights-to-keep-dreadlocks/6276979.html',
            publisher: { '@type': 'Organization', name: 'Voice of America' },
            datePublished: '2021-10-10',
            about: { '@type': 'Person', name: 'Tyrone Iras Marhguy' },
          },
        },
        {
          '@type': 'ListItem',
          position: 3,
          item: {
            '@type': 'NewsArticle',
            headline: 'Ghana Rastafarians start school after court victory',
            url: 'https://www.dw.com/en/ghana-rastafarians-start-school-after-court-victory/video-57864466',
            publisher: { '@type': 'Organization', name: 'Deutsche Welle' },
            datePublished: '2021-06-12',
            about: { '@type': 'Person', name: 'Tyrone Iras Marhguy' },
          },
        },
        {
          '@type': 'ListItem',
          position: 4,
          item: {
            '@type': 'NewsArticle',
            headline: "Ghana's Tyrone Marhguy builds computer brain from scratch",
            url: 'https://www.ghanaweb.com/GhanaHomePage/NewsArchive/Ghana-s-Tyrone-Marhguy-builds-computer-brain-from-scratch-2019413',
            publisher: { '@type': 'Organization', name: 'GhanaWeb' },
            datePublished: '2026-01-01',
            about: { '@type': 'Person', name: 'Tyrone Iras Marhguy' },
          },
        },
      ],
    });
  }, []);

  return (
    <div className="min-h-screen bg-bg-void" style={{ paddingTop: '60px' }}>

      {/* ── HERO (compact) ── */}
      <section
        className="relative flex flex-col items-center text-center section-padding"
        style={{ borderBottom: '1px solid #1e1e1a' }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at 50% 40%, rgba(201,168,76,0.05) 0%, transparent 60%)',
        }} />

        <div className="relative max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-center mb-6">
            <ImageWithFallback
              src="/images/tyrone.jpg"
              alt="Tyrone Marhguy"
              className="w-32 h-32 rounded-full object-cover border-2 border-border-subtle shadow-lg"
              style={{ borderColor: 'rgba(201, 168, 76, 0.4)' }}
              fallbackClassName="w-32 h-32 rounded-full object-cover border-2 border-border-subtle shadow-lg"
            />
          </div>
          <div className="eyebrow mb-2 justify-center text-[0.65rem]">Constitutional Case · Full Scholarship · Dorm-Room Processor</div>
          <h1 className="font-display font-black text-text-primary mb-1 text-5xl md:text-6xl tracking-tight">
            Tyrone <em className="italic text-gold-champagne">Iras</em> Marhguy
          </h1>
          <p className="font-mono text-[0.75rem] text-cream-dim tracking-[0.08em] mb-4">
            B.S. Computer Engineering, University of Pennsylvania
          </p>
          <p className="text-base leading-relaxed text-cream italic mb-6 max-w-2xl mx-auto">
            I grew up in Ghana. At thirteen, my family lived on a parked bus.
            I charged phones with a car battery and nails heated in a coal pot —
            not because I was curious, but because <strong className="not-italic text-text-primary font-bold">we needed to survive.</strong>{' '}
            That same instinct is how I build hardware today.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="https://github.com/tmarhguy" className="btn-primary no-underline" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
            <a href="https://linkedin.com/in/tmarhguy" className="btn-secondary no-underline" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="stats-bar">
        {[
          { num: '8', label: 'A1s · WASSCE 2023' },
          { num: '3,488', label: 'Discrete MOSFETs · ALU' },
          { num: '1.24M', label: 'Test Vectors · Validated' },
          { num: '99th', label: 'Percentile · SAT' },
          { num: '🥇', label: 'AMO Gold · 150k+ Students' },
        ].map((stat, i) => (
          <div key={i}>
            <span className="text-metric block">{stat.num}</span>
            <span className="font-mono text-[0.6rem] tracking-[0.15em] text-cream-dim uppercase mt-1 block">{stat.label}</span>
          </div>
        ))}
      </div>

      {/* ── CURRENTLY ── */}
      <div
        style={{
          borderBottom: '1px solid #1e1e1a',
          background: '#0d0d0b',
          padding: '0.85rem clamp(1rem, 4vw, 3rem)',
        }}
        className="content-max-width mx-auto w-full"
      >
        <div className="max-w-5xl mx-auto flex flex-wrap items-center gap-x-8 gap-y-2">
          <span className="font-mono text-[0.58rem] tracking-[0.2em] text-gold-champagne uppercase shrink-0">Right now —</span>
          {[
            { label: 'Building', value: 'A discrete transistor 8-bit CPU (next after the ALU)' },
            { label: 'Studying', value: 'CIS 240 (Intro to Computer Systems) · Penn Engineering' },
          ].map((item) => (
            <div key={item.label} className="flex items-baseline gap-2">
              <span className="font-mono text-[0.58rem] tracking-[0.15em] text-gold-champagne uppercase">{item.label}</span>
              <span className="font-mono text-[0.72rem] text-cream-dim">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <section className="section-padding" style={{ borderBottom: '1px solid #1e1e1a' }}>
        <FadeIn>
          <div className="content-max-width mx-auto">
          <div className="section-title-editorial justify-center">The Journey</div>
          <div className="max-w-3xl mx-auto relative pl-8">
            <TimelineItem year="2003" title="Born in Ghana — one of triplets">
              Grew up between Kumasi and Accra, with two sisters, Nikita and Amrita.
            </TimelineItem>

            <TimelineItem year="~2016" title="Two years on a bus">
              The family lived on a parked bus. No formal tools, no textbooks for circuits — but broken radios and a 12V battery.
            </TimelineItem>

            <TimelineItem year="2019" title="Dropped out of school" subtitle="Two-year gap">
              Had to leave formal education for two years (2019–2021). The drive to learn never stopped.
            </TimelineItem>

            <TimelineItem year="2021" title="Returned. Topped every school. Head Boy." isMajor subtitle="Rising Academy Schools">
              Re-enrolled and scored Aggregate 06 in the BECE — the highest possible aggregate in Ghana's grading system — topping all Rising Academy schools nationwide. Appointed Head Boy.
            </TimelineItem>

            <TimelineItem year="2021" title="Denied. Then fought. Then won." isMajor>
              Achimota School refused Tyrone admission over his dreadlocks — a violation of his Rastafarian faith. His father filed suit. The Accra High Court ruled in his favor, calling the denial unconstitutional. He enrolled.
            </TimelineItem>

            <TimelineItem year="2022" title="SAT · National Science & Math Quiz" subtitle="Achimota School">
              99th percentile SAT. Selected for the elite Achimota School's National Science and Maths Quiz team. 3rd place cumulative [without biology].
            </TimelineItem>

            <TimelineItem year="2023" title="8 A1s · Gold Medalist" isMajor subtitle="Academic Excellence">
              8 A1s in the WASSCE — 8As is the highest possible grade, achieved by roughly 1 in 500 out of 2 million candidates across West Africa. Gold medal in the American Mathematics Olympiad. Silver, Vanda Science Olympiad.
            </TimelineItem>

            <TimelineItem year="Nov 2024" title="Two Awards from Achimota School" isMajor subtitle="Recognition">
              Received awards for 8As in WASSCE (1 of ~500 in West Africa out of 2 million takers) and Best Elective Mathematics (Additional Mathematics) for the Class of 2023.
            </TimelineItem>

            <TimelineItem year="2024" title="Full Scholarship · University of Pennsylvania" isMajor subtitle="Penn Engineering · Class of 2028">
              Admitted to Penn's Computer Engineering program on a full scholarship. Also received offers from Duke, Williams College, and Franklin & Marshall.
            </TimelineItem>

            <TimelineItem year="2025-2026" title="Building from first principles I" subtitle="Hardware Engineering">
              8-bit discrete transistor ALU built from 3,488 transistors in a dorm room. 19 operations, 5-bit control signal. Combinational with 7 status flags. [Viral - further sponsored by NEXTPCB & PCBWay].
            </TimelineItem>

            <TimelineItem year="2026–" title="Building from first principles II" isLast subtitle="Hardware Engineering">
              Writing extensive SystemVerilog, mastering UVM, designing a 64-bit RISC-V processor running on Artix-7 FPGA and BFloat16 MAC unit taped out on Sky130.
            </TimelineItem>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ── THE CASE ── */}
      <section className="section-padding" style={{ borderBottom: '1px solid #1e1e1a' }}>
        <FadeIn delay={100}>
          <div className="content-max-width mx-auto">
          <div className="section-title-editorial justify-center">The Case</div>
          <div className="max-w-2xl mx-auto">
            <p className="text-[0.95rem] text-cream-dim leading-relaxed mb-4">
              Achimota School told me I couldn't enroll unless I cut my dreadlocks. I'm Rastafarian — my hair is a part of my faith, my identity, and my family's history. I didn't plan to become a public figure. I chose not to cut them.
            </p>
            <p className="text-[0.95rem] text-cream-dim leading-relaxed mb-4">
              My father filed a case in the Accra High Court. The judges ruled that the school's refusal was unconstitutional — that you cannot deny a child an education because of their religious identity. It was the first ruling of its kind in Ghana. It changed policy. It was cited in academic journals and discussed in parliaments.
            </p>
            <p className="text-[0.95rem] text-cream-dim leading-relaxed mb-4">
              I enrolled at Achimota the same week the ruling was delivered. Two years later, I graduated with <strong className="text-cream font-bold">8As in the WASSCE</strong> — the highest possible grade, achieved by roughly 1 in 500 out of 2 million candidates across West Africa. I won gold in the American Mathematics Olympiad. I was admitted to Penn Engineering on a full scholarship.
            </p>
            <p className="text-[0.95rem] text-cream leading-relaxed mb-5 font-medium">
              They told me I didn't belong. I outperformed everyone who said I did.
            </p>

            {/* Court & Wikipedia links */}
            <div className="flex flex-wrap gap-4 mb-4">
              <a
                href="https://lite.judy.legal/amp/case/tyrone-marghuy-v-achimota-school"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.72rem] tracking-[0.1em] text-gold-champagne no-underline hover:text-cream transition-colors uppercase"
              >
                Read the court ruling →
              </a>
              <a
                href="https://en.wikipedia.org/wiki/Tyrone_Marhguy"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[0.72rem] tracking-[0.1em] text-gold-champagne no-underline hover:text-cream transition-colors uppercase"
              >
                Wikipedia article →
              </a>
            </div>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ── THE THROUGH-LINE ── */}
      <section className="section-padding" style={{ borderBottom: '1px solid #1e1e1a' }}>
        <FadeIn delay={100}>
          <div className="content-max-width mx-auto text-center">
          <div className="section-title-editorial justify-center">The Through-Line</div>
          <div className="max-w-2xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-black text-text-primary mb-5 leading-tight">
              I build hardware the same way<br />I fought that case.
            </h2>
            <p className="text-[0.95rem] text-cream-dim leading-relaxed mb-4">
              From first principles. Without assuming I'll be given what I need. The instinct that came from a coal pot and a car battery is the same one that drives me to close timing on a processor at 2 AM — not because someone told me to, but because I refuse to ship something I don't fully understand.
            </p>
            <p className="text-[0.95rem] text-cream-dim leading-relaxed mb-6">
              I grew up on a parked bus. I charged phones with a car battery and nails heated in a coal pot. I wasn't being curious — I was solving problems because no one else was going to solve them for me. That's still how I work. Every solder joint, every timing constraint, every verification run — I treat it the same way I treated that court case. You go all the way, or you don't go at all.
            </p>
            <Link to="/projects" className="btn-primary no-underline inline-flex items-center gap-2">
              See what I build <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        </FadeIn>
      </section>


      {/* ── PROJECTS ── */}
      <section className="section-padding" style={{ borderBottom: '1px solid #1e1e1a' }}>
        <FadeIn>
          <div className="content-max-width mx-auto">
          <div className="section-title-editorial justify-center">What I Build</div>
          <div className="projects-grid-editorial max-w-5xl mx-auto">
            {/* ALU */}
            <div className="group relative bg-bg-void transition-colors duration-200 hover:bg-bg-deep overflow-hidden" style={{ padding: '1.5rem 1.5rem' }}>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-champagne origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
              <div className="font-mono text-[0.58rem] text-gold-dim tracking-[0.2em] uppercase mb-3">01 / PROOF OF FIRST PRINCIPLES</div>
              <div className="font-display text-base font-bold text-text-primary mb-2 leading-tight">8-Bit Discrete Transistor ALU</div>
              <p className="text-[0.8rem] text-cream-dim leading-relaxed mb-4">
                Designed and validated from first principles. Schematic → 4-layer PCB → physical bring-up → automated verification.
              </p>
              <div className="flex flex-col gap-0.5">
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">3,488</span> <span className="text-cream-dim">transistors • 19 ops</span></div>
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">1.24M</span> <span className="text-cream-dim">test vectors</span></div>
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">Interactive</span> <span className="text-cream-dim">3D viewer + full breakdown</span></div>
              </div>
            </div>

            {/* MAC */}
            <div className="group relative bg-bg-void transition-colors duration-200 hover:bg-bg-deep overflow-hidden" style={{ padding: '1.5rem 1.5rem' }}>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-champagne origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
              <div className="font-mono text-[0.58rem] text-gold-dim tracking-[0.2em] uppercase mb-3">02 / SILICON IN FABRICATION</div>
              <div className="font-display text-base font-bold text-text-primary mb-2 leading-tight">16-bit MAC Unit (Sky130)</div>
              <p className="text-[0.8rem] text-cream-dim leading-relaxed mb-4">
                Machine-learning accelerator ASIC. Full RTL-to-GDS flow using OpenLane. 50 MHz timing closure with zero DRC/LVS violations.
              </p>
              <div className="flex flex-col gap-0.5">
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">0.11 mm²</span> <span className="text-cream-dim">die • Sky130 process</span></div>
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">50 MHz</span> <span className="text-cream-dim">timing closure</span></div>
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">0</span> <span className="text-cream-dim">DRC / LVS violations</span></div>
              </div>
            </div>

            {/* RISC-V */}
            <div className="group relative bg-bg-void transition-colors duration-200 hover:bg-bg-deep overflow-hidden" style={{ padding: '1.5rem 1.5rem' }}>
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gold-champagne origin-left transition-transform duration-300 scale-x-0 group-hover:scale-x-100" />
              <div className="font-mono text-[0.58rem] text-gold-dim tracking-[0.2em] uppercase mb-3">03 / SYSTEM DEPLOYMENT</div>
              <div className="font-display text-base font-bold text-text-primary mb-2 leading-tight">64-Bit RISC-V CPU (RV64IM)</div>
              <p className="text-[0.8rem] text-cream-dim leading-relaxed mb-4">
                5-stage pipelined core with custom control logic. 96% ISA compliance. Running bare-metal C via UART bootloader on Artix-7 FPGA.
              </p>
              <div className="flex flex-col gap-0.5">
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">1.82</span> <span className="text-cream-dim">IPC</span></div>
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">125 MHz</span> <span className="text-cream-dim">clock</span></div>
                <div className="font-mono text-[0.62rem]"><span className="text-gold-champagne">96%</span> <span className="text-cream-dim">ISA compliance</span></div>
              </div>
            </div>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ── SKILLS ── */}
      <section className="section-padding" style={{ borderBottom: '1px solid #1e1e1a' }}>
        <FadeIn>
          <div className="content-max-width mx-auto">
          <div className="section-title-editorial justify-center">Technical Skills</div>
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                label: 'Hardware Design',
                skills: ['Verilog', 'SystemVerilog', 'RTL Design', 'OpenLane', 'Magic VLSI', 'Sky130 PDK', 'KiCad', 'PCB Layout', 'Spice Simulation'],
              },
              {
                label: 'FPGA & Embedded',
                skills: ['Artix-7 FPGA', 'Xilinx Vivado', 'UART / SPI / I2C', 'ARM Cortex-M', 'Bare-metal C', 'Assembly (RV64)', 'Logic Analyzer'],
              },
              {
                label: 'Software & Tools',
                skills: ['C / C++', 'Python', 'Git', 'GCC Toolchain', 'Tcl Scripting', 'Linux', 'LaTeX', 'MATLAB'],
              },
              {
                label: 'Concepts',
                skills: ['5-stage Pipeline', 'ASIC Tapeout', 'Timing Closure', 'DRC / LVS', 'Power Analysis', 'ISA Compliance', 'Verification', 'Signal Integrity'],
              },
            ].map((group) => (
              <div key={group.label}>
                <div className="font-mono text-[0.6rem] tracking-[0.2em] text-gold-champagne uppercase mb-3">{group.label}</div>
                <div className="flex flex-col gap-1.5">
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      className="font-mono text-[0.72rem] text-cream-dim tracking-[0.04em] leading-snug"
                      style={{ borderLeft: '2px solid #2a2a24', paddingLeft: '0.6rem' }}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ── CERTIFICATIONS ── */}
      <section className="section-padding" style={{ borderBottom: '1px solid #1e1e1a' }}>
        <FadeIn>
          <div className="content-max-width mx-auto">
          <div className="section-title-editorial justify-center">Certifications</div>
          <p className="text-[0.95rem] text-cream-dim leading-relaxed max-w-2xl mx-auto mb-6 text-center">
            26+ verified credentials — from Python, C, and Java to Generative AI, Matrix Algebra, CAD (Onshape), and leadership. All verifiable via Coursera, Udemy, and institutional links.
          </p>
          <div className="flex justify-center">
            <Link
              to="/certifications"
              className="btn-primary no-underline inline-flex items-center gap-2"
            >
              View All Certifications <ArrowRight size={16} />
            </Link>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ── PRESS ARCHIVE ── */}
      <section id="press" style={{ padding: '2.5rem 3rem', borderBottom: '1px solid #1e1e1a' }}>
        <FadeIn>
          <div className="content-max-width mx-auto">
          <div className="section-title-editorial justify-center">Press Archive</div>
          <p className="text-[0.95rem] text-cream-dim leading-relaxed max-w-2xl mx-auto mb-8 text-center">
            Coverage from the constitutional case, academic achievements, and the journey to Penn Engineering.
          </p>
          <div className="max-w-4xl mx-auto">
            <PressGrid items={internationalPress} label="International Media" />
            <PressGrid items={regionalPress} label="Regional & Local Media" />
            <PressGrid items={academicLegal} label="Academic, Legal & Government" />
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ── ENGINEERING TABLE ── */}
      <section className="section-padding">
        <FadeIn>
          <div className="content-max-width mx-auto">
          <div className="section-title-editorial justify-center">Engineering Work</div>
          <p className="text-[0.95rem] text-cream-dim leading-relaxed max-w-[660px] mx-auto mb-6 text-center">
            Every project follows the same pattern: go deeper than required, validate rigorously, and close the loop between theory and physical reality.
          </p>
          <div className="overflow-x-auto max-w-5xl mx-auto">
            <table className="tech-table">
              <thead>
                <tr>
                  <th>Project</th>
                  <th>What it is</th>
                  <th>Key specs</th>
                  <th>What he learned</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>8-Bit Discrete Transistor ALU</td>
                  <td>A complete 8-bit ALU built from discrete components — no ICs — in a dorm room.</td>
                  <td>3,488 MOSFETs<br/>76 gates<br/>400ns delay<br/>1.24M tests<br/>41 ★</td>
                  <td>Ground bounce, decoupling capacitor placement, failure-mode intuition.</td>
                </tr>
                <tr>
                  <td>BFloat16 MAC Unit (ASIC)</td>
                  <td>MAC unit targeting Sky130 130nm, RTL to GDS via OpenLane flow.</td>
                  <td>50 MHz<br/>0.11mm²<br/>0 DRC/LVS<br/>&lt;50mV IR drop<br/>1,000+ corners</td>
                  <td>Full physical design — synthesis, floorplan, placement, CTS, routing.</td>
                </tr>
                <tr>
                  <td>64-Bit RISC-V Processor</td>
                  <td>RV64IM on Artix-7 FPGA with custom UART bootloader for bare-metal C.</td>
                  <td>5-stage pipeline<br/>125 MHz<br/>96% ISA<br/>SPI + I2C<br/>UART boot</td>
                  <td>Hardware-software integration at the metal level.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        </FadeIn>
      </section>

      {/* ── CONTACT ── */}
      <section className="section-padding">
        <FadeIn>
          <div className="content-max-width mx-auto">
          <div className="section-title-editorial justify-center">Get In Touch</div>
          <div className="max-w-2xl mx-auto text-center">
            <p className="text-[0.95rem] text-cream-dim leading-relaxed mb-6">
              I'm actively looking for hardware, VLSI, or embedded engineering internships for the Summer.
              Reach out directly — I respond to every message.
            </p>

            {/* Primary CTA */}
            <a
              href="mailto:tmarhguy@seas.upenn.edu"
              className="inline-block font-mono text-[0.8rem] tracking-[0.12em] uppercase no-underline mb-8 transition-all duration-200"
              style={{ padding: '0.9rem 2.5rem', background: '#c9a84c', color: '#0a0a08', fontWeight: 600 }}
              onMouseEnter={(e) => { e.currentTarget.style.background = '#e0c56a'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = '#c9a84c'; }}
            >
              tmarhguy@seas.upenn.edu
            </a>

            {/* Secondary links */}
            <div className="flex flex-wrap gap-6 justify-center">
              {[
                { label: 'GitHub', href: 'https://github.com/tmarhguy' },
                { label: 'LinkedIn', href: 'https://linkedin.com/in/tmarhguy' },
                { label: 'Wikipedia', href: 'https://en.wikipedia.org/wiki/Tyrone_Marhguy' },
                { label: 'Resume PDF', href: '/Tyrone_Marhguy_Resume.pdf' },
              ].map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[0.72rem] tracking-[0.1em] text-gold-champagne hover:text-cream no-underline transition-colors uppercase"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
        </FadeIn>
      </section>
    </div>
  );
};
