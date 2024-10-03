import { styled } from "styled-components";

const Wrapper = styled.div<{ $imagePath: string }>`
  background-image: url(${({ $imagePath }) => $imagePath});
  background-size: cover;
  width: 100%;
  height: 100%;
  @media (max-width: 1000px) {
    background-image: none;
    background-color: white;
    border-bottom: 1px solid rgba(221, 221, 221, 1);
    display: flex;
    justify-content: space-between;
    padding: 20px 0;
  }
  .review__title {
    font-size: 1.5vw;
    @media (max-width: 1000px) {
      font-size: 15px;
      color: rgba(0, 0, 0, 1);
      font-weight: 500;
    }
  }
  .review__info__wrapper {
    display: none;
    @media (max-width: 1000px) {
      display: flex;
      flex-direction: column;
      letter-spacing: 0;
      margin-top: 10px;
      .review__info__desc {
        font-size: 12px;
        color: rgba(114, 114, 114, 1);
      }
      .review__info__username {
        margin-top: 10px;
        font-size: 12px;
        color: rgba(80, 80, 80, 1);
      }
    }
  }
  .review__image__wrapper {
    display: none;
    @media (max-width: 1000px) {
      overflow: hidden;
      flex: none;
      display: block;
      width: 145px;
      height: 126px;
      border-radius: 7px;
      margin-left: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;

interface ReviewCardProps {
  imagePath: string;
  username: string;
  description: string;
  title: string;
}

export default function ReviewCard({
  imagePath,
  username,
  description,
  title,
}: ReviewCardProps) {
  return (
    <Wrapper className="grid__item" $imagePath={imagePath}>
      <div>
        <span className="review__title">{title}</span>
        <div className="review__info__wrapper">
          <span className="review__info__desc">{description}</span>
          <span className="review__info__username">{username}</span>
        </div>
      </div>
      <div className="review__image__wrapper">
        <img src={imagePath} alt="temp" />
      </div>
    </Wrapper>
  );
}
