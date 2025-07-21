import Hero from "@/components/Hero";
import FlagshipCard from "@/components/FlagshipCard";

export default function Home() {
  const flagshipProjects = [
    {
      title: "8-bit Transistor CPU",
      description: "A complete CPU built from discrete transistors with custom instruction set architecture, capable of running assembly programs including Fibonacci calculations.",
      image: "/images/cpu-placeholder.svg",
      metrics: [
        { label: "Transistors", value: "734" },
        { label: "Max Freq", value: "4.3 kHz" },
        { label: "Power", value: "180 mA" },
        { label: "Tests Pass", value: "100%" },
      ],
      github: "https://github.com/tmarhguy/transistor-cpu",
      demo: "/projects/hardware/cpu",
      tags: ["Hardware", "CPU", "Digital Design"],
    },
    {
      title: "Music & You",
      description: "AI-powered music discovery platform that analyzes your listening patterns and recommends personalized playlists using machine learning algorithms.",
      image: "/images/music-placeholder.svg", 
      metrics: [
        { label: "Users", value: "2.1K" },
        { label: "Accuracy", value: "89%" },
        { label: "Songs", value: "50K+" },
        { label: "Uptime", value: "99.9%" },
      ],
      github: "https://github.com/tmarhguy/music-and-you",
      demo: "https://music-and-you.vercel.app",
      tags: ["AI/ML", "Web App", "Music"],
    },
    {
      title: "UniBridge",
      description: "University application management system with RESTful API, helping students track applications across multiple institutions with real-time status updates.",
      image: "/images/unibridge-placeholder.svg",
      metrics: [
        { label: "API Calls", value: "10K+" },
        { label: "Universities", value: "150+" },
        { label: "Students", value: "500+" },
        { label: "Response", value: "< 100ms" },
      ],
      github: "https://github.com/tmarhguy/unibridge",
      demo: "/projects/software/unibridge",
      tags: ["Backend", "API", "Education"],
    },
  ];

  return (
    <main className="min-h-screen bg-black">
      <Hero />
      
      <section id="projects" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-brand-400 to-brand-600 bg-clip-text text-transparent">
              Flagship Projects
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              From hardware design to machine learning, these projects showcase the breadth and depth of my technical expertise.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {flagshipProjects.map((project, index) => (
              <FlagshipCard key={index} {...project} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
