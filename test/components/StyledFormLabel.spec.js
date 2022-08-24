import { render } from '@testing-library/react'
import '@testing-library/jest-dom';

import { StyledFormLabel } from '../../components/StyledFormLabel'

describe('StyledFormLabel', () => {
  let expectedProps

  beforeEach(() => {
    expectedProps = {
      children: 'Fake label'
    }
  })

  test('should render form label text', () => {
    const { getByText } = render(<StyledFormLabel {...expectedProps} />)
    const labelText = getByText(expectedProps.children)
    expect(labelText).toBeVisible()
  })
})