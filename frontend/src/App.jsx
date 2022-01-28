import { useContext, useEffect } from 'react';
import Header from './components/Header';
import TodoListItems from './components/TodoListItems';
import TodosList from './components/TodosList';
import AuthContext from './context/Context';

function App() {
   const context = useContext(AuthContext);

   return (
      <div>
         <header>
            <Header />
         </header>
         <TodosList />
         <TodoListItems />
      </div>
   );
}

export default App;
