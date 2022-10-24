import IndexRoutes from './components/Routes/index'
import styled from 'styled-components';
import Footer from './components/Footer';
// import './App.css';

const App = () => {
  return (
    <StyledBody className='body'>
      <IndexRoutes />
      <Footer />
    </StyledBody>  
  );
}

export default App;

const StyledBody = styled.div`
  font-family: 'Lato', sans serif;
`
