import { alpha, Box, Select, SelectProps, styled } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

export const StyledSelect: FC<PropsWithChildren<SelectProps>> = ({ children, ...props}) => {
  return (
    <Box sx={{ position: 'relative'}}>
    <StyledComponent {...props}>
      {children}
    </StyledComponent>
  </Box>
  )
}

const StyledComponent = styled(Select)(({
  marginTop: '6px',
  width: '100%',
  '&.Mui-focused': {
    color: 'var(--dark-color)',
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: 'var(--dark-color)'
    }
  },
  '&.Mui-disabled': {
    backgroundColor: alpha('#dddddd', 0.2),
    'fieldset': {
      borderWidth: '0px'
    }
  }
}))