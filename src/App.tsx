import React from 'react';
import { SignUpForm } from './components/SignUpForm';
import { Container } from './GlobalStyles';

export const App: React.FC = () => {
  return (
    <Container>
      <SignUpForm />
    </Container>
  );
};
