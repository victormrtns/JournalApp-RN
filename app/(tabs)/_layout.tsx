import { Tabs } from 'expo-router';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {tabBarOptions} from "@/app/toolbaroptions";

export default function TabLayout() {
    return (
        <Tabs screenOptions={tabBarOptions}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Journal',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="notebook-outline" size={26} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="Second/index"
                options={{
                    title: 'Calendar',
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="calendar-month-outline" size={26} color={color} />
                    ),
                }}
            />
        </Tabs>
    );
}
