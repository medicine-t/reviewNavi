import PresetCard from "../components/TemplateCard";
import { TemplateCardProps } from "../components/TemplateCard";
import kaisyoku from "@/public/assets/kaisyoku.webp";
import celebration from "@/public/assets/celebration.webp";
import enkai from "@/public/assets/enkai.webp";

const cardsPropertys: TemplateCardProps[] = [
  {
    title: "会食",
    image: kaisyoku,
    query: {
      party_capacity: 4,
      budget: "B004", // (5000,7000]
    },
  },
  {
    title: "お祝い",
    image: celebration,
    query: {
      party_capacity: 4,
      budget: "B002", // (2000,3000]
    },
  },
  {
    title: "宴会",
    image: enkai,
    query: {
      party_capacity: 20,
      budget: "B002", // (10001,15000]
    },
  },
];

export default function Page() {
  return (
    <>
      <p>TemplateCard</p>
      <div className="p-5 flex">
        {cardsPropertys.map((card, index) => {
          return (
            <PresetCard
              key={index}
              title={card.title}
              image={card.image}
              query={card.query}
              className="flex m-2"
            />
          );
        })}
      </div>
    </>
  );
}
