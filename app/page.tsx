// "use client";


// import { motion } from "motion/react";

// import Link from "next/link";
// import { CompareDemo } from "./_components/CompareDemo";
// import  {TabsDemo}  from "./_components/TabsDemo";
// import { WobbleCardDemo } from "./_components/WobbleCardDemo";
// import { Testimonial } from "./_components/Testimonial";

// export default function HeroSectionOne() {
//   return (
//     <div className="relative mx-auto my-10 flex max-w-7xl flex-col items-center justify-center">
//       <Navbar />
//       {/* <div className="absolute inset-y-0 left-0 h-full w-px bg-neutral-300/80 dark:bg-neutral-800/80">
//         <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
//       </div> */}
//       {/* <div className="absolute inset-y-0 right-0 h-full w-px bg-neutral-300/80 dark:bg-neutral-800/80">
//         <div className="absolute h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
//       </div> */}
//        {/* <div className="absolute top-1/4 left-16 h-2/3 w-px bg-gradient-to-b from-purple-500 via-pink-500 to-green-500/0"></div>
//       <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-300/80 dark:bg-neutral-800/80">
//         <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
//       </div> */}








//       <div className="px-4 py-10 md:py-20">
//         <div className="absolute top-1/4 left-16 h-2/3 w-px bg-gradient-to-b from-purple-500 via-pink-500 to-green-500/0"></div>
//         <h1 className="relative z-10 mx-auto max-w-4xl text-center text-2xl font-bold text-slate-700 md:text-4xl lg:text-7xl dark:text-slate-300">
//           {"Start your open source contribution, Today!"
//             .split(" ")
//             .map((word, index) => (
//               <motion.span
//                 key={index}
//                 initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
//                 animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
//                 transition={{
//                   duration: 0.3,
//                   delay: index * 0.1,
//                   ease: "easeInOut",
//                 }}
//                 className="mr-2 inline-block"
//               >
//                 {word}
//               </motion.span>
//             ))}
//         </h1>
//         <motion.p
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           transition={{
//             duration: 0.3,
//             delay: 0.8,
//           }}
//           className="relative z-10 mx-auto max-w-xl py-4 text-center text-lg font-normal text-neutral-600 dark:text-neutral-400"
//         >
//          A curated platform that helps developers discover beginner-friendly open source issues to contribute to, filtered by programming language and difficulty level.
//         </motion.p>
//         <motion.div
//           initial={{
//             opacity: 0,
//           }}
//           animate={{
//             opacity: 1,
//           }}
//           transition={{
//             duration: 0.3,
//             delay: 1,
//           }}
//           className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4"
//         >
//           <Link href={'/dashboard'} >
//           <button className="w-60 transform rounded-lg bg-gray-800 px-6 py-2 font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-gray-200">
//             Explore Now
//           </button>
//           </Link>

//         </motion.div>
        
 


//       </div>
   
// {/* 
//       <CompareDemo />
//      */}
//       <div className="mt-20">

    
//       </div>
//       {/* <Testimonial /> */}
//     </div>
    
//   );
// }

// const Navbar = () => {
//   return (
//     <nav className="flex w-full items-center justify-between border-t border-b border-neutral-300 px-4 py-4 dark:border-neutral-800">
//       <div className="flex items-center gap-2">
//         <div className="size-7 rounded-full bg-gradient-to-br from-violet-500 to-pink-500" />
//         <h1 className="text-base font-bold md:text-2xl">Open Source AI</h1>
//       </div>
//     </nav>
//   );
// };






"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Github, Code, Users, Search, Filter, Zap, Target, TrendingUp, ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background with space theme */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-black"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-600/10 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-600/10 via-transparent to-transparent"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between p-6 border-b border-gray-800/50 backdrop-blur-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <Code className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold">IssueHunter</span>
        </div>
        <div className="flex items-center space-x-6">
          <Link href="#features" className="text-gray-300 hover:text-white transition-colors">
            Features
          </Link>
          <Link href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">
            How it Works
          </Link>
          <Link href="#community" className="text-gray-300 hover:text-white transition-colors">
            Community
          </Link>
          <Link href="/home" className="text-gray-300 hover:text-white transition-colors">
          <Button
            variant="outline"
            className="border-gray-700 text-white hover:bg-white hover:text-black bg-transparent"
            >
            <Github className="w-4 h-4 mr-2" />
            Sign in with GitHub
          </Button>
            </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-20 text-center">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6">
            <Badge variant="secondary" className="bg-blue-500/10 text-blue-400 border-blue-500/20 mb-4">
              <Sparkles className="w-3 h-3 mr-1" />
              Your Gateway to Open Source
            </Badge>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            Let's build from here
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover GitHub issues tailored for your skill level. From beginner-friendly to advanced challenges, start
            your open source journey with confidence.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12">
            <div className="flex items-center bg-gray-900/50 rounded-lg p-2 w-full md:w-96 border border-gray-700">
              <Search className="w-5 h-5 text-gray-400 ml-3" />
              <Input
                placeholder="Search by language, difficulty, or topic..."
                className="border-0 bg-transparent text-white placeholder-gray-400 focus-visible:ring-0"
              />
            </div>
            <Link href={'/home'}> 
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
              >
              Start Exploring
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
              </Link>
          </div>

         
         {/* Company logos section */}
         
<div className="relative max-w-[600px] mx-auto overflow-hidden">
  <p className="text-gray-400 mb-8 text-center">Trusted by developers contributing to</p>

  <div className="relative w-full">
    <div
      className="flex animate-marquee items-center justify-center space-x-8" // increased space-x for equal spacing
      style={{ animation: 'marquee 20s linear infinite' }}
    >
      {/* Logos - equal width and spacing */}
      {[
        "JavaScript",
        "Ruby",
        "TypeScript",
        "Rust",
        "Python",
        "Kotlin",
        "Java",
        "JavaScript",
        "Ruby",
        "TypeScript",
        "Rust",
        "Python",
        "Kotlin",
        "Java",
      ].map((lang) => (
        <div
          key={lang + Math.random()}
          className="text-xl font-bold min-w-[120px] text-center px-3" // px-4 adds horizontal padding for spacing
        >
          {lang}
        </div>
      ))}
    </div>
  </div>
</div>


        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="bg-green-500/10 text-green-400 border-green-500/20 mb-4">
              <Target className="w-3 h-3 mr-1" />
              Smart Matching
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Find your perfect first contribution</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Our intelligent system matches you with issues based on your experience level, preferred languages, and
              interests.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-blue-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Filter className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Smart Filtering</h3>
                <p className="text-gray-400">
                  Filter issues by difficulty level and programming language also get help of AI to of you get struck.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-purple-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Advance Search</h3>
                <p className="text-gray-400">
                  Give your Preferences in the prompt and let AI find the perfect issues for you.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 hover:border-green-500/50 transition-all duration-300">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">Progress Tracking</h3>
                <p className="text-gray-400">
                  Track your contributions, commits, activity and watch your open source journey unfold.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Code preview mockup */}
          <div className="bg-gray-900/80 rounded-xl border border-gray-800 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-sm text-gray-400">issues-dashboard.tsx</div>
            </div>
            <div className="font-mono text-sm">
              <div className="text-gray-500">// Perfect issues for your skill level</div>
              <div className="text-blue-400">
                const <span className="text-white">perfectIssues</span> = <span className="text-yellow-400">await</span>{" "}
                <span className="text-blue-400">findIssues</span>({`{`}
              </div>
              <div className="ml-4 text-white">
                difficulty: <span className="text-green-400">'beginner'</span>,
              </div>
              <div className="ml-4 text-white">
                languages: [<span className="text-green-400">'JavaScript'</span>,{" "}
                <span className="text-green-400">'TypeScript'</span>],
              </div>
              <div className="ml-4 text-white">
                labels: [<span className="text-green-400">'good-first-issue'</span>,{" "}
                <span className="text-green-400">'help-wanted'</span>]
              </div>
              <div className="text-blue-400">{`}`});</div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                10,000+
              </div>
              <div className="text-gray-300">Curated Issues</div>
              <div className="text-sm text-gray-500">Updated daily from top repositories</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                85%
              </div>
              <div className="text-gray-300">Success Rate</div>
              <div className="text-sm text-gray-500">First-time contributors who complete issues</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                5,000+
              </div>
              <div className="text-gray-300">Active Developers</div>
              <div className="text-sm text-gray-500">Growing community of contributors</div>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="relative z-10 px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="bg-purple-500/10 text-purple-400 border-purple-500/20 mb-4">
              <Zap className="w-3 h-3 mr-1" />
              Simple Process
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Your journey starts here</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold">Set Your Preferences</h3>
              <p className="text-gray-400">Tell us your skill level, preferred languages, and areas of interest.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold">Discover Perfect Issues</h3>
              <p className="text-gray-400">Browse curated issues that match your criteria and learning goals.</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold">Start Contributing</h3>
              <p className="text-gray-400">
                Get guidance, submit your PR, and become part of the open source community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl border border-gray-800 p-12 backdrop-blur-sm">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to make your first contribution?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers who started their open source journey with us.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-4">
              <Link href={'/home'}>
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-8"
                >
                <Github className="w-5 h-5 mr-2" />
                Get Started Free
              </Button>
                </Link>
              {/* <Button
                size="lg"
                variant="outline"
                className="border-gray-700 text-white hover:bg-white hover:text-black bg-transparent"
              >
                View Demo
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-gray-800 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5" />
                </div>
                <span className="text-xl font-bold">IssueHunter</span>
              </div>
              <p className="text-gray-400">Empowering the next generation of open source contributors.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <div>Features</div>
                <div>Pricing</div>
                <div>API</div>
                <div>Documentation</div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Community</h4>
              <div className="space-y-2 text-gray-400">
               <Link href="https://github.com/sujal666" ><div className="mb-1">GitHub</div></Link>
               <Link href="https://x.com/Sujal50822932" ><div className="mb-1">Twitter</div></Link>
               <Link href="https://www.linkedin.com/in/sujalpoojari/" ><div className="mb-1">LinkedIn</div></Link>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <div className="space-y-2 text-gray-400">
                <div>Help Center</div>
                <div>Contact</div>
                <div>Status</div>
                <div>Privacy</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 IssueHunter. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
