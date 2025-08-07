'use client';

import { useEffect, useState, useRef } from 'react';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function FloatingSocialMedia() {
  const [isVisible, setIsVisible] = useState(false);
  const socialMediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Get the header social media section element
      const headerElement = document.querySelector('.header-social-media');
      
      if (headerElement) {
        // Check if the header social media section is out of view
        const rect = headerElement.getBoundingClientRect();
        const isOutOfView = rect.bottom < 0;
        
        // Show floating social media whenever user scrolls and the header social media is out of view
        setIsVisible(isOutOfView);
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial check
    handleScroll();

    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      ref={socialMediaRef}
      className={`fixed bottom-0 left-0 right-0 z-50 py-3 px-4 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-full'}`}
    >
      <div className="mx-auto bg-zinc-900/70 backdrop-blur-md border border-zinc-800/50 rounded-full px-6 py-3 flex flex-wrap items-center justify-center gap-3 w-fit max-w-3xl">
        <Link href="https://github.com/febryardiansyah/" target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-zinc-900/70 border-zinc-800 hover:bg-zinc-800 hover:text-emerald-400 backdrop-blur-sm"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Button>
        </Link>
        <Link href="https://x.com/febryards" target="_blank" rel="noopener noreferrer">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-zinc-900/70 border-zinc-800 hover:bg-zinc-800 hover:text-blue-400 backdrop-blur-sm"
          >
            <Twitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </Button>
        </Link>
        <Link
          href="https://www.linkedin.com/in/febry-ardiansyah-a4b580170/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-zinc-900/70 border-zinc-800 hover:bg-zinc-800 hover:text-blue-500 backdrop-blur-sm"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Button>
        </Link>
        <Link href="mailto:febryardiansyah27@gmail.com">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full bg-zinc-900/70 border-zinc-800 hover:bg-zinc-800 hover:text-amber-400 backdrop-blur-sm"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Button>
        </Link>
      </div>
    </div>
  );
}