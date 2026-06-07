import { ShieldCheck, MapPin, Wheat, Award } from "lucide-react";
import styles from "./TrustBar.module.css";

const pillars = [
  {
    icon: MapPin,
    title: "Bihar GI-Tagged Origin",
    sub: "Sourced from Mithila's makhana heartland",
    id: "trust-gi-tagged",
  },
  {
    icon: ShieldCheck,
    title: "FSSAI Certified",
    sub: "Lab-tested, safe, and fully compliant",
    id: "trust-fssai",
  },
  {
    icon: Wheat,
    title: "Gluten-Free Superfood",
    sub: "High protein · low GI · 100% natural",
    id: "trust-gluten-free",
  },
  {
    icon: Award,
    title: "6+ Product Range",
    sub: "Makhana, Anjeer, Walnut, Millet & more",
    id: "trust-product-range",
  },
];

export default function TrustBar() {
  return (
    <section
      id="trust-bar"
      className={styles.trustBar}
      aria-label="Our key strengths"
    >
      <div className="container">
        <ul className={styles.pillars} role="list">
          {pillars.map((p) => {
            const Icon = p.icon;
            return (
              <li key={p.id} id={p.id} className={styles.pillar}>
                <div className={styles.iconWrap} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <div>
                  <p className={styles.pillarTitle}>{p.title}</p>
                  <p className={styles.pillarSub}>{p.sub}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
