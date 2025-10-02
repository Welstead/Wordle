import React from 'react'
import { Center, FocusTrap, Paper, PinInput, SimpleGrid, Stack, Text, Title } from '@mantine/core'


const Letter = ({letter, color}) => {

  return (
    <Paper style={{width: 60, height: 60, background: color}} shadow="md" withBorder >
        <Center h='100%'>
            <Title  order={1}>{letter?.toUpperCase()}</Title>
        </Center>
      </Paper>
  )
}

export default Letter