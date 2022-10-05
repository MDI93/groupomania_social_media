import IndexRoutes from './components/Routes/index'
import styled from 'styled-components';

const App = () => {
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
