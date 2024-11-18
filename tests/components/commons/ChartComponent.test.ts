import { describe, beforeEach, test, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ChartComponent from '@/components/commons/ChartComponent.vue'
import { Line as LineChart } from 'vue-chartjs'
import Button from '@/components/ui/button/Button.vue'

describe('ChartComponent', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(ChartComponent, {
      global: {
        components: {
          LineChart,
          Button
        }
      },
      data() {
        return {
          chartData: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
              {
                label: 'My First dataset',
                backgroundColor: 'rgba(255,99,132,0.2)',
                borderColor: 'rgba(255,99,132,1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                hoverBorderColor: 'rgba(255,99,132,1)',
                data: [65, 59, 80, 81, 56, 55, 40]
              }
            ]
          },
          chartOptions: {
            responsive: true,
            maintainAspectRatio: false
          },
          periods: ['1D', '1W', '1M', '1Y'],
          selectedPeriod: '1D'
        }
      }
    })
  })

  test('renders component correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  test('displays LineChart with correct data and options', () => {
    const lineChart = wrapper.findComponent(LineChart)
    expect(lineChart.exists()).toBeTruthy()
    expect(lineChart.props('data')).toEqual(wrapper.vm.chartData)
    expect(lineChart.props('options')).toEqual(wrapper.vm.chartOptions)
  })

  test('displays period buttons correctly', () => {
    const buttons = wrapper.findAllComponents(Button)
    expect(buttons.length).toBe(wrapper.vm.periods.length)
    buttons.forEach((button: any, index: any) => {
      expect(button.text()).toBe(wrapper.vm.periods[index])
    })
  })

  test('handles period selection correctly', async () => {
    const buttons = wrapper.findAllComponents(Button)
    await buttons[1].trigger('click')
    expect(wrapper.vm.selectedPeriod).toBe('1W')
    await buttons[2].trigger('click')
    expect(wrapper.vm.selectedPeriod).toBe('1M')
  })
})