import { render } from '@testing-library/react'
import '@testing-library/jest-dom';

import Home, { getServerSideProps } from '../../pages/index'

// global.fetch = jest.fn(() => {
//   Promise.resolve({
//     json: () => Promise.resolve({
//       count: 2,
//       next: null,
//       previous: null,
//       results: [
//         {
//           id: 3,
//           imageUrl: 'fakeURL',
//           name: 'fakeName',
//           name_en: 'fakeNameEn',
//         }
//       ]
//     })
//   })
// })

describe('Home Screen', () => {
  let expectedProps

  beforeEach(() => {
    // global.fetch.mockClear()
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

  // test('should correctly map server side props', async () => {
  //   const props = await getServerSideProps()
  //   console.log('props are ', props)
  // })

})