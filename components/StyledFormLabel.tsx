import { FormLabel, styled } from '@mui/material'

export const StyledFormLabel = styled(FormLabel)(({ theme }) => ({
  color: 'var(--dark-color)',
  fontWeight: 'bold',
  paddingLeft: '8px',
  '&.Mui-focused': {
    color: 'var(--dark-color)'
  }
}))