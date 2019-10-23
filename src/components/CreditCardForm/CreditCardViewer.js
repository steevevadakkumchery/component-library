import React from "react";
import styled from "styled-components";
import creditCardBackground from "./assets/credit-card-background.png";
import cardChip from "./assets/card-chip.png";
import _ from "lodash";

const CreditCard = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  position: absolute;
  top: -6em;
  height: 13em;
  width: 22em;
  border-radius: 0.5em;
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  font-size: 1.2rem;
  font-weight: bold;
  font-family: "Share Tech Mono", monospace;
  color: #fff;

  transition: transform 400ms linear;
  transition-delay: ${props => (props.show ? "400ms" : "0")};

  transform-style: preserve-3d;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${creditCardBackground});

  background-size: cover;
`;

const CreditCardFront = styled(CreditCard)`
  transform: ${props =>
    props.show
      ? "perspective(1000px) rotateY(0deg)"
      : "perspective(1000px) rotateY(90deg)"};
`;

const CreditCardBack = styled(CreditCard)`
  transform: ${props =>
    props.show
      ? "perspective(1000px) rotateY(0deg)"
      : "perspective(1000px) rotateY(-90deg)"};

  align-items: flex-start;
`;

const CreditCardNumberContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  height: 23em;
  width: 100%;
`;

const CardChipImg = styled.img`
  height: 2.5em;
  margin-left: 2em;
  margin-top: 2em;
`;

const CreditCardNumber = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-end;
  font-size: 1.5em;

  width: 100%;
  height: 2em;
`;

const CreditCardNameAndExpiryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  align-items: flex-end;
  height: 100%;
  width: 20em;
  margin: 1em 0.5em;
`;

const CreditCardName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  width: 100%;
`;

const CreditCardExpiry = styled.div``;

const CreditCardCVV = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;

  background-color: white;
  margin-top: 1em;
  padding: 0.5em;
  height: 1em;
  width: 17em;
  color: #000;
`;

const CardLabel = styled.div`
  display: flex;
  font-family: "Arial";
  font-size: 0.7rem;
  margin-bottom: 0.1em;
`;

const CardStrip = styled.div`
  background-color: #000;
  width: 100%;
  height: 2.5em;
  margin-top: 1.5em;
`;

const CreditCardViewer = ({
  cardNumber,
  cardName,
  cardExpMonth,
  cardExpYear,
  cardCVVCode,
  front
}) => {
  return (
    <>
      <CreditCardFront show={front}>
        <CreditCardNumberContainer>
          <CardChipImg src={cardChip} />
          <CreditCardNumber>
            {_.padEnd([cardNumber.slice(0, 4)], [4], ["#"])}{" "}
            {_.padEnd([cardNumber.slice(4, 8)], [4], ["#"])}{" "}
            {_.padEnd([cardNumber.slice(8, 12)], [4], ["#"])}{" "}
            {_.padEnd([cardNumber.slice(12, 16)], [4], ["#"])}
          </CreditCardNumber>
        </CreditCardNumberContainer>

        <CreditCardNameAndExpiryContainer>
          <CreditCardName>
            <CardLabel>Card Holder</CardLabel>
            {cardName ? cardName : "FULL NAME"}
          </CreditCardName>
          <CreditCardExpiry>
            <CardLabel>Expiry</CardLabel>

            {_.padEnd([cardExpMonth], [2], ["#"])}
            {"/"}
            {_.padEnd([cardExpYear], [4], ["#"])}
          </CreditCardExpiry>
        </CreditCardNameAndExpiryContainer>
      </CreditCardFront>
      <CreditCardBack show={!front}>
        <CardStrip />
        <CreditCardCVV>{_.padEnd([cardCVVCode], [3], ["#"])}</CreditCardCVV>
      </CreditCardBack>
    </>
  );
};

export default CreditCardViewer;
