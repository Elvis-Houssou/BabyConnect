import { HeroSection } from "@/components/landing/hero-section"
import { StorySection } from "@/components/landing/story-section"
import { AttendanceSheet } from "@/components/landing/attendance-sheet";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StorySection />
      <AttendanceSheet />
      <Footer />
    </main>
  );
}
