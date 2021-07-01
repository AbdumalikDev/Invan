export default {
    openapi: "3.0.3",
    info: {
        title: "INVAN POS system API",
        description: "INVAN POS system API Documentation",
        version: "1.0.0",
        contact: {
            name: "Samandar",
        },
    },
    components: {
        securitySchemes: {
            "JWT": {
                type: 'apiKey',
                description: 'JWT authorization of an API',
                name: 'Authorization',
                in: 'header',
            },
        },
    },
    apis: ["**/*Route.js"],
    paths: {
        "/employee/register": {
            post: {
                summary: "Registration",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    phone_number: {
                                        type: "string"
                                    },
                                    org_name: {
                                        type: "string"
                                    },
                                    first_name:{
                                        type:"string"
                                    },
                                    code:{
                                        type:"string",
                                        description:"Should send with all fields after accepting sms code"
                                    }
                                },
                                example: {
                                    phone_number: "998935186780",
                                    org_name:"Invan",
                                    first_name:"Samandar",
                                    code:"Send after accepting code with all fields"
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: "OK code sent",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean"
                                        },
                                        status: {
                                            type: "string"
                                        },
                                        message:{
                                            type:"string"
                                        },
                                        time:{
                                            type:"number"
                                        }
                                    },
                                    example:{
                                        success: true,
                                        status: "sms",
                                        message: "SMS code sent",
                                        time: 1625123982846
                                    }
                                }
                            }
                        }
                    },
                    '201': {
                        description: "Created",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean"
                                        },
                                        status: {
                                            type: "string"
                                        },
                                        message:{
                                            type:"string"
                                        },
                                        token:{
                                            type:"string"
                                        }
                                    },
                                    example:{
                                        success: true,
                                        status: "user",
                                        message: "User Successfully Registered",
                                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6Ijk1ZjI0YjBiLTUyZDEtNGY4Mi1iM2I1LTE2YjU3MDVjZTY5ZSIsInNlc3Npb25faWQiOiIwZDAyMDQ4NC0zYzY2LTRkZjAtOWQ4Ny02NjA5MTRhMTU5ZDIiLCJpYXQiOjE2MjUxMTkwMDJ9.P9a_Tdnf__9xawlQIF67a0Gm7gaiEMiepipKcEMVGng"
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            default: false
                                        },
                                        messsage: {
                                            type: "string"
                                        },
                                        status:{
                                            type:"string"
                                        },
                                        time:{
                                            type:"number"
                                        }
                                    },
                                    example:{
                                        success: true,
                                        status: "sms",
                                        message: "SMS code already sent",
                                        time: 1625124268056
                                    }
                                }
                            }
                        }
                    },
                    '403': {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            default: false
                                        },
                                        messsage: {
                                            type: "string"
                                        },
                                        status:{
                                            type:"string"
                                        }
                                    },
                                    example:{
                                        success: false,
                                        message: "SMS code is incorrect",
                                        status: "sms"
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        description: "Authorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            default: false
                                        },
                                        messsage: {
                                            type: "string"
                                        },
                                        status:{
                                            type:"string"
                                        }
                                    },
                                    example:{
                                        success: false,
                                        message: "You are banned till 12:34:57",
                                        status: "ban"
                                    }
                                }
                            }
                        }
                    },
                    '409': {
                        description: "",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            default: false
                                        },
                                        messsage: {
                                            type: "string"
                                        },
                                        status:{
                                            type:"string"
                                        }
                                    },
                                    example:{
                                        success: false,
                                        message: "User already exists",
                                        status: "org"
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal server error"
                    },
                }
            }
        },
        "/employee/login": {
            post: {
                summary: "Login",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    phone_number: {
                                        type: "string"
                                    },
                                    code:{
                                        type:"string",
                                        description:"Should send with all fields after accepting sms code"
                                    }
                                },
                                example: {
                                    phone_number: "998935186780",
                                    code:"Send after accepting code with all fields"
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: "OK code sent",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean"
                                        },
                                        status: {
                                            type: "string"
                                        },
                                        message:{
                                            type:"string"
                                        },
                                        time:{
                                            type:"number"
                                        }
                                    },
                                    example:{
                                        success: true,
                                        status: "sms",
                                        message: "SMS code sent",
                                        time: 1625123982846
                                    }
                                }
                            }
                        }
                    },
                    '201': {
                        description: "OK Signed in",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean"
                                        },
                                        token: {
                                            type: "string"
                                        },
                                        status:{
                                            type:"string"
                                        }
                                    },
                                    example:{
                                        success: true,
                                        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llFV9pZCI6IjY0NjIzYmM4LTcyNDEtNGZiNS05MzcyLTlkYWM1Njc5YTc1ZCIsInNlc3Npb25faWQiOiJmYTdkMGY0OC05N2RjLTQ2ZjQtOGFmZC1lMmYwM2NjNWQ2ODQiLCJpYXQiOjE2MjUxMjU5NzB9.vL1WcpAaGx3Un4S-rAb8eRka64FYMm2iox8b-yeNdBo",
                                        status: "employee"
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        description: "Authorized",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            default: false
                                        },
                                        messsage: {
                                            type: "string"
                                        },
                                        status:{
                                            type:"string"
                                        }
                                    },
                                    example:{
                                        success: false,
                                        message: "You are banned till 12:34:57",
                                        status: "ban"
                                    }
                                }
                            }
                        }
                    },
                    '409': {
                        description: "Conflict",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            default: false
                                        },
                                        messsage: {
                                            type: "string"
                                        },
                                        status:{
                                            type:"string"
                                        }
                                    },
                                    example:{
                                        success: false,
                                        message: 'Employee already exist',
                                        status: "emp"
                                    }
                                }
                            }
                        }
                    },
                    '403': {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            default: false
                                        },
                                        messsage: {
                                            type: "string"
                                        },
                                        status:{
                                            type:"string"
                                        }
                                    },
                                    example:{
                                        success: false,
                                        message: "SMS code is incorrect",
                                        status: "sms"
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            default: false
                                        },
                                        messsage: {
                                            type: "string"
                                        },
                                        status:{
                                            type:"string"
                                        }
                                    },
                                    example:{
                                        success: false,
                                        message: "Your account is not active",
                                        status: "account"
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal server error"
                    }
                }
            }
        },
        "/employee/create": {
            post: {
                summary: "Create Employee",
                requestBody: {
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    phone_number: {
                                        type: "string",
                                        required:true
                                    },
                                    code:{
                                        type:"string",
                                        description:"Should send with all fields after accepting sms code"
                                    }
                                },
                                required:{
                                    "phone_number":true
                                },
                                example: {
                                    phone_number: "998935186780",
                                    code:"Send after accepting code with all fields"
                                }
                            }
                        }
                    }
                },
                /*
                    {
                        "success": true,
                        "message": "Employee activated",
                        "status": "employee"
                    }
                */
                responses: {
                    '200': {
                        description: "OK",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean"
                                        },
                                        token: {
                                            type: "string"
                                        },
                                        status:{
                                            type:"string"
                                        }
                                    },
                                    example:{
                                        success: true,
                                        message: "Activation link sent",
                                        status: "link",
                                        link: "http://192.168.1.129:3000/employee/activate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZP9pZCI6IjU4YWMxMzA4LWIwZTgtNDljYy04ODFkLWIyMGM5NzBiOWQ0MCIsImlhdCI6MTYyNTEzMTkyMX0.58E8I5C4-YYwc0Q3G0FN8Fj0Qn8LQELlPhc7xA5A9E0"
                                    }
                                }
                            }
                        }
                    },
                    '405': {
                        description: "Method not allowed",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            default: false
                                        },
                                        messsage: {
                                            type: "string"
                                        },
                                        status:{
                                            type:"string"
                                        }
                                    },
                                    example:{
                                        success: false,
                                        message:  "You do not have permission.",
                                        status: 'emp'
                                    }
                                }
                            }
                        }
                    },
                    '409': {
                        description: "Forbidden",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            default: false
                                        },
                                        messsage: {
                                            type: "string"
                                        },
                                        status:{
                                            type:"string"
                                        }
                                    },
                                    example:{
                                        success: false,
                                        message: "Employee already exist",
                                        status: "emp"
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: "Bad Request",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        success: {
                                            type: "boolean",
                                            default: false
                                        },
                                        messsage: {
                                            type: "string"
                                        },
                                        status:{
                                            type:"string"
                                        }
                                    },
                                    example:{
                                        success: false,
                                        message: "Your account is not active",
                                        status: "account"
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: "Internal server error"
                    }
                }
            }
        }
    }
}
