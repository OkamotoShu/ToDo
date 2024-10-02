import React, { useState } from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import TaskItem from "../../components/TaskItem";
import TaskInput from "../../components/TaskInput";

interface Task {
    id: string;
    text: string;
}

export default function App() {
    const [taskText, setTaskText] = useState<string>("");
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isEditing, setIsEditing] = useState<string | null>(null);

    const handleSaveTask = () => {
        if (!taskText.trim()) return;
        if (isEditing) {
            setTasks(
                tasks.map((task) =>
                    task.id === isEditing ? { ...task, text: taskText } : task
                )
            );
            setIsEditing(null);
        } else {
            const newTask: Task = { id: Date.now().toString(), text: taskText };
            setTasks([...tasks, newTask]);
        }
        setTaskText("");
    };

    const handleEdit = (item: Task) => {
        setTaskText(item.text);
        setIsEditing(item.id);
    };

    const handleDelete = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Todoアプリ</Text>
            <TaskInput 
                taskText={taskText} 
                setTaskText={setTaskText} 
                handleSaveTask={handleSaveTask} 
                isEditing={isEditing}
            />
            <FlatList 
                data={tasks} 
                renderItem={({ item }) => (
                    <TaskItem 
                        item={item} 
                        handleEdit={handleEdit} 
                        handleDelete={() => handleDelete(item.id)}
                    />
                )} 
                keyExtractor={(item) => item.id}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        borderWidth: 2,
        borderColor: "#ccceee",
        padding: 10,
        marginBottom: 10,
        borderRadius: 6,
    },
    saveButton: {
        backgroundColor: "green",
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
});