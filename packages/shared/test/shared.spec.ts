import { describe, expect, expectTypeOf, test } from 'vitest'
import { movies, noop } from "../src/index"

describe('shared', () => {
  test('Movies', () => {
    // expect(movies)
    const mv = JSON.stringify(movies)
    expect(mv).eq("{}")
  })

  test('noop', () => {
    // expect(movies)
    expectTypeOf(noop).toBeVoid(undefined as never)
  })
})