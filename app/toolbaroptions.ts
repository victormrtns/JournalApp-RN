import { BottomTabNavigationOptions } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';

export const tabBarOptions: BottomTabNavigationOptions = {
    headerShown: false,
    tabBarActiveTintColor: '#2563EB',       // Azul organizacional
    tabBarInactiveTintColor: '#9CA3AF',     // Cinza claro
    tabBarStyle: {
        backgroundColor: '#F9FAFB',           // Fundo claro e limpo
        borderTopWidth: 0.5,
        borderTopColor: '#E5E7EB',            // Cinza de divisão sutil
        height: Platform.OS === 'ios' ? 80 : 60,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        paddingTop: 10,
        elevation: 2,                         // Sombra sutil para Android
    },
    tabBarLabelStyle: {
        fontSize: 11,
        fontWeight: '500',
    },
};
