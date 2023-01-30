import { GlobalStyles } from './styles/GlobalStyles';
import  {Header}  from './Components/Header';
import { Orders } from './Components/Orders';


export function App(){
  return (
    <>
      <GlobalStyles />
      <Header />
      <Orders />
    </>
  );
}


