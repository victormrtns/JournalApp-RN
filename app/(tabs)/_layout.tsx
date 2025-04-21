import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
      <Tabs>
        <Tabs.Screen
            name="index"
            options={{
              title: 'Home',
              tabBarIcon: ({ color }) => <MaterialIcons size={28} color={color} />,
            }}
        />
          <Tabs.Screen
              name="Second/second"
              options={{
                  title: 'Second',
                  tabBarIcon: ({ color }) => <MaterialIcons size={28} color={color} />,
              }}
          />
      </Tabs>
  );
}
