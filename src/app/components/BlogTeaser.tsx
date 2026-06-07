import { ArrowRight, BookOpen, TrendingUp, Leaf } from "lucide-react";
import styles from "./BlogTeaser.module.css";

const articles = [
  {
    id: "blog-makhana-benefits",
    icon: Leaf,
    category: "Health & Nutrition",
    title: "10 Proven Health Benefits of Eating Makhana Every Day",
    excerpt:
      "From managing blood sugar to boosting heart health — discover why nutritionists across India are calling Phool Makhana the ultimate superfood.",
    readTime: "5 min read",
    slug: "health-benefits-of-makhana",
  },
  {
    id: "blog-makhana-business",
    icon: TrendingUp,
    category: "B2B Insights",
    title: "How to Start a Makhana Snack Business in India (2025 Guide)",
    excerpt:
      "Everything you need to know about sourcing, packaging, regulations, and selling branded Makhana products — including finding the right wholesale supplier.",
    readTime: "8 min read",
    slug: "how-to-start-makhana-business",
  },
  {
    id: "blog-bihar-makhana",
    icon: BookOpen,
    category: "Our Story",
    title: "Why Bihar Produces the World's Best Makhana",
    excerpt:
      "The climate, the lotus ponds, and the generations-old harvesting tradition that make Bihar Makhana unlike anything else in the world.",
    readTime: "6 min read",
    slug: "why-bihar-produces-best-makhana",
  },
];

export default function BlogTeaser() {
  return (
    <section
      id="blog"
      className={styles.section}
      aria-labelledby="blog-heading"
    >
      <div className="container">
        <div className={styles.header}>
          <div>
            <span className="section-eyebrow">Makhana Insights</span>
            <h2 id="blog-heading" className="section-title">
              Learn, Explore & Grow
            </h2>
            <p className="section-subtitle">
              Expert articles on Makhana nutrition, business, and the Bihar
              farming story — written to help you make better decisions.
            </p>
          </div>
          <a href="/blog" className="btn btn-secondary" id="blog-view-all-btn">
            All Articles
            <ArrowRight size={16} />
          </a>
        </div>

        <ul className={styles.grid} role="list">
          {articles.map((article) => {
            const Icon = article.icon;
            return (
              <li key={article.id} id={article.id} className={styles.card}>
                <div className={styles.cardTop}>
                  <div className={styles.iconWrap} aria-hidden="true">
                    <Icon size={18} strokeWidth={1.75} />
                  </div>
                  <span className={styles.category}>{article.category}</span>
                </div>

                <h3 className={styles.cardTitle}>
                  <a
                    href={`/blog/${article.slug}`}
                    className={styles.cardLink}
                    id={`${article.id}-link`}
                  >
                    {article.title}
                  </a>
                </h3>

                <p className={styles.excerpt}>{article.excerpt}</p>

                <div className={styles.cardFooter}>
                  <span className={styles.readTime}>{article.readTime}</span>
                  <a
                    href={`/blog/${article.slug}`}
                    className={styles.readMore}
                    aria-label={`Read ${article.title}`}
                  >
                    Read more
                    <ArrowRight size={14} />
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
