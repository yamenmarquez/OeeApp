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
                  'id'   : 'job',
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
                  'id'   : 'openJob',
                  'title': 'Órdenes abiertas',
                  'type' : 'item',
                  'icon' : 'folder_open',
                  'url'  : '#'
                },
                {
                  'id'   : 'closeJob',
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
              'id'        : 'result' ,
              'title'     : 'Resultados',
              'type'      : 'collapse',
              'icon'      : 'assessment',
              'children'  : [
                {
                  'id'   : 'checkOeeResult',
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
        'id'      : 'appBackend',
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
                  'id'   : 'npstop',
                  'title': 'Paradas no planificadas',
                  'type' : 'item',
                  'icon' : 'settings_input_component',
                  'url'  : '/backend/masterdata/npstop',
                  'hidden': 'true'
                },
                {
                  'id'   : 'npstop-2',
                  'title': 'Paradas no planificadas-2',
                  'type' : 'item',
                  'icon' : 'settings_input_component',
                  'url'  : '/backend/masterdata/npstop-2',
                  'hidden': 'true'
                },
                {
                    'id'   : 'stops',
                    'title': 'Paradas',
                    'type' : 'item',
                    'icon' : 'settings_input_component',
                    'url'  : '/backend/masterdata/stops'
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
                    'id'   : 'item',
                    'title': 'Items',
                    'type' : 'item',
                    'icon' : 'settings_input_component',
                    'url'  : '#'
                },
                {
                    'id'   : 'workstation',
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
                  'title': 'Gestión de usuarios',
                  'type' : 'item',
                  'icon' : 'supervisor_account',
                  'url'  : '#'
                },
              ]
            }
        ]
    }
];
