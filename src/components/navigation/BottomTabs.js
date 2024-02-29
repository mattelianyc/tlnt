import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "../../screens/HomeScreen";
import ChatScreen from "../../screens/ChatScreen";
import FollowingScreen from "../../screens/FollowingScreen";
import ProfileScreen from '../../screens/ProfileScreen';
import { useDispatch } from 'react-redux';
// import { setSearchVisible } from '../../redux/actions';

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  
  const dispatch = useDispatch();
  
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'home') {
            iconName = focused ? 'earth' : 'earth-outline';
          } else if (route.name === 'following') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'messages') {
            iconName = focused ? 'mail-open' : 'mail-outline';
          } else if (route.name === 'profile') {
            iconName = focused ? 'person-circle' : 'person-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#ff9999', // Active icon color
        tabBarInactiveTintColor: 'white', // Inactive icon color
        tabBarStyle: { 
          backgroundColor: 'black' // Tab bar background color
        },
        tabBarShowLabel: false
      })}
    >
      <Tab.Screen name="home" component={HomeScreen} />
      {/* <Tab.Screen name="following" component={FollowingScreen} />
      <Tab.Screen name="messages" component={ChatScreen} /> */}
      <Tab.Screen name="profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}