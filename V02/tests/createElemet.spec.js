import React from '../core/React'
import { it, expect, describe } from 'vitest'

describe('createElement', () => {
  it('props is null', () => {
    const el = React.createElement('div', null, 'hello')

    expect(el).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "hello",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
        },
        "type": "div",
      }
    `)
  })

  it('should return element vdom', () => {
    const el = React.createElement('div', { id: 'id' }, 'hello')

    expect(el).toMatchInlineSnapshot(`
      {
        "props": {
          "children": [
            {
              "props": {
                "children": [],
                "nodeValue": "hello",
              },
              "type": "TEXT_ELEMENT",
            },
          ],
          "id": "id",
        },
        "type": "div",
      }
    `)
  })
})
