export default {
    openapi: '3.0.3',
    info: {
        title: 'INVAN POS system API',
        description: 'INVAN POS system API Documentation',
        version: '1.0.2',
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
            'common-error': {
                type: 'object',
                properties: {
                    success: {
                        type: 'boolean',
                        default: false
                    },
                    message: {
                        type: 'string'
                    },
                    status: {
                        type: 'string'
                    }
                }
            },
            'sms-sent': {
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
                }
            },
            'login-sucess-data': {
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
                    }
                }
            }
        },
        examples: {
            'sms-code-incorrect': {
                value: {
                    success: false,
                    message: 'SMS code is incorrect',
                    status: 'sms'
                }
            },
            'emp-already-exist': {
                value: {
                    success: false,
                    message: 'Employee already exists',
                    status: 'emp'
                }
            },
            'org-already-exist': {
                value: {
                    success: false,
                    message: 'Organization already exists',
                    status: 'org'
                }
            },
            'user-banned': {
                value: {
                    success: false,
                    message: 'You are banned till 12:34:57',
                    status: 'ban'
                }
            },
            'sms-code-already-sent': {
                value: {
                    success: true,
                    status: 'sms',
                    message: 'SMS code already sent',
                    time: 1625124268056
                }
            },
            'sms-code-sent': {
                value: {
                    success: true,
                    status: 'sms',
                    message: 'SMS code sent',
                    time: 1625123982846
                }
            },
            'employee-not-found': {
                value: {
                    success: false,
                    message: 'Employee not found',
                    status: 'emp'
                }
            },
            'session-not-found': {
                value: {
                    success: false,
                    message: 'Session not found',
                    status: 'session'
                }
            },
            'token-not-found': {
                value: {
                    success: false,
                    message: 'Token not found',
                    status: 'token'
                }
            },
            'login-data': {
                value: {
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
                            updatedAt: '2021-07-04T10:43:02.224Z'
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
                        updatedAt: '2021-07-04T10:46:26.683Z'
                    }
                }
            },
            'phone-already-exist': {
                value: {
                    success: false,
                    status: 'phone number',
                    message: 'Phone number already exist'
                }
            },
            'cant-edit-super-admin': {
                value: {
                    success: false,
                    status: 'edit super admin',
                    message: 'You can not edit super admin'
                }
            },
            'cant-delete-owner': {
                value: {
                    success: false,
                    status: 'delete owner',
                    message: 'You can not delete your owner'
                }
            },
            'cant-delete-self': {
                value: {
                    success: false,
                    status: 'self delete',
                    message: 'You can not delete your self'
                }
            },
            'cant-delete-sub-cat': {
                value: {
                    success: false,
                    message: 'Sorry this category is being used in sub_categories',
                    status: 'category'
                }
            },
            'cant-delete-product-cat': {
                value: {
                    success: false,
                    message: 'Sorry this category is being used in products',
                    status: 'category'
                }
            }
        },
        responses: {
            'employee-register-success': {
                description: 'OK',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/sms-sent'
                        },
                        examples: {
                            'sms-code-already-sent': {
                                $ref: '#/components/examples/sms-code-already-sent'
                            },
                            'sms-code-sent': {
                                $ref: '#/components/examples/sms-code-sent'
                            }
                        }
                    }
                }
            },
            'employee-organization-alredy-exist': {
                description: 'Conflict',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/common-error'
                        },
                        examples: {
                            'org-already-exist': {
                                $ref: '#/components/examples/org-already-exist'
                            },
                            'emp-already-exist': {
                                $ref: '#/components/examples/emp-already-exist'
                            }
                        }
                    }
                }
            },
            'user-banned-code-incorrect': {
                description: 'Forbidden',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/common-error'
                        },
                        examples: {
                            'user-banned': {
                                $ref: '#/components/examples/user-banned'
                            },
                            'sms-code-incorrect': {
                                $ref: '#/components/examples/sms-code-incorrect'
                            }
                        }
                    }
                }
            },
            'unauthorized-user': {
                description: 'Unauthorized',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/common-error'
                        },
                        examples: {
                            'employee-not-found': {
                                $ref: '#/components/examples/employee-not-found'
                            },
                            'session-not-found': {
                                $ref: '#/components/examples/session-not-found'
                            },
                            'token-not-found': {
                                $ref: '#/components/examples/token-not-found'
                            }
                        }
                    }
                }
            },
            'code-sent-token-user-data': {
                description: 'OK',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/login-sucess-data'
                        },
                        examples: {
                            'sms-code-sent': {
                                $ref: '#/components/examples/sms-code-sent'
                            },
                            'login-data': {
                                $ref: '#/components/examples/login-data'
                            }
                        }
                    }
                }
            },
            'cant-edit-phone-already-exist': {
                description: 'Forbidden',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/common-error'
                        },
                        examples: {
                            'phone-already-exist': {
                                $ref: '#/components/examples/phone-already-exist'
                            },
                            'cant-edit-super-admin': {
                                $ref: '#/components/examples/cant-edit-super-admin'
                            }
                        }
                    }
                }
            },
            'cant-delete-self-owner': {
                description: 'Forbidden',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/common-error'
                        },
                        examples: {
                            'cant-delete-self': {
                                $ref: '#/components/examples/cant-delete-self'
                            },
                            'cant-delete-owner': {
                                $ref: '#/components/examples/cant-delete-owner'
                            }
                        }
                    }
                }
            },
            'category-is-beingused': {
                description: 'Bad request',
                content: {
                    'application/json': {
                        schema: {
                            $ref: '#/components/schemas/common-error'
                        },
                        examples: {
                            'cant-delete-product-cat': {
                                $ref: '#/components/examples/cant-delete-product-cat'
                            },
                            'cant-delete-sub-cat': {
                                $ref: '#/components/examples/cant-delete-sub-cat'
                            }
                        }
                    }
                }
            }
        }
    },
    tags: ['Employee', 'Product', 'Unit', 'Category', 'Item', 'Contractor'],
    apis: ['**/*Route.js'],
    paths: {
        '/employee/register': {
            post: {
                summary: 'Registration',
                tags: ['Employee'],
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
                        $ref: '#/components/responses/employee-register-success'
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
                                                updatedAt: '2021-07-04T10:43:02.224Z'
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
                                            updatedAt: '2021-07-04T10:46:26.683Z'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '409': {
                        $ref: '#/components/responses/employee-organization-alredy-exist'
                    },
                    '403': {
                        $ref: '#/components/responses/user-banned-code-incorrect'
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/employee/login': {
            post: {
                summary: 'Login',
                tags: ['Employee'],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    phone_number: {
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
                                    code: 'Send after accepting code with all fields'
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        $ref: '#/components/responses/code-sent-token-user-data'
                    },
                    '403': {
                        $ref: '#/components/responses/user-banned-code-incorrect'
                    },
                    '400': {
                        description: 'Bad request',
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
                                        message: 'Your account is not active',
                                        status: 'account'
                                    }
                                }
                            }
                        }
                    },
                    '404': {
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
                                        message: 'Employee not found',
                                        status: 'emp'
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
                                        message: {
                                            type: 'string'
                                        },
                                        status: {
                                            type: 'string'
                                        }
                                    },
                                    example: {
                                        success: false,
                                        message: 'SMS code not found!',
                                        status: 'sms'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/employee/logout': {
            get: {
                summary: 'Log out',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Employee'],
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
                    }
                }
            }
        },
        '/employee/create': {
            post: {
                summary: 'Create employee',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Employee'],
                requestBody: {
                    required: true,
                    content: {
                        'multipart/form-data': {
                            schema: {
                                type: 'object',
                                properties: {
                                    file: {
                                        type: 'string',
                                        format: 'binary'
                                    },
                                    first_name: {
                                        type: 'string',
                                        requried: true
                                    },
                                    last_name: {
                                        type: 'string'
                                    },
                                    age: {
                                        type: 'string'
                                    },
                                    gender: {
                                        type: 'string'
                                    },
                                    email: {
                                        type: 'string'
                                    },
                                    allow_sessions: {
                                        type: 'string'
                                    },
                                    phone_number: {
                                        type: 'string',
                                        required: true
                                    }
                                }
                            }
                        }
                    }
                },
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
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        link: {
                                            type: 'string'
                                        }
                                    },
                                    example: {
                                        success: true,
                                        message: 'Activation link sent',
                                        status: 'link',
                                        link: `https://invan-pos-updated.herokuapp.com/employee/activate/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbXBsb3llZV9pZCI6Ijc0MDI0NDI5LWY5ZmYtNGM3OC1hMmEyLTQ5YWRiMTZjMmMyMSIsImlhdCI6MTYyNTM4MjcxNn0.FrwbeW4-3ruiXWOKcaTmLX_4InoriADq-AQ9S8vJ2TQ`
                                    }
                                }
                            }
                        }
                    },
                    '409': {
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
                                        status: 'phone number',
                                        message: 'Phone number already exist'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/employee/activate/{token}': {
            get: {
                summary: 'Check Link and Activate Employee',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Employee'],
                parameters: [
                    {
                        in: 'path',
                        name: 'token',
                        required: true,
                        schema: {
                            type: 'string'
                        }
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
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        status: {
                                            type: 'string'
                                        }
                                    },
                                    example: {
                                        success: true,
                                        message: 'Employee activated',
                                        status: 'emp'
                                    }
                                }
                            }
                        }
                    },
                    '404': {
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
                                        status: 'emp',
                                        message: 'Employee not found'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/employee/all': {
            get: {
                summary: 'Get all employee',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Employee'],
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
                                        }
                                    },
                                    example: {
                                        success: true,
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
                                                updatedAt: '2021-07-04T10:43:02.224Z'
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
                                            updatedAt: '2021-07-04T10:46:26.683Z'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '404': {
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
                                        status: 'emps',
                                        message: 'Employees not found'
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/employee/edit/{id}': {
            put: {
                summary: 'Edit Employee',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Employee'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'multipart/form-data': {
                            schema: {
                                type: 'object',
                                properties: {
                                    file: {
                                        type: 'string',
                                        format: 'binary'
                                    },
                                    first_name: {
                                        type: 'string',
                                        requried: true
                                    },
                                    last_name: {
                                        type: 'string'
                                    },
                                    age: {
                                        type: 'string'
                                    },
                                    gender: {
                                        type: 'string'
                                    },
                                    email: {
                                        type: 'string'
                                    },
                                    allow_sessions: {
                                        type: 'string'
                                    },
                                    phone_number: {
                                        type: 'string',
                                        required: true
                                    }
                                }
                            }
                        }
                    }
                },
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
                                        }
                                    },
                                    example: {
                                        success: true,
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
                                                updatedAt: '2021-07-04T10:43:02.224Z'
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
                                            updatedAt: '2021-07-04T10:46:26.683Z'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        $ref: '#/components/responses/cant-edit-phone-already-exist'
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            },
            get: {
                summary: 'Get Specific Employee Data',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Employee'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        }
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
                                                updatedAt: '2021-07-04T10:43:02.224Z'
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
                                            updatedAt: '2021-07-04T10:46:26.683Z'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/employee/delete': {
            delete: {
                summary: 'Delete employees',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Employee'],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    employess: {
                                        type: 'array',
                                        default: [
                                            {
                                                type: 'string'
                                            }
                                        ]
                                    }
                                },
                                example: {
                                    employees: [
                                        '80173629-b211-46d1-94c4-e58ebb05ee4d',
                                        '80173629-b211-46d1-94c4-e58ebb05ee43'
                                    ]
                                }
                            }
                        }
                    }
                },
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
                                        },
                                        data: {
                                            type: 'array',
                                            default: [
                                                {
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
                                                }
                                            ]
                                        }
                                    },
                                    example: [
                                        {
                                            success: true,
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
                                                    updatedAt: '2021-07-04T10:43:02.224Z'
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
                                                updatedAt: '2021-07-04T10:46:26.683Z'
                                            }
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    '404': {
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
                                        status: 'emps',
                                        message: 'Employees not found'
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        $ref: '#/components/responses/cant-delete-self-owner'
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/product/create': {
            post: {
                summary: 'Create Product',
                tags: ['Product'],
                security: [
                    {
                        JWT: []
                    }
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        required: true
                                    },
                                    description: {
                                        type: 'string'
                                    },
                                    first_name: {
                                        type: 'string'
                                    },
                                    bar_code: {
                                        type: 'string'
                                    },
                                    SKU: {
                                        type: 'string'
                                    },
                                    unit: {
                                        type: 'string'
                                    },
                                    category: {
                                        type: 'string'
                                    },
                                    weight: {
                                        type: 'number'
                                    },
                                    volume: {
                                        type: 'number'
                                    },
                                    VAT: {
                                        type: 'number'
                                    }
                                },
                                example: {
                                    name: 'Olma',
                                    description: 'Olma juda foydali meva',
                                    bar_code: '111111111',
                                    SKU: '22222222',
                                    vendor_code: '333333',
                                    weight: 10
                                }
                            }
                        }
                    }
                },
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        product: {
                                            type: 'object',
                                            properties: {
                                                is_shared: {
                                                    type: 'boolean'
                                                },
                                                update_history: {
                                                    type: 'array',
                                                    default: []
                                                },
                                                org_id: {
                                                    type: 'string'
                                                },
                                                emp_id: {
                                                    type: 'string'
                                                },
                                                name: {
                                                    type: 'string'
                                                },
                                                description: {
                                                    type: 'string'
                                                },
                                                bar_code: {
                                                    type: 'string'
                                                },
                                                SKU: {
                                                    type: 'string'
                                                },
                                                vendor_code: {
                                                    type: 'string'
                                                },
                                                weight: {
                                                    type: 'number'
                                                },
                                                volume: {
                                                    type: 'string'
                                                },
                                                _id: {
                                                    type: 'string'
                                                },
                                                createdAt: {
                                                    type: 'string'
                                                },
                                                updatedAt: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'product',
                                    message: 'Product has been successfully created',
                                    product: {
                                        is_shared: true,
                                        update_history: [],
                                        org_id: 'b705ff24-6aaa-4dc7-a433-a872fa72ef8e',
                                        emp_id: 'c3f76eee-372e-4b85-9102-bda28ade896b',
                                        name: 'Olma',
                                        description: 'Olma juda foydali meva',
                                        bar_code: '111111111',
                                        SKU: '22222222',
                                        vendor_code: '333333',
                                        weight: 10,
                                        volume: null,
                                        _id: '964a1d36-a05d-4b31-9666-e20891c1861d',
                                        createdAt: '2021-07-23T08:19:49.934Z',
                                        updatedAt: '2021-07-23T08:19:49.934Z',
                                        __v: 0
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/product/all': {
            get: {
                summary: 'Get All Products',
                tags: ['Product'],
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        products: {
                                            type: 'array',
                                            default: [
                                                {
                                                    type: 'object',
                                                    properties: {
                                                        is_shared: {
                                                            type: 'boolean'
                                                        },
                                                        update_history: {
                                                            type: 'array',
                                                            default: []
                                                        },
                                                        org_id: {
                                                            type: 'string'
                                                        },
                                                        emp_id: {
                                                            type: 'string'
                                                        },
                                                        name: {
                                                            type: 'string'
                                                        },
                                                        description: {
                                                            type: 'string'
                                                        },
                                                        bar_code: {
                                                            type: 'string'
                                                        },
                                                        SKU: {
                                                            type: 'string'
                                                        },
                                                        vendor_code: {
                                                            type: 'string'
                                                        },
                                                        weight: {
                                                            type: 'number'
                                                        },
                                                        volume: {
                                                            type: 'string'
                                                        },
                                                        _id: {
                                                            type: 'string'
                                                        },
                                                        createdAt: {
                                                            type: 'string'
                                                        },
                                                        updatedAt: {
                                                            type: 'string'
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'product',
                                    message: 'All products',
                                    products: [
                                        {
                                            is_shared: true,
                                            update_history: [],
                                            _id: 'c13409ef-7e83-4d53-b6e2-2cacc10adcc1',
                                            org_id: 'b705ff24-6aaa-4dc7-a433-a872fa72ef8e',
                                            emp_id: 'c3f76eee-372e-4b85-9102-bda28ade896b',
                                            name: 'Olma',
                                            description: 'Olma juda foydali meva',
                                            bar_code: '111111111',
                                            SKU: '22222222',
                                            vendor_code: '333333',
                                            weight: 10,
                                            volume: null,
                                            createdAt: '2021-07-23T08:17:38.519Z',
                                            updatedAt: '2021-07-23T08:17:38.519Z',
                                            __v: 0
                                        },
                                        {
                                            is_shared: true,
                                            update_history: [],
                                            _id: '964a1d36-a05d-4b31-9666-e20891c1861d',
                                            org_id: 'b705ff24-6aaa-4dc7-a433-a872fa72ef8e',
                                            emp_id: 'c3f76eee-372e-4b85-9102-bda28ade896b',
                                            name: 'Olma',
                                            description: 'Olma juda foydali meva',
                                            bar_code: '111111111',
                                            SKU: '22222222',
                                            vendor_code: '333333',
                                            weight: 10,
                                            volume: null,
                                            createdAt: '2021-07-23T08:19:49.934Z',
                                            updatedAt: '2021-07-23T08:19:49.934Z',
                                            __v: 0
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/product/update/{id}': {
            patch: {
                summary: 'Update Product',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Product'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        required: true
                                    },
                                    description: {
                                        type: 'string'
                                    },
                                    bar_code: {
                                        type: 'string'
                                    },
                                    SKU: {
                                        type: 'string'
                                    },
                                    vendor_code: {
                                        type: 'string'
                                    },
                                    weight: {
                                        type: 'number'
                                    }
                                },
                                example: {
                                    name: 'Qovun',
                                    description: 'Qovun juda foydali.',
                                    bar_code: '111111111',
                                    SKU: '22222222',
                                    vendor_code: '333333',
                                    weight: 15
                                }
                            }
                        }
                    }
                },
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        product: {
                                            type: 'object',
                                            properties: {
                                                is_shared: {
                                                    type: 'boolean'
                                                },
                                                update_history: {
                                                    type: 'array',
                                                    default: []
                                                },
                                                org_id: {
                                                    type: 'string'
                                                },
                                                emp_id: {
                                                    type: 'string'
                                                },
                                                name: {
                                                    type: 'string'
                                                },
                                                description: {
                                                    type: 'string'
                                                },
                                                bar_code: {
                                                    type: 'string'
                                                },
                                                SKU: {
                                                    type: 'string'
                                                },
                                                vendor_code: {
                                                    type: 'string'
                                                },
                                                weight: {
                                                    type: 'number'
                                                },
                                                volume: {
                                                    type: 'string'
                                                },
                                                _id: {
                                                    type: 'string'
                                                },
                                                createdAt: {
                                                    type: 'string'
                                                },
                                                updatedAt: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'product',
                                    message: 'Product has been successfully updated',
                                    product: {
                                        is_shared: null,
                                        update_history: [],
                                        _id: '9e0695f0-4bd4-41c8-ba47-9968646023a2',
                                        org_id: 'ed95f144-a1c6-492b-b5b1-d2d70f8f026b',
                                        emp_id: '87360ca8-3160-4e1d-8bc9-e8950544fc3d',
                                        name: 'Qovun',
                                        description: 'Qovun juda foydali.',
                                        bar_code: '111111111',
                                        SKU: '22222222',
                                        vendor_code: '333333',
                                        weight: 15,
                                        createdAt: '2021-07-23T10:26:20.905Z',
                                        updatedAt: '2021-07-23T11:08:23.168Z',
                                        __v: 0,
                                        category: null,
                                        unit: null,
                                        VAT: null,
                                        volume: null
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    },
                    '404': {
                        description: 'Not Found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/common-error'
                                },
                                example: {
                                    success: false,
                                    message: 'Product not found',
                                    status: 'product'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/product/delete': {
            delete: {
                summary: 'Delete Product',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Product'],
                requestBody: {},
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
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        status: {
                                            type: 'string'
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    message: 'Product has been successfully deleted',
                                    status: 'product'
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    },
                    '404': {
                        description: 'Not Found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/common-error'
                                },
                                example: {
                                    success: false,
                                    message: 'Product not found',
                                    status: 'product'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/unit/create': {
            post: {
                summary: 'Create Unit',
                tags: ['Unit'],
                security: [
                    {
                        JWT: []
                    }
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        required: true
                                    },
                                    full_name: {
                                        type: 'string',
                                        required: true
                                    }
                                }
                            },
                            example: {
                                name: 'kg',
                                full_name: 'kilogram'
                            }
                        }
                    }
                },
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        unit: {
                                            type: 'object',
                                            properties: {
                                                developer: {
                                                    type: 'boolean',
                                                    default: false
                                                },
                                                org_id: {
                                                    type: 'string'
                                                },
                                                name: {
                                                    type: 'string'
                                                },
                                                full_name: {
                                                    type: 'string'
                                                },
                                                _id: {
                                                    type: 'string'
                                                },
                                                createdAt: {
                                                    type: 'string'
                                                },
                                                updatedAt: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'unit',
                                    message: 'Unit has been successfully created',
                                    unit: {
                                        developer: false,
                                        org_id: 'ed95f144-a1c6-492b-b5b1-d2d70f8f026b',
                                        name: 'kg',
                                        full_name: 'kilogram',
                                        _id: 'f283664a-ccdb-4ff6-ad4a-97e489600f8e',
                                        createdAt: '2021-07-24T05:05:55.913Z',
                                        updatedAt: '2021-07-24T05:05:55.913Z'
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/unit/{id}': {
            get: {
                summary: 'Get Specific Unit',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Unit'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        }
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        unit: {
                                            type: 'object',
                                            properties: {
                                                _id: {
                                                    type: 'string'
                                                },
                                                name: {
                                                    type: 'string'
                                                },
                                                full_name: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        success: true,
                                        status: 'unit',
                                        message: 'Unit found',
                                        unit: {
                                            _id: 'f283664a-ccdb-4ff6-ad4a-97e489600f8e',
                                            name: 'kg',
                                            full_name: 'kilogram'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    },
                    '404': {
                        description: 'Not Found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            default: false
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        status: {
                                            type: 'string'
                                        }
                                    },
                                    example: {
                                        success: false,
                                        message: 'Unit not found',
                                        status: 'unit'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/unit/update/{id}': {
            patch: {
                summary: 'Update Unit',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Unit'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string'
                                    },
                                    full_name: {
                                        type: 'string'
                                    }
                                }
                            },
                            example: {
                                name: 'kg',
                                full_name: 'kilogramm'
                            }
                        }
                    }
                },
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        unit: {
                                            type: 'object',
                                            properties: {
                                                _id: {
                                                    type: 'string'
                                                },
                                                name: {
                                                    type: 'array',
                                                    default: []
                                                },
                                                full_name: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'unit',
                                    message: 'Unit has been updated',
                                    unit: {
                                        _id: 'f283664a-ccdb-4ff6-ad4a-97e489600f8e',
                                        name: 'kg',
                                        full_name: 'kilogramm'
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    },
                    '404': {
                        description: 'Not Found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/common-error'
                                },
                                example: {
                                    success: false,
                                    message: 'Product not found',
                                    status: 'product'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/unit/delete': {
            delete: {
                summary: 'Delete Unit(s)',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Unit'],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    ids: {
                                        type: 'array',
                                        default: [
                                            {
                                                type: 'string'
                                            }
                                        ]
                                    }
                                },
                                example: {
                                    ids: ['25437aba-73d2-4d68-b212-9603a7ec220b']
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'object'
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        units: {
                                            type: 'array',
                                            default: [
                                                {
                                                    type: 'object',
                                                    properties: {
                                                        developer: {
                                                            type: 'boolean'
                                                        },
                                                        _id: {
                                                            type: 'string'
                                                        },
                                                        name: {
                                                            type: 'string'
                                                        },
                                                        full_name: {
                                                            type: 'string'
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'unit',
                                    message: 'Units has been deleted',
                                    units: [
                                        {
                                            developer: true,
                                            _id: 'da0f1a2a-2dc5-45d8-b977-73a217647905',
                                            name: 'kg',
                                            full_name: 'kilogramm'
                                        },
                                        {
                                            developer: true,
                                            _id: 'b1a336a1-168d-425a-b7aa-a0179244685e',
                                            name: 'g',
                                            full_name: 'gramm'
                                        },
                                        {
                                            developer: true,
                                            _id: 'cf330e73-81cf-44a9-bcab-a7f98061eba0',
                                            name: 'l',
                                            full_name: 'litr'
                                        },
                                        {
                                            developer: false,
                                            _id: '08271309-7218-430b-b9c7-b306c89047bd',
                                            name: 't',
                                            full_name: 'tonna'
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/unit/all': {
            get: {
                summary: 'Get All Units',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Unit'],
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        units: [
                                            {
                                                type: 'object',
                                                properties: {
                                                    developer: {
                                                        type: 'boolean'
                                                    },
                                                    _id: {
                                                        type: 'string'
                                                    },
                                                    name: {
                                                        type: 'string'
                                                    },
                                                    full_name: {
                                                        type: 'string'
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'unit',
                                    message: 'All units',
                                    units: [
                                        {
                                            developer: true,
                                            _id: 'da0f1a2a-2dc5-45d8-b977-73a217647905',
                                            name: 'kg',
                                            full_name: 'kilogramm'
                                        },
                                        {
                                            developer: true,
                                            _id: 'b1a336a1-168d-425a-b7aa-a0179244685e',
                                            name: 'g',
                                            full_name: 'gramm'
                                        },
                                        {
                                            developer: true,
                                            _id: 'cf330e73-81cf-44a9-bcab-a7f98061eba0',
                                            name: 'l',
                                            full_name: 'litr'
                                        },
                                        {
                                            developer: false,
                                            _id: '08271309-7218-430b-b9c7-b306c89047bd',
                                            name: 't',
                                            full_name: 'tonna'
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/category/create': {
            post: {
                summary: 'Create category',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Category'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {}
                            },
                            example: {
                                name: 'Muzqaymoqlar',
                                sub_categories: 'vazira'
                            }
                        }
                    }
                },
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        category: {
                                            type: 'object',
                                            properties: {
                                                sub_categories: {
                                                    type: 'array',
                                                    default: []
                                                },
                                                org_id: {
                                                    type: 'string'
                                                },
                                                name: {
                                                    type: 'string'
                                                },
                                                _id: {
                                                    type: 'string'
                                                },
                                                createdAt: {
                                                    type: 'string'
                                                },
                                                updatedAt: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'category',
                                    message: 'Category has been successfully created',
                                    category: {
                                        sub_categories: [],
                                        org_id: '50653f3d-bcef-458a-83cb-2e9f1ed62517',
                                        name: 'Muzqaymoqlar',
                                        _id: 'ccf5d1dd-3d2a-4422-b9fb-6f5a5cbe226e',
                                        createdAt: '2021-07-24T11:06:13.910Z',
                                        updatedAt: '2021-07-24T11:06:13.910Z'
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/category/{id}': {
            get: {
                summary: 'Get Specific Category',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Category'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        }
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        category: {
                                            type: 'object',
                                            properties: {
                                                sub_categories: {
                                                    type: 'array',
                                                    default: []
                                                },
                                                _id: {
                                                    type: 'string'
                                                },
                                                name: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        success: true,
                                        status: 'category',
                                        message: 'One category',
                                        category: {
                                            sub_categories: [],
                                            _id: 'ccf5d1dd-3d2a-4422-b9fb-6f5a5cbe226e',
                                            name: 'Muzqaymoqlar'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    },
                    '404': {
                        description: 'Not Found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            default: false
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        status: {
                                            type: 'string'
                                        }
                                    },
                                    example: {
                                        success: false,
                                        message: 'Category not found',
                                        status: 'category'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/category/all': {
            get: {
                summary: 'Get All Categories',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Category'],
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        categories: [
                                            {
                                                type: 'array',
                                                default: [
                                                    {
                                                        type: 'object',
                                                        properties: {
                                                            sub_categories: {
                                                                type: 'array',
                                                                default: []
                                                            },
                                                            _id: {
                                                                type: 'string'
                                                            },
                                                            name: {
                                                                type: 'string'
                                                            }
                                                        }
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'category',
                                    message: 'All categories',
                                    categories: [
                                        {
                                            sub_categories: [],
                                            _id: 'ccf5d1dd-3d2a-4422-b9fb-6f5a5cbe226e',
                                            name: 'Muzqaymoqlar'
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/category/update/{id}': {
            patch: {
                summary: 'Update Category',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Category'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string'
                                    }
                                }
                            },
                            example: {
                                name: 'Muzqaymoqlar(Ice Creams)'
                            }
                        }
                    }
                },
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        category: {
                                            type: 'object',
                                            properties: {
                                                sub_categories: {
                                                    type: 'array',
                                                    default: []
                                                },
                                                _id: {
                                                    type: 'string'
                                                },
                                                name: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'category',
                                    message: 'Category has been successfully updated',
                                    category: {
                                        sub_categories: null,
                                        _id: 'ccf5d1dd-3d2a-4422-b9fb-6f5a5cbe226e',
                                        name: 'Muzqaymoqlar(Ice Creams)'
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    },
                    '404': {
                        description: 'Not Found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/common-error'
                                },
                                example: {
                                    success: false,
                                    message: 'Category not found',
                                    status: 'category'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/category/delete': {
            delete: {
                summary: 'Delete Unit(s)',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Category'],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    sub_categories: {
                                        type: 'array',
                                        default: [
                                            {
                                                type: 'string'
                                            }
                                        ]
                                    },
                                    categories: {
                                        type: 'array',
                                        default: [
                                            {
                                                type: 'string'
                                            }
                                        ]
                                    }
                                },
                                example: {
                                    categories: ['37794c39-d275-4ee9-b561-67177e8baea9'],
                                    sub_categories: ['a6867f88-4147-47d7-af17-869eaea494f6']
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'object'
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        category: {
                                            type: 'array',
                                            default: [
                                                {
                                                    type: 'object',
                                                    properties: {
                                                        sub_categories: {
                                                            type: 'array',
                                                            default: []
                                                        },
                                                        _id: {
                                                            type: 'string'
                                                        },
                                                        name: {
                                                            type: 'string'
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'category',
                                    message: 'Category has been successfully deleted',
                                    category: [
                                        {
                                            sub_categories: [],
                                            _id: 'a6867f88-4147-47d7-af17-869eaea494f6',
                                            name: 'Vazira'
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    },
                    '400': {
                        $ref: '#/components/responses/category-is-beingused'
                    }
                }
            }
        },
        '/item/create': {
            post: {
                summary: 'Create Item',
                tags: ['Item'],
                security: [
                    {
                        JWT: []
                    }
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    cost: {
                                        type: 'number',
                                        required: true
                                    },
                                    product: {
                                        type: 'string',
                                        required: true
                                    },
                                    quantity: {
                                        type: 'number',
                                        required: true
                                    }
                                }
                            },
                            example: {
                                product: 'c02eba9b-2cf1-4a2b-93ac-d125f5f47900',
                                cost: 20000,
                                quantity: 10
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'object'
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        item: {
                                            type: 'object',
                                            properties: {
                                                product: {
                                                    type: 'string'
                                                },
                                                cost: {
                                                    type: 'number'
                                                },
                                                quantity: {
                                                    type: 'number'
                                                },
                                                org_id: {
                                                    type: 'string'
                                                },
                                                emp_id: {
                                                    type: 'string'
                                                },
                                                _id: {
                                                    type: 'string'
                                                },
                                                createdAt: {
                                                    type: 'string'
                                                },
                                                updatedAt: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'item',
                                    message: 'Item has been successfully created',
                                    item: {
                                        product: 'c02eba9b-2cf1-4a2b-93ac-d125f5f47900',
                                        cost: 20000,
                                        quantity: 10,
                                        org_id: '54116a9a-5d7b-42fb-9fd7-035744e631b6',
                                        emp_id: '6101c61c-a300-4bee-aacf-c8a79154b5d6',
                                        _id: '70787b8a-6b98-4a61-9e44-214864c33dae',
                                        createdAt: '2021-07-27T11:05:09.680Z',
                                        updatedAt: '2021-07-27T11:05:09.680Z'
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/item/all': {
            get: {
                summary: 'Get All Items',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Item'],
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        units: [
                                            {
                                                type: 'object',
                                                properties: {
                                                    developer: {
                                                        type: 'boolean'
                                                    },
                                                    _id: {
                                                        type: 'string'
                                                    },
                                                    name: {
                                                        type: 'string'
                                                    },
                                                    full_name: {
                                                        type: 'string'
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'unit',
                                    message: 'All units',
                                    units: [
                                        {
                                            developer: true,
                                            _id: 'da0f1a2a-2dc5-45d8-b977-73a217647905',
                                            name: 'kg',
                                            full_name: 'kilogramm'
                                        },
                                        {
                                            developer: true,
                                            _id: 'b1a336a1-168d-425a-b7aa-a0179244685e',
                                            name: 'g',
                                            full_name: 'gramm'
                                        },
                                        {
                                            developer: true,
                                            _id: 'cf330e73-81cf-44a9-bcab-a7f98061eba0',
                                            name: 'l',
                                            full_name: 'litr'
                                        },
                                        {
                                            developer: false,
                                            _id: '08271309-7218-430b-b9c7-b306c89047bd',
                                            name: 't',
                                            full_name: 'tonna'
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/item/{id}': {
            get: {
                summary: 'Get Specific Item',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Item'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        }
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        item: {
                                            type: 'object',
                                            properties: {
                                                product: {
                                                    type: 'object',
                                                    properties: {
                                                        is_shared: {
                                                            type: 'boolean'
                                                        },
                                                        update_history: {
                                                            type: 'string'
                                                        },
                                                        _id: {
                                                            type: 'string'
                                                        },
                                                        org_id: {
                                                            type: 'string'
                                                        },
                                                        emp_id: {
                                                            type: 'string'
                                                        },
                                                        name: {
                                                            type: 'string'
                                                        },
                                                        description: {
                                                            type: 'string'
                                                        },
                                                        first_name: {
                                                            type: 'string'
                                                        },
                                                        bar_code: {
                                                            type: 'string'
                                                        },
                                                        SKU: {
                                                            type: 'string'
                                                        },
                                                        unit: {
                                                            type: 'string'
                                                        },
                                                        category: {
                                                            type: 'string'
                                                        },
                                                        weight: {
                                                            type: 'number'
                                                        },
                                                        volume: {
                                                            type: 'number'
                                                        },
                                                        VAT: {
                                                            type: 'number'
                                                        }
                                                    }
                                                },
                                                _id: {
                                                    type: 'string'
                                                },
                                                name: {
                                                    type: 'string'
                                                },
                                                cost: {
                                                    type: 'number'
                                                },
                                                quantity: {
                                                    type: 'number'
                                                },
                                                org_id: {
                                                    type: 'string'
                                                },
                                                emp_id: {
                                                    type: 'string'
                                                },
                                                createdAt: {
                                                    type: 'string'
                                                },
                                                updatedAt: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        success: true,
                                        status: 'item',
                                        message: 'One item',
                                        item: {
                                            _id: '751fab04-d3fb-4b2b-b1d9-c3db9b89d66e',
                                            product: {
                                                is_shared: true,
                                                update_history: [],
                                                _id: 'c02eba9b-2cf1-4a2b-93ac-d125f5f47900',
                                                org_id: 'be94642d-33c3-467f-814f-5ffd4e77c2af',
                                                emp_id: '86eb57e1-e5c7-4c49-afe2-ed5128f3fd28',
                                                name: 'Cola',
                                                description: '',
                                                bar_code: '',
                                                SKU: '',
                                                vendor_code: '',
                                                weight: null,
                                                volume: null,
                                                VAT: null,
                                                unit: '135b20f0-081b-44a4-9b3c-6e917607b4ae',
                                                category: '73d537f7-1604-40a6-8bda-281c895089d3',
                                                createdAt: '2021-07-28T11:22:36.314Z',
                                                updatedAt: '2021-07-29T04:53:19.949Z'
                                            },
                                            cost: 10000,
                                            quantity: 10,
                                            org_id: 'be94642d-33c3-467f-814f-5ffd4e77c2af',
                                            emp_id: '86eb57e1-e5c7-4c49-afe2-ed5128f3fd28',
                                            createdAt: '2021-07-29T04:55:10.110Z',
                                            updatedAt: '2021-07-29T04:55:10.110Z'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    },
                    '404': {
                        description: 'Not Found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            default: false
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        status: {
                                            type: 'string'
                                        }
                                    },
                                    example: {
                                        success: false,
                                        message: 'Item not found',
                                        status: 'item'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/item/update/{id}': {
            patch: {
                summary: 'Update Item',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Item'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    quantity: {
                                        type: 'number'
                                    }
                                },
                                example: {
                                    quantity: 15
                                }
                            }
                        }
                    }
                },
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        item: {
                                            type: 'object',
                                            properties: {
                                                _id: {
                                                    type: 'string'
                                                },
                                                product: {
                                                    type: 'string'
                                                },
                                                cost: {
                                                    type: 'number'
                                                },
                                                quantity: {
                                                    type: 'number'
                                                },
                                                org_id: {
                                                    type: 'string'
                                                },
                                                emp_id: {
                                                    type: 'string'
                                                },
                                                createdAt: {
                                                    type: 'string'
                                                },
                                                updatedAt: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'item',
                                    message: 'Item has been successfully updated',
                                    item: {
                                        _id: '751fab04-d3fb-4b2b-b1d9-c3db9b89d66e',
                                        product: 'c02eba9b-2cf1-4a2b-93ac-d125f5f47900',
                                        cost: 10000,
                                        quantity: 15,
                                        org_id: 'be94642d-33c3-467f-814f-5ffd4e77c2af',
                                        emp_id: '86eb57e1-e5c7-4c49-afe2-ed5128f3fd28',
                                        createdAt: '2021-07-29T04:55:10.110Z',
                                        updatedAt: '2021-07-29T05:05:51.845Z'
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    },
                    '404': {
                        description: 'Not Found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/common-error'
                                },
                                example: {
                                    success: false,
                                    message: 'Item not found',
                                    status: 'item'
                                }
                            }
                        }
                    }
                }
            }
        },
        '/item/delete': {
            delete: {
                summary: 'Delete Unit(s)',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Unit'],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    ids: {
                                        type: 'array',
                                        default: [
                                            {
                                                type: 'string'
                                            }
                                        ]
                                    }
                                },
                                example: {
                                    ids: ['25437aba-73d2-4d68-b212-9603a7ec220b']
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'object'
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        items: {
                                            type: 'array',
                                            default: [
                                                {
                                                    type: 'object',
                                                    properties: {
                                                        product: {
                                                            type: 'object',
                                                            properties: {
                                                                is_shared: {
                                                                    type: 'boolean'
                                                                },
                                                                update_history: {
                                                                    type: 'string'
                                                                },
                                                                _id: {
                                                                    type: 'string'
                                                                },
                                                                org_id: {
                                                                    type: 'string'
                                                                },
                                                                emp_id: {
                                                                    type: 'string'
                                                                },
                                                                name: {
                                                                    type: 'string'
                                                                },
                                                                description: {
                                                                    type: 'string'
                                                                },
                                                                first_name: {
                                                                    type: 'string'
                                                                },
                                                                bar_code: {
                                                                    type: 'string'
                                                                },
                                                                SKU: {
                                                                    type: 'string'
                                                                },
                                                                unit: {
                                                                    type: 'string'
                                                                },
                                                                category: {
                                                                    type: 'string'
                                                                },
                                                                weight: {
                                                                    type: 'number'
                                                                },
                                                                volume: {
                                                                    type: 'number'
                                                                },
                                                                VAT: {
                                                                    type: 'number'
                                                                }
                                                            }
                                                        },
                                                        _id: {
                                                            type: 'string'
                                                        },
                                                        name: {
                                                            type: 'string'
                                                        },
                                                        cost: {
                                                            type: 'number'
                                                        },
                                                        quantity: {
                                                            type: 'number'
                                                        },
                                                        org_id: {
                                                            type: 'string'
                                                        },
                                                        emp_id: {
                                                            type: 'string'
                                                        },
                                                        createdAt: {
                                                            type: 'string'
                                                        },
                                                        updatedAt: {
                                                            type: 'string'
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'item',
                                    message: 'Item has been successfully deleted',
                                    items: []
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    },
                    '404': {
                        description: 'Not Found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            default: false
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        status: {
                                            type: 'string'
                                        }
                                    },
                                    example: {
                                        success: false,
                                        message: 'Items not found',
                                        status: 'item'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/contractor/create': {
            post: {
                summary: 'Create Contractor',
                tags: ['Contractor'],
                security: [
                    {
                        JWT: []
                    }
                ],
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                        required: true
                                    },
                                    address: {
                                        type: 'string'
                                    },
                                    comment: {
                                        type: 'string'
                                    },
                                    email: {
                                        type: 'string'
                                    },
                                    phone_number: {
                                        type: 'string'
                                    },
                                    groups: {
                                        type: 'array'
                                    }
                                },
                                example: {
                                    name: 'Samandar'
                                }
                            }
                        }
                    }
                },
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        contractor: {
                                            type: 'object',
                                            properties: {
                                                groups: {
                                                    type: 'array',
                                                    default: []
                                                },
                                                update_history: {
                                                    type: 'array',
                                                    default: []
                                                },
                                                org_id: {
                                                    type: 'string'
                                                },
                                                emp_id: {
                                                    type: 'string'
                                                },
                                                name: {
                                                    type: 'string'
                                                },
                                                _id: {
                                                    type: 'string'
                                                },
                                                createdAt: {
                                                    type: 'string'
                                                },
                                                updatedAt: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'contractor',
                                    message: 'Contractor has been successfully created',
                                    contractor: {
                                        groups: [],
                                        name: 'Samandar',
                                        org_id: 'be94642d-33c3-467f-814f-5ffd4e77c2af',
                                        emp_id: '86eb57e1-e5c7-4c49-afe2-ed5128f3fd28',
                                        _id: '10f51b26-236b-4423-a9e2-c330a7f841c2',
                                        createdAt: '2021-07-29T05:35:20.211Z',
                                        updatedAt: '2021-07-29T05:35:20.211Z'
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/contractor/all': {
            get: {
                summary: 'Get All Contractors',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Contractor'],
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        contractors: [
                                            {
                                                type: 'object',
                                                properties: {
                                                    groups: {
                                                        type: 'array',
                                                        default: []
                                                    },
                                                    _id: {
                                                        type: 'string'
                                                    },
                                                    name: {
                                                        type: 'string'
                                                    },
                                                    org_id: {
                                                        type: 'string'
                                                    },
                                                    emp_id: {
                                                        type: 'string'
                                                    },
                                                    createdAt: {
                                                        type: 'string'
                                                    },
                                                    updatedAt: {
                                                        type: 'string'
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'contractor',
                                    message: 'All contractors',
                                    contractors: [
                                        {
                                            groups: [],
                                            _id: '10f51b26-236b-4423-a9e2-c330a7f841c2',
                                            name: 'Samandar',
                                            org_id: 'be94642d-33c3-467f-814f-5ffd4e77c2af',
                                            emp_id: '86eb57e1-e5c7-4c49-afe2-ed5128f3fd28',
                                            createdAt: '2021-07-29T05:35:20.211Z',
                                            updatedAt: '2021-07-29T05:35:20.211Z'
                                        }
                                    ]
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    }
                }
            }
        },
        '/contractor/{id}': {
            get: {
                summary: 'Get Specific Contractor',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Contractor'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        }
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        contractor: {
                                            type: 'object',
                                            properties: {
                                                _id: {
                                                    type: 'string'
                                                },
                                                name: {
                                                    type: 'string'
                                                },
                                                org_id: {
                                                    type: 'string'
                                                },
                                                emp_id: {
                                                    type: 'string'
                                                },
                                                createdAt: {
                                                    type: 'string'
                                                },
                                                updatedAt: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    },
                                    example: {
                                        success: true,
                                        status: 'contractor',
                                        message: 'One contractor',
                                        contractor: {
                                            groups: [],
                                            _id: '10f51b26-236b-4423-a9e2-c330a7f841c2',
                                            name: 'Samandar',
                                            org_id: 'be94642d-33c3-467f-814f-5ffd4e77c2af',
                                            emp_id: '86eb57e1-e5c7-4c49-afe2-ed5128f3fd28',
                                            createdAt: '2021-07-29T05:35:20.211Z',
                                            updatedAt: '2021-07-29T05:35:20.211Z'
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    },
                    '404': {
                        description: 'Not Found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        success: {
                                            type: 'boolean',
                                            default: false
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        status: {
                                            type: 'string'
                                        }
                                    },
                                    example: {
                                        success: false,
                                        message: 'Contractor is not found',
                                        status: 'contractor'
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/contractor/update/{id}': {
            patch: {
                summary: 'Update Contractor',
                security: [
                    {
                        JWT: []
                    }
                ],
                tags: ['Contractor'],
                parameters: [
                    {
                        in: 'path',
                        name: 'id',
                        required: true,
                        schema: {
                            type: 'string'
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string'
                                    }
                                }
                            },
                            example: {
                                name: 'Muzqaymoqlar(Ice Creams)'
                            }
                        }
                    }
                },
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
                                        },
                                        status: {
                                            type: 'string'
                                        },
                                        message: {
                                            type: 'string'
                                        },
                                        category: {
                                            type: 'object',
                                            properties: {
                                                sub_categories: {
                                                    type: 'array',
                                                    default: []
                                                },
                                                _id: {
                                                    type: 'string'
                                                },
                                                name: {
                                                    type: 'string'
                                                }
                                            }
                                        }
                                    }
                                },
                                example: {
                                    success: true,
                                    status: 'contractor',
                                    message: 'Contractor has been successfully updated',
                                    contractor: {
                                        groups: [],
                                        _id: '10f51b26-236b-4423-a9e2-c330a7f841c2',
                                        name: 'Dilmurod',
                                        org_id: 'be94642d-33c3-467f-814f-5ffd4e77c2af',
                                        emp_id: '86eb57e1-e5c7-4c49-afe2-ed5128f3fd28',
                                        createdAt: '2021-07-29T05:35:20.211Z',
                                        updatedAt: '2021-07-29T06:46:59.274Z',
                                        __v: 0
                                    }
                                }
                            }
                        }
                    },
                    '401': {
                        $ref: '#/components/responses/unauthorized-user'
                    },
                    '404': {
                        description: 'Not Found',
                        content: {
                            'application/json': {
                                schema: {
                                    $ref: '#/components/schemas/common-error'
                                },
                                example: {
                                    success: false,
                                    message: 'Category not found',
                                    status: 'category'
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
