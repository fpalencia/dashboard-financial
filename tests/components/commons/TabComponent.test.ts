import { describe, test, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TabComponent from '@/components/commons/TabComponent.vue'

describe('TabComponent', () => {
  let wrapper: any

  beforeEach(() => {
    wrapper = mount(TabComponent, {
      slots: {
        ipsa: '<div class="ipsa-content">IPSA Content</div>',
        igpa: '<div class="igpa-content">IGPA Content</div>',
        nasdaq: '<div class="nasdaq-content">NASDAQ Content</div>',
        dowjones: '<div class="dowjones-content">DOW JONES Content</div>'
      }
    })
  })

  test('renders component correctly', () => {
    expect(wrapper.exists()).toBeTruthy()
  })

  test('displays correct tabs', () => {
    const tabs = wrapper.findAllComponents({ name: 'TabsTrigger' })
    expect(tabs.length).toBe(4)
    expect(tabs[0].text()).toBe('IPSA')
    expect(tabs[1].text()).toBe('IGPA')
    expect(tabs[2].text()).toBe('NASDAQ')
    expect(tabs[3].text()).toBe('DOW JONES')
  })

  test('displays correct content for default tab', () => {
    const content = wrapper.find('.ipsa-content')
    expect(content.exists()).toBeTruthy()
    expect(content.text()).toBe('IPSA Content')
  })

  test('handles tab switching correctly', async () => {
    const tabs = wrapper.findAllComponents({ name: 'TabsTrigger' })
    await tabs[1].trigger('click')
    expect(wrapper.find('.igpa-content').exists()).toBeTruthy()
    await tabs[2].trigger('click')
    expect(wrapper.find('.nasdaq-content').exists()).toBeTruthy()
    await tabs[3].trigger('click')
    expect(wrapper.find('.dowjones-content').exists()).toBeTruthy()
  })
})