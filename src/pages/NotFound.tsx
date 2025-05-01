
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1A1A2E] text-white p-4">
      <div className="text-center">
        <h1 className="font-['Orbitron'] text-6xl md:text-8xl font-bold text-[#00F5FF] mb-4">404</h1>
        <h2 className="font-['Orbitron'] text-2xl md:text-3xl mb-6">Page Not Found</h2>
        <p className="text-white/70 mb-8 max-w-md mx-auto">
          The page you are looking for doesn't exist or has been moved to another location.
        </p>
        <Link to="/">
          <Button className="bg-[#0466C8] hover:bg-[#0466C8]/80 text-white">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
