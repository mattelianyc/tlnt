import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "../../screens/HomeScreen";
import ChatScreen from "../../screens/ChatScreen";
import FollowingScreen from "../../screens/FollowingScreen";
import ProfileScreen from '../../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'earth' : 'earth-outline';
          } else if (route.name === 'Following') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Chat') {
            iconName = focused ? 'mail-open' : 'mail-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff9999',
        tabBarInactiveTintColor: 'black',
        tabBarShowLabel: false
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Following" component={FollowingScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}