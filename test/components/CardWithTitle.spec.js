import { render } from '@testing-library/react'
import '@testing-library/jest-dom';

import { CardWithTitle } from '../../components/CardWithTitle'

describe('CardWithTitle', () => {
  let expectedProps

  beforeEach(() => {
    expectedProps = {
      title: 'Mock Title',
    }
  })

  test('should render title', () => {
    const { getByText } = render(<CardWithTitle {...expectedProps} />)
    const title = getByText(expectedProps.title)
    expect(title).toBeVisible()
  })
})