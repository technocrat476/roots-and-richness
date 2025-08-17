
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useEffect } from 'react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className = "" }: BreadcrumbsProps) => {
  useEffect(() => {
    // Generate structured data for breadcrumbs
    const breadcrumbList = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": items.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        ...(item.href && { "item": `https://rootsandrichness.in${item.href}` })
      }))
    };

    // Remove existing breadcrumb structured data
    let existingScript = document.querySelector('script[type="application/ld+json"]#breadcrumb-structured-data');
    if (existingScript) {
      existingScript.remove();
    }

    // Add new breadcrumb structured data
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'breadcrumb-structured-data';
    script.textContent = JSON.stringify(breadcrumbList);
    document.head.appendChild(script);

    return () => {
      // Cleanup on unmount
      let scriptToRemove = document.querySelector('script[type="application/ld+json"]#breadcrumb-structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [items]);

  return (
    <nav className={`flex items-center space-x-2 text-sm ${className}`} aria-label="Breadcrumb">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && <ChevronRight size={16} className="text-neutral-medium mx-2" />}
          {item.href && index < items.length - 1 ? (
            <Link 
              to={item.href} 
              className="text-neutral-medium hover:text-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span 
              className={index === items.length - 1 ? "text-secondary font-medium" : "text-neutral-medium"}
            >
              {item.label}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumbs;
