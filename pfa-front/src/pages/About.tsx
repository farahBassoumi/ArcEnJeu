import React from "react";
import { useTranslation } from "react-i18next";

import person4 from "../assets/images/yellow.avif";
import person1 from "../assets/images/yellow.avif";
import person2 from "../assets/images/yellow.avif";
import person3 from "../assets/images/yellow.avif";
import line from "../assets/icons/line.json";

import Lottie from "lottie-react";
import sparkles from "../assets/icons/sparkles.json";
import './LandingPage.css';

const teamMembers = [
  { name: "Team Member 1", img: person1 },
  { name: "Team Member 2", img: person2 },
  { name: "Team Member 3", img: person3 },
  { name: "Team Member 4", img: person4 },
];

const AboutPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="bg-(--color-beige)  px-[40px]">
      <div className="max-w-[1200px] mx-auto space-y-[40px]">
       <div className="relative">
        
          <h1 className="text-[40px] font-bold text-(--color-main)">
            {t("about_page.title", "About Our Platform")}
          </h1>
          <p className="text-[18px] text-(--color-gray) leading-relaxed mt-4">
            {t(
              "about_page.intro",
              "Welcome to our personalized game creation platform for educators, therapists, and families of autistic children. This platform is part of a bigger vision — one that empowers care providers to tailor sensory-friendly, educational games that meet each child's unique needs."
            )}
          </p>
          <p className="text-[16px] italic text-gray-600 mt-2">
            {t(
              "about_page.supported_languages",
              "Supporting Arabic, French, and English, our tools allow you to create new memory or multiple choice games, or expand existing ones by adding new levels and screens."
            )}
          </p>
        </div>

        <div>
          <h2 className="text-[30px] font-semibold text-(--color-main)">
            {t("about_page.why", "Why We Built This")}
          </h2>
          <p className="text-[16px] text-(--color-gray) leading-loose mt-4">
            {t(
              "about_page.vision",
              "We are a group of four passionate software engineering students driven by the desire to make a real-world impact. With the precious guidance of our mentor Madame Lilia and the expertise of child therapist Mister Mehdi, we brought this vision to life."
            )}
          </p>
          <p className="text-[15px] italic text-gray-500 mt-2">
            {t("about_page.thanks", "Big thanks to them for their trust, patience, and constant encouragement.")}
          </p>
        </div>

        <div>
            <div className=" overflow-visible">
            <Lottie
              animationData={line}
              loop={true}
              autoplay={true}
              className="w-[100x] h-[30px]"
            />
          </div>
          <h2 className="text-[24px] font-semibold text-center text-(--color-main) mb-[20px]">
            {t("about_page.meet_dream_team", "Meet the Dream Team")}
          </h2>
          <div className="flex flex-wrap justify-center gap-[40px]">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center w-[150px]">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-[120px] h-[120px] rounded-full team-floating shadow-lg object-cover mb-2"
                />
                <p className="text-[14px] text-center font-medium text-(--color-gray)">
                  {member.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
