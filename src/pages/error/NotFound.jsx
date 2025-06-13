import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <h1 className="text-9xl font-bold">404</h1>
      <h2 className="text-2xl font-bold">Page Not Found</h2>
      <p className="text-muted-foreground text-sm">
        The page you are looking for does not exist.
      </p>
      <div className="mt-4">
        <Button variant="outline" onClick={() => navigate(-1)}>
          <ChevronLeft className="w-4 h-4" />
          Go back
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
