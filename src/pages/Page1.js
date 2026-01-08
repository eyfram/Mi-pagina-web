import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { DecorativeHeader, DecorativeFooter } from '../components/HeaderFooter';
import './Page1.css';

// Textos originales (NO traducidos - son personales)
const originalTexts = {
  carta1: ` On October 19th, my life changed without me realizing it at first.
It changed when I started talking to someone special. That person is you, Teya. From the beginning, your name already felt different, unique… and with time I understood it was no coincidence.

In just a few months, you have become someone very important to me. Not only because of our conversations, but because of everything you awakened in me: butterflies in my stomach, genuine happiness, motivation to keep going… and also moments of sadness or confusion. But far from being something bad, that only made me realize how real you are to me. Because only someone special can create feelings this deep.

Even today, you still do. Even when it may not seem like it. You are still important to me, you still hold a place in my heart. And because of that, I regret many things: the distance between us, the moments when I stepped away, and the parts of me you saw when I was still immature. I am growing, learning, and trying to be a better person every day.

I am a guy who wants to achieve his goals, study, work, make friends, fall in love with life, and help others. And although that path is mine, I can’t deny that I would love to walk it with you, even if it’s just through friendship: as my friend, my support, my partner in ideas, madness, and dreams.

Maybe you don’t fully know me yet, and I understand that. Even though you’ve seen my face and I haven’t seen yours, that doesn’t matter as much anymore. What matters is what we’ve shared. I deeply appreciate every moment you’ve given me: the happy ones, the sad ones, the silences and the words. All of it has meant something to me.

Today I want to take a sincere and brave step: to tell you that I want to truly know you. To know you, your friends, your world. I know that this year, after graduating, I will move forward, improve my grades, and study abroad. And from the bottom of my heart, I hope you continue to be there as my friend, accompanying me as I grow too.

I admire you deeply. You are a girl with impressive goals, an incredible personality, someone who values herself, who knows what she wants and how far she can go. That inspires me, fills me with pride, and makes me want to be better. I want to grow to be like you: someone successful, but above all, someone happy.

And although I’ve talked a lot about myself, I want to end with what matters most:
thank you.

Thank you for existing, for giving me the chance to know you, for the moments you’ve given me without even realizing it. You are someone who lights up others just by being present. For me, you gave real meaning to the phrase “I care about you, my friend.” Every time I say it, I mean it from the deepest part of my heart, with respect, affection, and sincerity.

Thank you, truly, Teya.
With all my heart,
Eyfran `,

  carta2: ` This part wasn’t planned, but it comes from a very honest place in my heart.

I want to apologize. For my mistakes, for my impulses, for the times I didn’t know how to handle what I felt. It was never my intention to hurt you or push you away, even though I know my decisions may have made it seem that way. At the time, I thought I was doing the right thing. Today, I recognize that I was wrong.

You are a very important person to me, more than you might imagine. You are not “just another friend.” You are someone who came into my life and left a mark, someone who awakened emotions, thoughts, and a desire to grow. Sometimes I didn’t know what to do with all of that, and I’m deeply sorry.

I admit it’s hard for me, because when someone truly matters to me, I feel deeply. Sometimes too deeply. But that doesn’t mean I want to possess, limit, or demand anything from you. On the contrary, I respect your life, your goals, your people, your world. Seeing you grow, succeed, and build what you dream of genuinely makes me happy.

I just want you to know that, even with my mistakes, I’m still here. Not because I depend on you, but because I value you. Because your presence means something real to me. Because with you, I learned that friendship can also be deep, sincere, and transformative.

If today our conversations are not the same as they were at the beginning, I accept that. Connections change, they evolve. I just don’t want what still exists to disappear: the affection, the respect, and that spark that made meeting you so worthwhile.

I’m not writing to ask for anything. I’m writing because you matter to me. Because I want to take care of this friendship and grow, do better, and be someone you can feel comfortable and proud to call a friend.

Thank you for existing, for staying, for being you.
With all my affection,
Eyfran `,

  poemas: ` Connection

You didn’t arrive with promises,
you arrived with light.
And without realizing it,
my world made space for you.

We are not old friends,
nor long stories,
but there are connections
that don’t need time,
only truth.

You are calm,
you are purpose,
you are the voice that inspires
me to be better
without forcing me.

──────────────────

 Admiration

I look at you from afar,
and still, I feel you close.
You love nature
the same way you love your dreams:
with respect, with patience,
with strong roots.

I admire the way
you build your path,
how you move forward without fear,
how you bloom
without forgetting who you are.

And from friendship,
from sincerity,
I tell you:
you are someone worth knowing
again and again.

──────────────────

 A Special Friendship

I don’t want promises,
nor labels,
nor big words.

I want shared laughter,
crazy ideas,
comfortable silences,
and celebrated goals.

If the world is big,
let it find us growing.
If distance exists,
let it not erase the affection.

Because there are friendships
that don’t need explanations,
they are felt.
And you…
are one of them.. `
};

function Page1() {
  const navigate = useNavigate();
  
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const [revealedCarta1, setRevealedCarta1] = useState(false);
  const [revealedCarta2, setRevealedCarta2] = useState(false);
  const [revealedPoemas, setRevealedPoemas] = useState(false);
  
  const [typingText1, setTypingText1] = useState('');
  const [typingText2, setTypingText2] = useState('');
  const [typingText3, setTypingText3] = useState('');
  
  const [isTyping1, setIsTyping1] = useState(false);
  const [isTyping2, setIsTyping2] = useState(false);
  const [isTyping3, setIsTyping3] = useState(false);

  const typeText = useCallback((text, setterFn, setTypingFn) => {
    setTypingFn(true);
    let index = 0;
    setterFn('');
    const speed = 35; // MÁS LENTO (era 25)
    
    const interval = setInterval(() => {
      if (index < text.length) {
        setterFn(prev => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
        setTypingFn(false);
      }
    }, speed);
    
    return () => clearInterval(interval);
  }, []);

  const handleRevealCarta1 = () => {
    if (!revealedCarta1) {
      setRevealedCarta1(true);
      typeText(originalTexts.carta1, setTypingText1, setIsTyping1);
    }
  };

  const handleRevealCarta2 = () => {
    if (!revealedCarta2) {
      setRevealedCarta2(true);
      typeText(originalTexts.carta2, setTypingText2, setIsTyping2);
    }
  };

  const handleRevealPoemas = () => {
    if (!revealedPoemas) {
      setRevealedPoemas(true);
      typeText(originalTexts.poemas, setTypingText3, setIsTyping3);
    }
  };

  const handleNavigate = () => {
    window.scrollTo(0, 0);
    navigate('/page2');
  };

  return (
    <div className="page1-container">
      <DecorativeHeader />
      
      <div className="animated-bg">
        <div className="gradient-orb orb1"></div>
        <div className="gradient-orb orb2"></div>
        <div className="gradient-orb orb3"></div>
      </div>

      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="page1-header"
      >
        <h1 className="main-title">Merry Christmas, Yuki</h1>
        <div className="subtitle-line"></div>
        <p className="main-subtitle">For someone who lights up my world</p>
      </motion.div>

      <div className="content-wrapper">
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="card-container"
        >
          <div className="card-header">
            <h2>Letter from the Heart</h2>
          </div>
          
          {!revealedCarta1 ? (
            <div className="censored-content">
              <div className="blur-overlay">
                <div className="blur-lines">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="blur-line"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    />
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(201, 150, 19, 0.7)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRevealCarta1}
                className="reveal-btn"
              >
                Reveal
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="revealed-content custom-font"
            >
              <p className={isTyping1 ? "typing-text" : ""}>{typingText1}</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="card-container"
        >
          <div className="card-header">
            <h2>A Sincere Apology</h2>
          </div>
          
          {!revealedCarta2 ? (
            <div className="censored-content">
              <div className="blur-overlay">
                <div className="blur-lines">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="blur-line"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    />
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(201, 150, 19, 0.7)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRevealCarta2}
                className="reveal-btn"
              >
                Reveal
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="revealed-content custom-font"
            >
              <p className={isTyping2 ? "typing-text" : ""}>{typingText2}</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="card-container"
        >
          <div className="card-header">
            <h2>Poems for You</h2>
          </div>
          
          {!revealedPoemas ? (
            <div className="censored-content">
              <div className="blur-overlay">
                <div className="blur-lines">
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="blur-line"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                    />
                  ))}
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 15px 40px rgba(201, 150, 19, 0.7)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleRevealPoemas}
                className="reveal-btn"
              >
                Reveal
              </motion.button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="revealed-content poem-content custom-font"
            >
              <p className={isTyping3 ? "typing-text" : ""}>{typingText3}</p>
            </motion.div>
          )}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="card-container music-card"
        >
          <div className="card-header">
            <h2>Our Playlist</h2>
            <p className="card-subtitle">Music that unites us</p>
          </div>
          <div className="music-embed">
            <iframe
              src="https://embed.tidal.com/playlists/ea0c9d27-398a-430c-aa7b-fa93a2547a37"
              title="Tidal Playlist"
              style={{
                width: '100%',
                height: '500px',
                border: 'none',
                borderRadius: '12px',
                backgroundColor: 'transparent'
              }}
              allow="encrypted-media"
              allowFullScreen
            />
            <div className="tidal-link">
              <a 
                href="https://tidal.com/playlist/ea0c9d27-398a-430c-aa7b-fa93a2547a37" 
                target="_blank" 
                rel="noopener noreferrer"
                className="open-tidal-btn"
              >
                Open in Tidal →
              </a>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="card-container soundcloud-card"
        >
          <div className="card-header">
            <h2>Your Greatest Hits</h2>
            <p className="card-subtitle">The music you create inspires</p>
          </div>
          <div className="soundcloud-embed">
            <iframe
              width="100%"
              height="450"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              title="SoundCloud Player"
              src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/user-124776293&color=%23c33100&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true"
            />
          </div>
        </motion.div>

      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        whileHover={{ scale: 1.05, x: 10 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNavigate}
        className="nav-button"
      >
        Continue →
      </motion.button>
      
      <DecorativeFooter />
    </div>
  );
}

export default Page1;
