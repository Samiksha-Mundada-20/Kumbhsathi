import { get, set } from 'idb-keyval';

export interface SavedPlan {
  id: string;
  createdAt: string;
  origin: string;
  startDate: string;
  endDate: string;
  groupSize: number;
  budgetPerPerson: number;
  preference: 'cheapest' | 'balanced' | 'fastest';
  selectedTravelId?: string;
  selectedStayId?: string;
  totalEstimatedCost: number;
  customNotes?: string;
}

const PLANS_STORE_KEY = 'kumbh_saved_plans';

export async function savePlan(plan: Omit<SavedPlan, 'id' | 'createdAt'>): Promise<SavedPlan> {
  const newPlan: SavedPlan = {
    ...plan,
    id: 'plan_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7),
    createdAt: new Date().toISOString(),
  };

  const existingPlans = await getSavedPlans();
  const updatedPlans = [newPlan, ...existingPlans.filter((p) => p.id !== newPlan.id)];

  if (typeof window !== 'undefined') {
    try {
      await set(PLANS_STORE_KEY, updatedPlans);
    } catch {
      localStorage.setItem(PLANS_STORE_KEY, JSON.stringify(updatedPlans));
    }
    localStorage.setItem('kumbh_latest_plan_id', newPlan.id);
  }

  return newPlan;
}

export async function getSavedPlans(): Promise<SavedPlan[]> {
  if (typeof window === 'undefined') return [];
  try {
    const plans = await get<SavedPlan[]>(PLANS_STORE_KEY);
    if (plans && Array.isArray(plans)) return plans;
  } catch {
    // fallback to localStorage
  }

  try {
    const raw = localStorage.getItem(PLANS_STORE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function getPlanById(id: string): Promise<SavedPlan | null> {
  const plans = await getSavedPlans();
  return plans.find((p) => p.id === id) || null;
}

export async function deletePlan(id: string): Promise<void> {
  const existingPlans = await getSavedPlans();
  const updated = existingPlans.filter((p) => p.id !== id);
  if (typeof window !== 'undefined') {
    try {
      await set(PLANS_STORE_KEY, updated);
    } catch {
      localStorage.setItem(PLANS_STORE_KEY, JSON.stringify(updated));
    }
  }
}