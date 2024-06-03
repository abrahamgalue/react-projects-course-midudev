import styled from 'styled-components'

export const Page = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

export const Header = styled.header`
  text-align: center;
`

export const Title = styled.h1`
  user-select: none;
`

export const Form = styled.form`
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
`

export const Content = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
`

export const ErrorMessage = styled.p`
  color: crimson;
  font-weight: 600;
`
