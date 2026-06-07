import {
  Heart,
  Brain,
  Shield,
  Flame,
  Droplets,
  Leaf,
} from "lucide-react";
import styles from "./NutritionBenefits.module.css";

const benefits = [
  {
    id: "benefit-heart",
    icon: Heart,
    title: "Heart Healthy",
    desc: "Low in sodium and fat, high in magnesium and potassium — supports healthy blood pressure and cardiovascular function.",
  },
  {
    id: "benefit-protein",
    icon: Flame,
    title: "High Plant Protein",
    desc: "9.7g of protein per 100g — more than most nuts. Perfect for vegans, gym-goers, and health-conscious snackers.",
  },
  {
    id: "benefit-brain",
    icon: Brain,
    title: "Brain & Memory",
    desc: "Rich in thiamine, which supports cognitive function, neural signaling, and helps maintain mental clarity.",
  },
  {
    id: "benefit-diabetes",
    icon: Droplets,
    title: "Low Glycemic Index",
    desc: "Makhana has a low GI — meaning slow energy release and ideal for managing blood sugar and diabetes.",
  },
  {
    id: "benefit-antioxidant",
    icon: Shield,
    title: "Rich in Antioxidants",
    desc: "Contains kaempferol and quercetin — powerful flavonoids that reduce oxidative stress and inflammation.",
  },
  {
    id: "benefit-gluten",
    icon: Leaf,
    title: "Gluten-Free & Vegan",
    desc: "100% natural, no additives, no preservatives. Certified clean-label for modern dietary preferences.",
  },
];

export default function NutritionBenefits() {
  return (
    <section
      id="nutrition"
      className={styles.section}
      aria-labelledby="nutrition-heading"
    >
      <div className="container">
        <div className={styles.header}>
          <span className="section-eyebrow">Why Makhana?</span>
          <h2 id="nutrition-heading" className="section-title">
            The Superfood Your
            <br />
            Customers Are Searching For
          </h2>
          <p className="section-subtitle">
            From Bollywood stars to nutritionists — everyone is talking about
            Phool Makhana. Tap into the fastest-growing health snack segment
            in India.
          </p>
        </div>

        <ul className={styles.grid} role="list">
          {benefits.map((b) => {
            const Icon = b.icon;
            return (
              <li key={b.id} id={b.id} className={styles.card}>
                <div className={styles.iconWrap} aria-hidden="true">
                  <Icon size={24} strokeWidth={1.75} />
                </div>
                <h3 className={styles.cardTitle}>{b.title}</h3>
                <p className={styles.cardDesc}>{b.desc}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
