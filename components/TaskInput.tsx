import React from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

interface TaskInputProps {
    taskText: string;
    setTaskText: (text: string) => void;
    handleSaveTask: () => void;
    isEditing: string | null;
}

const TaskInput: React.FC<TaskInputProps> = ({ taskText, setTaskText, handleSaveTask, isEditing }) => {
    return (
        <View>
            <TextInput 
                placeholder="入力" 
                style={styles.input} 
                onChangeText={setTaskText} 
                value={taskText} 
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveTask}>
                <Text style={styles.saveButtonText}>
                    {isEditing ? "編集" : "追加"}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
    saveButtonText: {
        color: "#fff",
        textAlign: "center",
    },
});

export default TaskInput;

// import React from "react";
// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
// import axios from 'axios';

// interface TaskInputProps {
//     taskText: string;
//     setTaskText: (text: string) => void;
//     handleSaveTask: () => void;
//     isEditing: string | null;
// }

// const TaskInput: React.FC<TaskInputProps> = ({ taskText, setTaskText, handleSaveTask, isEditing }) => {
//     const apiUrl = 'http://127.0.0.1:8000/add-task/';  // FastAPIのURL

//     const saveTask = async () => {
//         try {
//             // タスクを追加するAPIにリクエストを送信
//             const response = await axios.post(apiUrl, { task_name: taskText });
//             console.log(response.data); // レスポンスをログに出力
//             setTaskText(''); // 入力フィールドをクリア
//             handleSaveTask(); // 親コンポーネントの状態を更新
//         } catch (error) {
//             console.error("Error adding task:", error); // エラー処理
//         }
//     };

//     return (
//         <View>
//             <TextInput 
//                 placeholder="入力" 
//                 style={styles.input} 
//                 onChangeText={setTaskText} 
//                 value={taskText} 
//             />
//             <TouchableOpacity style={styles.saveButton} onPress={saveTask}>
//                 <Text style={styles.saveButtonText}>
//                     {isEditing ? "編集" : "追加"}
//                 </Text>
//             </TouchableOpacity>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     input: {
//         borderWidth: 2,
//         borderColor: "#ccceee",
//         padding: 10,
//         marginBottom: 10,
//         borderRadius: 6,
//     },
//     saveButton: {
//         backgroundColor: "green",
//         padding: 10,
//         marginBottom: 20,
//         borderRadius: 5,
//     },
//     saveButtonText: {
//         color: "#fff",
//         textAlign: "center",
//     },
// });

// export default TaskInput;