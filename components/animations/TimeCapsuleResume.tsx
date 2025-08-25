"use client";

import {
  useState,
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import { FileText, X, Cpu, Zap } from "lucide-react";
import { getAssetPath } from "@/utils/paths";

export interface TimeCapsuleResumeRef {
  openCapsule: () => void;
}

const TimeCapsuleResume = forwardRef<TimeCapsuleResumeRef>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [downloadEffect, setDownloadEffect] = useState<
    "hardware" | "software" | null
  >(null);
  const capsuleRef = useRef<HTMLDivElement>(null);

  const openCapsule = () => {
    setIsAnimating(true);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
    setTimeout(() => setIsAnimating(false), 300);
  };

  const closeCapsule = () => {
    setIsAnimating(true);
    document.body.style.overflow = "";
    setTimeout(() => {
      setIsOpen(false);
      setIsAnimating(false);
      setDownloadEffect(null);
    }, 200);
  };

  useImperativeHandle(ref, () => ({
    openCapsule,
  }));

  const handleDownload = (type: "hardware" | "software") => {
    setDownloadEffect(type);

    const url =
      type === "hardware"
        ? getAssetPath("resumes/hardware-engineering-resume.pdf")
        : getAssetPath("resumes/software-development-resume.pdf");
    const filename =
      type === "hardware"
        ? "Tyrone_Marhguy_Hardware_Engineering_Resume.pdf"
        : "Tyrone_Marhguy_Software_Development_Resume.pdf";

    setTimeout(() => {
      try {
        const newWindow = window.open(url, "_blank");
        if (!newWindow || newWindow.closed) {
          const link = document.createElement("a");
          link.href = url;
          link.download = filename;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        console.error("Download failed:", error);
        window.location.href = url;
      }
      setTimeout(() => closeCapsule(), 500);
    }, 200);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeCapsule();
      }
    };

    const handleOpenTimeCapsule = () => {
      openCapsule();
    };

    document.addEventListener("keydown", handleEscape);
    window.addEventListener("openTimeCapsule", handleOpenTimeCapsule);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("openTimeCapsule", handleOpenTimeCapsule);
    };
  }, [isOpen]);

  return (
    <>
      {/* Floating Resume Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <button
          onClick={openCapsule}
          className="group relative w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-brand-600 to-brand-700 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 border-2 border-brand-500/30"
          aria-label="Download Resume"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-white transition-colors duration-200" />
          </div>
          
          {/* Simple pulse ring */}
          <div className="absolute inset-0 rounded-full border-2 border-brand-400 animate-ping opacity-30"></div>
        </button>
      </div>

      {/* Resume Modal */}
      {isOpen && (
        <div
          className={`fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300 ${
            isAnimating ? "opacity-0" : "opacity-100"
          }`}
          onClick={closeCapsule}
        >
          <div
            ref={capsuleRef}
            className={`max-w-lg w-full transform transition-all duration-300 ${
              isAnimating
                ? "scale-95 opacity-0"
                : "scale-100 opacity-100"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Title */}
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                Download Resume
              </h2>
              <p className="text-lg text-gray-300">
                Choose your preferred format
              </p>
            </div>

            {/* Resume Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Hardware Resume */}
              <div className="group">
                <button
                  onClick={() => handleDownload("hardware")}
                  className="w-full focus:outline-none"
                  aria-label="Download Hardware Engineering Resume"
                  disabled={downloadEffect === "hardware"}
                >
                  <div
                    className={`relative rounded-lg border-2 border-gray-700 bg-gray-900/80 p-6 min-h-[140px] flex flex-col items-center justify-center backdrop-blur-sm transition-all duration-200 hover:border-brand-400/50 ${
                      downloadEffect === "hardware" ? "animate-pulse" : ""
                    }`}
                  >
                    <Cpu
                      className={`w-12 h-12 text-brand-400 mb-3 transition-all duration-200 ${
                        downloadEffect === "hardware" ? "animate-spin" : ""
                      }`}
                    />
                    <h3 className="text-lg font-bold text-white mb-2">
                      Hardware Engineering
                    </h3>
                    <p className="text-sm text-gray-400 text-center">
                      Digital circuits • CPU design • Embedded systems
                    </p>

                    {downloadEffect === "hardware" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-lg">
                        <div className="text-center">
                          <div className="w-6 h-6 border-2 border-brand-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                          <p className="text-brand-300 text-sm">Downloading...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              </div>

              {/* Software Resume */}
              <div className="group">
                <button
                  onClick={() => handleDownload("software")}
                  className="w-full focus:outline-none"
                  aria-label="Download Software Development Resume"
                  disabled={downloadEffect === "software"}
                >
                  <div
                    className={`relative rounded-lg border-2 border-gray-700 bg-gray-900/80 p-6 min-h-[140px] flex flex-col items-center justify-center backdrop-blur-sm transition-all duration-200 hover:border-brand-400/50 ${
                      downloadEffect === "software" ? "animate-pulse" : ""
                    }`}
                  >
                    <Zap
                      className={`w-12 h-12 text-brand-400 mb-3 transition-all duration-200 ${
                        downloadEffect === "software" ? "animate-spin" : ""
                      }`}
                    />
                    <h3 className="text-lg font-bold text-white mb-2">
                      Software Development
                    </h3>
                    <p className="text-sm text-gray-400 text-center">
                      Full-stack • ML/AI • APIs • Automation
                    </p>

                    {downloadEffect === "software" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/80 rounded-lg">
                        <div className="text-center">
                          <div className="w-6 h-6 border-2 border-brand-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                          <p className="text-brand-300 text-sm">Downloading...</p>
                        </div>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={closeCapsule}
              className="absolute right-4 top-4 p-2 text-gray-400 hover:text-white transition-colors duration-200"
              aria-label="Close Modal"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>
      )}
    </>
  );
});

TimeCapsuleResume.displayName = "TimeCapsuleResume";

export default TimeCapsuleResume;
