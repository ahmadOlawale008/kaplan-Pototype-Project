import { Box, Button, Stack, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

export default function NotFoundPage() {
  return (
    <Stack spacing={3}  m={"30vh auto"} alignItems={'center'}  textAlign={"center"}>
      <Typography fontSize={80} fontWeight={700}>404 Error</Typography>
      <Typography fontSize={20} fontWeight={600}>Page not found</Typography>
      <Button endIcon={<ArrowForwardIosRoundedIcon sx={{fontSize: "1rem!important"}} />} href='/profile' size='large' variant='contained'>Go home</Button>
    </Stack>
  )
}
