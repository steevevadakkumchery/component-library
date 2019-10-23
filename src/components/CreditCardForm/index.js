import React, { useState } from "react";
import styled from "styled-components";
import _ from "lodash";
import CreditCardViewer from "./CreditCardViewer";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  position: relative;
  margin: 10em;
  box-shadow: 0 10px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  height: auto;
  padding: 13em 2em 2em;
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
        cardNumber={cardNumber.split(" ").join("")}
        cardName={cardName.trim()}
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
            let newCardNumber = e.currentTarget.value.split(" ").join("");

            if (!newCardNumber.match(new RegExp(/\D/))) {
              if (newCardNumber.length > 0) {
                newCardNumber = newCardNumber
                  .match(new RegExp(".{1,4}", "g"))
                  .join(" ");
              }
              setCardNumber(newCardNumber);
            }
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
          placeholder="Card holder name"
          onChange={e => {
            const cardName = e.currentTarget.value;
            if (cardName.match(new RegExp(/^([^0-9]*)$/))) {
              setCardName(cardName.toUpperCase());
            }
          }}
          value={cardName}
          maxLength={29}
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
              onChange={e => {
                let cvv = e.currentTarget.value;
                if (!cvv.match(new RegExp(/\D/))) {
                  setCardCVVCode(cvv);
                }
              }}
              onFocus={() => {
                setFront(false);
              }}
              maxLength={4}
            />
          </CVVSection>
        </HorizontalAlign>
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </Card>
  );
};

export default CreditCardForm;
