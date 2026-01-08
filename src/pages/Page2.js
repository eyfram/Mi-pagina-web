import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DecorativeHeader, DecorativeFooter } from '../components/HeaderFooter';
import './Page2.css';

// Frases "Te quiero amiga" en TODOS los idiomas
const translations = [
  { text: "I love you, friend", lang: "English" },
  { text: "Te quiero, amiga", lang: "Español" },
  { text: "Je t'aime, amie", lang: "Français" },
  { text: "Ich liebe dich, Freundin", lang: "Deutsch" },
  { text: "Ti amo, amica", lang: "Italiano" },
  { text: "Eu te amo, amiga", lang: "Português" },
  { text: "愛してるよ、友達", lang: "日本語" },
  { text: "사랑해, 친구", lang: "한국어" },
  { text: "我爱你，朋友", lang: "中文" },
  { text: "Я люблю тебя, подруга", lang: "Русский" },
  { text: "أحبك يا صديقتي", lang: "العربية" },
  { text: "Σ'αγαπώ, φίλη", lang: "Ελληνικά" },
  { text: "Kocham cię, przyjaciółko", lang: "Polski" },
  { text: "Jag älskar dig, vän", lang: "Svenska" },
  { text: "Ik hou van je, vriendin", lang: "Nederlands" },
  { text: "Jeg elsker dig, ven", lang: "Dansk" },
  { text: "Seni seviyorum, arkadaş", lang: "Türkçe" },
  { text: "אני אוהב אותך, חברה", lang: "עברית" },
  { text: "मैं तुमसे प्यार करती हूँ, दोस्त", lang: "हिन्दी" },
  { text: "Tôi yêu bạn, bạn của tôi", lang: "Tiếng Việt" },
  { text: "ฉันรักเธอ เพื่อน", lang: "ไทย" },
  { text: "Mahal kita, kaibigan", lang: "Filipino" },
  { text: "Saya sayang kamu, teman", lang: "Bahasa Indonesia" },
  { text: "Aku sayang kamu, kawan", lang: "Bahasa Melayu" },
  { text: "Ndiyakuthanda, mhlobo", lang: "isiZulu" },
  { text: "Nakupenda, rafiki", lang: "Kiswahili" }
];

function Page2() {
  const navigate = useNavigate();
  
  // Scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // Timer state (CORREGIDO A 2025)
  const [timeElapsed, setTimeElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Multilingual heart state
  const [currentTranslation, setCurrentTranslation] = useState(0);

  // Audio player states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isDragging, setIsDragging] = useState(false);
  const audioRef = useRef(null);

  // Qualities list (translated to English)
  const cualidades = [
    "Inspiring", "Radiant", "Admirable", "Authentic",
    "Brave", "Empathetic", "Respectful", "Determined",
    "Creative", "Serene"
  ];

  // ========== TIMER (FIXED TO 2025) ==========
  useEffect(() => {
    const startDate = new Date('2025-10-19T00:00:00');
    
    const updateTimer = () => {
      const now = new Date();
      const diff = now - startDate;
      
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      setTimeElapsed({ days, hours, minutes, seconds });
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    
    return () => clearInterval(interval);
  }, []);

  // ========== MULTILINGUAL HEART ROTATOR ==========
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTranslation(prev => (prev + 1) % translations.length);
    }, 2000); // Change every 2 seconds
    
    return () => clearInterval(interval);
  }, []);

  // ========== AUDIO CONTROLS ==========
  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(err => {
        console.error('Error playing audio:', err);
      });
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current && !isDragging) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleSeekStart = () => {
    setIsDragging(true);
  };

  const handleSeekEnd = (e) => {
    setIsDragging(false);
    handleSeek(e);
  };

  const handleVolumeChange = (e) => {
    const newVolume = e.target.value / 100;
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (seconds) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleNavigate = (path) => {
    window.scrollTo(0, 0);
    navigate(path);
  };

  return (
    <div className="page2-container">
      <DecorativeHeader />
      
      {/* Background */}
      <div className="animated-bg-2">
        <div className="gradient-orb-2 orb-purple-1"></div>
        <div className="gradient-orb-2 orb-purple-2"></div>
        <div className="gradient-orb-2 orb-purple-3"></div>
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="page2-header"
      >
        <h1 className="title-page2">Our Time Together</h1>
        <div className="subtitle-line-2"></div>
      </motion.div>

      <div className="content-wrapper-2">
        
        {/* ========== MULTILINGUAL HEART ========== */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="multilingual-heart-card"
        >
          <motion.div 
            className="heart-icon-large"
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
            ♥
          </motion.div>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTranslation}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="heart-text-container"
            >
              <p className="heart-main-text">
                {translations[currentTranslation].text}
              </p>
              <p className="heart-lang-label">
                {translations[currentTranslation].lang}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
        
        {/* ========== TIMER ========== */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200, damping: 20 }}
          className="timer-card"
        >
          <h2 className="timer-title">Since October 19, 2025</h2>
          <div className="timer-grid">
            <div className="timer-block">
              <motion.div
                key={timeElapsed.days}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="timer-number"
              >
                {timeElapsed.days}
              </motion.div>
              <div className="timer-label">Days</div>
            </div>
            
            <div className="timer-separator">:</div>
            
            <div className="timer-block">
              <motion.div
                key={timeElapsed.hours}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="timer-number"
              >
                {timeElapsed.hours.toString().padStart(2, '0')}
              </motion.div>
              <div className="timer-label">Hours</div>
            </div>
            
            <div className="timer-separator">:</div>
            
            <div className="timer-block">
              <motion.div
                key={timeElapsed.minutes}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="timer-number"
              >
                {timeElapsed.minutes.toString().padStart(2, '0')}
              </motion.div>
              <div className="timer-label">Minutes</div>
            </div>
            
            <div className="timer-separator">:</div>
            
            <div className="timer-block">
              <motion.div
                key={timeElapsed.seconds}
                initial={{ scale: 1.3, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="timer-number"
              >
                {timeElapsed.seconds.toString().padStart(2, '0')}
              </motion.div>
              <div className="timer-label">Seconds</div>
            </div>
          </div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="timer-message"
          >
            And every second keeps counting...
          </motion.p>
        </motion.div>

        {/* ========== QUALITIES ========== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="qualities-card"
        >
          <h2 className="section-title">Words That Define You</h2>
          <div className="qualities-grid">
            {cualidades.map((cualidad, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + index * 0.1, type: "spring" }}
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="quality-tag"
              >
                {cualidad}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ========== IMAGES ========== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="images-card"
        >
          <h2 className="section-title">This Is For You</h2>
          <div className="images-grid">
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.2, duration: 0.5 }}
    style={{ overflow: 'hidden', borderRadius: '20px' }}
  >
    <img 
      src="/images/imagen1.jpg" 
      alt="Special moment 1" 
      style={{
        width: '100%', 
        height: '100%',
        objectFit: 'cover',
        borderRadius: '20px',
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
    />
  </motion.div>

  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.4, duration: 0.5 }}
    style={{ overflow: 'hidden', borderRadius: '20px' }}
  >
    <img 
      src="/images/imagen2.jpg" 
      alt="Special moment 2" 
      style={{
        width: '100%', 
        height: '100%',
        objectFit: 'cover',
        borderRadius: '20px',
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
    />
  </motion.div>

  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay: 1.6, duration: 0.5 }}
    style={{ overflow: 'hidden', borderRadius: '20px' }}
  >
    <img 
      src="/images/imagen3.jpg" 
      alt="Special moment 3" 
      style={{
        width: '100%', 
        height: '100%',
        objectFit: 'cover',
        borderRadius: '20px',
        transition: 'transform 0.3s ease'
      }}
      onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
      onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
    />
  </motion.div>
</div>
        </motion.div>

        {/* ========== AUDIO PLAYER ========== */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="audio-card"
        >
          <h2 className="section-title">My Words for You</h2>
          <p className="audio-subtitle">Listen to what I have to tell you...</p>
          
          <div className="audio-player">
            <audio
              ref={audioRef}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onEnded={handleEnded}
              preload="metadata"
            >
              <source src="/audio/mensaje.mp3" type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>

            <motion.button
              whileHover={{ scale: 1.12 }}
              whileTap={{ scale: 0.92 }}
              onClick={togglePlay}
              className="play-button"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg width="50" height="50" viewBox="0 0 50 50">
                  <rect x="14" y="12" width="8" height="26" fill="currentColor" rx="2"/>
                  <rect x="28" y="12" width="8" height="26" fill="currentColor" rx="2"/>
                </svg>
              ) : (
                <svg width="50" height="50" viewBox="0 0 50 50">
                  <path d="M18 12 L18 38 L38 25 Z" fill="currentColor"/>
                </svg>
              )}
            </motion.button>

            <div className="progress-section">
              <span className="time-label">{formatTime(currentTime)}</span>
              
              <div className="progress-container">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progressPercentage}
                  onChange={handleSeek}
                  onMouseDown={handleSeekStart}
                  onMouseUp={handleSeekEnd}
                  onTouchStart={handleSeekStart}
                  onTouchEnd={handleSeekEnd}
                  className="progress-slider"
                  aria-label="Progress bar"
                />
                
                <motion.div
                  className="fox-slider"
                  style={{ left: `${progressPercentage}%` }}
                  animate={{ 
                    rotate: isPlaying ? [0, 5, -5, 0] : 0,
                    scale: isPlaying ? [1, 1.1, 1] : 1
                  }}
                  transition={{ 
                    repeat: isPlaying ? Infinity : 0, 
                    duration: 0.6,
                    ease: "easeInOut"
                  }}
                >
                  🦊
                </motion.div>
              </div>
              
              <span className="time-label">{formatTime(duration)}</span>
            </div>

            <div className="volume-section">
              <motion.span 
                className="volume-icon"
                whileHover={{ scale: 1.2 }}
              >
                {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
              </motion.span>
              <input
                type="range"
                min="0"
                max="100"
                value={volume * 100}
                onChange={handleVolumeChange}
                className="volume-slider"
                aria-label="Volume control"
              />
              <span className="volume-percent">{Math.round(volume * 100)}%</span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* ========== NAVIGATION BUTTONS ========== */}
      <div className="nav-buttons-container">
        <motion.button
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05, x: -10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNavigate('/')}
          className="nav-button-2 nav-prev"
        >
          ← Previous
        </motion.button>
        
        <motion.button
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.5 }}
          whileHover={{ scale: 1.05, x: 10 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleNavigate('/page3')}
          className="nav-button-2 nav-next"
        >
          Your Gift →
        </motion.button>
      </div>
      
      <DecorativeFooter />
    </div>
  );
}

export default Page2;