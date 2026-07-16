import { ArrowRight, BookOpen, TrendingUp, Leaf, DollarSign, Gift } from "lucide-react";
import { blogPosts } from "@/lib/blog";
import type { BlogPost } from "@/lib/blog";
import styles from "./BlogTeaser.module.css";

const categoryIcons: Record<string, React.ElementType> = {
  "Health & Nutrition": Leaf,
  "B2B Insights": TrendingUp,
  "Our Story": BookOpen,
  "Product Insights": DollarSign,
};

// Show latest 3 articles from the blog
const articles = blogPosts.slice(-3).reverse().map((post: BlogPost) => ({
  id: `blog-${post.slug}`,
  icon: categoryIcons[post.category] || BookOpen,
  category: post.category,
  title: post.title,
  excerpt: post.excerpt,
  readTime: post.readTime,
  slug: post.slug,
}));

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
