
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, PieChart } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border bg-background py-4">
      <div className="container flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="rounded-md bg-primary-700 p-1">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-xl font-bold text-primary-800">ResumeAI</h1>
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            <li>
              <Link
                to="/"
                className="text-sm font-medium text-foreground hover:text-primary-600"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/builder"
                className="text-sm font-medium text-foreground hover:text-primary-600"
              >
                Resume Builder
              </Link>
            </li>
            <li>
              <Link
                to="/analyzer"
                className="text-sm font-medium text-foreground hover:text-primary-600"
              >
                Resume Analyzer
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            className="hidden md:flex items-center gap-1"
          >
            <PieChart className="h-4 w-4 mr-1" />
            Dashboard
          </Button>
          <Button size="sm">Get Started</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
