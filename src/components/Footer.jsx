import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

function Footer({ className }) {
  return (
    <footer className={cn("bg-purple-300 dark:bg-gray-900", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              MyCompany
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Building modern web experiences with Shadcn UI.
            </p>
          </div>

          {/* Social Links */}
          <nav aria-label="Social media">
            <div className="flex flex-wrap gap-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
                 aria-label="Facebook">
                <FaFacebook className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-500 hover:text-sky-500 transition-colors duration-200"
                 aria-label="Twitter">
                <FaTwitter className="h-5 w-5" />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-200"
                 aria-label="GitHub">
                <FaGithub className="h-5 w-5" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="text-gray-500 hover:text-blue-700 transition-colors duration-200"
                 aria-label="LinkedIn">
                <FaLinkedin className="h-5 w-5" />
              </a>
            </div>
          </nav>
        </div>

        <Separator className="my-6" />

        {/* Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} MyCompany. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <a href="/privacy" className="hover:underline">Privacy Policy</a>
            <a href="/terms" className="hover:underline">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
