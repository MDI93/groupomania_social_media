import IndexRoutes from './components/Routes/index'
import styled from 'styled-components';
import { useState } from 'react';
// import { useDispatch } from 'react-redux';

const App = () => {
  // const dispatch = useDispatch()
  return (
    <StyledBody>
      <IndexRoutes />
    </StyledBody>
  );
}

export default App;

const StyledBody = styled.div`
  font-family: 'Lato', sans serif;
`
