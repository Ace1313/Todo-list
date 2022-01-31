import styled from 'styled-components';

function Header() {
   return (
      <HeaderWrapper>
         <h1>My Todolist!</h1>
      </HeaderWrapper>
   );
}

const HeaderWrapper = styled.div`
   display: flex;
   justify-content: center;
   padding: 1rem;
   font-size: 28px;
`;

export default Header;
