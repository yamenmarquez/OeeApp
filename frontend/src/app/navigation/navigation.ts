export const navigation = [
    {
        'id'      : 'appFrontend',
        'title'   : 'App Frontend',
        // Se desabilita la funcionalidad de traducción
        // 'translate': 'NAV.APPLICATIONS',
        'type'    : 'group',
        'children': [
            {
              'id'   : 'home',
              'title': 'Inicio',
              'type' : 'item',
              'icon' : 'home',
              'url'  : '#'
            },
            {
              'id'        : 'planning' ,
              'title'     : 'Planificación',
              'type'      : 'collapse',
              'icon'      : 'today',
              'children'  : [
                {
                  'id'   : 'jobs',
                  'title': 'Órdenes de producción',
                  'type' : 'item',
                  'icon' : 'create_new_folder',
                  'url'  : '#'
                }
              ]
            },
            {
              'id'        : 'operation' ,
              'title'     : 'Operación',
              'type'      : 'collapse',
              'icon'      : 'business',
              'children'  : [
                {
                  'id'   : 'startShift',
                  'title': 'Iniciar turno',
                  'type' : 'item',
                  'icon' : 'arrow_forward',
                  'url'  : '#'
                },
                {
                  'id'   : 'openJobs',
                  'title': 'Órdenes abiertas',
                  'type' : 'item',
                  'icon' : 'folder_open',
                  'url'  : '#'
                },
                {
                  'id'   : 'closeJobs',
                  'title': 'Órdenes cerradas',
                  'type' : 'item',
                  'icon' : 'folder',
                  'url'  : '#'
                },
                {
                  'id'   : 'closeShift',
                  'title': 'Cerrar turno',
                  'type' : 'item',
                  'icon' : 'arrow_back',
                  'url'  : '#'
                }
              ]
            },
            {
              'id'        : 'results' ,
              'title'     : 'Resultados',
              'type'      : 'collapse',
              'icon'      : 'assessment',
              'children'  : [
                {
                  'id'   : 'checkOeeResults',
                  'title': 'Consultar Oee',
                  'type' : 'item',
                  'icon' : 'search',
                  'url'  : '#'
                },
                {
                  'id'   : 'checkHistoricalOee',
                  'title': 'Oee histórico',
                  'type' : 'item',
                  'icon' : 'format_list_numbered',
                  'url'  : '#'
                }
              ]
            },
            {
                'id'   : 'sample',
                'title': 'Sample',
                // Se desabilita la funcionalidad de traducción
                // 'translate': 'NAV.SAMPLE.TITLE',
                'type' : 'item',
                'icon' : 'email',
                'url'  : '/sample',
            }
        ]
    },
    {
        'id'      : 'appBacktend',
        'title'   : 'App Backend',
        'type'    : 'group',
        'children': [
            {
              'id'        : 'masterData' ,
              'title'     : 'Datos maestros',
              'type'      : 'collapse',
              'icon'      : 'format_list_bulleted',
              'children'  : [
                {
                  'id'   : 'npstops',
                  'title': 'Paradas no planificadas',
                  'type' : 'item',
                  'icon' : 'settings_input_component',
                  'url'  : '#'
                },
                {
                    'id'   : 'pstops',
                    'title': 'Paradas planificadas',
                    'type' : 'item',
                    'icon' : 'settings_input_component',
                    'url'  : '#'
                },
                {
                    'id'   : 'plants',
                    'title': 'Plantas de producción',
                    'type' : 'item',
                    'icon' : 'settings_input_component',
                    'url'  : '#'
                },
                {
                    'id'   : 'bom',
                    'title': 'Listas de materiales',
                    'type' : 'item',
                    'icon' : 'settings_input_component',
                    'url'  : '#'
                },
                {
                    'id'   : 'items',
                    'title': 'Items',
                    'type' : 'item',
                    'icon' : 'settings_input_component',
                    'url'  : '#'
                },
                {
                    'id'   : 'workstations',
                    'title': 'Estaciones de trabajo',
                    'type' : 'item',
                    'icon' : 'settings_input_component',
                    'url'  : '#'
                }
              ]
            },
            {
              'id'        : 'users' ,
              'title'     : 'Usuarios',
              'type'      : 'collapse',
              'icon'      : 'person',
              'children'  : [
                {
                  'id'   : 'userManagement',
                  'title': 'Gestioón de usuarios',
                  'type' : 'item',
                  'icon' : 'supervisor_account',
                  'url'  : '#'
                },
              ]
            }
        ]
    }
];
