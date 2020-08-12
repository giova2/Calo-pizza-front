import { createGlobalStyle } from "styled-components";

const PanPizza = "../assets/fonts/panpizza.woff";

export default createGlobalStyle`
    @font-face {
        font-family: 'Pan pizza';
        src: local('Pan pizza'), local('panpizza'),
        url(${PanPizza}) format('woff');
        font-weight: 300;
        font-style: normal;
    }
`;
