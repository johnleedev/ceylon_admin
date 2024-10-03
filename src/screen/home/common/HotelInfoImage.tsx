import { styled } from "styled-components";

const Wrapper = styled.div`
  width: 80%;
  margin: 0 auto 4vw auto;
  max-width: 1200px;
  aspect-ratio: 2.4;
  background-color: rgba(217, 217, 217, 1);
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-size: 1.3vw;
    color: rgba(0, 0, 0, 1);
  }
`;

export default function HotelInfoImage({ imagePath }: { imagePath?: string }) {
  return (
    <Wrapper>
      {imagePath ? (
        <img src={imagePath} alt="temp" />
      ) : (
        <span>리조트 안내 이미지 들어가는 곳</span>
      )}
    </Wrapper>
  );
}
