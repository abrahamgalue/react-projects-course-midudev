import styled from 'styled-components'

export const FilterSection = styled.section`
  align-items: center;
  display: flex;
  font-size: 14px;
  font-weight: 700;
  justify-content: space-between;
  user-select: none;

  @media (max-width: 615px) {
    justify-content: center;
    flex-wrap: wrap;
  }
`
export const Div = styled.div`
  align-items: center;
  display: flex;
  gap: 1rem;
`

export const Label = styled.label`
  margin-top: -4px;
`

export const Span = styled.span`
  color: lch(35% 0 0);
  font-size: 18px;
  font-weight: 500;
`

export const Select = styled.select`
  background-color: #fff;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 16px;
  font-weight: 500;
  padding: 0.5rem;
  text-transform: capitalize;
`

export const Option = styled.option`
  border: 0;
  font-size: 16px;
  font-weight: 500;
`
