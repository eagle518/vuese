import * as path from 'path'
import * as fs from 'fs'
import sfcToAST, { AstResult } from '../sfcToAST'
import parseTemplate from '../parseTemplate'
import { SlotResult, ParserOptions } from '../index'

function getAST(fileName: string): object {
  const p = path.resolve(__dirname, `../../../__fixtures__/${fileName}`)
  const source = fs.readFileSync(p, 'utf-8')
  return sfcToAST(source)
}

test('Default slot with slot description', () => {
  const sfc: AstResult = getAST('defaultSlot.vue')
  const options: ParserOptions = {
    onSlot(slotRes) {
      expect((slotRes as SlotResult).name).toBe('default')
      expect((slotRes as SlotResult).describe).toBe('default slot')
      expect((slotRes as SlotResult).backerDesc).toBe('Default Slot Content')
      expect((slotRes as SlotResult).bindings).toEqual({})
    }
  }
  parseTemplate(sfc.templateAst, options)
})

test('Named slot with slot description', () => {
  const sfc: AstResult = getAST('namedSlot.vue')
  const options: ParserOptions = {
    onSlot(slotRes) {
      expect((slotRes as SlotResult).name).toBe('header')
      expect((slotRes as SlotResult).describe).toBe('head slot')
      expect((slotRes as SlotResult).backerDesc).toBe('Default Slot Content')
      expect((slotRes as SlotResult).bindings).toEqual({})
    }
  }
  parseTemplate(sfc.templateAst, options)
})

test('Named slot with slot description and bingdings', () => {
  const sfc: AstResult = getAST('slotWithBindings.vue')
  const options: ParserOptions = {
    onSlot(slotRes) {
      expect((slotRes as SlotResult).name).toBe('header')
      expect((slotRes as SlotResult).describe).toBe('Named slot')
      expect((slotRes as SlotResult).backerDesc).toBe('Default Slot Content')
      expect((slotRes as SlotResult).bindings).toEqual({
        a: 'someData',
        b: 'str'
      })
    }
  }
  parseTemplate(sfc.templateAst, options)
})
