import { blogPosts } from "@/lib/blog";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import styles from "./page.module.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "Khirri Blog | Insights on Makhana Sourcing, Nutrition & Business",
  description: "Read expert articles from Khirri on the health benefits of Phool Makhana, how to start a snack business, and why Bihar produces the world's best fox nuts.",
};

export default function BlogIndex() {
  return (
    <>
      <Navbar />
      <main className={styles.main}>
        <div className="container">
          <div className={styles.header}>
            <span className="section-eyebrow">Khirri Blog</span>
            <h1 className="section-title">Makhana Insights & Guides</h1>
            <p className="section-subtitle">
              Expert articles on Makhana nutrition, business strategy, and our authentic Bihar farming story.
            </p>
          </div>

          <div className={styles.grid}>
            {blogPosts.map((post) => (
              <article key={post.slug} className={styles.card}>
                <div className={styles.cardMeta}>
                  <span className={styles.category}>{post.category}</span>
                  <span className={styles.date}>{post.date}</span>
                </div>
                <h2 className={styles.title}>
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h2>
                <p className={styles.excerpt}>{post.excerpt}</p>
                <div className={styles.cardFooter}>
                  <span className={styles.readTime}>{post.readTime}</span>
                  <Link href={`/blog/${post.slug}`} className={styles.readMore}>
                    Read full article <ArrowRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
