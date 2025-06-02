import styled from "@emotion/styled";

const Title = ({ title }: { title: string }) => {
  return (
    <TitleBox fontSize="calc(var(--title-font-size) * 1.3)">{title}</TitleBox>
  );
};

export default Title;

const TitleBox = styled.div<{ fontSize: string }>`
  width: 320px;
  font-weight: bold;
  padding-top: 104px;
  margin-bottom: 30px;
  color: var(--title-color);
`;
