import styled from 'styled-components'

export const StyledProducts = styled.main`
  align-items: center;

  ul {
    display: grid;
    gap: 1rem;
    grid-template-columns: minmax(500px, 1fr);
  }

  li {
    align-items: center;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    padding: 1rem;
  }

  img {
    width: 250px;
    aspect-ratio: 16/9;
    display: block;
    object-fit: contain;
    background: #fff;
  }
`

export const ProductInfo = styled.div`
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p {
    font-size: 1.4rem;
    font-weight: 300;
    display: block;
    left: 0;
    margin: 0;
  }

  strong {
    font-weight: 400;
    font-size: 1.4rem;
  }
`

export const ProductFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
`

export const ProductPrice = styled.p`
  margin-bottom: 0;
  font-weight: 400;
  font-size: 1.1rem;
  color: lch(35% 0 0);
`
