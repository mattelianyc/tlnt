import { useNavigationState } from '@react-navigation/native';

function getActiveRouteName(state) {
  if (!state || typeof state.index !== 'number') return null;
  const route = state.routes[state.index];
  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }
  return route.name;
}

export function useActiveRouteName() {
  const navigationState = useNavigationState(state => getActiveRouteName(state));
  return navigationState;
}
