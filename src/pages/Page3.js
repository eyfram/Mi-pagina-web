import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DecorativeHeader, DecorativeFooter } from '../components/HeaderFooter';
import './Page3.css';

function Page3() {
  const navigate = useNavigate();
  const [isOpened, setIsOpened] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiPieces, setConfettiPieces] = useState([]);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Generate confetti when envelope opens
  useEffect(() => {
    if (showConfetti) {
      const pieces = [];
      const colors = ['#00fcfc', '#1309c0', '#27ae4a', '#e26812'];
      
      for (let i = 0; i < 80; i++) {
        pieces.push({
          id: i,
          color: colors[Math.floor(Math.random() * colors.length)],
          left: Math.random() * 100,
          delay: Math.random() * 0.5,
          duration: Math.random() * 2 + 2,
          rotation: Math.random() * 720,
          scale: Math.random() * 1.5 + 0.5,
        });
      }
      
      setConfettiPieces(pieces);
    }
  }, [showConfetti]);

  const handleOpenCoupon = () => {
    if (!isOpened) {
      setIsOpened(true);
      setTimeout(() => setShowConfetti(true), 1000);
    }
  };

  const handleNavigate = () => {
    window.scrollTo(0, 0);
    navigate('/page2');
  };

  return (
    <div className="page3-container">
      <DecorativeHeader />
      
      {/* Animated background */}
      <div className="animated-bg-3">
        <div className="gradient-orb-3 orb-blue-1"></div>
        <div className="gradient-orb-3 orb-blue-2"></div>
        <div className="gradient-orb-3 orb-blue-3"></div>
      </div>

      {/* Animated confetti */}
      <AnimatePresence>
        {showConfetti && (
          <div className="confetti-container">
            {confettiPieces.map((piece) => (
              <motion.div
                key={piece.id}
                className="confetti-piece"
                initial={{
                  x: '50vw',
                  y: '20vh',
                  rotate: 0,
                  scale: 1,
                  opacity: 1
                }}
                animate={{
                  x: `${piece.left}vw`,
                  y: '110vh',
                  rotate: piece.rotation,
                  scale: piece.scale,
                  opacity: [1, 1, 0]
                }}
                transition={{
                  duration: piece.duration,
                  ease: 'easeOut',
                  delay: piece.delay,
                  opacity: {
                    times: [0, 0.8, 1]
                  }
                }}
                style={{
                  backgroundColor: piece.color
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="page3-header"
      >
        <h1 className="title-page3">Your Special Gift</h1>
        <div className="subtitle-line-3"></div>
        <p className="subtitle-page3">Something made with love</p>
      </motion.div>

      {/* Coupon wrapper */}
      <div className="coupon-wrapper">
        
        {!isOpened ? (
          // CLOSED ENVELOPE
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 200, damping: 15 }}
            className="envelope-container"
          >
            <motion.div
              whileHover={{ 
                scale: 1.05, 
                y: -15,
                rotateZ: 2
              }}
              whileTap={{ scale: 0.98 }}
              className="envelope"
              onClick={handleOpenCoupon}
            >
              {/* Envelope body */}
              <div className="envelope-body">
                <motion.div
                  className="shine-effect"
                  animate={{
                    x: ['-120%', '220%']
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut"
                  }}
                />
                
                {/* Decorative seal */}
                <div className="envelope-seal">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ❤️
                  </motion.div>
                </div>
              </div>
              
              {/* Envelope flap */}
              <div className="envelope-flap">
                <div className="flap-fold" />
              </div>
              
              {/* Click hint */}
              <motion.div
                className="click-hint"
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.6, 1, 0.6]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span className="hint-icon">👆</span>
                <span className="hint-text">Tap to open</span>
              </motion.div>
            </motion.div>
          </motion.div>
        ) : (
          // REVEALED COUPON
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 200, 
              damping: 20,
              delay: 0.2
            }}
            className="coupon-revealed"
          >
            <motion.div
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ 
                delay: 0.4, 
                duration: 0.8,
                ease: "easeOut"
              }}
              className="coupon-card"
            >
              <div className="coupon-border">
                <div className="coupon-content">
                  
                  {/* Top badge */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      delay: 0.8, 
                      type: "spring",
                      stiffness: 200
                    }}
                    className="coupon-badge"
                  >
                    <svg width="100" height="100" viewBox="0 0 100 100">
                      <defs>
                        <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#00fcfc" />
                          <stop offset="50%" stopColor="#1309c0" />
                          <stop offset="100%" stopColor="#27ae4a" />
                        </linearGradient>
                      </defs>
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="url(#badgeGradient)" 
                        stroke="#e26812"
                        strokeWidth="3"
                      />
                      <text 
                        x="50" 
                        y="65" 
                        textAnchor="middle" 
                        fontSize="40" 
                        fill="white"
                        fontWeight="bold"
                      >
                        🎨
                      </text>
                    </svg>
                  </motion.div>

                  {/* Title */}
                  <motion.h2
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="coupon-title"
                  >
                    SPECIAL COUPON
                  </motion.h2>

                  {/* Big discount */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      delay: 1.2, 
                      type: "spring", 
                      stiffness: 200 
                    }}
                    className="discount-badge"
                  >
                    <motion.span 
                      className="discount-number"
                      animate={{
                        textShadow: [
                          '0 0 20px rgba(0, 252, 252, 0.5)',
                          '0 0 40px rgba(0, 252, 252, 0.8)',
                          '0 0 20px rgba(0, 252, 252, 0.5)'
                        ]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      100
                    </motion.span>
                    <span className="discount-symbol">%</span>
                  </motion.div>

                  {/* Discount text */}
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.4 }}
                    className="discount-text"
                  >
                    DISCOUNT
                  </motion.p>

                  {/* Description */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.6 }}
                    className="coupon-description"
                  >
                    <p className="desc-main">
                      On a personalized artwork
                    </p>
                    <p className="desc-sub">
                      Specially created for you
                    </p>
                  </motion.div>

                  {/* Decorative divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 1.8, duration: 0.6 }}
                    className="coupon-divider"
                  />

                  {/* Coupon footer */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 2 }}
                    className="coupon-footer"
                  >
                    <p className="validity">
                      ✨ Valid with no expiration date ✨
                    </p>
                    <p className="from">With love, Eyfran</p>
                  </motion.div>

                  {/* Decorative corners */}
                  <div className="corner corner-tl"></div>
                  <div className="corner corner-tr"></div>
                  <div className="corner corner-bl"></div>
                  <div className="corner corner-br"></div>
                </div>
              </div>
            </motion.div>

            {/* Final message */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5 }}
              className="final-message"
            >
              I hope this gift fills you with joy as much as you fill my life with light 💙
            </motion.p>
          </motion.div>
        )}
      </div>

      {/* Navigation button */}
      <motion.button
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.05, x: -10 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNavigate}
        className="nav-button-3"
      >
        ← Back
      </motion.button>
      
      <DecorativeFooter />
    </div>
  );
}

export default Page3;