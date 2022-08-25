import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'

import {
  Box,
  Collapse,
  IconButton,
  MenuItem,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material'
import React, { useState, useEffect, Fragment } from 'react'

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Exercise, ExerciseResponse, MuscleTypesResponse } from '../types/wger.type'
import { StyledSelect } from '../components/StyledSelect'
import { StyledFormLabel } from '../components/StyledFormLabel'
import { CardWithTitle } from '../components/CardWithTitle'


const baseUrl = 'https://wger.de'
const Home: NextPage<StaticProps> = ({ muscles }) => {
  const [expanded, setExpanded] = useState<string | false>(false)
  
  const [selectedMuscleGroupId, setSelectedMuscleGroupId] = useState<number | string>('')
  const [exercises, setExercises] = useState<Exercise[]>([])

  const handleRowExpansion = (panelName: string) => {
    setExpanded(panelName === expanded ? false : panelName)
  }

  const handleMuscleSelection = (event: SelectChangeEvent<unknown>) => {
    setSelectedMuscleGroupId(event.target.value as number)
  }

  useEffect(() => {
    if (selectedMuscleGroupId !== ''){
      fetch(`${baseUrl}/api/v2/exercise?muscles=${selectedMuscleGroupId}&language=2`)
        .then(res => res.json())
        .then((exerciseRes: ExerciseResponse) => {
          setExercises(exerciseRes.results)
          setExpanded(false)
        })
    }
  }, [selectedMuscleGroupId])

  return (
    <div>
      <Head>
        <title>Muscle Group Exercises</title>
        <meta name="description" content="Be intentional in your exercise" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box sx={{ height: '100vh', backgroundColor: 'rgb(26, 34, 56)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardWithTitle title='Exercises by muscle group'>
          <Box sx={{ marginY: '20px' }}>
            <StyledFormLabel id='muscle-select-label'>Muscle Group</StyledFormLabel>
            <StyledSelect
              renderValue={(value) => {
                const muscleId = value as number | ''
                if (muscles.length > 0) {
                  if (muscleId !== '') {
                    const targetMuscle = muscles.filter(muscle => muscle.id === muscleId)?.[0]
                    return targetMuscle
                      ? targetMuscle.name_en
                        ? targetMuscle.name_en
                        : targetMuscle.name
                      : 'No muscle groups available'
                  }
                  return 'Choose a muscle group to see available exercises'
                }
                return 'No muscle groups available'
              }}
              displayEmpty
              labelId='muscle-select-label'
              value={muscles.map(muscle => muscle.id).filter(id => id === selectedMuscleGroupId)?.[0] ?? ''}
              onChange={handleMuscleSelection}
            >
              <MenuItem key='dummy-muscle-group' disabled>Please choose a muscle group</MenuItem>
              {
                muscles.map(muscle => (
                  <MenuItem key={`${muscle.name}-muscle-group`} value={muscle.id}>{muscle.name_en ? muscle.name_en : muscle.name}</MenuItem>
                ))
              }
            </StyledSelect>
          </Box>
          { selectedMuscleGroupId ?
              <Box sx={{ height: '100%'}}>
                <Typography>Click through rows to explore an exercise&apos;s description</Typography>
                <TableContainer sx={{ overflow: 'auto', maxHeight: '50vh', marginY: '20px', border: '1px solid black' }} >
                  <Table style={{ overflow: 'auto', height: '100%'}} sx={{ overflow: 'auto', height: '100%'}} aria-label='exercise-table'>
                    <TableHead>
                      <TableRow key={'header-row'}>
                        <TableCell key={'empty-col'} />
                        <TableCell key={'exercise-col'} sx={{ fontWeight: 'bold'}}>Exercise</TableCell>
                        <TableCell key={'muscles-col'} sx={{ fontWeight: 'bold'}}>Other Muscle Groups Exercised</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {exercises.map(exercise => (
                        <Fragment key={`${exercise.uuid}-fragment`}>
                          <TableRow key={exercise.uuid} onClick={() => handleRowExpansion(exercise.name)}>
                            <TableCell key={`${exercise.uuid}-dropdown`}>
                              <IconButton aria-label='expand row' size='small'>
                                {expanded === exercise.name ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                              </IconButton>
                            </TableCell>
                            <TableCell key={`${exercise.uuid}-name`} component='th' scope='row'>{exercise.name}</TableCell>
                            <TableCell key={`${exercise.uuid}-muscles`}>{muscles.filter(muscle => [...exercise.muscles, ...exercise.muscles_secondary].includes(muscle.id) && muscle.id !== selectedMuscleGroupId).map(muscle => muscle.name_en ? muscle.name_en : muscle.name).join(', ')}</TableCell>
                          </TableRow>
                          <TableRow key={`${exercise.uuid}-description`}>
                            <TableCell key={`${exercise.uuid}-description-cell`} style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                              <Collapse in={expanded === exercise.name} timeout='auto' unmountOnExit>
                                <Box sx={{ margin: 1}}>
                                    <Typography fontWeight='bold'>Description</Typography>
                                    <div dangerouslySetInnerHTML={exercise.description !== '' ? { __html: exercise.description } : { __html: 'No description' } } />
                                </Box>
                              </Collapse>
                            </TableCell>
                          </TableRow>
                        </Fragment>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
              : <Typography>No muscle group selected</Typography>
          }
        </CardWithTitle>
      </Box>
    </div>
  )
}

interface StaticProps {
  muscles: Muscle[]
}

interface Muscle {
  id: number
  imageUrl: string
  name: string
  name_en: string
}

export const getServerSideProps: GetServerSideProps<StaticProps> = async (context) => {
  const data: MuscleTypesResponse = await fetch(`${baseUrl}/api/v2/muscle`, {
    headers: {
      'Accept': 'application/json',
    }
  }).then(res => res.json())

  const muscles: Muscle[] = data.results.map((item) => ({
    id: item.id,
    imageUrl: item.image_url_main,
    name: item.name,
    name_en: item.name_en
  }))
  
  return {
    props: {
      muscles
    }
  }
}

export default Home
