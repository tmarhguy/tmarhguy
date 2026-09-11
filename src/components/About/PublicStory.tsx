import { WIKIPEDIA_URL } from '@/data/contact';

export default function PublicStory() {
  return (
    <aside className="public-story" aria-labelledby="public-story-title">
      <div>
        <span className="home-section-kicker">Beyond the workbench</span>
        <h2 id="public-story-title">There’s a story before the circuits.</h2>
        <p>
          My path through Achimota, the fight to attend school while keeping my
          dreadlocks, and the scholarship that brought me to Penn are part of a
          public story.
        </p>
      </div>
      <div className="public-story-links">
        <a className="public-story-wikipedia" href={WIKIPEDIA_URL}>
          Read my biography on Wikipedia
        </a>
        <a href="https://apnews.com/article/africa-religion-education-ghana-186c67bd473f892c054e5d1f9368b555">
          Associated Press · the school admission story
        </a>
        <a href="https://3news.com/news/tyrone-iras-marhguy-receives-full-scholarship-to-study-at-university-of-pennsylvania/">
          3News · the scholarship to Penn
        </a>
      </div>
    </aside>
  );
}
