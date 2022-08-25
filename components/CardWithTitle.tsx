import { NextComponentType } from 'next'

import { Box, Paper, styled, Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

interface CardProps {
  title: string
}

const CardWithTitle: FC<PropsWithChildren<CardProps>> = (props) => {
  const {title, children } = props
  return (
    <StyledPaper elevation={10} sx={{ overflow: 'hidden', width: '50vw', maxHeight: '90%', borderRadius: '20px', boxShadow: '2px 2px 20px white' }}>
      <Box sx={{ height: '100%', padding: '28px' }}>
        <Typography variant='h4' sx={{ marginBottom: '20px', fontWeight: 'bold', color: 'rgb(26, 34, 56)'}}>
          {title}
        </Typography>
        <Box sx={{height: '100%', display: 'flex', flexDirection: 'column'}}>
          {children}
        </Box>
      </Box>
    </StyledPaper>
  )
}

const StyledPaper = styled(Paper)(({theme}) => ({
  [theme.breakpoints.up('xs')]: {
    width: '95vw'
  },
  [theme.breakpoints.up('xl')]: {
    width: '50vw',
  }
}))

export { CardWithTitle }