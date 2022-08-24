import { render } from '@testing-library/react'
import '@testing-library/jest-dom';

import { StyledSelect } from '../../components/StyledSelect'
import { MenuItem } from '@mui/material'

describe('StyledSelect', () => {
  let expectedProps
  let onchangetarget = 3
  let menuItemChildren = 'Fake menu item'
  let menuItemValue = 3
  let menuItem = <MenuItem key='dummy-menu-item' value={menuItemValue}>{menuItemChildren}</MenuItem>

  beforeEach(() => {
    expectedProps = {
      renderValue: (value) => value,
      displayEmpty: true,
      labelId: 'fakeLabelId',
      value: menuItemValue ?? '',
      onChange: () => {onchangetarget = 2},
      children: menuItem
    }
  })

  test('should render menu item value', () => {
    const { getByText } = render(<StyledSelect {...expectedProps} />)
    const value = getByText(expectedProps.value)
    expect(value).toBeVisible()
  })
})