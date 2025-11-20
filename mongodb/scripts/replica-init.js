// Replica set initialization script
print("Starting replica set initialization...");

// Wait a bit for all nodes to be ready
sleep(5000);

try {
    print("Checking if replica set is already initialized...");
    const status = rs.status();
    print("Replica set already initialized:");
    printjson(status);
} catch (error) {
    if (error.codeName === 'NotYetInitialized') {
        print("Initializing new replica set...");
        
        const config = {
            _id: "rs0",
            version: 1,
            members: [
                { 
                    _id: 0, 
                    host: "mongo1:27017",
                    priority: 2
                },
                { 
                    _id: 1, 
                    host: "mongo2:27017",
                    priority: 1
                },
                { 
                    _id: 2, 
                    host: "mongo3:27017",
                    priority: 1
                }
            ]
        };
        
        print("Configuration for replica set:");
        printjson(config);
        
        const result = rs.initiate(config);
        print("Replica set initialization started:");
        printjson(result);
        
        print("Waiting for replica set to elect a primary...");
        let primaryFound = false;
        const timeout = 60000;
        const start = Date.now();
        
        while (Date.now() - start < timeout) {
            try {
                const status = rs.status();
                const primary = status.members.find(member => 
                    member.stateStr === 'PRIMARY' && member.health === 1
                );
                
                if (primary) {
                    print(`Primary elected: ${primary.name}`);
                    primaryFound = true;
                    
                    // Check if all members are healthy
                    const healthyMembers = status.members.filter(member => 
                        member.health === 1 && 
                        (member.stateStr === 'PRIMARY' || member.stateStr === 'SECONDARY')
                    );
                    
                    if (healthyMembers.length >= 2) {
                        print(`Cluster healthy with ${healthyMembers.length} members`);
                        break;
                    }
                }
            } catch (e) {
                print(`Error checking status: ${e.message}`);
            }
            
            sleep(2000);
        }
        
        if (!primaryFound) {
            print("ERROR: Failed to elect primary within timeout period");
            print("Current status:");
            try {
                printjson(rs.status());
            } catch (e) {
                print(`Could not get status: ${e.message}`);
            }
            quit(1);
        }
        
        print("Replica set initialized successfully!");
        print("Final status:");
        printjson(rs.status());
        
    } else {
        print(`Unexpected error: ${error}`);
        quit(1);
    }
}

// Helper function to sleep
function sleep(milliseconds) {
    var start = new Date().getTime();
    while (new Date().getTime() - start < milliseconds) {
    }
}