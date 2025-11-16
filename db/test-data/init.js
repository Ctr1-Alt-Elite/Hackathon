function createIndexes(db) {
    try {
        db.articles.createIndex({ "title": 1 });
        db.articles.createIndex({ "document_date": 1 });
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
    
    const collections = ['articles'];
    
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

    try {
        load('docker-entrypoint-initdb.d/data.json');
        print('Data loaded successfully');
    } catch (error) {
        print(`Error loading data: ${error}`);
    }

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