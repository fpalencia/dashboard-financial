import { describe, test, expect, beforeEach } from 'vitest'
import { mount, VueWrapper } from '@vue/test-utils'
import HeaderComponent from '@/components/commons/HeaderComponent.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useChartStore } from '@/store/useChartStore'

describe('HeaderComponent', () => {
  let wrapper: VueWrapper
  let chartStore: any

  beforeEach(() => {
    setActivePinia(createPinia())
    chartStore = useChartStore()
    
    // Mock store initial state
    chartStore.$state.history = {
      info: {
        shortName: 'TEST',
        countryName: 'TestCountry'
      },
      chart: [{
        performanceAbsolute: 1.5,
        performanceRelative: 2.5,
        price: 100.50
      }]
    }

    wrapper = mount(HeaderComponent)
  })

  test('renders component correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  test('displays market name and country', () => {
    expect(wrapper.text()).toContain('TEST')
    expect(wrapper.text()).toContain('TestCountry')
  })

  test('displays performance values', () => {
    expect(wrapper.text()).toContain('1.5%') // performanceAbsolute
    expect(wrapper.text()).toContain('2.50%') // performanceRelative
  })

  test('applies correct color class for positive performance', () => {
    const performanceElement = wrapper.find('[class*="text-green"]')
    expect(performanceElement.exists()).toBeTruthy()
  })

  test('applies correct color class for negative performance', async () => {
    chartStore.$state.history.chart[0].performanceAbsolute = -1.5
    await wrapper.vm.$nextTick()
    const performanceElement = wrapper.find('[class*="text-red"]')
    expect(performanceElement.exists()).toBeTruthy()
  })
})