import { LazyMotion, MotionConfig } from "motion/react";
import { lazy, Suspense, useCallback, useState } from "react";
import InteractiveBackground from "./components/background/InteractiveBackground";
import { Footer } from "./components/layout/Footer";
import { Intro } from "./components/layout/Intro";
import { Navbar } from "./components/layout/Navbar";
import { Hero } from "./components/sections/Hero";
import { profile } from "./data/profile";
import { useGithubRepos } from "./hooks/useGithubRepos";
import { SmoothScrollProvider } from "./hooks/useSmoothScroll";

const BelowFold = lazy(() => import("./components/sections/BelowFold"));
const loadMotionFeatures = () => import("./lib/motionFeatures").then((mod) => mod.default);

export default function App() {
  const [ready, setReady] = useState(false);
  const onIntroDone = useCallback(() => setReady(true), []);
  const github = useGithubRepos(profile.githubUser);

  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadMotionFeatures} strict>
      <SmoothScrollProvider>
        <a
          href="#contenido"
          className="sr-only z-[300] rounded-full bg-brand px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Saltar al contenido
        </a>

        <Intro onDone={onIntroDone} />
        <InteractiveBackground />
        <Navbar />

        <main id="contenido" className="relative z-10">
          <Hero ready={ready} />
          <Suspense fallback={<div className="min-h-svh" />}>
            <BelowFold github={github} />
          </Suspense>
        </main>

        <div className="relative z-10">
          <Footer />
        </div>
      </SmoothScrollProvider>
      </LazyMotion>
    </MotionConfig>
  );
}
