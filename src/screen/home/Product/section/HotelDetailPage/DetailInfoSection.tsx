import { styled } from "styled-components";
import CategorySelector from "../../../common/CategorySelector";
import { useState } from "react";
import HotelInfoImage from "../../../common/HotelInfoImage";
import PackageItemList from "../../../common/PackageItemList";

type HotelInformation = {
  images: {
    mainImage: string;
    roomImage: { roomType: number; image: string }[];
  };
  benefit: string[];
  roomType: string[];
  locDetail: string[];
};

interface HotelInfoSectionProps {
  info: HotelInformation;
  id: number;
  title: string;
}

const Wrapper = styled.section`
  padding: 4vw 0;
`;

export default function DetailInfoSection({
  info,
  id,
  title,
}: HotelInfoSectionProps) {

  const [categoryId, setCategoryId] = useState(0);

  return (
    <Wrapper>
      {categoryId === 0 ? (
        <div>

          <HotelInfoImage />
          <PackageItemList hotelId={id} title={title} numberOfPackage={2} />
        </div>
      ) : (
        <PackageItemList hotelId={id} title={title} />
      )}
    </Wrapper>
  );
}
