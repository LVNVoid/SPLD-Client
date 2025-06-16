import HeroSection from "@/components/public/HeroSection";
import PopUpInformation from "@/components/public/PopUpInformation";

const PublicHomePage = () => {
  return (
    <div>
      <main className="flex-1">
        <PopUpInformation />
        <HeroSection />
      </main>
    </div>
  );
};

export default PublicHomePage;
