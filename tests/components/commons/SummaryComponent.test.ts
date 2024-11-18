import { describe, test, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SummaryComponent from '@/components/commons/SummaryComponent.vue'
import { createPinia, setActivePinia } from 'pinia'
import { useChartStore } from '@/store/useChartStore'

describe('SummaryComponent', () => {
  let wrapper: any
  let chartStore: any

  beforeEach(() => {
    setActivePinia(createPinia())
    chartStore = useChartStore()
    chartStore.$state.history = {
      chart: [
        { datetimeLastPriceTs: 1627849200000, openPrice: 100 },
        { datetimeLastPriceTs: 1627935600000, openPrice: 110 }
      ]
    }
    chartStore.$state.summary = {
      price: {
        openPrice: 120,
        maxDay: 130,
        minDay: 90,
        max52W: 150,
        min52W: 80,
        pct30D: 0.05,
        pctRelCY: 0.10,
        pctRelW52: 0.15
      }
    }
    wrapper = mount(SummaryComponent, {
      global: {
        plugins: [createPinia()]
      }
    })
  })

  test('renders component correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  test('displays correct data in details tab', () => {
    const rows = wrapper.findAll('tr')
    expect(rows[0].findAll('td')[1].text()).toBe('120.00') // Apertura
    expect(rows[1].findAll('td')[1].text()).toBe('100.00') // Cierre Anterior
    expect(rows[2].findAll('td')[1].text()).toBe('130.00') // Máximo Diario
    expect(rows[3].findAll('td')[1].text()).toBe('90.00') // Mínimo Diario
    expect(rows[4].findAll('td')[1].text()).toBe('150.00') // Máximo 52 Semanas
    expect(rows[5].findAll('td')[1].text()).toBe('80.00') // Mínimo 52 Semanas
  })

  test('displays correct data in variation section', () => {
    const rows = wrapper.findAll('tr')
    expect(rows[6].findAll('td')[1].text()).toBe('5.00%') // 1 Mes
    expect(rows[7].findAll('td')[1].text()).toBe('10.00%') // 1 Año
    expect(rows[8].findAll('td')[1].text()).toBe('15.00%') // Año a la fecha
  })

  test('handles tab switching correctly', async () => {
    const tabs = wrapper.findAllComponents({ name: 'TabsTrigger' })
    await tabs[0].trigger('click')
    expect(wrapper.findComponent({ name: 'TabsContent', props: { value: 'resumen' } }).exists()).toBeTruthy()
    await tabs[1].trigger('click')
    expect(wrapper.findComponent({ name: 'TabsContent', props: { value: 'detalles' } }).exists()).toBeTruthy()
  })
})