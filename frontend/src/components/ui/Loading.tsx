
import { Loader2 } from "lucide-react";

interface LoadingProps {
  size?: "sm" | "md" | "lg";
  text?: string;
  fullScreen?: boolean;
}

const Loading = ({ size = "md", text, fullScreen = false }: LoadingProps) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  };

  const Component = (
    <div className="flex flex-col items-center justify-center space-y-2">
      <Loader2 className={`animate-spin text-primary ${sizeClasses[size]}`} />
      {text && <p className="text-sm text-neutral-medium">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
        {Component}
      </div>
    );
  }

  return Component;
};

export default Loading;
