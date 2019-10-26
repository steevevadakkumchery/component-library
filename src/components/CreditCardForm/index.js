import React, { useState } from 'react';
import styled from 'styled-components';
import _ from 'lodash';
import CreditCardViewer from '../CreditCardViewer';

const CARD_NUMBER_MAX_LENGTH = 19;
const CARD_NAME_MAX_LENGTH = 29;
const CCV_MAX_LENGTH = 4;

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
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpMonth, setCardExpMonth] = useState('');
  const [cardExpYear, setCardExpYear] = useState('');
  const [cardCVVCode, setCardCVVCode] = useState('');
  const [front, setFront] = useState(true);

  return (
    <Card data-testid="main-card">
      <CreditCardViewer
        cardNumber={cardNumber.split(' ').join('')}
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
          data-testid="card-number-input"
          onChange={e => {
            let newCardNumber = e.currentTarget.value.split(' ').join('');

            if (Number.isInteger(+newCardNumber)) {
              if (newCardNumber.length > 0) {
                newCardNumber = newCardNumber
                  .match(new RegExp('.{1,4}', 'g'))
                  .join(' ')
                  .slice(0, CARD_NUMBER_MAX_LENGTH);
              }
              setCardNumber(newCardNumber);
            }
          }}
          placeholder="1234 5678 9012 3456"
          value={cardNumber}
          maxLength={CARD_NUMBER_MAX_LENGTH}
          onFocus={() => {
            setFront(true);
          }}
        />

        <Label htmlFor="card-name">Card Name</Label>
        <Input
          id="card-name"
          data-testid="card-name-input"
          placeholder="Card holder name"
          onChange={e => {
            const cardNameInputValue = e.currentTarget.value;
            if (cardNameInputValue.match(new RegExp(/^([^0-9]*)$/))) {
              setCardName(
                cardNameInputValue.toUpperCase().slice(0, CARD_NAME_MAX_LENGTH)
              );
            }
          }}
          value={cardName}
          maxLength={CARD_NAME_MAX_LENGTH}
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
                data-testid="card-month-input"
                value={cardExpMonth}
                onChange={e => {
                  const cardMonthInputValue = e.currentTarget.value;
                  if (cardMonthInputValue.match(new RegExp(/^([0-9]{2})$/))) {
                    setCardExpMonth(cardMonthInputValue);
                  }
                }}
                onFocus={() => {
                  setFront(true);
                }}
              >
                <option value="00">Month</option>
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
                data-testid="card-year-input"
                value={cardExpYear}
                onChange={e => {
                  const cardYearInputValue = e.currentTarget.value;
                  if (cardYearInputValue.match(new RegExp(/^([0-9]{4})$/))) {
                    setCardExpYear(cardYearInputValue);
                  }
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
              data-testid="card-cvv-input"
              value={cardCVVCode}
              onChange={e => {
                let cvv = e.currentTarget.value;
                if (Number.isInteger(+cvv)) {
                  setCardCVVCode(cvv.slice(0, CCV_MAX_LENGTH));
                }
              }}
              onFocus={() => {
                setFront(false);
              }}
              maxLength={CCV_MAX_LENGTH}
            />
          </CVVSection>
        </HorizontalAlign>
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </Card>
  );
};

export default CreditCardForm;
