console.log("Promise works"); 

const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log("Start process...")
        // reject("Bad idea...") // Викидає в catch (23row)
        resolve()
    }, 2000);
    
}).then(() => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let car = {
                brand: "Honda",
                model: "Civic"
            }
            console.log("You want to buy: " + car);
            // reject("Sorry, you don't have enough money");
            resolve();
        }, 2000)
        
    }).then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let car = {
                    brand: "Honda",
                    model: "Civic",
                    bankCheck: true
                }
                console.log("Technical check: ", car);
                // console.log("Technical check is BAD...");
                resolve();
            }, 2000)
    }).then(() => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let car = {
                    brand: "Honda",
                    model: "Civic",
                    bankCheck: true,
                    technicalCheck: true
                }
                console.log("Police check: ", car);
                // reject("Issue with documents...");
                resolve();
            }, 2000)
    }).then(() => {
        let car = {
            brand: "Honda",
            model: "Civic",
            bankCheck: true,
            technicalCheck: true,
            documentCheck: true
        }
        console.log("Congrats... you bought: ", car);
    })
}).catch(error => console.log(error));// сюда сразу якщо reject 