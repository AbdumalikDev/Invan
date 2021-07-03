export default {
    openapi: '3.0.3',
    info: {
        title: 'INVAN POS system API',
        description: 'INVAN POS system API Documentation',
        version: '1.0.0',
        contact: {
            name: 'Samandar'
        }
    },
    components: {
        securitySchemes: {
            JWT: {
                type: 'apiKey',
                description: 'JWT authorization of an API',
                name: 'Authorization',
                in: 'header'
            }
        },
        schemas: {
            'sms-already-sent': {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        default: false
                    },
                    messsage: {
                        type: 'string'
                    },
                    status: {
                        type: 'string'
                    },
                    time: {
                        type: 'number'
                    }
                },
                example: {
                    success: true,
                    status: 'sms',
                    message: 'SMS code already sent',
                    time: 1625124268056
                }
            },
            'new-already-sent': {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        default: false
                    },
                    messsage: {
                        type: 'string'
                    },
                    status: {
                        type: 'string'
                    },
                    time: {
                        type: 'number'
                    }
                },
                example: {
                    success: true,
                    status: 'sms',
                    message: 'new code already sent',
                    time: 1625124268056
                }
            }
        }
    },
    apis: ['**/*Route.js'],
    paths: {
        'employee/register': {
            post: {
                summary: 'Registration',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    phone_number: {
                                        type: 'string'
                                    },
                                    org_name: {
                                        type: 'string'
                                    },
                                    first_name: {
                                        type: 'string'
                                    },
                                    code: {
                                        type: 'string',
                                        description:
                                            'Should send with all fields after accepting sms code'
                                    }
                                },
                                example: {
                                    phone_number: '998935186780',
                                    org_name: 'Invan',
                                    first_name: 'Samandar',
                                    code: 'Send after accepting code with all fields'
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'OK code sent',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean'
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        time: {
                                            type: 'number'
                                        }
                                    },
                                    example: {
                                        success: true,
                                        status: 'sms',
                                        message: 'SMS code sent',
                                        time: 1625123982846
                                    }
                                }
                            }
                        }
                    },
                    '201': {
                        description: 'Created',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean'
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        token: {
                                            type: 'string'
                                        }
                                    },
                                    example: {
                                        success: true,
                                        status: 'emp',
                                        message: 'Employee Successfully Registered',
                                        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6Ijk1ZjI0YjBiLTUyZDEtNGY4Mi1iM2I1LTE2YjU3MDVjZTY5ZSIsInNlc3Npb25faWQiOiIwZDAyMDQ4NC0zYzY2LTRkZjAtOWQ4Ny02NjA5MTRhMTU5ZDIiLCJpYXQiOjE2MjUxMTkwMDJ9.P9a_Tdnf__9xawlQIF67a0Gm7gaiEMiepipKcEMVGng'
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'Bad Request',
                        content: {
                            'application/json': {
                                schema: {
                                    allOff: [
                                        { $ref: '#/components/schemas/sms-already-sent' },
                                        { $ref: '#/components/schemas/new-already-sent' }
                                    ]
                                }
                            }
                        }
                    },
                    '403': {
                        description: 'Forbidden',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            default: false
                                        },
                                        messsage: {
                                            type: 'string'
                                        },
                                        status: {
                                            type: 'string'
                                        }
                                    },
                                    example: {
                                        success: false,
                                        message: 'SMS code is incorrect',
                                        status: 'sms'
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        description: 'Unauthorized',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            default: false
                                        },
                                        messsage: {
                                            type: 'string'
                                        },
                                        status: {
                                            type: 'string'
                                        }
                                    },
                                    example: {
                                        success: false,
                                        message: 'You are banned till 12:34:57',
                                        status: 'ban'
                                    }
                                }
                            }
                        }
                    },
                    '409': {
                        description: 'Conflict',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            default: false
                                        },
                                        messsage: {
                                            type: 'string'
                                        },
                                        status: {
                                            type: 'string'
                                        }
                                    },
                                    examples: {}
                                }
                            }
                        }
                    },
                    '408': {
                        description: 'Conflict',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            default: false
                                        },
                                        messsage: {
                                            type: 'string'
                                        },
                                        status: {
                                            type: 'string'
                                        }
                                    },
                                    example: {
                                        success: false,
                                        message: 'Employee already exists',
                                        status: 'emp'
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Internal server error'
                    }
                }
            }
        }
    }
}
