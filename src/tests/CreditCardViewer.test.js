import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import CreditCardViewer from '../components/CreditCardViewer';

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

it('renders without crashing', () => {
  act(() => {
    render(<CreditCardViewer />, container);
  });

  expect(container.querySelectorAll('[data-testid="card-front"]').length).toBe(
    1
  );

  expect(container.querySelectorAll('[data-testid="card-back"]').length).toBe(
    1
  );
});

it('displays card details from props accordingly', () => {
  const props = {
    cardNumber: '1234123412341234',
    cardName: 'j t doe',
    cardExpMonth: '01',
    cardExpYear: '2019',
    cardCVVCode: '479',
    front: true,
  };

  act(() => {
    render(<CreditCardViewer {...props} />, container);
  });

  expect(
    container.querySelector('[data-testid="card-viewer-number"]').textContent
  ).toContain('1234 1234 1234 1234');

  expect(
    container.querySelector('[data-testid="card-viewer-name"]').textContent
  ).toContain('j t doe');

  expect(
    container.querySelector('[data-testid="card-viewer-expiry"]').textContent
  ).toContain('01/2019');

  expect(
    container.querySelector('[data-testid="card-viewer-cvv"]').textContent
  ).toContain('479');
});

it('displays placeholder hashes depending on prop input', () => {
  const props = {
    cardNumber: '123412',
    cardName: '',
    cardExpMonth: '1',
    cardExpYear: '1',
    cardCVVCode: '7',
    front: true,
  };

  act(() => {
    render(<CreditCardViewer {...props} />, container);
  });

  expect(
    container.querySelector('[data-testid="card-viewer-number"]').textContent
  ).toContain('1234 12## #### ####');

  expect(
    container.querySelector('[data-testid="card-viewer-name"]').textContent
  ).toContain('Card HolderFULL NAME');

  expect(
    container.querySelector('[data-testid="card-viewer-expiry"]').textContent
  ).toContain('Expiry1#/1###');

  expect(
    container.querySelector('[data-testid="card-viewer-cvv"]').textContent
  ).toContain('7##');
});
