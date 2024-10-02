import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Icon } from "react-native-elements";

interface Task {
    id: string;
    text: string;
}

interface TaskItemProps {
    item: Task;
    handleEdit: (item: Task) => void;
    handleDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ item, handleEdit, handleDelete }) => {
    return (
        <View style={styles.task}>
            <Text style={styles.taskText}>{item.text}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.editButton}>
                    <Icon name="edit" color="#4caf50" onPress={() => handleEdit(item)}>
                        編集
                    </Icon>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDelete(item.id)}>
                    <Icon name="delete" color="#f44336">
                        削除
                    </Icon>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    task: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginBottom: 20,
        backgroundColor: "#eeeeee",
        borderRadius: 5,
    },
    taskText: {
        maxWidth: "80%",
    },
    buttonContainer: {
        flexDirection: "row",
    },
    editButton: {
        marginRight: 10,
    },
    deleteButton: {},
});

export default TaskItem;