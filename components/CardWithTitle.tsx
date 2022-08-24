import { NextComponentType } from 'next'

import { Box, Paper, Typography } from '@mui/material'
import { FC, PropsWithChildren } from 'react'

interface CardProps {
  title: string
}

const CardWithTitle: FC<PropsWithChildren<CardProps>> = (props) => {
  const {title, children } = props
  return (
    <Paper elevation={10} sx={{ overflow: 'hidden', width: '50vw', maxHeight: '90%', borderRadius: '20px', boxShadow: '2px 2px 20px white' }}>
      <Box sx={{ padding: '28px' }}>
        <Typography variant='h4' sx={{ marginBottom: '20px', fontWeight: 'bold', color: 'rgb(26, 34, 56)'}}>
          {title}
        </Typography>
        <Box sx={{height: '100%' }}>
          {children}
        </Box>
      </Box>
    </Paper>
  )
}

export { CardWithTitle }