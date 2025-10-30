import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import { useSearch } from "../context/SearchContext";
import { asset } from "../assets/asset";

interface Experience {
  _id: string;
  title: string;
  description: string;
  location: string;
  basePrice: number;
  images: string[];
  imageKey: keyof typeof asset,
  category: string;
}

const ExperiencesList = () => {
  const { searchTerm } = useSearch();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/experiences?search=${searchTerm}`
        );
        setExperiences(res.data.data);
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, [searchTerm]);

  if (loading) {
    return <p className="text-center text-gray-600 mt-10">Loading experiences...</p>;
  }

  if (experiences.length === 0) {
    return <p className="text-center text-gray-600 mt-10">No such experience found</p>;
  }

  console.log(experiences);

  return (
    <div className="px-6 sm:px-10 md:px-16 py-8">
    <h1 className="text-3xl font-semibold mb-6 text-center text-gray-800">
      Explore Experiences
    </h1>

    <div className="
      grid gap-8
      grid-cols-[repeat(auto-fit,minmax(260px,1fr))]
      justify-items-center
    ">
      {experiences.map((exp) => (
        <Card
          id={exp._id}
          key={exp._id}
          imageUrl={asset[exp.imageKey]}
          title={exp.title}
          state={exp.location.split(",").pop()?.trim() || exp.location}
          description={exp.description}
          price={`₹${exp.basePrice}`}
          onViewDetails={() => alert('Viewing details...')}
        />
      ))}
    </div>
  </div>
  );
};

export default ExperiencesList;
