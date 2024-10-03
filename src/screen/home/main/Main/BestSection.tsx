import { useState } from "react";
import SpotCard from "./best-section/SpotCard";
import CategorySelector from "./best-section/CategorySelector";
import MobileCardWrapper from "../../common/MobileCardWrapper";
import baliImge from "../../images/img_bali.jpg";
import franceImg from "../../images/img_france.jpeg";

export default function BestSection() {
  const categorysObj = {
    best: [
      { id: 0, title: "발리", subtitle: "Bali", imagePath: baliImge },
      { id: 1, title: "발리", subtitle: "Bali", imagePath: baliImge },
      { id: 2, title: "발리", subtitle: "Bali", imagePath: baliImge },
      { id: 3, title: "발리", subtitle: "Bali", imagePath: baliImge },
      { id: 4, title: "발리", subtitle: "Bali", imagePath: baliImge },
      { id: 5, title: "발리", subtitle: "Bali", imagePath: baliImge },
      { id: 6, title: "발리", subtitle: "Bali", imagePath: baliImge },
      { id: 7, title: "발리", subtitle: "Bali", imagePath: baliImge },
      { id: 8, title: "발리", subtitle: "Bali", imagePath: baliImge },
      { id: 9, title: "발리", subtitle: "Bali", imagePath: baliImge },
    ],
    europe: [
      { id: 0, title: "프랑스", subtitle: "France", imagePath: franceImg },
      { id: 1, title: "프랑스", subtitle: "France", imagePath: franceImg },
      { id: 2, title: "프랑스", subtitle: "France", imagePath: franceImg },
      { id: 3, title: "프랑스", subtitle: "France", imagePath: franceImg },
      { id: 4, title: "프랑스", subtitle: "France", imagePath: franceImg },
      { id: 5, title: "프랑스", subtitle: "France", imagePath: franceImg },
      { id: 6, title: "프랑스", subtitle: "France", imagePath: franceImg },
      { id: 7, title: "프랑스", subtitle: "France", imagePath: franceImg },
      { id: 8, title: "프랑스", subtitle: "France", imagePath: franceImg },
      { id: 9, title: "프랑스", subtitle: "France", imagePath: franceImg },
    ],
  };
  const [category, setCategory] = useState<"best" | "europe">("best");
  const spots = categorysObj[category];
  return (
    <section className="best__section__wrapper">
      <CategorySelector category={category} setCategory={setCategory} />
      <div className="spot__cards__wrapper">    
        {spots.map((spot) => (
          <SpotCard key={spot.id} {...spot} />
        ))}
      </div>
      <MobileCardWrapper>
        {spots.map((spot) => (
          <SpotCard key={spot.id} {...spot} />
        ))}
      </MobileCardWrapper>
    </section>
  );
}
