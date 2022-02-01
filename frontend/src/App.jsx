import { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoListItems from './components/TodoListItems';
import TodosList from './components/TodosList';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/globalStyles';
import { darkTheme, lightTheme } from './components/Theme';
import Switch from '@mui/material/Switch';

function App() {
   const [theme, setTheme] = useState('light');

   function themeToggler() {
      theme === 'light' ? setTheme('dark') : setTheme('light');
   }

   return (
      <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
         <>
            <GlobalStyles />
            <Switch onClick={themeToggler} color="warning" />
            <span> {theme === 'light' ? '🌞' : '🌛'} </span>
            <header>
               <Header />
            </header>
            <TodosList />
            <TodoListItems />
         </>
      </ThemeProvider>
   );
}

export default App;
