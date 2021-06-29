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
                                    code:"Send after accepting code"
                                }
                            }
                        }
                    }
                },
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
                                        status: {
                                            type: "string"
                                        },
                                        message:{
                                            type:"string"
                                        },
                                        token:{
                                            type:"string"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '404': {
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
                                    }
                                },
                                example: {
                                    phone_number: "998935186780"
                                }
                            }
                        }
                    }
                },
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
                                        user:{
                                            type:"string"
                                        }
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