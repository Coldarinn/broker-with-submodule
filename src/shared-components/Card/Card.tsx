import styled from "@emotion/styled";
import { formatPrice } from "@/modules/utils/formatPrice.ts";
import { Button } from "~/Button";
import { Carousel as CarouselComponent } from "~/Carousel";

type Card = {
  images: string[];
  title: string;
  location: {
    developer: string;
    houseName: string;
    housing: string;
    floor: string;
  };
  info: {
    square: number;
    finishing: string;
    deadline: string;
  };
  price: number;
};

type Props = {
  data: Card;
};

export const Card = ({ data }: Props) => {
  const location = Object.values(data.location);

  return (
    <Wrapper>
      <Carousel images={data.images} />

      <Title>{data.title}</Title>

      <Location>
        {location.map((item, index) => (
          <LocationItemWrapper key={index}>
            <LocationItem>{item}</LocationItem>
            {index !== location.length - 1 && <RoundSeparator />}
          </LocationItemWrapper>
        ))}
      </Location>

      <Info>
        <InfoItem>
          <InfoTitle>Площадь</InfoTitle>

          <InfoContent>
            {data.info.square} м<sup>2</sup>
          </InfoContent>
        </InfoItem>

        <RectangularSeparator />

        <InfoItem>
          <InfoTitle>Отделка</InfoTitle>

          <InfoContent>{data.info.finishing}</InfoContent>
        </InfoItem>

        <RectangularSeparator />

        <InfoItem>
          <InfoTitle>Срок сдачи</InfoTitle>

          <InfoContent>{data.info.deadline}</InfoContent>
        </InfoItem>
      </Info>

      <Price>
        <MainPrice>{formatPrice(data.price)} ₽</MainPrice>

        <PricePerSquareMeter>
          {formatPrice(Math.round(data.price / data.info.square))} ₽/м
          <sup>2</sup>
        </PricePerSquareMeter>
      </Price>

      <Actions>
        <Button size="S">ЗАБРОНИРОВАТЬ</Button>

        <Button size="S" color="secondary">
          В КОРЗИНУ
        </Button>
      </Actions>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  border-radius: 24px;
  padding: 16px;
  width: 354px;
  background: rgba(31, 31, 31, 1);

  &:hover::before {
    content: "";
    position: absolute;
    top: -1px;
    bottom: -1px;
    left: -1px;
    right: -1px;
    background: radial-gradient(
      349.52% 1112.54% at -5.84% 106.58%,
      #ac400f 0%,
      #dd7921 100%
    );

    border-radius: 24px;
    z-index: -1;
  }
`;
const Carousel = styled(CarouselComponent)`
  margin-bottom: 16px;
`;
const Title = styled.div`
  font-size: 18px;
  line-height: 27px;
  color: rgba(255, 255, 255, 1);
  margin-bottom: 4px;
`;
const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
`;
const LocationItemWrapper = styled.div``;
const LocationItem = styled.span`
  font-size: 14px;
  line-height: 20px;
  color: rgba(149, 149, 150, 1);
`;
const RoundSeparator = styled.span`
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: rgba(65, 65, 65, 1);
`;
const RectangularSeparator = styled.span`
  width: 0;
  border: 1px solid rgba(65, 65, 65, 1);
  height: 24px;
`;
const Info = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 16px;
`;
const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const InfoTitle = styled.span`
  font-size: 17px;
  line-height: 24px;
  color: rgba(149, 149, 150, 1);
`;
const InfoContent = styled.span`
  font-size: 17px;
  color: rgba(255, 255, 255, 1);
`;
const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 16px;
`;
const MainPrice = styled.span`
  font-size: 24px;
  line-height: 36px;
  color: rgba(255, 255, 255, 1);
`;
const PricePerSquareMeter = styled.span`
  font-size: 14px;
  color: rgba(149, 149, 150, 1);
`;
const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    width: 50%;
  }
`;
