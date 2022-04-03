import { BrowserRouter, Switch } from 'react-router-dom';
import './App.css';
import { UserLoginTemplate } from './templates/HomeTemplate/UserLoginTemplate';
import Login from './pages/Login/Login';
import LoginCyberBugs from './pages/CyberBugs/LoginCyberBugs/LoginCyberBugs';

function App() {
  return (
    
    <BrowserRouter>
      <Switch>
        <UserLoginTemplate exact path="/login" Component={LoginCyberBugs}  />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
