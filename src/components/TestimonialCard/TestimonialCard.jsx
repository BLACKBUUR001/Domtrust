import { Star } from 'lucide-react';
import './TestimonialCard.css';

export default function TestimonialCard({ testimonial, className = '', delay = 0 }) {
  return (
    <div className={`testimonial-card reveal ${className}`} style={{ transitionDelay: `${delay * 0.1}s` }}>
      <div className="testimonial-stars">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={i < testimonial.rating ? '' : 'empty'} />
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
    </div>
  );
}
