import { describe, beforeEach, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SearchBarComponent from '@/components/commons/SearchBarComponent.vue'
import { createPinia, setActivePinia } from 'pinia'

describe('SearchBarComponent', () => {
  let wrapper: any
  const mockData = [
    { codeInstrument: 'ABC' },
    { codeInstrument: 'DEF' },
    { codeInstrument: 'GHI' }
  ]

  beforeEach(() => {
    setActivePinia(createPinia())
    wrapper = mount(SearchBarComponent, {
      global: {
        plugins: [createPinia()]
      },
      data() {
        return {
          searchQuery: '',
          filteredConstituents: mockData
        }
      }
    })
  })

  test('renders component correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  test('updates search query', async () => {
    const input = wrapper.find('input')
    await input.setValue('ABC')
    expect(wrapper.vm.searchQuery).toBe('ABC')
  })
})