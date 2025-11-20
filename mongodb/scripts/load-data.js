// Функция для проверки существования базы данных
function checkIfDatabaseExists(dbName) {
    try {
        const adminDB = db.getSiblingDB('admin');
        const result = adminDB.adminCommand({ listDatabases: 1 });
        const databases = result.databases;
        
        return databases.some(database => database.name === dbName);
    } catch (error) {
        print(`Error checking database existence: ${error.message}`);
        return false;
    }
}

// Функция для загрузки данных из JSON файла
function loadDataFromFile() {
    print('Loading data from JSON file...');
    
    try {
        // Используем fs модуль для чтения файла
        const fs = require('fs');
        const data = fs.readFileSync('/data.json', 'utf8');
        const documents = JSON.parse(data);
        
        print(`Loaded ${documents.length} documents from JSON file!`);
        
        // Подключаемся к базе данных
        const dbName = 'Storage-Base';
        const currentDB = db.getSiblingDB(dbName);
        
        // Вставляем документы пачками для лучшей производительности
        const batchSize = 100;
        let insertedCount = 0;
        
        for (let i = 0; i < documents.length; i += batchSize) {
            const batch = documents.slice(i, i + batchSize);
            
            // Обрабатываем каждый документ
            const processedBatch = batch.map(doc => {
                return {
                    // Поля из базы
                    volume: doc.volume,
                    section: doc.section,
                    document_type: doc.document_type,
                    document_date: doc.document_date,
                    title: doc.title,
                    contents: doc.contents,
                    footnotes: doc.footnotes,
                    original_language: doc.original_language,
                    source: doc.source,
                    
                    // Дополнительные сгенерированные поля
                    document_id: `${doc.volume}_${doc.section}`,
                    has_footnotes: Object.keys(doc.footnotes || {}).length > 0,
                    footnote_count: Object.keys(doc.footnotes || {}).length,
                    created_at: new Date(),
                    updated_at: new Date(),
                    
                    // Отдельное поле содержащее год создания документа
                    year: extractYear(doc.document_date),
                };
            });
            
            const result = currentDB.documents.insertMany(processedBatch);
            insertedCount += result.insertedCount;
            
            if (insertedCount % 1000 === 0 || insertedCount === documents.length) {
                print(`Inserted ${insertedCount}/${documents.length} documents...`);
            }
        }
        
        print(`Successfully inserted documents!`);
        return true;
        
    } catch (error) {
        print(`Error loading data: ${error.message}`);
        return false;
    }
}

// Вспомогательная функция для извлечения года из даты
function extractYear(dateString) {
    if (!dateString) return null;
    
    try {
        if (dateString.includes('-')) {
            const parts = dateString.split('-');
            if (parts.length >= 1) {
                const yearPart = parts[parts.length - 1];
                const year = parseInt(yearPart);
                if (!isNaN(year) && year > 1800 && year < 2100) {
                    return year;
                }
            }
        }
        const yearMatch = dateString.match(/\b(18\d{2}|19\d{2}|20\d{2})\b/);
        if (yearMatch) {
            return parseInt(yearMatch[0]);
        }
        
        return null;
    } catch (e) {
        return null;
    }
}

function initializeDatabase() {
    print('\n=== Starting database initialization ===\n');
    
    const dbName = 'Storage-Base';
    
    // Проверяем, существует ли уже база данных
    if (checkIfDatabaseExists(dbName)) {
        print(`Database "${dbName}" already exists. Exiting...`);
        print('=== Database initialization skipped ===');
        return;
    }
    
    print(`Creating new database: ${dbName}`);
    const currentDB = db.getSiblingDB(dbName);
        
    const collections = [
        'documents'
    ];
    
    collections.forEach((name) => {
        print(`Processing ${name}...`);
        
        try {
            currentDB.createCollection(name);
            print(`Collection ${name} created`);
        } catch (error) {
            print(`Error creating collection ${name}: ${error.message}`);
            throw error;
        }
    });

    print('Inserting data into collections...');
    
    if (!loadDataFromFile()) {
        throw new Error('Failed to load data from JSON file');
    }

    print('Creating indexes...');
    try {
        currentDB.documents.createIndex({ "document_id": 1 }, { unique: true });
        currentDB.documents.createIndex({ "volume": 1, "section": 1 });
        currentDB.documents.createIndex({ "document_type": 1 });
        currentDB.documents.createIndex({ "original_language": 1 });
        currentDB.documents.createIndex({ "year": 1 });
        print('Indexes created successfully!');
    } catch (error) {
        print(`Error creating indexes: ${error.message}`);
    }
    
    const finalCount = currentDB.documents.countDocuments();
    print(`Final document count: ${finalCount}`);
    
    print('\n=== Database initialization completed! ===\n');
}

try {
    initializeDatabase();
} catch (error) {
    print(`Initialization failed: ${error}`);
    print(`Stack trace: ${error.stack}`);
    quit(1);
}