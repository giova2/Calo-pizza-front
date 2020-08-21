import React from "react";
import {
  LoadingContainer,
  LoadingText,
  LoadingImg,
} from "../styledComponents/Loading";

type propsLoading = {
  customHeight?: string;
  display?: boolean;
};

const Loading = ({ customHeight, display }: propsLoading) => {
  return (
    <LoadingContainer customHeight={customHeight} display={display}>
      <LoadingImg></LoadingImg>
      <LoadingText></LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
