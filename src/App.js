import React from "react";
import CreditCardForm from "./components/CreditCardForm";
import styled from "styled-components";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #ddd;
  min-height: 100vh;
`;

const AppHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  padding: 2em;
  color: #444;
`;

function App() {
  return (
    <AppContainer>
      <AppHeader>Components Library</AppHeader>
      <CreditCardForm />
    </AppContainer>
  );
}

export default App;
