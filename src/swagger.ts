import { number } from 'joi'

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
                                        },
                                        data: {
                                            type: 'object',
                                            properties: {
                                                name: {
                                                    type: 'object',
                                                    properties: {
                                                        last_name: {
                                                            type: 'string'
                                                        },
                                                        first_name: {
                                                            type: 'string'
                                                        }
                                                    }
                                                },
                                                age: {
                                                    type: 'string',
                                                    default: null
                                                },
                                                gender: {
                                                    type: 'string',
                                                    default: null
                                                },
                                                status: {
                                                    type: 'string',
                                                    default: 'admin'
                                                },
                                                is_shared: {
                                                    type: 'string',
                                                    default: true
                                                },
                                                avatar: {
                                                    type: 'string',
                                                    default: null
                                                },
                                                email: {
                                                    type: 'string',
                                                    default: null
                                                },
                                                state: {
                                                    type: 'string',
                                                    default: 'pending'
                                                },
                                                allow_sessions: {
                                                    type: 'number'
                                                },
                                                _id: {
                                                    type: 'string'
                                                },
                                                org_id: {
                                                    type: 'object',
                                                    properties: {
                                                        current_tarif: {
                                                            type: 'string'
                                                        },
                                                        _id: {
                                                            type: 'string'
                                                        },
                                                        org_name: {
                                                            type: 'string'
                                                        },
                                                        phone_number: {
                                                            type: 'number'
                                                        },
                                                        createdAt: {
                                                            type: 'string'
                                                        },
                                                        updatedAt: {
                                                            type: 'string'
                                                        }
                                                    }
                                                },
                                                owner_id: {
                                                    type: 'string'
                                                },
                                                phone_number: {
                                                    type: 'number'
                                                },
                                                sessions: {
                                                    type: 'array'
                                                },
                                                createdAt: {
                                                    type: 'string'
                                                },
                                                updated_at: {
                                                    type: 'string'
                                                }
                                            }
                                        },
                                        example: {
                                            success: true,
                                            status: 'emp',
                                            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6IjQwOTk3M2RhLTRkZWItNDE4Ny1hODdiLTVmZjM4OGViMzQyZSIsInNlc3Npb25faWQiOiI4MDE3MzYyOS1iMjExLTQ2ZDEtOTRjNC1lNThlYmIwNWVlNGQiLCJpYXQiOjE2MjUzOTU1ODZ9.m2uL-3170ocUIY0kCk_9SQ51budZ_gjrV0-f_RzMAtA',
                                            data: {
                                                name: {
                                                    last_name: 'Karimov',
                                                    first_name: 'Olim'
                                                },
                                                age: null,
                                                gender: null,
                                                status: 'admin',
                                                is_shared: true,
                                                avatar: '/employee/image/Invan/34822811-3938-4933-a844-2628b7eede8f.png',
                                                email: null,
                                                state: 'active',
                                                allow_sessions: 1,
                                                _id: '409973da-4deb-4187-a87b-5ff388eb342e',
                                                org_id: {
                                                    current_tarif: 'free',
                                                    _id: '999af55e-5ce3-47c6-9b0b-e6f6f4a9053c',
                                                    org_name: 'Invan',
                                                    phone_number: 998935186780,
                                                    createdAt: '2021-07-04T10:43:02.224Z',
                                                    updatedAt: '2021-07-04T10:43:02.224Z',
                                                    __v: 0
                                                },
                                                owner_id: 'ffbd6c9d-e4a4-4793-91fd-9a53196f93be',
                                                phone_number: 998935186785,
                                                sessions: [
                                                    {
                                                        user_agent:
                                                            'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.101 Safari/537.36',
                                                        ip_address: '213.230.79.37',
                                                        _id: '80173629-b211-46d1-94c4-e58ebb05ee4d',
                                                        created_at: '2021-07-04T10:46:26.685Z'
                                                    }
                                                ],
                                                createdAt: '2021-07-04T10:43:24.789Z',
                                                updatedAt: '2021-07-04T10:46:26.683Z',
                                                __v: 0
                                            }
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
                                        $ref: '#/components/schemas/sms-already-sent'
                                    }
                                }
                            }
                        },
                        '404': {
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
                                            message: 'Employee not found',
                                            status: 'emp'
                                        }
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
                        '403-banned': {
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
                        '403-sms-code-incorrect': {
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
                                            message: 'SMS code is incorrect',
                                            status: 'sms'
                                        }
                                    }
                                }
                            }
                        },
                        '409-employee-alredy-exist': {
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
                        '409-org-already-exist': {
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
                                            message: 'Organization already exists',
                                            status: 'org'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            'employee/login': {
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
                                        $ref: '#/components/schemas/sms-already-sent'
                                    }
                                }
                            }
                        },
                        '404': {
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
                                            message: 'Employee not found',
                                            status: 'emp'
                                        }
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
                        '403-banned': {
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
                        '403-sms-code-incorrect': {
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
                                            message: 'SMS code is incorrect',
                                            status: 'sms'
                                        }
                                    }
                                }
                            }
                        },
                        '409-employee-alredy-exist': {
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
                        '409-org-already-exist': {
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
                                            message: 'Organization already exists',
                                            status: 'org'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            'employee/logout': {
                get: {
                    summary: 'Log out',
                    security: [
                        {
                            JWT: []
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean'
                                            }
                                        },
                                        example: {
                                            success: true
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Bad request',
                            content: {
                                'application/json': {
                                    schema: {
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
                                            status: 'session',
                                            message: 'Cannot delete session'
                                        }
                                    }
                                }
                            }
                        },
                        '404-phone-not-found': {
                            description: 'Not found',
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
                                            message: 'Phone number is not found',
                                            status: 'phone'
                                        }
                                    }
                                }
                            }
                        },
                        '404-session-not-found': {
                            description: 'Not found',
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
                                            message: 'Session not found',
                                            status: 'sesssion'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            },
            'employee/create': {
                get: {
                    summary: 'Log out',
                    security: [
                        {
                            JWT: []
                        }
                    ],
                    responses: {
                        '200': {
                            description: 'OK',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            success: {
                                                type: 'boolean'
                                            }
                                        },
                                        example: {
                                            success: true
                                        }
                                    }
                                }
                            }
                        },
                        '400': {
                            description: 'Bad request',
                            content: {
                                'application/json': {
                                    schema: {
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
                                            status: 'session',
                                            message: 'Cannot delete session'
                                        }
                                    }
                                }
                            }
                        },
                        '404-phone-not-found': {
                            description: 'Not found',
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
                                            message: 'Phone number is not found',
                                            status: 'phone'
                                        }
                                    }
                                }
                            }
                        },
                        '404-session-not-found': {
                            description: 'Not found',
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
                                            message: 'Session not found',
                                            status: 'sesssion'
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
