import { describe, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import InstrumentItemComponent from '@/components/commons/InstrumentItemComponent.vue'
import { formatNumber, formatPercentage, getValueColor } from '@/helpers'

describe('InstrumentItemComponent', () => {
  const mockData = {
    codeInstrument: 'TEST_CODE',
    shortName: 'TEST',
    lastPrice: 123.45,
    accumulatedVolumeMoney: 67890.12,
    pctDay: 1.23,
    pct30D: -4.56,
    pct1Y: 7.89,
    pctCY: -0.12
  }

  const wrapper = mount(InstrumentItemComponent, {
    props: {
      data: mockData
    }
  })

  test('renders component correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  test('displays short name correctly', () => {
    expect(wrapper.text()).toContain(mockData.shortName)
  })

  test('displays last price correctly', () => {
    expect(wrapper.text()).toContain(formatNumber(mockData.lastPrice))
  })

  test('displays accumulated volume money correctly', () => {
    expect(wrapper.text()).toContain(formatNumber(mockData.accumulatedVolumeMoney))
  })

  test('displays pctDay correctly with correct class', () => {
    const pctDayElement = wrapper.findAll('.text-right')[2]
    expect(pctDayElement.text()).toContain(formatPercentage(mockData.pctDay))
    expect(pctDayElement.classes()).toContain(getValueColor(mockData.pctDay))
  })

  test('displays pct30D correctly with correct class', () => {
    const pct30DElement = wrapper.findAll('.text-right')[3]
    expect(pct30DElement.text()).toContain(formatPercentage(mockData.pct30D))
    expect(pct30DElement.classes()).toContain(getValueColor(mockData.pct30D))
  })

  test('displays pct1Y correctly with correct class', () => {
    const pct1YElement = wrapper.findAll('.text-right')[4]
    expect(pct1YElement.text()).toContain(formatPercentage(mockData.pct1Y))
    expect(pct1YElement.classes()).toContain(getValueColor(mockData.pct1Y))
  })

  test('displays pctCY correctly with correct class', () => {
    const pctCYElement = wrapper.findAll('.text-right')[5]
    expect(pctCYElement.text()).toContain(formatPercentage(mockData.pctCY))
    expect(pctCYElement.classes()).toContain(getValueColor(mockData.pctCY))
  })
})