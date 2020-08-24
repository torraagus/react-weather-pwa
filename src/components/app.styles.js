import styled from "styled-components";
import { colors } from "../assets/styles/colors";

export const MainWrapper = styled.div`
  width: 100vw;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Weather = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 75%;
`;

export const Search = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  -webkit-box-shadow: 10px 10px 5px 0px #651a1b31;
  -moz-box-shadow: 10px 10px 5px 0px #651a1b2f;
  box-shadow: 5px 5px 5px 0px #651a1b27;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  text-indent: 1rem;
  font-size: 18px;
  letter-spacing: 1px;
  border: none;
  text-align: center;
  font-weight: 300;
  outline: none;

  :focus {
    border-bottom: 2px solid ${colors.secondary};
  }
`;

export const Location = styled.div`
  padding: 1rem;
`;

export const Name = styled.span`
  font-size: 36px;
  letter-spacing: 3px;
  font-weight: 300;
  color: ${colors.primary};
`;

export const Country = styled.sup`
  font-size: 16px;
  padding: 0.25rem;
  border-radius: 15px;
  font-weight: 500;
  color: ${colors.secondary};
`;

export const Celcius = styled(Country)`
  font-size: 36px;
`;

export const Temperature = styled.div`
  font-size: 120px;
  // k-bottom: 2rem;
  font-weight: 900;
`;

export const Description = styled.div`
  // border-top: 2px solid ${colors.primary};
  width: 100%;
  // padding-top: 2rem;
  text-align: center;
`;

export const Image = styled.img`
  background-color: ${colors.terciary};
  border: 1px solid ${colors.primary};
  border-radius: 15px;
  -webkit-box-shadow: 10px 10px 5px 0px #651a1b31;
  -moz-box-shadow: 10px 10px 5px 0px #651a1b2f;
  box-shadow: 5px 5px 5px 0px #651a1b27;
`;

export const Text = styled.p`
  text-align: center;
  letter-spacing: 3px;
  font-weight: 500;
  color: ${colors.secondary};
`;
