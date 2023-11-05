// components/EmojiParticles.tsx
import React, { useCallback, useState, useEffect } from 'react';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';

type EmojiParticlesProps = {
  voteType: 'hot' | 'cold';
};

const EmojiParticles: React.FC<EmojiParticlesProps> = ({ voteType }) => {
  const [showParticles, setShowParticles] = useState(true);
  const particlesInit = useCallback(async (engine) => {
    // This is where you can load custom shapes or presets
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    // This is where you can access the particles container after it's loaded
    console.log(container);
  }, []);

  // useEffect(() => {
  //   // Set a timeout to stop showing particles after 3 seconds
  //   const timer = setTimeout(() => {
  //     setShowParticles(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);

  const options = {
    background: {
      color: {
        value: 'transparent', // Use 'transparent' to have a clear background
      },
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push',
        },
        onHover: {
          enable: true,
          mode: 'repulse',
        },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#ffffff', // This color will not matter since we're using images, but it's required
      },
      links: {
        enable: false, // Disable links for emoji particles
      },
      move: {
        direction: voteType === 'hot' ? 'right' : 'left',
        enable: true,
        outModes: {
          default: 'out', // Emojis will bounce off the edges of the canvas
        },
        random: true,
        speed: 100,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 20, // Adjust number of emojis here
      },
      opacity: {
        value: 1, // Full opacity for emojis
      },
      shape: {
        type: 'image',
        image: {
          src: voteType === 'hot' ? 'fire.png' : 'ice.png',
          width: 32,
          height: 32,
        },
      },
      size: {
        value: { min: 16, max: 32 }, // Size range for emojis
      },
    },
    detectRetina: true,
  };

  // if (!showParticles) {
  //   return null; // Don't render anything if showParticles is false
  // }

  return (
    <Particles
      id="emoji-particles"
      init={particlesInit}
      loaded={particlesLoaded}
      options={options}
    />
  );
};

export default EmojiParticles;
