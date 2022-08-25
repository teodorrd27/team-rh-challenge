import { render, getByText, fireEvent, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom';

import Home, { getServerSideProps } from '../../pages/index'
import { act } from 'react-dom/test-utils'
import { inspect } from 'util'

describe('Home Screen', () => {
  let expectedProps
  beforeAll(() => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve({
          count: 2,
          next: null,
          previous: null,
          results: [
            {
              id: 3,
              muscles: [1,2,3],
              name: 'Fake Exercise name',
              muscles_secondary: [],
              description: 'Fake Exercise description'
            }
          ]
        })
      })
    })
  })

  beforeEach(() => {
    expectedProps = {
      muscles: [
        {
          id: 3,
          imageUrl: 'fakeURL',
          name: 'fakeName',
          name_en: 'fakeNameEn'
        }
      ]
    }
  })

  test('should initialise with no muscle groups', () => {
    const { getByText } = render(<Home {...expectedProps} />)
    const absentTable = getByText('No muscle group selected')
    expect(absentTable).toBeVisible()
  })

  test('should allow user to select muscle group, display guidance, allow user to select row, and display description of row', async () => {
    await act(async () => render(<Home {...expectedProps} />))
    const wrapperNode = screen.getByLabelText('Muscle Group')
    fireEvent.mouseDown(wrapperNode)
    const option = screen.getByText('fakeNameEn')
    await act(async() => fireEvent.click(option))
    const userGuidance = screen.getByText("Click through rows to explore an exercise's description")
    expect(userGuidance).toBeVisible()
    
    const row = screen.getByText('Fake Exercise name')
    expect(row).toBeVisible()

    fireEvent.click(row)
    const description = screen.getByText('Fake Exercise description')
    expect(description).toBeVisible()
  })
})

describe('Home getServerSideProps', () => {
  beforeAll(() => {
    global.fetch = jest.fn(() => {
      return Promise.resolve({
        json: () => Promise.resolve({
          count: 2,
          next: null,
          previous: null,
          results: [
            {
              id: 3,
              image_url_main: 'fakeURL',
              name: 'fakeName',
              name_en: 'fakeNameEn',
            }
          ]
        })
      })
    })
  })

  test('should correctly map server side props', async () => {
    const props = await getServerSideProps()

    expect(props.props).toBeDefined()
    expect(props.props.muscles).toBeDefined()
    expect(props.props.muscles?.[0]).toBeDefined()

    const firstMuscle = props.props.muscles[0]

    expect(firstMuscle.id).toEqual(3)
    expect(firstMuscle.imageUrl).toEqual('fakeURL')
    expect(firstMuscle.name).toEqual('fakeName')
    expect(firstMuscle.name_en).toEqual('fakeNameEn')
  })
})