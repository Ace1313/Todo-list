import { useContext } from 'react';

import AuthContext from './context/Context';

function App() {
   const context = useContext(AuthContext);
   return (
      <div>
         <h1>TodoList</h1>
         <button onClick={context.getTodoList}>Get todos</button>
      </div>
   );
}

export default App;
