import styled from "styled-components";

export const SIntroPageWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 300px;
      margin-right: 50px;
    }
  }

  h1 {
    margin-bottom: 10px;
  }

  .text {
    text-align: left;

    p {
      font-size: 20px;
      font-weight: 1;
      text-align: left;
      margin-bottom: 40px;
    }
  }

  &[data-aos="fade-up"] {
    transition-property: transform, opacity;
    &.aos-animate {
      transform: translate(0, 0);
      opacity: 1;
    }
  }

  .empty {
    margin-top: 300px;
  }
`;
