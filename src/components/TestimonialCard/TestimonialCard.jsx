import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import './TestimonialCard.css';

export default function TestimonialCard({ testimonial, className = '', delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className={`testimonial-card ${className}`}
    >
      <div className="testimonial-stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill={i < testimonial.rating ? "var(--amber)" : "none"} color={i < testimonial.rating ? "var(--amber)" : "var(--gray-300)"} />
        ))}
      </div>
      <p className="testimonial-text">{testimonial.text}</p>
      <div className="testimonial-author">
        <div className="testimonial-avatar">{testimonial.initial}</div>
        <div>
          <div className="testimonial-name">{testimonial.author}</div>
          <div className="testimonial-location">{testimonial.location}</div>
        </div>
      </div>
    </motion.div>
  );
}
