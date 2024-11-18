import { describe, test, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import InstrumentListComponent from '@/components/commons/InstrumentListComponent.vue'
import useInstrumentList from '@/composable/useIntrumentList'
import InstrumentItemComponent from '@/components/commons/InstrumentItemComponent.vue'

vi.mock('@/composable/useIntrumentList')

describe('InstrumentListComponent', () => {
  let wrapper: any
  const mockData = [
    {
      shortName: 'TEST1',
      lastPrice: 123.45,
      accumulatedVolumeMoney: 67890.12,
      pctDay: 1.23,
      pct30D: -4.56,
      pct1Y: 7.89,
      pctCY: -0.12
    },
    {
      shortName: 'TEST2',
      lastPrice: 223.45,
      accumulatedVolumeMoney: 77890.12,
      pctDay: 2.23,
      pct30D: -3.56,
      pct1Y: 6.89,
      pctCY: -1.12
    }
  ]

  beforeEach(() => {
    (useInstrumentList as unknown as { mockReturnValue: (value: any) => void }).mockReturnValue({
      sortedConstituents: mockData,
      sortColumn: 'shortName',
      handleSort: vi.fn(),
      getSortIcon: vi.fn(),
      handleClick: vi.fn()
    })

    wrapper = mount(InstrumentListComponent)
  })

  test('renders component correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

/*   test('displays table headers correctly', () => {
    const headers = wrapper.findAll('th')
    expect(headers.length).toBe(7)
    expect(headers[0].text()).toContain('Nombre')
    expect(headers[1].text()).toContain('Último')
    expect(headers[2].text()).toContain('Monto (MM)')
    expect(headers[3].text()).toContain('Var día')
    expect(headers[4].text()).toContain('Var 30d')
    expect(headers[5].text()).toContain('Año Actual')
    expect(headers[6].text()).toContain('12 Meses')
  }) */

  test('displays instrument items correctly', () => {
    const items = wrapper.findAllComponents(InstrumentItemComponent)
    expect(items.length).toBe(mockData.length)
    expect(items[0].props().data).toEqual(mockData[0])
    expect(items[1].props().data).toEqual(mockData[1])
  })

  test('handles sort correctly', async () => {
    const headers = wrapper.findAll('th')
    await headers[0].trigger('click')
    expect(useInstrumentList().handleSort).toHaveBeenCalledWith('shortName')
  })

  test('handles click correctly', async () => {
    const rows = wrapper.findAll('tr')
    await rows[1].trigger('click')
    expect(useInstrumentList().handleClick).toHaveBeenCalledWith(mockData[0].shortName)
  })
})