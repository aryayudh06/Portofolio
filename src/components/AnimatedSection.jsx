import React, { useRef, useState, useEffect } from 'react';
import './AnimatedSection.css';

export function AnimatedSection({ children, className = '', ...props }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const hasBeenInView = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            hasBeenInView.current = true;
            setInView(true);
          } else if (hasBeenInView.current) {
            setInView(false);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`animated-section ${inView ? 'animated-section--in' : 'animated-section--out'} ${className}`.trim()}
      {...props}
    >
      {children}
    </div>
  );
}
