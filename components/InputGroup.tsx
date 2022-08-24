import { MenuItem } from '@mui/material'
import { Box } from '@mui/system'
import { FC } from 'react'
import { StyledFormLabel } from './StyledFormLabel'
import { StyledSelect } from './StyledSelect'

const InputGroup: FC = (props) => {
  return (
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
  )
}

export {InputGroup}