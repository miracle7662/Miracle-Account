import { faker } from '@faker-js/faker'

export type Person = {
  userId: string
  ItemName: string;
  lastName: string
  price: number
  visits: number
  progress: number
  status: string
  subRows?: Person[]
}

const range = (len: number) => {
  const arr: number[] = []
  for (let i = 0; i < len; i++) {
    arr.push(i)
  }
  return arr
}

const newPerson = (): Person => {
  return {
    userId: faker.string.uuid(),
    ItemName: faker.commerce.productName(), // ✅ Perfect for menu items

    lastName: faker.person.lastName(),
    price: faker.number.int(40),
    visits: faker.number.int(100),
    progress: faker.number.int(100),
    status: faker.helpers.shuffle<Person['status']>(['✅ Active', '❌ Unavailable',])[0]!,
  }
}

export function makeData(...lens: number[]) {
  const makeDataLevel = (depth = 0): Person[] => {
    const len = lens[depth]!
    return range(len).map((d): Person => {
      return {
        ...newPerson(),
        subRows: lens[depth + 1] ? makeDataLevel(depth + 1) : undefined,
      }
    })
  }

  return makeDataLevel()
}
