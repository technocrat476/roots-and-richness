
import { Facebook, Instagram, Youtube, Share2, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface SocialShareProps {
  variant?: 'footer' | 'blog-header' | 'blog-footer';
  url?: string;
  title?: string;
  className?: string;
}

const SocialShare = ({ variant = 'footer', url, title, className = '' }: SocialShareProps) => {
  const socialLinks = [
    {
      platform: 'Instagram',
      url: 'https://www.instagram.com/rootsandrichness',
      icon: Instagram,
      ariaLabel: 'Follow us on Instagram'
    },
    {
      platform: 'Facebook',
      url: 'https://www.facebook.com/rootsandrichness',
      icon: Facebook,
      ariaLabel: 'Follow us on Facebook'
    },
    {
      platform: 'YouTube',
      url: 'https://www.youtube.com/@rootsandrichness',
      icon: Youtube,
      ariaLabel: 'Subscribe to our YouTube channel'
    }
  ];

  const handleCopyLink = async () => {
    if (url) {
      try {
        await navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
      } catch (err) {
        console.error('Failed to copy link:', err);
        toast.error('Failed to copy link');
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share && url && title) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    }
  };

  if (variant === 'footer') {
    return (
      <div className={`flex space-x-4 ${className}`}>
        {socialLinks.map((social) => {
          const IconComponent = social.icon;
          return (
            <a
              key={social.platform}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.ariaLabel}
              className="text-white hover:text-[#D4A441] transition-colors duration-300 hover:scale-110 transform"
            >
              <IconComponent size={24} />
            </a>
          );
        })}
      </div>
    );
  }

  if (variant === 'blog-header' || variant === 'blog-footer') {
    return (
      <div className={`flex flex-wrap items-center gap-4 ${className}`}>
        <div className="flex items-center space-x-3">
          <span className="text-sm font-medium text-neutral-medium">Follow us:</span>
          {socialLinks.map((social) => {
            const IconComponent = social.icon;
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.ariaLabel}
                className="text-[#1D3B2A] hover:text-[#D4A441] transition-colors duration-300 hover:scale-110 transform"
              >
                <IconComponent size={20} />
              </a>
            );
          })}
        </div>
        
        {url && (
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-neutral-medium">Share:</span>
            {navigator.share && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
                className="p-2 hover:bg-neutral-light"
              >
                <Share2 size={16} />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopyLink}
              className="p-2 hover:bg-neutral-light"
            >
              <Copy size={16} />
            </Button>
          </div>
        )}
      </div>
    );
  }

  return null;
};

export default SocialShare;
