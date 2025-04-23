import {View, TextInput, ScrollView, Button, Modal,Text} from "react-native";
import { useForm, Controller } from "react-hook-form";
import {addJournalEntry, JournalEntry} from "@/src/services/journalService";
import {StyleSheet} from "react-native";
import {useState} from "react";
import {Picker} from '@react-native-picker/picker';
import DateTimePicker, { DateType, useDefaultStyles } from 'react-native-ui-datepicker';
interface JournalEntryModalProps {
    setModalVisible: (visible: boolean) => void;
    modalVisible:boolean;
}

const NewJournalEntry = ({ setModalVisible, modalVisible }: JournalEntryModalProps) => {
    const [selectedDate, setSelectedDate] = useState<DateType>(new Date());
    const defaultStyles = useDefaultStyles();
    const { control, handleSubmit, reset,formState: { errors } } = useForm<JournalEntry>({
        defaultValues: {
            title: "",
            type: "Task",
            description: "",
            date: new Date().toISOString(),
        },
    });

    const onSubmit = (data: JournalEntry) => {
        addJournalEntry({ ...data, date: selectedDate.toISOString() });
        reset();
        setSelectedDate(new Date());
        setModalVisible(false);
    };

    const handleDateChange = (date: DateType) => {
        setSelectedDate(date);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalBackdrop}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Add Journal Entry</Text>

                    <Controller
                        control={control}
                        name="title"
                        rules={{required: 'Title is required'}}
                        render={({ field: { onChange, value } }) => (
                            <>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Title"
                                    value={value}
                                    onChangeText={onChange}
                                />
                                {errors.title && (
                                    <Text style={{ color: "red", fontSize: 12 }}>
                                        {errors.title.message} {/* Exibe a mensagem de erro */}
                                    </Text>
                                )}
                            </>
                        )}
                    />

                    <Controller
                        control={control}
                        name="type"
                        render={({ field: { onChange, value } }) => (
                            <Picker
                                selectedValue={value}
                                onValueChange={onChange}
                            >
                                <Picker.Item label="Task" value="Task" />
                                <Picker.Item label="Event" value="Event" />
                                <Picker.Item label="Note" value="Note" />
                            </Picker>
                        )}
                    />

                    <Controller
                        control={control}
                        name="description"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                style={styles.input}
                                placeholder="Description"
                                value={value}
                                onChangeText={onChange}
                            />
                        )}
                    />

                    <Text style={styles.input}>Selected Date: {new Date(selectedDate).toLocaleString()}</Text>
                    <DateTimePicker
                        mode="single"
                        date={selectedDate}
                        onChange={({ date }) => handleDateChange(date)}
                        styles={defaultStyles}
                    />

                    <Button title="Save" onPress={handleSubmit(onSubmit)} />
                    <Button title="Cancel" onPress={() => {
                        setSelectedDate(new Date());
                        setModalVisible(false)}
                    } />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackdrop: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: 300,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        borderRadius: 5,
    },
});

export default NewJournalEntry;