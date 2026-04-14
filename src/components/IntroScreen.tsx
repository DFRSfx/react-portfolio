import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroScreen = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');
    if (!hasSeenIntro) {
      setIsVisible(true);
      sessionStorage.setItem('hasSeenIntro', 'true');
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: 0 }}
          exit={{ y: '-100vh', transition: { duration: 0.8, ease: "easeInOut" } }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'var(--bg-color, #ffffff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <style>{`
            [data-theme="dark"] .intro-text { color: #ffffff; }
            [data-theme="light"] .intro-text { color: #000000; }
          `}</style>
          <motion.h1
            className="intro-text"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            onAnimationComplete={() => {
              setTimeout(() => setIsVisible(false), 1000);
            }}
            style={{
              fontFamily: 'Marcellus, serif',
              fontSize: 'clamp(3rem, 8vw, 6rem)',
              fontWeight: 800,
              letterSpacing: '0.05em',
              margin: 0,
            }}
          >
            DÁRIO.
          </motion.h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroScreen;