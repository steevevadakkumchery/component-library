import React, { useState } from "react";
import styled from "styled-components";
import creditCardBackground from "./assets/credit-card-background.png";
import _ from "lodash";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  margin: 10em;
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: auto;
  padding: 9em 2em 2em;
  border-radius: 0.5em;
  background-color: #fff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const HorizontalAlign = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Label = styled.label`
  align-self: flex-start;
  font-size: 1rem;
  margin-bottom: 0.5em;
  font-weight: bold;
`;

const Input = styled.input`
  display: flex;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 0.3em;
  margin-bottom: 2em;
  font-size: 1rem;

  :focus {
    box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const SelectInput = styled.select`
  display: flex;
  padding: 1em;
  border: 1px solid #ddd;
  border-radius: 0.5em;
  margin-bottom: 2em;
  height: 3.25em;
  width: 14em;
  background-color: #fff;
  font-size: 1rem;

  :focus {
    box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2),
      0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
`;

const ExpirationSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 70%;
`;

const InputGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const CVVSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 27%;
`;

const SubmitButton = styled.button`
  height: 3.5em;
  background-color: rgb(29, 161, 242);
  color: #fff;
  font-size: 1rem;
  border-radius: 0.5em;
`;

const CreditCardForm = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpMonth, setCardExpMonth] = useState("");
  const [cardExpYear, setCardExpYear] = useState("");
  const [cardCVVCode, setCardCVVCode] = useState("");
  const [front, setFront] = useState(true);

  return (
    <Card>
      <CreditCardViewer
        cardNumber={cardNumber}
        cardName={cardName}
        cardExpMonth={cardExpMonth}
        cardExpYear={cardExpYear}
        cardCVVCode={cardCVVCode}
        front={front}
      />
      <Form>
        <Label htmlFor="card-number">Card Number </Label>
        <Input
          id="card-number"
          onChange={e => {
            let tempCardNumber = e.currentTarget.value;
            tempCardNumber = tempCardNumber.split(" ").join("");
            if (tempCardNumber.length > 0) {
              tempCardNumber = tempCardNumber
                .match(new RegExp(".{1,4}", "g"))
                .join(" ");
            }
            setCardNumber(tempCardNumber);
          }}
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          maxLength={19}
          onFocus={() => {
            setFront(true);
          }}
        />

        <Label htmlFor="card-name">Card Name</Label>
        <Input
          id="card-name"
          placeholder="S G Vadakkumchery"
          onChange={e => setCardName(e.currentTarget.value)}
          value={cardName}
          onFocus={() => {
            setFront(true);
          }}
        />

        <HorizontalAlign>
          <ExpirationSection>
            <Label htmlFor="card-expiration-month">Expiration Date</Label>
            <InputGroup>
              <SelectInput
                id="card-expiration-month"
                value={cardExpMonth}
                onChange={e => {
                  setCardExpMonth(e.currentTarget.value);
                }}
                onFocus={() => {
                  setFront(true);
                }}
              >
                <option>Month</option>
                {Array(12)
                  .fill(null)
                  .map((value, index) => (
                    <option
                      key={index}
                      value={_.padStart([index + 1], [2], [0])}
                    >
                      {_.padStart([index + 1], [2], [0])}
                    </option>
                  ))}
              </SelectInput>
              <SelectInput
                id="card-expiration-year"
                value={cardExpYear}
                onChange={e => {
                  setCardExpYear(e.currentTarget.value);
                }}
                onFocus={() => {
                  setFront(true);
                }}
              >
                <option value="0000">Year</option>
                {Array(100)
                  .fill(null)
                  .map((value, index) => (
                    <option key={index} value={1920 + index}>
                      {1920 + index}
                    </option>
                  ))}
              </SelectInput>
            </InputGroup>
          </ExpirationSection>
          <CVVSection>
            <Label htmlFor="card-cvv-code">CVV</Label>
            <Input
              id="card-cvv-code"
              value={cardCVVCode}
              onChange={e => setCardCVVCode(e.currentTarget.value)}
              onFocus={() => {
                setFront(false);
              }}
              maxLength={3}
            />
          </CVVSection>
        </HorizontalAlign>
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </Card>
  );
};

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
  font-size: 1em;
  font-weight: bold;
  color: #fff;

  transition: transform 400ms linear;
  transition-delay: ${props => (props.show ? "400ms" : "0")};
  transform: ${props => (props.show ? "rotateY(0deg)" : "rotateY(90deg)")};
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${creditCardBackground});

  background-size: cover;
`;

const CreditCardFront = styled(CreditCard)``;

const CreditCardBack = styled(CreditCard)``;

const CreditCardNumberContainer = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  height: 100%;
  width: 100%;
`;

const CreditCardNameAndExpiryContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: 100%;
  width: 20em;
  margin: 0.5em;
`;

const CreditCardNumber = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;

  margin: 2em;
  width: 100%;
  height: 2em;
`;

const CreditCardName = styled.div`
  position: relative;
  bottom: 0;
`;

const CreditCardExpiry = styled.div``;

const CreditCardCVV = styled.div`
  position: absolute;
  bottom: 1em;
  right: 1em;
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
          <CreditCardNumber>
            {_.padEnd([cardNumber], [19], ["#"])}
          </CreditCardNumber>
        </CreditCardNumberContainer>

        <CreditCardNameAndExpiryContainer>
          <CreditCardName>{cardName ? cardName : "##########"}</CreditCardName>
          <CreditCardExpiry>
            {_.padEnd([cardExpMonth], [2], ["#"])}
            {"/"}
            {_.padEnd([cardExpYear], [4], ["#"])}
          </CreditCardExpiry>
        </CreditCardNameAndExpiryContainer>
      </CreditCardFront>
      <CreditCardBack show={!front}>
        <CreditCardCVV>{_.padEnd([cardCVVCode], [3], ["#"])}</CreditCardCVV>
      </CreditCardBack>
    </>
  );
};

export default CreditCardForm;
