from fastapi import FastAPI
import mysql.connector

app = FastAPI()

# データベース接続前に作成するための接続設定 (デフォルトのMySQL接続)
db_init = mysql.connector.connect(
    host="localhost",
    user="root",
    password=""  # パスワードがある場合は指定
)

# データベースが存在しない場合に作成する関数
def create_database():
    cursor = db_init.cursor()
    cursor.execute("CREATE DATABASE IF NOT EXISTS python_db;")
    db_init.commit()

# データベースに接続し、テーブルがなければ作成する関数
def create_table():
    cursor = db.cursor()
    create_table_query = '''
    CREATE TABLE IF NOT EXISTS Tasks (
        id INT AUTO_INCREMENT PRIMARY KEY,
        taskName VARCHAR(255),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    '''
    cursor.execute(create_table_query)
    db.commit()

# データベースとテーブルを初期化する
create_database()

# データベースに再接続 (作成後)
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="your_password",  # パスワードがある場合は指定
    database="python_db"
)

create_table()  # テーブル作成

# タスクを追加するエンドポイント
@app.post("/add-task/")
async def add_task(task_name: str):
    cursor = db.cursor()
    insert_query = '''
    INSERT INTO Tasks (taskName) VALUES (%s);
    '''
    cursor.execute(insert_query, (task_name,))
    db.commit()
    return {"message": "Task added successfully!", "taskName": task_name}

# タスクのtaskNameを編集するエンドポイント
@app.put("/update-task/{task_id}")
async def update_task(task_id: int, new_task_name: str):
    cursor = db.cursor()
    update_query = '''
    UPDATE Tasks
    SET taskName = %s
    WHERE id = %s;
    '''
    cursor.execute(update_query, (new_task_name, task_id))
    db.commit()
    
    if cursor.rowcount == 0:
        return {"message": "Task not found or no update made."}
    
    return {"message": f"Task {task_id} updated successfully!", "new_task_name": new_task_name}

# タスクを削除するエンドポイント
@app.delete("/delete-task/{task_id}")
async def delete_task(task_id: int):
    cursor = db.cursor()
    delete_query = '''
    DELETE FROM Tasks
    WHERE id = %s;
    '''
    cursor.execute(delete_query, (task_id,))
    db.commit()
    
    if cursor.rowcount == 0:
        return {"message": "Task not found."}
    
    return {"message": f"Task {task_id} deleted successfully!"}

# タスクデータを取得するエンドポイント
@app.get("/get-tasks")
async def get_tasks():
    cursor = db.cursor()
    select_query = "SELECT * FROM Tasks"
    cursor.execute(select_query)
    rows = cursor.fetchall()  # 全データを取得
    tasks = []
    for row in rows:
        tasks.append({
            "id": row[0],
            "taskName": row[1],
            "createdAt": row[2]
        })
    return {"tasks": tasks}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
