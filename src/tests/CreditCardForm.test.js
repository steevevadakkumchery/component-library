import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act, Simulate } from 'react-dom/test-utils';
import CreditCardForm from '../components/CreditCardForm';

let container = null;
beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it('Loads CreditCardForm without crashing', () => {
  act(() => {
    render(<CreditCardForm />, container);
  });

  // This test checks that the card has been loaded without it crashing
  expect(container.querySelectorAll('[data-testId="main-card"]').length).toBe(
    1
  );
});

it('test for all default input values', () => {
  act(() => {
    render(<CreditCardForm />, container);
  });

  expect(
    container.querySelector('[data-testid="card-number-input"]').value
  ).toBe('');

  expect(container.querySelector('[data-testid="card-name-input"]').value).toBe(
    ''
  );

  expect(
    container.querySelector('[data-testid="card-month-input"]').value
  ).toBe('00');

  expect(container.querySelector('[data-testid="card-year-input"]').value).toBe(
    '0000'
  );

  expect(container.querySelector('[data-testid="card-cvv-input"]').value).toBe(
    ''
  );
});

it('tests for with all valid input values', () => {
  let cardNumber = '1234567890123456';
  let cardName = 'd t  doe';
  let cardMonth = '02';
  let cardYear = '1995';
  let cardCVV = '123';

  act(() => {
    render(<CreditCardForm />, container);
  });

  const cardNumberInput = container.querySelector(
    '[data-testid="card-number-input"]'
  );

  const cardNameInput = container.querySelector(
    '[data-testid="card-name-input"]'
  );

  const cardMonthInput = container.querySelector(
    '[data-testid="card-month-input"]'
  );

  const cardYearInput = container.querySelector(
    '[data-testid="card-year-input"]'
  );

  const cardCVVInput = container.querySelector(
    '[data-testid="card-cvv-input"]'
  );

  act(() => {
    cardNumberInput.value = cardNumber;
    Simulate.change(cardNumberInput);

    cardNameInput.value = cardName;
    Simulate.change(cardNameInput);

    cardMonthInput.value = cardMonth;
    Simulate.change(cardMonthInput);

    cardYearInput.value = cardYear;
    Simulate.change(cardYearInput);

    cardCVVInput.value = cardCVV;
    Simulate.change(cardCVVInput);
  });

  expect(
    container.querySelector('[data-testid="card-number-input"]').value
  ).toBe('1234 5678 9012 3456');

  expect(container.querySelector('[data-testid="card-name-input"]').value).toBe(
    'D T  DOE'
  );

  expect(
    container.querySelector('[data-testid="card-month-input"]').value
  ).toBe('02');

  expect(container.querySelector('[data-testid="card-year-input"]').value).toBe(
    '1995'
  );

  expect(container.querySelector('[data-testid="card-cvv-input"]').value).toBe(
    '123'
  );
});

it('tests for with all invalid input types', () => {
  let cardNumber = 'AAAAAAAAAAAAAAAA';
  let cardName = '123234';
  let cardMonth = 'as';
  let cardYear = 'asdf';
  let cardCVV = 'asdf';

  act(() => {
    render(<CreditCardForm />, container);
  });

  const cardNumberInput = container.querySelector(
    '[data-testid="card-number-input"]'
  );

  const cardNameInput = container.querySelector(
    '[data-testid="card-name-input"]'
  );

  const cardMonthInput = container.querySelector(
    '[data-testid="card-month-input"]'
  );

  const cardYearInput = container.querySelector(
    '[data-testid="card-year-input"]'
  );

  const cardCVVInput = container.querySelector(
    '[data-testid="card-cvv-input"]'
  );

  act(() => {
    cardNumberInput.value = cardNumber;
    Simulate.change(cardNumberInput);

    cardNameInput.value = cardName;
    Simulate.change(cardNameInput);

    cardMonthInput.value = cardMonth;
    Simulate.change(cardMonthInput);

    cardYearInput.value = cardYear;
    Simulate.change(cardYearInput);

    cardCVVInput.value = cardCVV;
    Simulate.change(cardCVVInput);
  });

  expect(
    container.querySelector('[data-testid="card-number-input"]').value
  ).toBe('');

  expect(container.querySelector('[data-testid="card-name-input"]').value).toBe(
    ''
  );

  expect(
    container.querySelector('[data-testid="card-month-input"]').value
  ).toBe('00');

  expect(container.querySelector('[data-testid="card-year-input"]').value).toBe(
    '0000'
  );

  expect(container.querySelector('[data-testid="card-cvv-input"]').value).toBe(
    ''
  );
});

it('tests for with all invalid input length', () => {
  let cardNumber = '12341234123412341234123412341234';
  let cardName = 'abcdefghijklmnopqrstuvyxyzabcdefghijklmnopqrstuvyxyz';
  let cardMonth = '123';
  let cardYear = '123456';
  let cardCVV = '13243243';

  act(() => {
    render(<CreditCardForm />, container);
  });

  const cardNumberInput = container.querySelector(
    '[data-testid="card-number-input"]'
  );

  const cardNameInput = container.querySelector(
    '[data-testid="card-name-input"]'
  );

  const cardMonthInput = container.querySelector(
    '[data-testid="card-month-input"]'
  );

  const cardYearInput = container.querySelector(
    '[data-testid="card-year-input"]'
  );

  const cardCVVInput = container.querySelector(
    '[data-testid="card-cvv-input"]'
  );

  act(() => {
    cardNumberInput.value = cardNumber;
    Simulate.change(cardNumberInput);

    cardNameInput.value = cardName;
    Simulate.change(cardNameInput);

    cardMonthInput.value = cardMonth;
    Simulate.change(cardMonthInput);

    cardYearInput.value = cardYear;
    Simulate.change(cardYearInput);

    cardCVVInput.value = cardCVV;
    Simulate.change(cardCVVInput);
  });

  expect(
    container.querySelector('[data-testid="card-number-input"]').value
  ).toBe('1234 1234 1234 1234');

  expect(
    container.querySelector('[data-testid="card-name-input"]').value.length
  ).toBe(29);

  expect(
    container.querySelector('[data-testid="card-month-input"]').value
  ).toBe('00');

  expect(container.querySelector('[data-testid="card-year-input"]').value).toBe(
    '0000'
  );

  expect(container.querySelector('[data-testid="card-cvv-input"]').value).toBe(
    '1324'
  );
});
