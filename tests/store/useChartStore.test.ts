import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useChartStore } from '@/store/useChartStore';

describe('useChartStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('fetches and sets constituents correctly', async () => {
    const store = useChartStore();
    const mockData = { data: { constituents: [{ id: 1, name: 'Constituent 1' }] } };
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as any;

    await store.getConstituents();
    expect(store.constituents).toEqual(mockData.data.constituents);
  });

  it('fetches and sets history correctly', async () => {
    const store = useChartStore();
    const mockData = { data: { info: { id: 1 }, chart: [{ id: 1, value: 100 }] } };
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as any;

    await store.getHistory();
    expect(store.history).toEqual(mockData.data);
  });

  it('fetches and sets summary correctly', async () => {
    const store = useChartStore();
    const mockData = { data: { price: { id: 1, value: 100 } } };
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    ) as any;

    await store.getSummary();
    expect(store.summary).toEqual(mockData.data);
  });

  it('handles fetch error for constituents', async () => {
    const store = useChartStore();
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as any;

    const result = await store.getConstituents();
    expect(result).toBeNull();
    expect(store.constituents).toEqual([]);
  });

  it('handles fetch error for history', async () => {
    const store = useChartStore();
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as any;

    const result = await store.getHistory();
    expect(result).toBeNull();
    expect(store.history).toEqual({ info: {}, chart: [] });
  });

  it('handles fetch error for summary', async () => {
    const store = useChartStore();
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as any;

    const result = await store.getSummary();
    expect(result).toBeNull();
    expect(store.summary).toEqual({ price: {} });
  });
});