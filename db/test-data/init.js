function createIndexes(db) {
    try {

        db.articles.createIndex({ "title": 1 })
        db.articles.createIndex({ "document_date": 1 })
        
        print('Indexes created successfully');
    } catch (error) {
        print(`Error creating indexes: ${error}`);
    }
}

function initializeDatabase() {
    print('\nStarting database initialization...\n');
  
    const dbName = 'Storage-Base';

    sleep(5);

    const db = connect("localhost:27017/" + dbName);
    
    // Создаем пользователя для приложения (если нужно)
    try {
        db.createUser({
            user: 'root',
            pwd: '12345',
            roles: [
                { role: 'readWrite', db: dbName }
            ]
        });
        print('\nApplication user created\n');
    } catch (error) {
        print(`\nUser might already exist: ${error}\n`);
    }
    
    // Загружаем и вставляем данные для каждой коллекции
    const collections = [
        'articles'
    ];
    
    // Обрабатываем каждую коллекцию
    collections.forEach((name) => {
        print(`Processing ${name}...`);
        
        try {
            db.createCollection(name);
            print(`\nCollection ${name} created\n`);
        } catch (error) {
            print(`\nCollection ${name} might already exist: ${error}\n`);
        }
    });

    print('\nInserting data into collections...\n');

    load('docker-entrypoint-initdb.d/data.json');

    createIndexes(db);
    
    print('\nDatabase initialization completed!\n');
}

// Запускаем инициализацию
try {
    initializeDatabase();
} catch (error) {
    print(`Initialization failed: ${error}`);
    quit(1);
}