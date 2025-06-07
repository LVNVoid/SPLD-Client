import NarrativeDetail from "@/components/public/narrative/NarrativeDetail";
import { ChevronLeft } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const narrative = {
  title: "Polres Jaksel Gelar Operasi Zebra Candi 2024",
  content:
    "Satlantas Polres Jakarta Selatan melaksanakan operasi Zebra Candi selama seminggu penuh guna menertibkan pelanggaran lalu lintas. Operasi ini berhasil menjaring 543 pelanggar dengan tilang terbanyak untuk kasus tidak menggunakan helm.",
  publishedAt: "2025-06-07T07:50:11.841Z",
  images: [
    {
      id: "8ffc0402-052a-46ed-b16a-3ad7565cdbf8",
      url: "https://res.cloudinary.com/doxm4esf0/image/upload/v1749281713/narratives/h3koreh5r3oe2v8farvg.jpg",
      filename: "narratives/h3koreh5r3oe2v8farvg",
      alt: "Windows 10 Logo Minimal Dark 8K Wallpaper, HD Minimalist.jpeg",
      caption: null,
      order: 0,
      narrativeId: "927d8b89-41d8-4fd1-8ccd-2181c7b3044d",
      createdAt: "2025-06-07T07:35:17.147Z",
    },
    {
      id: "da76a337-c1ab-448d-a0cf-9a60fd9ca40e",
      url: "https://res.cloudinary.com/doxm4esf0/image/upload/v1749281716/narratives/b3r4wokfjst27h6xyjca.jpg",
      filename: "narratives/b3r4wokfjst27h6xyjca",
      alt: "windows-11-365-purple-abstract-background-4k-wallpaper-uhdpaper.com-551@0@i.jpg",
      caption: null,
      order: 1,
      narrativeId: "927d8b89-41d8-4fd1-8ccd-2181c7b3044d",
      createdAt: "2025-06-07T07:35:17.147Z",
    },
  ],
  author: {
    name: "Admin System",
  },
};

const DetailNarrativePage = () => {
  return (
    <div className="px-4 py-8 bg-background">
      <Link to="/narrative" className="flex items-center gap-2 text-primary">
        <ChevronLeft className="w-6 h-6 text-primary" />
        <span className="text-primary">Kembali ke Daftar Narasi</span>
      </Link>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <NarrativeDetail narrative={narrative} />
      </div>
    </div>
  );
};

export default DetailNarrativePage;
