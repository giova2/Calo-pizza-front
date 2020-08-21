import React from "react";
import {
  LoadingContainer,
  LoadingText,
  LoadingImg,
} from "../styledComponents/Loading";

type propsLoading = {
  customHeight?: string;
  show: boolean;
};

const Loading = ({ customHeight, show }: propsLoading) => {
  return (
    <LoadingContainer customHeight={customHeight} show={show}>
      <LoadingImg></LoadingImg>
      <LoadingText></LoadingText>
    </LoadingContainer>
  );
};

export default Loading;
