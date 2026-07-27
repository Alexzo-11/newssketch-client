import HeroSlider from '@/components/HeroSlider';
import BreakingNews from '@/components/BreakingNews';
import TrendingSidebar from '@/components/TrendingSidebar';
import LatestNews from '@/components/LatestNews';
import CategorySection from '@/components/CategorySection';
import FeaturedStories from '@/components/FeaturedStories';
import VideoSection from '@/components/VideoSection';
// Remove: import Newsletter from '@/components/Newsletter';

export default function HomePage() {
  return (
    <div>
      <BreakingNews />
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <HeroSlider />
        </div>
        <TrendingSidebar />
      </div>
      <LatestNews />
      <CategorySection />
      <FeaturedStories />
      <VideoSection />
      {/* Remove: <Newsletter /> */}
    </div>
  );
}