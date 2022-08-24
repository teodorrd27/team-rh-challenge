import { alpha, Box, CircularProgress, Select, SelectProps, styled } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

interface StyledSelectProps extends SelectProps {
  loading?: boolean
}

export const StyledSelect: FC<PropsWithChildren<StyledSelectProps>> = ({ children, loading, ...props}) => {

  return (
    <Box sx={{ position: 'relative'}}>
    <StyledComponent {...props}>
      {children}
    </StyledComponent>
    { loading &&
    <Box sx={{ position: 'absolute', marginTop: '3px', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', top: '0px' }}>
      <CircularProgress color='inherit' size='20px' sx={{ position: 'relative' }} />
    </Box>
    }
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
    backgroundColor: alpha('#A59B91', 0.2),
    'fieldset': {
      borderWidth: '0px'
    }
  }
}))