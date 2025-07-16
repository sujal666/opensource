'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Github, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 pt-24 text-left text-white">
      <div className="max-w-2xl">
        <div className="inline-flex items-center rounded-full border border-white/30 bg-black/30 px-4 py-2 mb-6 backdrop-blur-sm">
          <Github className="h-5 w-5 mr-2" />
          <span className="text-sm">Introducing GitHub Copilot X</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </div>
        <h1 className="text-5xl font-bold tracking-tight lg:text-7xl">
          Let's build from here
        </h1>
        <p className="mt-6 text-lg text-white/80">
          Harnessing AI for productivity. Designed for collaboration. Curated for
          built-in security. Welcome to the platform developers love.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row items-start gap-4">
          <Input
            type="email"
            placeholder="Email address"
            className="w-full sm:w-auto flex-grow max-w-xs bg-white/20 border-white/30 text-white placeholder:text-white/70"
          />
          <Button
            size="lg"
            className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white"
          >
            Sign up for GitHub
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="w-full sm:w-auto bg-transparent border-white/30 text-white hover:bg-white/10"
          >
            Start a free enterprise trial <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

const Companies = () => {
  const companies = [
    { name: 'Stripe', logo: 'stripe.svg' },
    { name: 'Pinterest', logo: 'pinterest.svg' },
    { name: 'KPMG', logo: 'kpmg.svg' },
    { name: 'Mercedes-Benz', logo: 'mercedes.svg' },
    { name: 'P&G', logo: 'pg.svg' },
    { name: 'Telus', logo: 'telus.svg' },
  ];
  return (
    <div className="container mx-auto px-4 pt-16 pb-24 text-left">
        <div className="max-w-2xl">
      <p className="text-white/60 text-sm mb-4">
        Trusted by the world’s leading organizations
      </p>
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        {companies.map(company => (
          <span key={company.name} className="text-white/70 font-semibold text-xl">
            {company.name}
          </span>
        ))}
      </div>
      </div>
    </div>
  );
};

const FeatureSection = ({ title, description, imageUrl, imageAlt }: { title: string; description: string; imageUrl: string; imageAlt: string; }) => {
    return (
      <div className="container mx-auto px-4 py-16 text-white">
        <div className="relative">
            <div className="absolute top-0 left-0 h-full w-px bg-gradient-to-b from-green-400/0 to-green-400/80"></div>
            <div className="pl-8">
                <p className="text-green-400 mb-2">Productivity</p>
                <h2 className="text-4xl font-bold mb-4">{title}</h2>
                <p className="text-white/80 text-lg max-w-2xl">{description}</p>
            </div>
        </div>
        <div className="mt-8">
          <Image
            src={imageUrl}
            alt={imageAlt}
            width={2400}
            height={1600}
            className="rounded-lg shadow-lg w-full"
          />
        </div>
      </div>
    );
  };

export default function LandingPage() {
  return (
    <div className="bg-black text-white overflow-x-hidden">
      <div className="relative">
        {/* Background Image */}
        <div className="absolute top-0 left-0 w-full h-full -z-20">
            <Image 
                src="/earth2.jpg" 
                alt="Earth from space"
                layout="fill"
                objectFit="cover"
                className="transform -rotate-12 scale-150"
            />
        </div>
        {/* Overlay */}
        <div className="absolute top-0 left-0 w-full h-full bg-black/70 -z-10"></div>

        {/* Content */}
        <div className="relative z-20">
            <div className="absolute top-1/4 left-16 h-2/3 w-px bg-gradient-to-b from-purple-500 via-pink-500 to-green-500/0"></div>
            <main className="pl-32">
                <HeroSection />
                <Companies />
            </main>
        </div>
      </div>

      <div className="bg-black relative z-20">
        <FeatureSection
          title="Accelerate high-quality software development."
          description="Our platform drives innovation with tools that boost developer velocity."
          imageUrl="/Demo.png"
          imageAlt="Demo of the platform"
        />
      </div>
    </div>
  );
}