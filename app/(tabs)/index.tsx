// src/screens/HomePage.tsx
import { Text, View, Button, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { useTinybasePersistence } from "@/src/hooks/useTinybasePersistence";
import {
    JournalEntry,
    addJournalEntry,
    getAllJournalEntries,
    TABLE_NAME,
} from "@/src/services/journalService";
import { store } from "@/src/stores/tinybaseStore";
import NewJournalEntry from "@/src/modals";

export default function HomePage() {
    useTinybasePersistence();
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
    const [modalVisible,setModalVisible] = useState(false);
    const loadEntries = () => {
        const entries = getAllJournalEntries();
        setJournalEntries(entries);
    };

    useEffect(() => {
        const listener = store.addTableListener(TABLE_NAME, loadEntries);
        return () => {
            store.delListener(listener);
        };
    }, []);

    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
            }}
        >
            <Text style={{ fontSize: 20, marginBottom: 20 }}>Home Page</Text>

            <Button
                title="Adicionar Entrada"
                onPress={() => setModalVisible(true)}
            />

            <NewJournalEntry
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />

            <FlatList
                data={journalEntries}
                keyExtractor={(item) => item.id}
                style={{ marginTop: 20, width: "100%" }}
                renderItem={({ item }) => (
                    <View
                        style={{
                            backgroundColor: "#eee",
                            padding: 10,
                            borderRadius: 10,
                            marginBottom: 10,
                        }}
                    >
                        <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
                        <Text>Type: {item.type}</Text>
                        <Text>Description: {item.description}</Text>
                        <Text>Date: {new Date(item.date).toLocaleString()}</Text>
                    </View>
                )}
            />
        </View>
    );
}
