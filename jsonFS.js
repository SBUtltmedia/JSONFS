const fs = require('fs');
const path = require("path")



class JSONFS {
    constructor(home = `${__dirname}/data/`) {
        this.home = home;

    }






    getJSON(dirPath=this.home, out="") {
        console.log(dirPath)
       const files = fs.readdirSync(dirPath)
        files.forEach((file)=> {
            let filePath= dirPath+file
            if (fs.statSync(filePath).isDirectory()) {
            this.getJSON(filePath+"/",out+file+".")

            } else {
                console.log(out,filePath)
            }
        })

     
    }
    dataType(jsonObj) {
        var dtype;
        if (jsonObj !== null && typeof jsonObj == "object") {
            if (Array.isArray(jsonObj)) {
                dtype = 'array';
            }
            else dtype = 'object';
        }
        else {
            dtype = 'string';
        }
        return dtype;

    }

    setJSON(jsonObj,passedObject ="") {
   
        if (jsonObj !== null && (this.dataType(jsonObj) == "object" || this.dataType(jsonObj) == "array")) {
           // let objectKey = "";
           // let outPath = jsonfsPath;

            Object.entries(jsonObj).forEach(([key, value]) => {
                // console.log(key,value,this.dataType(value))
         
                if (this.dataType(value) == "array") {
                   // outPath += key;
                }
                if (this.dataType(value) != "object" && this.dataType(value) != "array") {

              console.log(passedObject,key,value)
                
               
                    fs.mkdirSync(this.home + passedObject, { recursive: true });
                    fs.writeFileSync(this.home + passedObject+ key, value)
                   




                }
                else {

                    // console.log(jsonObj)
                    //outPath+= `${key}`;    
                    // if (this.dataType(jsonObj) == "object") {
                    //     objectKey = `${key}/`
                    // }
                   // console.log(outPath, objectKey)
                   
                 return    this.setJSON(value,passedObject+key+"/");
                }
            });
        }
    }
}

if (require.main === module) {
    let testData = {
        "title": {
            "plain": "Send Money"
        },
        "fieldset": [
            {
                "label": {
                    "plain": "Personal Info Section"
                },
                "fieldset": [
                    {
                        "field": [
                            {
                                "label": {
                                    "plain": "First Name"
                                },
                                "value": {
                                    "plain": "Bob"
                                },
                                "id": "a_1"
                            },
                            {
                                "label": {
                                    "plain": "Last Name"
                                },
                                "value": {
                                    "plain": "Hogan"
                                },
                                "id": "a_2"
                            }
                        ],
                        "id": "a_8"
                    }
                ],
                "id": "a_5"
            },
            {
                "label": {
                    "plain": "Billing Details Section"
                },
                "fieldset": {
                    "field": {
                        "choices": {
                            "choice": {
                                "label": {
                                    "plain": "Gift"
                                },
                                "id": "a_17",
                                "switch": ""
                            }
                        },
                        "label": {
                            "plain": "Choose a category:"
                        },
                        "value": {
                            "plain": "Gift"
                        },
                        "id": "a_14"
                    },
                    "fieldset": {
                        "label": {
                            "plain": ""
                        },
                        "field": [
                            {
                                "choices": {
                                    "choice": {
                                        "label": {
                                            "plain": "Other"
                                        },
                                        "id": "a_25",
                                        "switch": ""
                                    }
                                },
                                "label": {
                                    "plain": "Amount"
                                },
                                "value": {
                                    "plain": "Other" //(This could also be a dollar amount like 10.00)
                                },
                                "id": "a_21"
                            },
                            {
                                "label": {
                                    "plain": "Other Amount"
                                },
                                "value": {
                                    "plain": "200"
                                },
                                "id": "a_20"
                            }
                        ],
                        "id": "a_26"
                    },
                    "id": "a_13"
                },
                "id": "a_12"
            }
        ]
    }

    let jsonFS = new JSONFS();
    //jsonFS.setJSON(testData);
    jsonFS.getJSON();
}